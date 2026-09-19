/**
 * Curated high-retention sample videos with timestamped Whisper transcripts
 * Allows immediate, zero-friction testing for any user.
 */

export const SAMPLE_VIDEOS = [
  {
    id: 'sample-ai-future',
    title: 'The Unfiltered Truth About Autonomous AI Agents',
    category: 'Tech & AI Podcast',
    duration: 165, // 2m 45s
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    description: 'Silicon Valley founder breaks down why single LLM chats are dying and multi-agent workflows are replacing software companies.',
    transcript: {
      segments: [
        { id: 1, start: 0.0, end: 4.8, text: "Nobody talks about this, but single LLM prompts are completely dead." },
        { id: 2, start: 4.8, end: 11.2, text: "If your business model is just wrapping a chatbot with a nice UI, you will be out of business in six months." },
        { id: 3, start: 11.2, end: 18.5, text: "What we're seeing right now with autonomous multi-agent swarms is a total transformation of software engineering." },
        { id: 4, start: 18.5, end: 25.1, text: "One agent writes the test suite. A second agent generates the implementation. A third reviews the security vulnerabilities." },
        { id: 5, start: 25.1, end: 32.4, text: "They run continuously in an asynchronous feedback loop until every unit test passes with zero human intervention." },
        { id: 6, start: 32.4, end: 39.8, text: "The secret is decoupling the reasoning agent from the execution runtime. That's where 90% of developers fail." },
        { id: 7, start: 39.8, end: 46.2, text: "They try to make one massive prompt do everything, and the context window turns into complete hallucination soup." },
        { id: 8, start: 46.2, end: 54.0, text: "Instead, give each subagent a single hyper-specific objective, a clean scratchpad, and specialized tool schemas." },
        { id: 9, start: 54.0, end: 61.5, text: "When we deployed this architecture last quarter, our team shipped an entire production SaaS in four days." },
        { id: 10, start: 61.5, end: 68.2, text: "This is insane because previously that took a team of eight senior engineers three whole months." },
        { id: 11, start: 68.2, end: 76.0, text: "Stop treating AI like a smart Google search. Treat it like an army of specialized junior engineers that never sleep." },
        { id: 12, start: 76.0, end: 84.5, text: "The winners of this decade won't be the people who know how to write code, but the people who know how to orchestrate systems." },
        { id: 13, start: 84.5, end: 93.0, text: "If you want to survive, here are three steps you can implement before this Friday afternoon." },
        { id: 14, start: 93.0, end: 101.2, text: "Step one: Audit every repetitive task in your engineering backlog and identify anything with deterministic verification." },
        { id: 15, start: 101.2, end: 110.0, text: "Step two: Build a strict schema contract between your planning agent and your execution tools." },
        { id: 16, start: 110.0, end: 118.5, text: "Step three: Introduce an adversarial critic agent whose only job is to break the code before deployment." },
        { id: 17, start: 118.5, end: 128.0, text: "The biggest mistake is waiting for perfect frontier models. The frontier is already here—you just need the right harness." },
      ]
    }
  },
  {
    id: 'sample-business-psych',
    title: 'The Counter-Intuitive Pricing Hack That Doubled Revenue',
    category: 'Business & Psychology',
    duration: 140,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
    description: 'Behavioral economics breakdown of why removing options increases purchase rates by over 200%.',
    transcript: {
      segments: [
        { id: 1, start: 0.0, end: 5.2, text: "I was completely wrong about pricing psychology for the first five years of building companies." },
        { id: 2, start: 5.2, end: 12.0, text: "We offered five different tiers: Bronze, Silver, Gold, Platinum, and Enterprise. We thought more choices equaled more sales." },
        { id: 3, start: 12.0, end: 19.5, text: "Conversion was hovering around 1.8%. Customers would visit the pricing page and drop off in droves." },
        { id: 4, start: 19.5, end: 27.0, text: "Then we ran a radical experiment: we killed four of the five plans and presented only ONE price point with a decoy anchor." },
        { id: 5, start: 27.0, end: 34.2, text: "Our conversion rate immediately jumped from 1.8% to 4.9% literally overnight. It was wild." },
        { id: 6, start: 34.2, end: 42.0, text: "The secret is cognitive load. When you give someone three similar choices, you force them to make a calculation." },
        { id: 7, start: 42.0, end: 50.1, text: "When you force a brain to calculate, the default emotional response is hesitation, and hesitation is the death of conversion." },
        { id: 8, start: 50.1, end: 59.0, text: "Make the decision binary: either they want the transformation or they stay where they are." },
        { id: 9, start: 59.0, end: 68.0, text: "If you want to double your revenue this quarter without spending an extra dollar on ads, simplify your pricing page." },
      ]
    }
  },
  {
    id: 'sample-creator-virality',
    title: 'How The Top 0.1% Editors Hook You in 2.8 Seconds',
    category: 'Creator Strategy',
    duration: 150,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80',
    description: 'Frame-by-frame analysis of TikTok & YouTube Shorts hooks that retain 90%+ of first-time viewers.',
    transcript: {
      segments: [
        { id: 1, start: 0.0, end: 4.5, text: "The secret to 10 million views isn't your camera, your lighting, or your sound effects." },
        { id: 2, start: 4.5, end: 10.8, text: "It is the exact three words you say before frame 90. If frame 90 passes without tension, they swipe." },
        { id: 3, start: 10.8, end: 18.2, text: "Notice how every viral creator opens with an unresolved claim: 'Never do this' or 'They lied about this'." },
        { id: 4, start: 18.2, end: 26.0, text: "Next comes the kinetic caption: dynamic bold typography that highlights each active syllable as it's spoken." },
        { id: 5, start: 26.0, end: 34.5, text: "Combine that with intelligent 9:16 vertical reframing that tracks the speaker's face, and you have viral gold." },
        { id: 6, start: 34.5, end: 43.0, text: "This entire pipeline used to cost $500 an hour at a post-production studio. Now AI does it in seconds." },
      ]
    }
  }
];
