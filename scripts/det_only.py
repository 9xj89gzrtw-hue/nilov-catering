#!/usr/bin/env python3
"""Deterministic-only evaluation on Vercel production."""
import asyncio, json
from pathlib import Path
from datetime import datetime
from playwright.async_api import async_playwright

BASE = "https://nilov-catering.vercel.app"
OUT = Path("/home/z/my-project/audit-reports")
OUT.mkdir(exist_ok=True, parents=True)
AXE = "/home/z/my-project/nilov-catering/node_modules/axe-core/axe.min.js"

async def check_a11y(page, url):
    await page.goto(url, wait_until='networkidle', timeout=30000)
    await page.wait_for_timeout(2000)
    try:
        await page.add_script_tag(path=AXE)
        results = await page.evaluate('''async()=>{return await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}});}''')
        crit = sum(len(v.get('nodes',[])) for v in results['violations'] if v.get('impact')=='critical')
        seri = sum(len(v.get('nodes',[])) for v in results['violations'] if v.get('impact')=='serious')
        mod = sum(len(v.get('nodes',[])) for v in results['violations'] if v.get('impact')=='moderate')
        mino = sum(len(v.get('nodes',[])) for v in results['violations'] if v.get('impact')=='minor')
        penalty = crit*2 + seri*1 + mod*0.3 + mino*0.1
        return {'url':url,'score':round(max(0,10-penalty),2),'critical':crit,'serious':seri,'moderate':mod,'minor':mino}
    except Exception as e:
        return {'url':url,'score':0,'error':str(e)[:200]}

async def check_perf(page, url):
    await page.goto(url, wait_until='networkidle', timeout=30000)
    await page.wait_for_timeout(3000)
    m = await page.evaluate('''()=>new Promise(r=>{const o={lcp:0,fcp:0,ttfb:0};const n=performance.getEntriesByType('navigation')[0];if(n)o.ttfb=n.responseStart-n.requestStart;const f=performance.getEntriesByType('paint').find(p=>p.name==='first-contentful-paint');if(f)o.fcp=f.startTime;new PerformanceObserver(l=>{const e=l.getEntries();if(e.length>0)o.lcp=e[e.length-1].startTime;r(o);}).observe({type:'largest-contentful-paint',buffered:true});setTimeout(()=>r(o),2000);})''')
    ls = 10 if m['lcp']<2500 else 7 if m['lcp']<4000 else 4
    fs = 10 if m['fcp']<1800 else 7 if m['fcp']<3000 else 4
    ts = 10 if m['ttfb']<800 else 7 if m['ttfb']<1500 else 4
    return {'url':url,'score':round((ls+fs+ts)/3,2),'lcp':round(m['lcp'],1),'fcp':round(m['fcp'],1),'ttfb':round(m['ttfb'],1)}

async def check_flow(page, name, steps):
    try:
        for s in steps:
            if s['type']=='goto': await page.goto(BASE+s['url'],wait_until='networkidle',timeout=30000); await page.wait_for_timeout(s.get('wait',3000))
            elif s['type']=='click': await page.click(s['selector'],timeout=5000); await page.wait_for_timeout(s.get('wait',2000))
            elif s['type']=='js_click': await page.evaluate(f"()=>{{const b=Array.from(document.querySelectorAll('button')).find(b=>b.textContent&&b.textContent.includes('{s['text']}'));if(b)b.click();}}"); await page.wait_for_timeout(s.get('wait',2000))
            elif s['type']=='fill': await page.fill(s['selector'],s['value'],timeout=5000); await page.wait_for_timeout(500)
            elif s['type']=='verify':
                a = await page.evaluate(s['js'])
                if s['expect'] not in str(a): return {'name':name,'passed':False,'reason':f"Expected '{s['expect']}'"}
        return {'name':name,'passed':True}
    except Exception as e:
        return {'name':name,'passed':False,'reason':str(e)[:200]}

async def check_content(page, url):
    await page.goto(BASE+url, wait_until='networkidle', timeout=30000)
    await page.wait_for_timeout(2000)
    for _ in range(2): await page.evaluate('window.scrollBy(0,800)'); await page.wait_for_timeout(400)
    await page.evaluate('window.scrollTo(0,0)'); await page.wait_for_timeout(1000)
    return await page.evaluate('''()=>{const i=Array.from(document.querySelectorAll('img'));return{broken:i.filter(i=>i.complete&&i.naturalWidth===0).length,emptyAlt:i.filter(i=>!i.alt).length,h1:document.querySelectorAll('h1').length};}''')

async def check_seo(page, url):
    await page.goto(BASE+url, wait_until='networkidle', timeout=30000)
    await page.wait_for_timeout(2000)
    return await page.evaluate('''()=>{const c=document.querySelector('link[rel="canonical"]')?.href||'';return{title:!!document.querySelector('title'),desc:!!document.querySelector('meta[name="description"]'),canon:!!c,canonOk:c.includes('nilov-catering.vercel.app'),og:!!document.querySelector('meta[property="og:image"]')};}''')

