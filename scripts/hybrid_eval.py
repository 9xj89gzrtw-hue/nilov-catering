#!/usr/bin/env python3
"""
Hybrid Evaluation Pipeline — deterministic (70%) + VLM averaged (30%).
Tests on Vercel production: https://nilov-catering.vercel.app
"""
import asyncio, json, subprocess, re, time, os
from pathlib import Path
from datetime import datetime
from playwright.async_api import async_playwright

BASE = "https://nilov-catering.vercel.app"
OUT = Path("/home/z/my-project/audit-reports")
OUT.mkdir(exist_ok=True, parents=True)
AXE = "/home/z/my-project/nilov-catering/node_modules/axe-core/axe.min.js"
SNAP_DIR = Path("/home/z/my-project/snapshots-w90-compressed")
FRAME_DIR = Path("/home/z/my-project/runtime-evidence/frames-w90")
VLM_OUT = Path("/home/z/my-project/critic-hybrid")
VLM_OUT.mkdir(exist_ok=True, parents=True)

async def check_accessibility(page, url):
    await page.goto(url, wait_until='networkidle', timeout=30000)
    await page.wait_for_timeout(2000)
    try:
        await page.add_script_tag(path=AXE)
        results = await page.evaluate('''async () => {
            return await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a','wcag2aa','wcag21a','wcag21aa'] } });
        }''')
        critical = sum(len(v.get('nodes',[])) for v in results['violations'] if v.get('impact')=='critical')
        serious = sum(len(v.get('nodes',[])) for v in results['violations'] if v.get('impact')=='serious')
        moderate = sum(len(v.get('nodes',[])) for v in results['violations'] if v.get('impact')=='moderate')
        minor = sum(len(v.get('nodes',[])) for v in results['violations'] if v.get('impact')=='minor')
        penalty = critical*2 + serious*1 + moderate*0.3 + minor*0.1
        score = max(0, 10 - penalty)
        return {'url': url, 'score': round(score,2), 'critical': critical, 'serious': serious, 'moderate': moderate, 'minor': minor}
    except Exception as e:
        return {'url': url, 'score': 0, 'error': str(e)[:200]}

async def check_performance(page, url):
    await page.goto(url, wait_until='networkidle', timeout=30000)
    await page.wait_for_timeout(3000)
    metrics = await page.evaluate('''() => new Promise(resolve => {
        const r = {lcp:0, fcp:0, ttfb:0};
        const nav = performance.getEntriesByType('navigation')[0];
        if (nav) r.ttfb = nav.responseStart - nav.requestStart;
        const fcp = performance.getEntriesByType('paint').find(p=>p.name==='first-contentful-paint');
        if (fcp) r.fcp = fcp.startTime;
        new PerformanceObserver(list => {
            const e = list.getEntries();
            if (e.length>0) r.lcp = e[e.length-1].startTime;
            resolve(r);
        }).observe({type:'largest-contentful-paint', buffered:true});
        setTimeout(()=>resolve(r), 2000);
    })''')
    lcp_s = 10 if metrics['lcp']<2500 else 7 if metrics['lcp']<4000 else 4 if metrics['lcp']<6000 else 1
    fcp_s = 10 if metrics['fcp']<1800 else 7 if metrics['fcp']<3000 else 4
    ttfb_s = 10 if metrics['ttfb']<800 else 7 if metrics['ttfb']<1500 else 4
    return {'url':url,'score':round((lcp_s+fcp_s+ttfb_s)/3,2),'lcp_ms':round(metrics['lcp'],1),'fcp_ms':round(metrics['fcp'],1),'ttfb_ms':round(metrics['ttfb'],1)}

async def check_flow(page, name, steps):
    try:
        for s in steps:
            if s['type']=='goto': await page.goto(BASE+s['url'],wait_until='networkidle',timeout=30000); await page.wait_for_timeout(s.get('wait',3000))
            elif s['type']=='click': await page.click(s['selector'],timeout=5000); await page.wait_for_timeout(s.get('wait',2000))
            elif s['type']=='js_click': await page.evaluate(f"()=>{{const b=Array.from(document.querySelectorAll('button')).find(b=>b.textContent&&b.textContent.includes('{s['text']}'));if(b)b.click();}}"); await page.wait_for_timeout(s.get('wait',2000))
            elif s['type']=='fill': await page.fill(s['selector'],s['value'],timeout=5000); await page.wait_for_timeout(500)
            elif s['type']=='verify':
                actual = await page.evaluate(s['js'])
                if s['expect'] not in str(actual): return {'name':name,'passed':False,'reason':f"Expected '{s['expect']}' in '{str(actual)[:80]}'"}
        return {'name':name,'passed':True}
    except Exception as e:
        return {'name':name,'passed':False,'reason':str(e)[:200]}

