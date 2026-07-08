const { execSync } = require('child_process');
const fs = require('fs');

const criticNum = process.argv[2] || '1';
const outputFile = process.argv[3] || `/home/z/my-project/download/critic${criticNum}_review.json`;

const systemPrompt = `You are CRITIC-${criticNum}, an expert web design & UX auditor specializing in catering/food-service websites. You have deep knowledge of July 2026 web trends. You are EXTREMELY strict and thorough. Score from 1-10 where 10 = perfect. You MUST provide SPECIFIC, ACTIONABLE fixes with exact code. Respond in RUSSIAN.`;

const trends = fs.readFileSync('/tmp/trends_compiled.txt', 'utf-8');
const source = fs.readFileSync('/tmp/site_source_full.txt', 'utf-8');

const userPrompt = `===2026 WEB & CATERING TRENDS (from live internet search)===
${trends}

===FULL SITE SOURCE CODE===
${source}

INSTRUCTIONS:
You are reviewing a Russian catering company website (odaeda.ru) built with Next.js 16, Tailwind CSS 4, Framer Motion, shadcn/ui, base-ui components.

The site has: homepage with 11 sections (Hero video, TrustMarquee, Services, WhyUs, Stats, MenuPreview, Testimonials, Gallery, Blog, FAQ, CTA), menu constructor with PDF download, 5-step quote wizard, pricing page, gallery with lightbox, blog, FAQ, contact form, mobile bottom nav, WhatsApp FAB, dark/light theme, cookie consent, scroll-to-top, breadcrumbs, JSON-LD schema, sitemap, robots.txt.

CRITIQUE FIRMIRY on these dimensions (score each 1-10):
A. VISUAL DESIGN & BRANDING — 2026 trends compliance (glassmorphism, gradients, micro-animations, typography)
B. UX / CONVERSION — user journey, CTA placement, form UX, mobile, conversion funnels
C. TECHNICAL QUALITY — Next.js 16, performance, accessibility WCAG, SEO, Core Web Vitals
D. CONTENT & MARKETING — content quality, trust signals, social proof, blog
E. MOBILE EXPERIENCE — mobile-first, touch interactions, bottom nav, responsive
F. INNOVATION — stands out? unique features, memorable moments

Then give:
- TOTAL SCORE (weighted average)
- TOP 10 MOST IMPACTFUL fixes with EXACT code changes (which file, what to change, exact code)
- Rank by IMPACT

FORMAT: Valid JSON: {"scores":{"A":0,"B":0,"C":0,"D":0,"E":0,"F":0,"total":0},"top_fixes":[{"priority":1,"category":"A","file":"path","issue":"description","fix_code":"exact code"}],"summary_text":"text"}`;

fs.writeFileSync('/tmp/_critic_sys.txt', systemPrompt);
fs.writeFileSync('/tmp/_critic_usr.txt', userPrompt);

console.log(`Calling Critic-${criticNum}... Sys: ${systemPrompt.length}c, User: ${userPrompt.length}c`);

try {
  execSync(`z-ai chat -s "$(cat /tmp/_critic_sys.txt)" -p "$(cat /tmp/_critic_usr.txt)" -o "${outputFile}"`, {
    maxBuffer: 50 * 1024 * 1024, timeout: 180000
  });
  console.log('Saved:', outputFile);
  if (fs.existsSync(outputFile)) {
    const raw = fs.readFileSync(outputFile, 'utf-8');
    console.log('Output size:', raw.length);
    // Try to extract scores
    const scoreMatch = raw.match(/"total"\s*:\s*(\d+\.?\d*)/);
    if (scoreMatch) console.log('TOTAL SCORE:', scoreMatch[1]);
  }
} catch (e) {
  console.error('Error:', e.message?.substring(0, 500));
  if (fs.existsSync(outputFile)) {
    const raw = fs.readFileSync(outputFile, 'utf-8');
    console.log('Partial output size:', raw.length);
  }
}