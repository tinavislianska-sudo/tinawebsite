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

Tina Vislianska is a Founding Marketing Engineer. Currently Senior Developer Advocate at CogniAgent AI (AI workflow automation for SMBs, builds data pipelines via Apify, creates automation templates) and GEO Specialist at Glorium Technologies (community intelligence systems, weekly LLM source placement). Previously: Growth Tester at Principle (SF startup, LinkedIn content experiments), Brand Builder at Spell Wallet (4M+ users MPC crypto wallet, 45% engagement increase), Product Marketing at gaming platform NDA (120K pre-launch signups, viral campaign for under $10), Head of Brand Comms at Eight Forces (crypto growth agency, 70% channel growth), Partnerships Manager at Atleta Network (L1 blockchain, 10+ partners/month), Head of Communications at Bitcoin Magazine Ukraine (+130K followers, 2.4x engagement), Lead Content Marketer at WhiteBIT (largest European crypto exchange, RedDot 2023 winner, FC Barcelona promo, Forbes CEO feature). AI-native: builds with Claude Code, data-automation pipelines, custom AI skills. Master's in Mediacommunications, Ukrainian Catholic University.`
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
