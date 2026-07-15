export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 300,
        messages: [{
          role: 'user',
          content: `Summarize this person's profile for a recruiter or potential client in 3-4 punchy sentences. Be direct, specific, impressive. No fluff.

Kristina Vislianska is an AI Product Marketing & Growth Systems Lead based in Lisbon, Portugal. She helps early-stage B2B SaaS and AI companies turn customer intelligence into product decisions, positioning, and go-to-market execution.

Currently: Founding AI Growth Systems Lead at CogniAgent (built a customer intelligence system combining Reddit research, competitor monitoring, and feedback; reduced cost per lead from $15 to $3; automated 90% of repetitive workflows; increased content production capacity 80% using Claude Code and Remotion) and AI Search & Intelligence Strategist at Glorium Technologies | NikoHealth (built a GEO system spanning Reddit citation strategy, LinkedIn authority content, and AI-crawler audits for a US healthcare B2B SaaS; achieved recurring monthly citations in ChatGPT and Perplexity).

Previously: Growth Systems Advisor at Future Principle (grew a LinkedIn newsletter to 780 subscribers in its first month), independent consultant for Growth, Brand & Community (Oct 2023-Oct 2025) working with Bitcoin Magazine (rebrand adding 130K followers, 2.4x engagement), Atleta Network (built partnerships function, 10+ partners/month), and Spell Wallet (45% engagement increase, YouTube 0 to 2K+ subscribers). Lead Content Marketer, Brand Communications at WhiteBIT (contributed to a brand transformation recognized with a 2023 Red Dot Award).

Focus: AI product marketing, customer intelligence, product discovery, GTM experimentation, GEO. Technical capabilities: data & customer analytics, agentic systems & automation, generative AI & content systems, AI search & research. Languages: Ukrainian (native), English (fluent).`
        }]
      })
    });

    const data = await response.json();
    const summary = data.content[0].text;

    return new Response(JSON.stringify({ summary }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });
  }
};