async def check_content(page, url):
    await page.goto(BASE+url, wait_until='networkidle', timeout=30000)
    await page.wait_for_timeout(2000)
    for _ in range(2): await page.evaluate('window.scrollBy(0,800)'); await page.wait_for_timeout(400)
    await page.evaluate('window.scrollTo(0,0)'); await page.wait_for_timeout(1000)
    return await page.evaluate('''()=>{const i=Array.from(document.querySelectorAll('img'));return{brokenImages:i.filter(i=>i.complete&&i.naturalWidth===0).length,emptyAlt:i.filter(i=>!i.alt).length,h1Count:document.querySelectorAll('h1').length};}''')

async def check_seo(page, url):
    await page.goto(BASE+url, wait_until='networkidle', timeout=30000)
    await page.wait_for_timeout(2000)
    return await page.evaluate('''()=>{const c=document.querySelector('link[rel="canonical"]')?.href||'';return{hasTitle:!!document.querySelector('title'),hasMetaDescription:!!document.querySelector('meta[name="description"]'),hasCanonical:!!c,canonicalCorrect:c.includes('nilov-catering.vercel.app'),hasOgImage:!!document.querySelector('meta[property="og:image"]')};}''')

async def run_deterministic():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        ctx = await browser.new_context(viewport={'width':1440,'height':900})
        page = await ctx.new_page()
        await page.goto(BASE+'/', wait_until='networkidle')
        await page.evaluate("localStorage.setItem('cookie-consent','accepted');localStorage.setItem('cookie-consent-shown','true')")
        results = {}
        # A11y
        print("=== ACCESSIBILITY ===")
        axe_pages = []
        for url in ['/','/plan/constructor','/menu/catalog','/plan/helper','/events/svadba','/contact']:
            r = await check_accessibility(page, BASE+url)
            print(f"  {url}: {r['score']:.1f} (S:{r.get('serious',0)} M:{r.get('moderate',0)})")
            axe_pages.append(r)
        results['accessibility'] = round(sum(r['score'] for r in axe_pages)/len(axe_pages), 2)
        # Perf
        print("\n=== PERFORMANCE ===")
        perf_pages = []
        for url in ['/','/menu/catalog','/plan/constructor','/gallery']:
            r = await check_performance(page, BASE+url)
            print(f"  {url}: {r['score']:.1f} (LCP={r['lcp_ms']:.0f}ms)")
            perf_pages.append(r)
        results['performance'] = round(sum(r['score'] for r in perf_pages)/len(perf_pages), 2)
        # Flows
        print("\n=== FLOWS ===")
        flows = []
        flows.append(await check_flow(page,'helper',[{'type':'goto','url':'/plan/helper','wait':4000},{'type':'click','selector':'a:has-text("Свадьба")','wait':3000},{'type':'click','selector':'a:has-text("до 20")','wait':3000},{'type':'click','selector':'a:has-text("Дома")','wait':3000},{'type':'verify','js':"()=>document.querySelector('h1')?.textContent",'expect':'Вот что мы подобрали'}]))
        flows.append(await check_flow(page,'pricing_to_svadba',[{'type':'goto','url':'/pricing','wait':4000},{'type':'click','selector':'a[href="/events/svadba"] >> nth=0','wait':3000},{'type':'verify','js':"()=>window.location.href",'expect':'/events/svadba'}]))
        for f in flows: print(f"  {'PASS' if f['passed'] else 'FAIL'} {f['name']}")
        results['flows'] = round((sum(1 for f in flows if f['passed'])/len(flows))*10, 2)
        # Content
        print("\n=== CONTENT ===")
        content_pages = []
        for url in ['/','/menu/catalog','/menu/furshet','/pricing','/gallery','/plan/constructor','/events/svadba','/contact','/events/nikah','/events/korporativ']:
            r = await check_content(page, url)
            content_pages.append({'url':url,**r})
        total_penalty = sum(r['brokenImages']*1+r['emptyAlt']*0.5+(2 if r['h1Count']==0 else 0) for r in content_pages)
        results['content'] = round(max(0, 10-total_penalty/len(content_pages)), 2)
        # SEO
        print("\n=== SEO ===")
        seo_pages = []
        for url in ['/','/menu/catalog','/plan/constructor','/events/svadba']:
            seo_pages.append(await check_seo(page, url))
        sitemap_ok = (await page.goto(BASE+'/sitemap.xml', wait_until='domcontentloaded')) is not None
        robots_ok = (await page.goto(BASE+'/robots.txt', wait_until='domcontentloaded')) is not None
        checks = {'titles':all(r['hasTitle'] for r in seo_pages),'descriptions':all(r['hasMetaDescription'] for r in seo_pages),'canonicals':all(r['hasCanonical'] for r in seo_pages),'canonicals_correct':all(r['canonicalCorrect'] for r in seo_pages),'og_images':all(r['hasOgImage'] for r in seo_pages),'sitemap':sitemap_ok,'robots':robots_ok}
        results['seo'] = round((sum(1 for v in checks.values() if v)/len(checks))*10, 2)
        print(f"  Score: {results['seo']}/10 ({sum(1 for v in checks.values() if v)}/{len(checks)} checks)")
        await browser.close()
    det_score = round(sum(results.values())/len(results), 2)
    results['deterministic_overall'] = det_score
    (OUT/'hybrid-det.json').write_text(json.dumps(results, indent=2, ensure_ascii=False))
    return results

