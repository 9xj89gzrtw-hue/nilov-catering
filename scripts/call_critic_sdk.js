const fs = require('fs');
const ZAI = require('z-ai-web-dev-sdk').default;

async function callCritic(criticNum, outputFile) {
  const zai = await ZAI.create();
  
  const systemPrompt = `You are CRITIC-${criticNum}, an expert web design & UX auditor specializing in catering/food-service websites. You have deep knowledge of July 2026 web trends from actual internet research. You are EXTREMELY strict and thorough. Score from 1-10 where 10 = perfect. You MUST provide SPECIFIC, ACTIONABLE fixes with exact code snippets. Respond in valid JSON only with keys: scores (object with A,B,C,D,E,F,total as numbers), top_fixes (array of {priority:number, category:string, file:string, issue:string, fix_code:string}), summary_text (string). Respond in RUSSIAN for issue and summary_text, but keep JSON keys and code in English.`;

  const trends = fs.readFileSync('/tmp/trends_compiled.txt', 'utf-8');
  const source = fs.readFileSync('/tmp/site_source_full.txt', 'utf-8');

  const userPrompt = `===2026 WEB & CATERING TRENDS (from live internet search)===
${trends}

===FULL SITE SOURCE CODE (8269 lines)===
${source}

You are reviewing a Russian catering website (odaeda.ru): Next.js 16, Tailwind CSS 4, Framer Motion, shadcn/ui, base-ui.
Features: 11-section homepage (Hero video, TrustMarquee, Services, WhyUs, Stats, MenuPreview, Testimonials, Gallery, Blog, FAQ, CTA), menu constructor + PDF download, 5-step quote wizard, pricing, gallery with lightbox, blog, FAQ, contact, mobile bottom nav, WhatsApp FAB, dark/light theme, cookie consent, scroll-to-top, breadcrumbs, JSON-LD, sitemap, robots.txt.

Score each dimension 1-10:
A. VISUAL DESIGN & BRANDING (2026 trends: glassmorphism, gradients, micro-animations, typography)
B. UX / CONVERSION (user journey, CTAs, form UX, mobile, funnels)
C. TECHNICAL (Next.js 16, performance, WCAG, SEO, Core Web Vitals)
D. CONTENT & MARKETING (quality, trust signals, social proof, blog)
E. MOBILE (mobile-first, touch, bottom nav, responsive)
F. INNOVATION (stands out? unique features, memorable moments)

Give TOTAL SCORE (weighted: A=20%, B=25%, C=15%, D=15%, E=15%, F=10%) and TOP 10 fixes with EXACT code changes (file path + what to replace + exact new code). Rank by impact.

RESPOND WITH VALID JSON ONLY. No markdown fences, no commentary outside JSON.`;

  console.log(`Critic-${criticNum}: sending ${userPrompt.length} chars to external LLM...`);
  
  const completion = await zai.chat.completions.create({
    messages: [
      { role: 'assistant', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ],
    thinking: { type: 'disabled' }
  });

  const response = completion.choices[0]?.message?.content;
  if (!response) throw new Error('Empty response');
  
  fs.writeFileSync(outputFile, response);
  console.log(`Critic-${criticNum}: saved ${response.length} chars to ${outputFile}`);
  
  // Extract total score
  const scoreMatch = response.match(/"total"\s*:\s*([\d.]+)/);
  if (scoreMatch) console.log(`Critic-${criticNum} TOTAL SCORE: ${scoreMatch[1]}`);
  
  return response;
}

const criticNum = process.argv[2] || '1';
const outputFile = process.argv[3] || `/home/z/my-project/download/critic${criticNum}_review.json`;

callCritic(criticNum, outputFile).catch(e => {
  console.error('Fatal:', e.message);
  process.exit(1);
});