async def main():
    print(f"DETERMINISTIC EVAL — {BASE}")
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        ctx = await browser.new_context(viewport={'width':1440,'height':900})
        page = await ctx.new_page()
        await page.goto(BASE+'/', wait_until='networkidle')
        await page.evaluate("localStorage.setItem('cookie-consent','accepted');localStorage.setItem('cookie-consent-shown','true')")
        R = {}
        # A11y
        print("\n=== ACCESSIBILITY ===")
        ap = []
        for u in ['/','/plan/constructor','/menu/catalog','/plan/helper','/events/svadba','/contact']:
            r = await check_a11y(page, BASE+u)
            print(f"  {u}: {r['score']:.1f} (S:{r.get('serious',0)} M:{r.get('moderate',0)})")
            ap.append(r)
        R['a11y'] = round(sum(r['score'] for r in ap)/len(ap), 2)
        # Perf
        print("\n=== PERFORMANCE ===")
        pp = []
        for u in ['/','/menu/catalog','/plan/constructor','/gallery']:
            r = await check_perf(page, BASE+u)
            print(f"  {u}: {r['score']:.1f} (LCP={r['lcp']:.0f}ms FCP={r['fcp']:.0f}ms TTFB={r['ttfb']:.0f}ms)")
            pp.append(r)
        R['perf'] = round(sum(r['score'] for r in pp)/len(pp), 2)
        # Flows
        print("\n=== FLOWS ===")
        fl = []
        fl.append(await check_flow(page,'helper',[{'type':'goto','url':'/plan/helper','wait':4000},{'type':'click','selector':'a:has-text("Свадьба")','wait':3000},{'type':'click','selector':'a:has-text("до 20")','wait':3000},{'type':'click','selector':'a:has-text("Дома")','wait':3000},{'type':'verify','js':"()=>document.querySelector('h1')?.textContent",'expect':'Вот что мы подобрали'}]))
        fl.append(await check_flow(page,'pricing_to_svadba',[{'type':'goto','url':'/pricing','wait':4000},{'type':'click','selector':'a[href="/events/svadba"] >> nth=0','wait':3000},{'type':'verify','js':"()=>window.location.href",'expect':'/events/svadba'}]))
        for f in fl: print(f"  {'PASS' if f['passed'] else 'FAIL'} {f['name']}")
        R['flows'] = round((sum(1 for f in fl if f['passed'])/len(fl))*10, 2)
        # Content
        print("\n=== CONTENT ===")
        cp = []
        for u in ['/','/menu/catalog','/menu/furshet','/pricing','/gallery','/plan/constructor','/events/svadba','/contact','/events/nikah','/events/korporativ']:
            r = await check_content(page, u)
            cp.append({'url':u,**r})
        tp = sum(r['broken']*1+r['emptyAlt']*0.5+(2 if r['h1']==0 else 0) for r in cp)
        R['content'] = round(max(0,10-tp/len(cp)), 2)
        print(f"  Score: {R['content']}/10 (penalty: {tp:.1f})")
        # SEO
        print("\n=== SEO ===")
        sp = []
        for u in ['/','/menu/catalog','/plan/constructor','/events/svadba']:
            sp.append(await check_seo(page, u))
        sm = (await page.goto(BASE+'/sitemap.xml', wait_until='domcontentloaded')) is not None
        rb = (await page.goto(BASE+'/robots.txt', wait_until='domcontentloaded')) is not None
        checks = {'titles':all(r['title'] for r in sp),'descs':all(r['desc'] for r in sp),'canons':all(r['canon'] for r in sp),'canons_ok':all(r['canonOk'] for r in sp),'og':all(r['og'] for r in sp),'sitemap':sm,'robots':rb}
        R['seo'] = round((sum(1 for v in checks.values() if v)/len(checks))*10, 2)
        print(f"  Score: {R['seo']}/10 ({sum(1 for v in checks.values() if v)}/{len(checks)})")
        await browser.close()
    det = round(sum(R.values())/len(R), 2)
    R['overall'] = det
    print(f"\n{'='*50}")
    print(f"DETERMINISTIC OVERALL: {det}/10")
    print(f"  A11y:{R['a11y']} Perf:{R['perf']} Flows:{R['flows']} Content:{R['content']} SEO:{R['seo']}")
    print(f"  Target 9.3: {'✅' if det>=9.3 else '❌'}")
    print(f"{'='*50}")
    (OUT/'HYBRID_DET.json').write_text(json.dumps(R, indent=2, ensure_ascii=False))
    print(f"Saved: {OUT/'HYBRID_DET.json'}")

asyncio.run(main())