CRITICS = [
    ("C1","Senior UX Designer 10+ лет",["01-home.jpg","03-pricing.jpg","05-constructor-step3-cart.jpg","06-svadba.jpg","02-catalog.jpg"],"constructor-flow"),
    ("C2","UX Researcher 100+ studies",["01-home.jpg","05-helper-step1.jpg","05-constructor-step3-cart.jpg","08-contact.jpg","01-home-mobile.jpg"],"helper-flow"),
    ("C3","UX Architect 15+ лет",["01-home.jpg","02-catalog.jpg","03-pricing.jpg","06-korporativ.jpg","05-constructor.jpg"],"constructor-flow"),
    ("C4","Information Architect",["01-home.jpg","02-catalog.jpg","04-gallery.jpg","06-korporativ.jpg","08-contact.jpg"],"catalog-allergen"),
    ("C5","User Flow Specialist",["01-home.jpg","05-helper-step1.jpg","05-constructor-step3-cart.jpg","03-pricing.jpg","08-contact.jpg"],"helper-flow"),
    ("C6","Navigation Expert",["01-home.jpg","02-catalog.jpg","03-pricing.jpg","06-svadba.jpg","06-korporativ.jpg"],"focus-visible"),
    ("C7","Human Behavior Specialist",["01-home.jpg","05-constructor-step3-cart.jpg","06-svadba.jpg","03-pricing.jpg","02-catalog.jpg"],"budget-calculator"),
    ("C8","Cognitive Load Expert",["01-home.jpg","02-catalog.jpg","05-constructor-step3-cart.jpg","03-pricing.jpg","05-helper-step1.jpg"],"constructor-flow"),
    ("C9","Form UX Expert",["01-home.jpg","08-contact.jpg","05-constructor-step3-cart.jpg","05-helper-step1.jpg","03-pricing.jpg"],"helper-flow"),
    ("C10","Mobile UX Expert",["01-home-mobile.jpg","05-constructor-mobile.jpg","01-home.jpg","05-constructor-step3-cart.jpg","03-pricing.jpg"],"cart-badge-bounce"),
    ("C11","Accessibility Expert WCAG 2.2 AA",["01-home.jpg","05-constructor-step3-cart.jpg","05-helper-step1.jpg","02-catalog.jpg","08-contact.jpg"],"focus-visible"),
]

