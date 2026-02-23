/*
 * Language Context — i18n System for MyWildin Studio
 * Supports: English (en) and Chinese (zh)
 * Features:
 *   - Language switching via UI toggle
 *   - Backend-controllable language enable/disable via config
 *   - Persists user preference in localStorage
 */

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type Language = "en" | "zh";

interface LanguageConfig {
  en: { enabled: boolean; label: string };
  zh: { enabled: boolean; label: string };
}

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
  config: LanguageConfig;
  availableLanguages: Language[];
}

// ═══════════════════════════════════════════════════════
// LANGUAGE CONFIG — Toggle languages on/off here
// Set `enabled: false` to hide a language from the UI
// ═══════════════════════════════════════════════════════
const LANGUAGE_CONFIG: LanguageConfig = {
  en: { enabled: true, label: "EN" },
  zh: { enabled: true, label: "中文" },
};

// ═══════════════════════════════════════════════════════
// TRANSLATIONS
// ═══════════════════════════════════════════════════════
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    "nav.engine": "The Engine",
    "nav.gtm": "GTM Strategy",
    "nav.about": "About Us",
    "nav.blog": "Blog",
    "nav.contact": "Contact",

    // Hero
    "hero.title": "Scaling Global Vision with Local AI Intelligence.",
    "hero.subtitle": "Combining cutting-edge AI interaction engines with deep US market insights, we deliver full-stack solutions for high-quality overseas businesses — avoiding blind traffic traps and building high-conversion, asset-light digital infrastructure in the US.",
    "hero.cta.explore": "Explore Our Capabilities",
    "hero.cta.contact": "Get in Touch",

    // Engine [01]
    "engine.label": "Core Module",
    "engine.title": "Multi-Agent Interaction Engine",
    "engine.intro": "Our Multi-Agent Interaction Engine is engineered for enterprise scenarios requiring nuanced human-AI collaboration. Proven in a complex 2025 deployment framework, this proprietary architecture reduces foundational development time for our clients by up to 40%.",
    "engine.cap.label": "Core Capabilities",
    "engine.cap.intro": "This production-ready engine handles:",
    "engine.cap1": "Complex NLP across multiple contextual layers",
    "engine.cap2": "Real-time coordination between 3+ AI roles with distinct personas and dedicated memory",
    "engine.cap3": "Dynamic matching based on deep behavioral patterns, not just surface preferences",
    "engine.useCases.label": "Enterprise Application Matrix",
    "engine.useCases.intro": "We modularize these validated core technologies to empower high-value enterprise pain points:",
    "engine.useCase1.title": "Intelligent Routing & Matching",
    "engine.useCase1.pain": "Pain Point: Low recruitment efficiency, high internal organizational friction.",
    "engine.useCase1.solution": "Engine Empowerment: Transform high-granularity bidirectional matching algorithms into a precise 3D collaborative matching system (talent-role-team culture), drastically reducing HR and business hub screening costs.",
    "engine.useCase2.title": "Multi-Role Customer Success",
    "engine.useCase2.pain": "Pain Point: Traditional AI customer service is flat and lacks deep business flow capability and emotional value.",
    "engine.useCase2.solution": "Engine Empowerment: Deploy multi-agent collaborative networks. Upgrade single-line Q&A to a virtual AI team composed of \"business expert + executive assistant + emotional support specialist\" for dimensional, empathetic customer interactions.",
    "engine.useCase3.title": "Dynamic Customer Stratification",
    "engine.useCase3.pain": "Pain Point: High-net-worth customer precision marketing is costly; traditional static user profiles are too shallow.",
    "engine.useCase3.solution": "Engine Empowerment: Leverage deep personality analysis and behavior prediction modules to build a real-time customer stratification engine. Capture deep behavioral logic seamlessly during natural interactions, providing enterprises with a highly conversion-optimized private domain customization marketing foundation.",
    "engine.liveDemo": "View Live Prototype — Wildin' Engine",

    // GTM Strategy [02]
    "gtm.label": "Strategic Consulting",
    "gtm.title": "Cross-Border AI Localization & GTM Strategy",
    "gtm.description": "Tailored US market entry strategies for high-margin overseas IPs, content creators, healer brands, and boutique tech companies.",
    "gtm.svc1.title": "Viability Stress Test",
    "gtm.svc1.desc": "Reject blind ToC cash burns. We provide precise Customer Acquisition Cost (CAC) calculations based on real US market traffic ecosystems.",
    "gtm.svc2.title": "AI-Powered Cost Reduction",
    "gtm.svc2.desc": "Build localized LLM-powered digital assistants and automated content translation & distribution engines tailored to the US market context.",
    "gtm.svc3.title": "Business Model Restructuring",
    "gtm.svc3.desc": "Restructure business models from consumer-focused to high-margin B2B or premium private domain strategies with sustainable unit economics.",

    // About [03]
    "about.label": "About Us",
    "about.title": "About MyWildin Studio",
    "about.p1": "We are a lean, US-based technical studio operating under 500 Little Cows LLC. Our team combines deep expertise in multi-agent AI systems with hands-on experience navigating the US market for cross-border businesses.",
    "about.p2": "We don't believe in one-size-fits-all solutions. Every engagement starts with understanding your unique position, stress-testing assumptions, and building technology that serves your actual business model — not the other way around.",
    "about.readBlog": "Read Our Thinking",

    // Contact [04]
    "contact.label": "Get Started",
    "contact.title": "Let's Build Something Together",
    "contact.description": "Whether you need a multi-agent system built from scratch, a US market entry strategy, or both — we're ready to talk.",
    
    // Success Cases [GTM Strategy]
    "gtm.cases.label": "Success Cases",
    "gtm.case1.client": "Asian Content Creator Network",
    "gtm.case1.industry": "Content & IP",
    "gtm.case1.challenge": "Struggling with 8x CAC in US consumer market; burning $50k/month with no clear path to profitability.",
    "gtm.case1.solution": "Pivoted to high-ticket B2B licensing model + AI-powered content localization engine.",
    "gtm.case1.result": "Reduced CAC by 70%, achieved profitability within 4 months, 3x revenue increase YoY.",
    "gtm.case1.quote": "We were about to shut down. The GTM pivot saved our business.",
    "gtm.case1.author": "Founder, Content Network",
    
    "gtm.case2.client": "AI Wellness Platform",
    "gtm.case2.industry": "Wellness Tech",
    "gtm.case2.challenge": "High-quality product but no differentiation in crowded US wellness market; CAC math didn't work.",
    "gtm.case2.solution": "Repositioned as enterprise B2B wellness solution for corporate wellness programs + AI localization for compliance.",
    "gtm.case2.result": "Landed 5 enterprise contracts worth $2M ARR in 6 months; 40% gross margin.",
    "gtm.case2.quote": "The stress test revealed our real market was B2B all along. Game changer.",
    "gtm.case2.author": "CEO, Wellness Platform",
    
    "gtm.case3.client": "Cross-Border SaaS Startup",
    "gtm.case3.industry": "SaaS",
    "gtm.case3.challenge": "Launched in US, spent $200k on paid ads with 15% CAC payback period; unsustainable.",
    "gtm.case3.solution": "Implemented viability stress test, identified niche vertical, built AI-powered sales automation.",
    "gtm.case3.result": "Reduced CAC to 8 months payback, 3x conversion rate improvement, $500k MRR in 12 months.",
    "gtm.case3.quote": "The data-driven approach gave us confidence to scale. No more guessing.",
    "gtm.case3.author": "VP Growth, SaaS Startup",
    
    // Contact email
    "contact.email": "info@mywildin.com",

    // Blog
    "blog.tagline": "Insights",
    "blog.title": "From the Studio",
    "blog.description": "Technical deep-dives, market analysis, and strategic thinking from the MyWildin team.",
    "blog.viewAll": "View All Posts",
    "blog.backToStudio": "Back to Studio",
    "blog.allWritings": "All Posts",
    "blog.readMore": "Read More",
    "blog.notFound": "Post Not Found",
    "blog.backToWritings": "Back to Posts",

    // Blog posts
    "post.manifesto.category": "Manifesto",
    "post.manifesto.title": "Why We Build Multi-Agent Systems",
    "post.manifesto.subtitle": "A Technical Manifesto for MyWildin Studio",
    "post.manifesto.excerpt": "In a world of single-purpose chatbots, we chose a different path — building orchestrated multi-agent systems that solve real business problems.",
    "post.manifesto.date": "February 2026",
    "post.manifesto.readTime": "8 min read",

    "post.fatePhilosophy.category": "Strategy",
    "post.fatePhilosophy.title": "The US Market Trap: Why Most Cross-Border AI Startups Fail",
    "post.fatePhilosophy.subtitle": "On CAC, Localization, and the ToB Pivot",
    "post.fatePhilosophy.excerpt": "Most cross-border startups burn cash chasing US consumers. We break down why the ToB pivot is almost always the smarter play.",
    "post.fatePhilosophy.date": "February 2026",
    "post.fatePhilosophy.readTime": "12 min read",

    // Blog post content - Manifesto
    "post.manifesto.p1": "In a world of single-purpose chatbots, we chose a different path.",
    "post.manifesto.p2": "Most AI companies ship a wrapper around GPT and call it a product. We asked a harder question: what happens when multiple AI agents need to collaborate, maintain independent memory, and serve different user intents simultaneously?",
    "post.manifesto.p3": "MyWildin Studio was born from building the answer. Our Multi-Agent Interaction Engine isn't a theoretical framework — it's a production-tested system that emerged from real product development.",
    "post.manifesto.p4": "The core insight is simple: complex business problems require complex AI architectures. A customer service system that truly understands context needs agents that specialize, remember, and coordinate. An HR matching platform needs agents that profile deeply, not just keyword-match.",
    "post.manifesto.p5": "We built the Wildin' Engine as our proof of concept — a multi-agent social engine that demonstrates what's possible when AI agents have personality, memory, and the ability to collaborate. It's live, it's testable, and it's the foundation for everything we build for clients.",
    "post.manifesto.p6": "Our approach is deliberately different from the 'move fast and break things' mentality. We stress-test architectures before deployment. We build for maintainability, not just demos. We optimize for business outcomes, not vanity metrics.",
    "post.manifesto.p7": "This is hard work. Multi-agent systems are inherently more complex than single-agent solutions. But complexity, when properly managed, is a moat.",
    "post.manifesto.p8": "If you're building something that requires more than a chatbot, we should talk.",

    // Blog post content - GTM Strategy
    "post.fatePhilosophy.p1": "Most cross-border startups burn cash chasing US consumers. Here's why that almost never works.",
    "post.fatePhilosophy.p2": "The dream is always the same: build an app in Asia, launch it in the US, acquire millions of users, and ride the wave to a Series A. The reality is brutal — US consumer acquisition costs have skyrocketed, and the market is saturated with well-funded competitors.",
    "post.fatePhilosophy.p3": "We've seen this pattern dozens of times. A team with genuine technical talent and a solid product burns through their runway trying to crack US consumer markets. The CAC math never works out because they're competing against companies with 10x their budget.",
    "post.fatePhilosophy.p4": "The fundamental mistake is treating the US market as a scaled-up version of their home market. It's not. The traffic ecosystems are different. The payment infrastructure is different. The user expectations are different. And most critically, the competitive landscape is different.",
    "post.fatePhilosophy.p5": "So what's the alternative? Three principles guide our GTM strategy work:",
    "post.fatePhilosophy.p6": "First, start with ToB, not ToC. High-ticket B2B or high-net-worth private domain plays have fundamentally better unit economics. You need fewer customers, each worth more, and the sales cycle — while longer — is more predictable.",
    "post.fatePhilosophy.p7": "Second, use AI to compress localization costs. The biggest expense for cross-border companies isn't technology — it's localization. Content, customer support, marketing copy, legal compliance. LLM-powered automation can reduce these costs by 60-80% while maintaining quality.",
    "post.fatePhilosophy.p8": "Third, stress-test before you scale. We run what we call a 'viability stress test' — calculating real CAC based on actual US traffic data, modeling conversion funnels with realistic assumptions, and identifying the minimum viable revenue to sustain operations.",
    "post.fatePhilosophy.p9": "The companies that succeed in cross-border AI aren't the ones with the best technology. They're the ones with the clearest understanding of their target market's economics.",
    "post.fatePhilosophy.p10": "If you're planning a US market entry, let's stress-test your assumptions before you spend your first dollar.",

    // Footer
    "footer.copyright": "© 2026 500 Little Cows LLC. All rights reserved.",
    "footer.privacy": "Privacy",
    "footer.terms": "Terms",
    "footer.backToStudio": "Back to MyWildin Studio",
  },
  zh: {
    // Navigation
    "nav.engine": "技术引擎",
    "nav.gtm": "出海战略",
    "nav.about": "关于我们",
    "nav.blog": "博客",
    "nav.contact": "联系合作",

    // Hero
    "hero.title": "用本土 AI 智能放大全球愿景",
    "hero.subtitle": "结合前沿的 AI 交互引擎与深度的美国本土洞察，我们为海外优质商业生态提供全栈式解决方案——规避盲目的流量陷阱，打造高转化、轻资产的美国本土数字化底座。",
    "hero.cta.explore": "探索我们的能力",
    "hero.cta.contact": "联系我们",

    // Engine [01]
    "engine.label": "核心板块",
    "engine.title": "多智能体交互引擎",
    "engine.intro": "我们的多智能体交互引擎专为需要细腻“人机协作”的复杂商业场景而设计。该底层通信与匹配框架已在2025年的高标准项目中完成压力测试（以90%的核心完成度通过验证），能够为企业客户节省高达40%的底层开发周期，实现业务架构的快速冷启动。",
    "engine.cap.label": "核心技术能力",
    "engine.cap.intro": "这套可即时投产的引擎专门处理以下复杂任务：",
    "engine.cap1": "跨多层语境的复杂自然语言解析",
    "engine.cap2": "3个以上具备独立人格与专属记忆的AI角色实时协同",
    "engine.cap3": "基于深度行为模式的动态匹配，而非仅停留在表层标签偏好",
    "engine.useCases.label": "企业级应用场景矩阵",
    "engine.useCases.intro": "我们将这些经过验证的底层技术，模块化地赋能于高附加值的企业级痛点：",
    "engine.useCase1.title": "高维智能匹配引擎",
    "engine.useCase1.pain": "解决痛点：企业招聘筛选效率低下、内部组织匹配摩擦成本极高。",
    "engine.useCase1.solution": "引擎赋能：转化原有的高颗粒度双向匹配算法，构建精准的“人才-岗位-团队文化”三维协同匹配系统，大幅降低人力资源与业务中枢的筛选成本。",
    "engine.useCase2.title": "矩阵式协同客服系统",
    "engine.useCase2.pain": "解决痛点：传统AI客服响应扁平单一，缺乏深度业务流转能力与情绪价值。",
    "engine.useCase2.solution": "引擎赋能：部署多Agent协同网络。将单线问答升级为由“业务专家 + 执行助理 + 情绪安抚专员”组成的虚拟AI团队，实现立体的、有温度的客户服务交互。",
    "engine.useCase3.title": "动态客户分层与洞察",
    "engine.useCase3.pain": "解决痛点：高净值客户精准营销成本高昂，传统静态用户画像过于单薄。",
    "engine.useCase3.solution": "引擎赋能：利用深度的性格分析与行为预测模块，打造实时的客户分层引擎。在自然交互中无感捕获深度行为逻辑，为企业提供极高转化率的私域定制化营销底座。",
    "engine.liveDemo": "查看在线原型 — Wildin' Engine",

    // GTM Strategy [02]
    "gtm.label": "战略咨询",
    "gtm.title": "跨境 AI 本土化与 GTM 战略",
    "gtm.description": "专为海外高毛利 IP、内容创作者、疗愈师品牌及精品科技企业量身定制的美国市场进入策略。",
    "gtm.svc1.title": "商业可行性压力测试",
    "gtm.svc1.desc": "拒绝盲目烧钱的 ToC 陷阱。提供基于真实美国市场流量生态的获客成本 (CAC) 精确测算。",
    "gtm.svc2.title": "AI 赋能降本增效",
    "gtm.svc2.desc": "利用本地化大模型搭建符合美国本土语境的数字助理与自动化内容翻译分发引擎。",
    "gtm.svc3.title": "商业模式重构",
    "gtm.svc3.desc": "从消费者导向重构为高毛利 B2B 或高端私域模式，建立可持续的单位经济学。",

    // About [03]
    "about.label": "关于我们",
    "about.title": "关于 MyWildin Studio",
    "about.p1": "我们是一家精干的美国本土技术工作室，运营主体为 500 Little Cows LLC。团队兼具多智能体 AI 系统的深度技术专长，以及为跨境企业导航美国市场的实战经验。",
    "about.p2": "我们不相信一刀切的解决方案。每一次合作都从理解你的独特定位开始，压力测试假设，构建真正服务于你商业模式的技术——而不是反过来。",
    "about.readBlog": "阅读我们的思考",

    // Contact [04]
    "contact.label": "开始合作",
    "contact.title": "一起构建些什么",
    "contact.description": "无论你需要从零构建多智能体系统、制定美国市场进入策略，还是两者兼具——我们随时准备好对话。",
    
    // Success Cases [GTM Strategy]
    "gtm.cases.label": "成功案例",
    "gtm.case1.client": "亚洲内容创作者网络",
    "gtm.case1.industry": "内容与 IP",
    "gtm.case1.challenge": "美国消费市场 CAC 达 8 倍；每月烧 $50k，无盈利路径。",
    "gtm.case1.solution": "转向高客单价 B2B 授权模式 + AI 驱动的内容本土化引擎。",
    "gtm.case1.result": "CAC 降低 70%，4 个月内实现盈利，年同比收入增长 3 倍。",
    "gtm.case1.quote": "我们快要关门了。GTM 转型救了我们。",
    "gtm.case1.author": "创始人，内容网络",
    
    "gtm.case2.client": "AI 身心灵平台",
    "gtm.case2.industry": "身心灵科技",
    "gtm.case2.challenge": "产品质量高但在拥挤的美国市场无差异化；CAC 数学不成立。",
    "gtm.case2.solution": "重新定位为企业级 B2B 身心灵解决方案 + AI 本土化合规引擎。",
    "gtm.case2.result": "6 个月内签约 5 个企业客户，年合同价值 $2M；毛利率 40%。",
    "gtm.case2.quote": "压力测试揭示了我们真正的市场是 B2B。改变了一切。",
    "gtm.case2.author": "CEO，身心灵平台",
    
    "gtm.case3.client": "跨境 SaaS 创业公司",
    "gtm.case3.industry": "SaaS",
    "gtm.case3.challenge": "在美国上线，投入 $200k 做付费广告，CAC 回本周期 15 个月；不可持续。",
    "gtm.case3.solution": "执行可行性压力测试，识别细分垂直市场，构建 AI 驱动的销售自动化。",
    "gtm.case3.result": "CAC 回本周期降至 8 个月，转化率提升 3 倍，12 个月内达 $500k MRR。",
    "gtm.case3.quote": "数据驱动的方法给了我们信心去规模化。不再是猜测。",
    "gtm.case3.author": "增长副总裁，SaaS 创业公司",
    
    // Contact email
    "contact.email": "info@mywildin.com",

    // Blog
    "blog.tagline": "洞察",
    "blog.title": "来自工作室",
    "blog.description": "来自 MyWildin 团队的技术深度分析、市场洞察与战略思考。",
    "blog.viewAll": "查看全部文章",
    "blog.backToStudio": "返回工作室",
    "blog.allWritings": "全部文章",
    "blog.readMore": "阅读更多",
    "blog.notFound": "文章未找到",
    "blog.backToWritings": "返回文章列表",

    // Blog posts
    "post.manifesto.category": "宣言",
    "post.manifesto.title": "为什么我们构建多智能体系统",
    "post.manifesto.subtitle": "MyWildin Studio 技术宣言",
    "post.manifesto.excerpt": "在一个充斥着单一用途聊天机器人的世界里，我们选择了一条不同的路——构建能解决真实业务问题的协调式多智能体系统。",
    "post.manifesto.date": "2026 年 2 月",
    "post.manifesto.readTime": "阅读约 8 分钟",

    "post.fatePhilosophy.category": "战略",
    "post.fatePhilosophy.title": "美国市场陷阱：为什么大多数跨境 AI 创业公司会失败",
    "post.fatePhilosophy.subtitle": "关于 CAC、本土化与 ToB 转型",
    "post.fatePhilosophy.excerpt": "大多数跨境创业公司烧钱追逐美国消费者。我们拆解为什么 ToB 转型几乎总是更聪明的选择。",
    "post.fatePhilosophy.date": "2026 年 2 月",
    "post.fatePhilosophy.readTime": "阅读约 12 分钟",

    // Blog post content - Manifesto
    "post.manifesto.p1": "在一个充斥着单一用途聊天机器人的世界里，我们选择了一条不同的路。",
    "post.manifesto.p2": "大多数 AI 公司给 GPT 套个壳就称之为产品。我们问了一个更难的问题：当多个 AI 智能体需要协作、维护独立记忆、同时服务不同用户意图时，会发生什么？",
    "post.manifesto.p3": "MyWildin Studio 就诞生于构建这个答案的过程中。我们的多智能体交互引擎不是一个理论框架——它是从真实产品开发中锤炼出来的、经过生产环境验证的系统。",
    "post.manifesto.p4": "核心洞察很简单：复杂的业务问题需要复杂的 AI 架构。一个真正理解上下文的客服系统需要专业化、有记忆、能协调的智能体。一个人力资源匹配平台需要能深度画像的智能体，而不仅仅是关键词匹配。",
    "post.manifesto.p5": "我们构建了 Wildin' Engine 作为概念验证——一个多智能体社交引擎，展示了当 AI 智能体拥有个性、记忆和协作能力时的可能性。它已上线、可测试，也是我们为客户构建一切的基础。",
    "post.manifesto.p6": "我们的方法刻意区别于「快速行动，打破常规」的心态。我们在部署前压力测试架构。我们为可维护性而构建，而不仅仅是为了演示。我们为业务成果优化，而不是虚荣指标。",
    "post.manifesto.p7": "这是艰难的工作。多智能体系统天生比单智能体方案更复杂。但复杂性，当被妥善管理时，就是护城河。",
    "post.manifesto.p8": "如果你正在构建的东西需要的不仅仅是一个聊天机器人，我们应该谈谈。",

    // Blog post content - GTM Strategy
    "post.fatePhilosophy.p1": "大多数跨境创业公司烧钱追逐美国消费者。以下是为什么这几乎从来不奏效。",
    "post.fatePhilosophy.p2": "梦想总是一样的：在亚洲做一个 App，在美国上线，获取数百万用户，然后乘着浪潮拿到 A 轮。现实是残酷的——美国消费者获取成本已经飙升，市场上充斥着资金充裕的竞争对手。",
    "post.fatePhilosophy.p3": "我们见过这种模式无数次。一个拥有真正技术实力和扎实产品的团队，把跑道烧在了试图攻克美国消费市场上。CAC 的数学永远算不过来，因为他们在和预算是自己 10 倍的公司竞争。",
    "post.fatePhilosophy.p4": "根本性的错误在于把美国市场当作本土市场的放大版。它不是。流量生态不同。支付基础设施不同。用户期望不同。最关键的是，竞争格局完全不同。",
    "post.fatePhilosophy.p5": "那替代方案是什么？三个原则指导我们的 GTM 战略工作：",
    "post.fatePhilosophy.p6": "第一，从 ToB 开始，而不是 ToC。高客单价的 B2B 或高净值私域打法有根本性更好的单位经济学。你需要更少的客户，每个客户价值更高，销售周期虽然更长，但更可预测。",
    "post.fatePhilosophy.p7": "第二，用 AI 压缩本土化成本。跨境公司最大的开支不是技术——是本土化。内容、客户支持、营销文案、法律合规。LLM 驱动的自动化可以在保持质量的同时将这些成本降低 60-80%。",
    "post.fatePhilosophy.p8": "第三，先压力测试，再规模化。我们运行所谓的「可行性压力测试」——基于真实美国流量数据计算实际 CAC，用现实假设建模转化漏斗，识别维持运营的最低可行收入。",
    "post.fatePhilosophy.p9": "在跨境 AI 领域成功的公司不是技术最好的那些。而是对目标市场经济学理解最清晰的那些。",
    "post.fatePhilosophy.p10": "如果你正在规划美国市场进入，让我们在你花第一美元之前先压力测试你的假设。",

    // Footer
    "footer.copyright": "© 2026 500 Little Cows LLC. 保留所有权利。",
    "footer.privacy": "隐私政策",
    "footer.terms": "服务条款",
    "footer.backToStudio": "返回 MyWildin Studio",
  },
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const availableLanguages = (Object.keys(LANGUAGE_CONFIG) as Language[]).filter(
    (key) => LANGUAGE_CONFIG[key].enabled
  );

  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem("wildin-lang") as Language | null;
    if (saved && availableLanguages.includes(saved)) return saved;
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith("zh") && availableLanguages.includes("zh")) return "zh";
    return availableLanguages[0] || "en";
  });

  const setLang = (newLang: Language) => {
    if (availableLanguages.includes(newLang)) {
      setLangState(newLang);
      localStorage.setItem("wildin-lang", newLang);
    }
  };

  useEffect(() => {
    if (!availableLanguages.includes(lang)) {
      setLangState(availableLanguages[0] || "en");
    }
  }, [availableLanguages, lang]);

  const t = (key: string): string => {
    return translations[lang]?.[key] || translations.en?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, config: LANGUAGE_CONFIG, availableLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