def extract_score(path):
    try:
        data = json.load(open(path))
        content = data.get('choices',[{}])[0].get('message',{}).get('content','') if isinstance(data,dict) else ''
        if not content and isinstance(data,dict): content = data.get('raw_response','')
        matches = re.findall(r'\**(\d+(?:\.\d+)?)\s*/\s*10\**', content)
        valid = [float(m) for m in matches if 1.0<=float(m)<=10.0]
        m = re.search(r'(?:медиан|общая|итог|verdict)[^\n]{0,50}?(\d+(?:\.\d+)?)', content, re.IGNORECASE)
        if m and 1.0<=float(m.group(1))<=10.0: return float(m.group(1))
        return sorted(valid)[len(valid)//2] if valid else 0
    except: return 0

def run_vlm_once(cid, role, imgs, gif, run):
    img_args = []
    for img in imgs:
        p = SNAP_DIR/img
        if p.exists(): img_args.extend(["-i",str(p)])
    for f in range(3):
        p = FRAME_DIR/f"{gif}_f{f}.jpg"
        if p.exists(): img_args.extend(["-i",str(p)])
    prompt = f"Ты — {role}. Оцени сайт кейтеринга NiloV Catering (СПб). 17 лет, 3000+ событий, халяль, 124 блюда. Оцени по экспертной области. Честно. 9.3+ только для выдающегося UX. Дай: 4 оценки 1-10, ОБЩАЯ МЕДИАНА, 3 улучшения, 1 баг."
    output = VLM_OUT/f"{cid}_run{run}.json"
    cmd = ["z-ai","vision","-p",prompt]+img_args+["-o",str(output)]
    try:
        subprocess.run(cmd, capture_output=True, text=True, timeout=180)
        return extract_score(output)
    except: return 0

def run_vlm_critics(runs=3):
    print(f"\n=== VLM CRITICS ({runs} runs each, median) ===")
    scores = {}
    for cid, role, imgs, gif in CRITICS:
        run_scores = []
        for r in range(1, runs+1):
            s = run_vlm_once(cid, role, imgs, gif, r)
            if s > 0: run_scores.append(s)
            time.sleep(8)
        if run_scores:
            med = sorted(run_scores)[len(run_scores)//2]
            scores[cid] = {'median': med, 'runs': run_scores, 'mean': round(sum(run_scores)/len(run_scores),2)}
            print(f"  {cid}: med={med:.1f} runs={run_scores}")
    vlm = round(sum(v['median'] for v in scores.values())/len(scores), 2) if scores else 0
    return vlm, scores

async def main():
    print("╔══════════════════════════════════════════╗")
    print("║  HYBRID EVAL: 70% Det + 30% VLM (3-run) ║")
    print("╚══════════════════════════════════════════╝")
    print(f"Target: {BASE}\n")
    det = await run_deterministic()
    det_score = det['deterministic_overall']
    print(f"\nDETERMINISTIC: {det_score}/10")
    print(f"  A11y:{det['accessibility']} Perf:{det['performance']} Flows:{det['flows']} Content:{det['content']} SEO:{det['seo']}\n")
    vlm_score, critic_data = run_vlm_critics(runs=3)
    print(f"\nVLM (3-run medians): {vlm_score}/10")
    for cid in sorted(critic_data.keys()):
        d = critic_data[cid]
        ge = "✅" if d['median']>=9.3 else "❌"
        print(f"  {cid}: {d['median']:.1f} {ge} (runs: {d['runs']})")
    hybrid = round(0.7*det_score + 0.3*vlm_score, 2)
    print(f"\n{'='*50}")
    print(f"HYBRID SCORE: {hybrid}/10")
    print(f"  Det(70%): {det_score} | VLM(30%): {vlm_score}")
    print(f"  Target: 9.3 | {'✅ ABOVE' if hybrid>=9.3 else '❌ BELOW'}")
    print(f"{'='*50}")
    summary = {'hybrid':hybrid,'deterministic':det_score,'vlm':vlm_score,'det_details':det,'vlm_details':critic_data,'target':9.3,'above':hybrid>=9.3,'timestamp':datetime.now().isoformat()}
    (OUT/'HYBRID_SUMMARY.json').write_text(json.dumps(summary, indent=2, ensure_ascii=False))
    print(f"\nReport: {OUT/'HYBRID_SUMMARY.json'}")

asyncio.run(main())
