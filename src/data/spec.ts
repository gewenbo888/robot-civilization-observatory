// Canonical CIVTECH platforms spec — consumed by all 11 sites.
// Style: cinematic 2035-product. Each platform: id, slug, name, hue, pulse, oneLine, body, modules, tagline, sampleData, kind.

export type Bilingual = { en: string; zh: string };

export type Module = {
  id: string;
  name: Bilingual;
  body: Bilingual;
};

export type Platform = {
  id: string;
  slug: string;
  name: Bilingual;
  oneLine: Bilingual;
  body: Bilingual;
  hue: string;        // primary accent
  hue2: string;       // gradient pair
  glyph: string;
  tagline: Bilingual; // 4-word product tagline
  modules: Module[];
  // Interactive demo type
  kind: "lab" | "atlas" | "matgrid" | "tree" | "qubit" | "agents" | "energy" | "fleet" | "bci" | "recursion";
  sampleData: any;
};

export const PLATFORMS: Platform[] = [
  // ────────────────────────────────────────────────────────────────────
  {
    id: "ai-scientist-lab", slug: "ai-scientist-lab",
    name: { en: "AI Scientist Lab", zh: "AI 科学家实验室" },
    oneLine: { en: "An always-on lab where AI agents propose, run, and report on scientific experiments — open notebook, live ticker.", zh: "一所永远开着的实验室——AI 代理提出、运行、汇报科学实验。开放笔记本，实时滚动。" },
    body: {
      en: "AI Scientist Lab is the live notebook of an always-on team of agentic researchers. Each agent picks a question, designs an experiment within its tooling budget, runs it, writes up the result, and posts to the ticker. Failures are first-class citizens; null results are reported with the same prominence as positive ones. The platform is for human researchers who want to delegate the long tail of derivative experiments — and stay in the loop without micromanaging.\n\nUnder the hood: each agent is a budgeted policy with access to a limited toolset (Python compute, literature search, narrow lab APIs). The ledger is append-only; every published claim links to its run. The point is not to replace scientists — it is to expand the experimental surface area by 100×.",
      zh: "AI Scientist Lab 是一支始终在线的代理研究员团队的实时笔记本。每个代理挑一个问题，在工具预算内设计实验、运行、写下结果、发布到滚动条。失败是头等公民——空结果与阳性结果同等显要。该平台面向希望把『派生实验的长尾』委托出去、又想留在环路里且不必逐项过问的研究者。\n\n底层：每个代理是一份带预算的策略，访问有限工具集（Python 计算、文献检索、窄域实验 API）。账簿仅追加；每一发表论断皆链至其运行。其要点不是取代科学家——是把可做的实验面扩到一百倍。",
    },
    hue: "#7eb0a4", hue2: "#3a6e62", glyph: "Σ",
    tagline: { en: "always-on agentic research", zh: "永远在线的代理研究" },
    modules: [
      { id: "agent-roster",  name: { en: "Agent roster",        zh: "代理名册" },     body: { en: "Each agent has a focus area, budget, and recent success rate.",                  zh: "每个代理有专攻领域、预算与近期成功率。" } },
      { id: "experiment-q",  name: { en: "Experiment queue",    zh: "实验队列" },     body: { en: "Live FIFO of pending → running → posted.",                                       zh: "实时 FIFO：待办 → 进行中 → 已发布。" } },
      { id: "ledger",        name: { en: "Result ledger",       zh: "结果账簿" },     body: { en: "Append-only; every claim links to its run, code, data.",                         zh: "仅追加——每一论断链至其运行、代码、数据。" } },
      { id: "human-loop",    name: { en: "Human-in-loop",       zh: "人在环路" },     body: { en: "Reviewers can flag, dispute, or fork any run.",                                  zh: "审核者可标记、质疑、或 fork 任何运行。" } },
      { id: "discovery",     name: { en: "Discovery digest",    zh: "发现摘要" },     body: { en: "Daily auto-summary of what changed in your field.",                              zh: "你领域内变化的每日自动摘要。" } },
    ],
    kind: "lab",
    sampleData: {
      experiments: [
        { id: "ex-9821", agent: "Curie-7",   field: "biochem", title: { en: "Test 14 lithium-binding ligands for selectivity drift", zh: "测试 14 种锂结合配体的选择性漂移" }, status: "running", eta: "2h 14m", budget: 0.42 },
        { id: "ex-9820", agent: "Faraday-3", field: "energy",  title: { en: "Sweep solid-state cell impedance vs cycle # at 80°C",   zh: "扫描固态电池在 80°C 下的阻抗 vs 循环数" }, status: "running", eta: "47m",   budget: 0.18 },
        { id: "ex-9819", agent: "Hopper-4",  field: "compute", title: { en: "Reproduce mixture-of-depths claim on 800M model",       zh: "在 800M 模型上复现 mixture-of-depths 论断" }, status: "posted",  eta: "—",     budget: 0.31 },
        { id: "ex-9818", agent: "Marie-2",   field: "biochem", title: { en: "Negative result: triclosan-resistance correlate failed validation", zh: "阴性结果：三氯生耐药相关性未通过验证" }, status: "posted",  eta: "—",     budget: 0.09 },
        { id: "ex-9817", agent: "Tesla-1",   field: "energy",  title: { en: "Phase-change cooling for 2kW edge GPU rack",           zh: "面向 2kW 边缘 GPU 机架的相变冷却" }, status: "queued",  eta: "—",     budget: 0.50 },
        { id: "ex-9816", agent: "Curie-7",   field: "biochem", title: { en: "Synthesize and assay 6 macrocyclic Pd complexes",       zh: "合成并检测 6 种大环钯配合物" }, status: "queued",  eta: "—",     budget: 0.66 },
        { id: "ex-9815", agent: "Hopper-4",  field: "compute", title: { en: "FLOP-equivalence test: rotary vs ALiBi at 4k context",  zh: "FLOP 等效测试：4k 上下文下旋转位置 vs ALiBi" }, status: "running", eta: "1h 03m", budget: 0.22 },
        { id: "ex-9814", agent: "Faraday-3", field: "energy",  title: { en: "Electrolyzer membrane lifetime under cycled humidity", zh: "湿度循环下电解槽膜的寿命" }, status: "queued",  eta: "—",     budget: 0.38 },
      ],
      agents: [
        { id: "Curie-7",   field: "biochem",  budget_left: 0.34, success: 0.41 },
        { id: "Faraday-3", field: "energy",   budget_left: 0.61, success: 0.52 },
        { id: "Hopper-4",  field: "compute",  budget_left: 0.18, success: 0.66 },
        { id: "Marie-2",   field: "biochem",  budget_left: 0.92, success: 0.28 },
        { id: "Tesla-1",   field: "energy",   budget_left: 0.05, success: 0.49 },
      ],
    },
  },

  // ────────────────────────────────────────────────────────────────────
  {
    id: "chip-war-atlas", slug: "chip-war-atlas",
    name: { en: "Chip War Atlas", zh: "芯片战争地图" },
    oneLine: { en: "Live geopolitical map of the global semiconductor stack — fabs, materials, equipment, embargoes, dependencies.", zh: "全球半导体堆栈的实时地缘地图——晶圆厂、材料、设备、禁运、依赖。" },
    body: {
      en: "Modern computation rests on a stack so concentrated it should be a security agency's first PowerPoint. ASML in Veldhoven; TSMC in Hsinchu; pure-grade gallium in Yunnan; photoresist in Shizuoka; HBM in Icheon; advanced packaging in Tainan. Chip War Atlas is one map across all of it — every layer of the stack, every chokepoint country, every sanction event timestamped.\n\nFor founders: where to source. For policymakers: where to harden. For everyone else: where the next outage actually starts.",
      zh: "现代计算建立在一个集中得让任何安全机构都该把它作为首张 PPT 的栈之上。ASML 在费尔德霍芬，台积电在新竹，高纯镓在云南，光刻胶在静冈，HBM 在利川，先进封装在台南。Chip War Atlas 是横跨这一切的一张地图——栈的每一层、每个咽喉国家、每一项制裁事件，都有时间戳。\n\n对创业者：从哪买。对政策制定者：哪要加固。对其他人：下一次中断从哪开始。",
    },
    hue: "#bd5d2c", hue2: "#7a341c", glyph: "▣",
    tagline: { en: "the stack, mapped", zh: "栈，已绘成图" },
    modules: [
      { id: "stack-layers", name: { en: "Stack layers",         zh: "栈分层" },        body: { en: "Materials → wafers → fabrication → packaging → systems.",                   zh: "材料 → 晶圆 → 制造 → 封装 → 系统。" } },
      { id: "country-leverage", name: { en: "Country leverage", zh: "国家杠杆" },     body: { en: "Per-country share of every layer; weighted criticality score.",              zh: "每国在每层的份额；加权临界性评分。" } },
      { id: "events",       name: { en: "Sanctions ledger",     zh: "制裁账簿" },     body: { en: "Timestamped embargoes, export-control changes, license rejections.",        zh: "带时间戳的禁运、出口管制变化、许可拒签。" } },
      { id: "scenario",     name: { en: "Outage scenarios",     zh: "中断情景" },     body: { en: "If X falls, what breaks downstream?",                                       zh: "若 X 倒下，下游什么坏？" } },
      { id: "alerts",       name: { en: "Alerts",               zh: "告警" },         body: { en: "Subscribe to changes for any node in the stack.",                           zh: "订阅栈中任一节点的变化。" } },
    ],
    kind: "atlas",
    sampleData: {
      // node = country with chokepoint role
      nodes: [
        { id: "TW",  label: "Taiwan",       lat: 23.7, lon: 121.0, score: 0.97, role: { en: "Leading-edge fab (TSMC)",        zh: "前沿制程晶圆厂（台积电）" } },
        { id: "NL",  label: "Netherlands",  lat: 52.1, lon: 5.3,   score: 0.93, role: { en: "EUV lithography (ASML)",          zh: "EUV 光刻（ASML）" } },
        { id: "KR",  label: "South Korea",  lat: 36.5, lon: 127.8, score: 0.85, role: { en: "HBM memory (SK Hynix, Samsung)",  zh: "HBM 内存（SK 海力士、三星）" } },
        { id: "JP",  label: "Japan",        lat: 36.2, lon: 138.3, score: 0.78, role: { en: "Photoresist, polished wafers",    zh: "光刻胶、抛光晶圆" } },
        { id: "CN",  label: "China",        lat: 35.9, lon: 104.2, score: 0.72, role: { en: "Pure metals, packaging, refining", zh: "高纯金属、封装、精炼" } },
        { id: "US",  label: "United States",lat: 38.9, lon: -77.0, score: 0.81, role: { en: "EDA, chip design, advanced equipment", zh: "EDA、芯片设计、先进设备" } },
        { id: "DE",  label: "Germany",      lat: 51.0, lon: 9.0,   score: 0.55, role: { en: "Optics (Zeiss), specialty chemicals", zh: "光学（蔡司）、特种化学品" } },
        { id: "MY",  label: "Malaysia",     lat: 4.2,  lon: 101.9, score: 0.48, role: { en: "Back-end packaging hub",          zh: "后段封装枢纽" } },
        { id: "IL",  label: "Israel",       lat: 31.0, lon: 34.8,  score: 0.50, role: { en: "Chip design centers (Intel, etc.)", zh: "芯片设计中心（英特尔等）" } },
        { id: "IE",  label: "Ireland",      lat: 53.4, lon: -8.2,  score: 0.40, role: { en: "Intel, Analog Devices manufacturing", zh: "英特尔、ADI 制造" } },
      ],
      events: [
        { date: "2022-10", title: { en: "U.S. October-7 chip controls",         zh: "美国 10 月 7 日芯片管制" },     impact: "high" },
        { date: "2023-08", title: { en: "Netherlands joins ASML EUV restriction", zh: "荷兰加入 ASML EUV 限制" },     impact: "high" },
        { date: "2023-08", title: { en: "China gallium / germanium export curbs", zh: "中国镓／锗出口管制" },         impact: "med" },
        { date: "2024-12", title: { en: "U.S. broadens HBM export controls",   zh: "美国扩大 HBM 出口管制" },         impact: "high" },
        { date: "2025-04", title: { en: "Japan tightens 23 chip-tool categories", zh: "日本收紧 23 类芯片工具" },     impact: "med" },
      ],
    },
  },

  // ────────────────────────────────────────────────────────────────────
  {
    id: "future-materials-database", slug: "future-materials-database",
    name: { en: "Future Materials Database", zh: "未来材料数据库" },
    oneLine: { en: "A living catalog of materials that will define the next century — what they enable, who can make them, when they ship.", zh: "一份关于将定义下一个百年之材料的活目录——它们解锁什么、谁能制造、何时上市。" },
    body: {
      en: "Most of the materials that will dominate 2050 already exist as lab demonstrations. Future Materials Database tracks the pipeline: room-temperature superconductors, perovskite tandem cells, lab-grown silk, fusion blanket alloys, MRAM substrates, biomineralized concrete. Each entry has a TRL band, performance over the prior generation, geographic origin, and a release-window estimate.\n\nFor founders, the buy-list of the next decade. For investors, the inverse-Moore curves. For everyone else, what your phone, car, and house will be made of.",
      zh: "将主宰 2050 的多数材料，今天已作为实验室演示存在。Future Materials Database 追踪这条管道：室温超导、钙钛矿叠层电池、实验室合成丝、聚变包层合金、MRAM 衬底、生物矿化混凝土。每条记录有技术成熟度区间、相对上一代的性能、地理起源、与上市时间估计。\n\n对创业者：未来十年的采购清单。对投资者：摩尔反向曲线。对其他人：你的手机、汽车、房子将由什么造。",
    },
    hue: "#446ba0", hue2: "#5d7494", glyph: "◇",
    tagline: { en: "the next-decade buy list", zh: "下一个十年的采购单" },
    modules: [
      { id: "trl",       name: { en: "TRL band",            zh: "TRL 区间" },     body: { en: "Technology Readiness Level 1–9 with confidence interval.",       zh: "技术成熟度 1–9，附置信区间。" } },
      { id: "delta",     name: { en: "Performance delta",   zh: "性能差" },       body: { en: "Multiplier vs incumbent material on the dimension that matters.", zh: "在关键维度上相对在位材料的倍数。" } },
      { id: "geography", name: { en: "Origin geography",    zh: "起源地理" },     body: { en: "Where it was first demonstrated; where the lead remains.",         zh: "首次演示之地；当前领先所在。" } },
      { id: "window",    name: { en: "Release window",      zh: "上市窗口" },     body: { en: "Probabilistic estimate of mass-production year.",                  zh: "量产年份的概率估计。" } },
      { id: "watchlist", name: { en: "Personal watchlist",  zh: "个人关注列表" }, body: { en: "Save, alert when TRL ticks, share.",                              zh: "保存——TRL 跳级时告警——可分享。" } },
    ],
    kind: "matgrid",
    sampleData: {
      materials: [
        { id: "perovskite-tandem", label: { en: "Perovskite-silicon tandem cell", zh: "钙钛矿—硅叠层电池" }, trl: 7, delta: "+38% efficiency vs silicon", origin: "DE / CN / US", window: "2026–2028", domain: "energy" },
        { id: "lk99",              label: { en: "Room-temp superconductor (search)", zh: "室温超导（持续搜索）" }, trl: 2, delta: "potential ∞× over copper for power", origin: "global", window: "≥2032 (uncertain)", domain: "energy" },
        { id: "sodium-ion",        label: { en: "Sodium-ion battery cells",     zh: "钠离子电池" }, trl: 8, delta: "0.6× cost of LFP at scale", origin: "CN", window: "2025+ (shipping)", domain: "energy" },
        { id: "lab-silk",          label: { en: "Recombinant spider silk",      zh: "重组蛛丝" }, trl: 6, delta: "5× tensile vs Kevlar @ 1/3 weight", origin: "JP / US", window: "2027", domain: "biomat" },
        { id: "fusion-blanket",    label: { en: "Tritium-breeding blanket alloys", zh: "氚增殖包层合金" }, trl: 5, delta: "enables D-T cycle", origin: "EU / US / KR", window: "2030–2035", domain: "energy" },
        { id: "mram",              label: { en: "MRAM substrates",              zh: "MRAM 衬底" }, trl: 8, delta: "non-volatile RAM at SRAM speed", origin: "US / KR / JP", window: "2025+", domain: "compute" },
        { id: "bio-concrete",      label: { en: "Biomineralized concrete",      zh: "生物矿化混凝土" }, trl: 5, delta: "−70% embodied CO₂", origin: "US / NL", window: "2027–2030", domain: "matter" },
        { id: "graphene-membrane", label: { en: "Graphene desalination membrane", zh: "石墨烯海水淡化膜" }, trl: 6, delta: "10× throughput @ 1/3 energy", origin: "UK / SG", window: "2028", domain: "matter" },
        { id: "solid-state-batt",  label: { en: "Solid-state Li battery",       zh: "固态锂电" }, trl: 7, delta: "+30% energy density, longer cycle", origin: "JP / KR / US", window: "2026–2028", domain: "energy" },
        { id: "lab-meat",          label: { en: "Cultivated meat (cost parity)", zh: "细胞培养肉（成本平价）" }, trl: 6, delta: "approaching $1/lb at 100kt scale", origin: "US / IL / SG", window: "2028–2030", domain: "biomat" },
        { id: "neuromorphic",      label: { en: "Neuromorphic memristors",      zh: "神经形态忆阻器" }, trl: 5, delta: "100× efficiency on inference", origin: "US / EU / KR", window: "2027", domain: "compute" },
        { id: "co2-cement",        label: { en: "CO₂-mineralizing cement",     zh: "CO₂ 矿化水泥" }, trl: 6, delta: "net-negative CO₂", origin: "US / CA", window: "2026–2028", domain: "matter" },
      ],
    },
  },

  // ────────────────────────────────────────────────────────────────────
  {
    id: "civilization-tech-tree", slug: "civilization-tech-tree",
    name: { en: "Civilization Tech Tree", zh: "文明科技树" },
    oneLine: { en: "Forward-looking branches: which 2025 capability unlocks the 2040 capability that unlocks the 2060 capability.", zh: "向前看的分叉：2025 年的哪一项能力解锁 2040 年的哪一项能力——再解锁 2060 年的哪一项。" },
    body: {
      en: "Most tech trees look backward. Civilization Tech Tree looks forward — 35 years of capabilities arranged in dependency order, each annotated with the precise prior step that has to land first. A user can pick a target (cheap fusion, longevity escape velocity, brain-computer fluency) and walk back to the gating today's-research nodes.\n\nThis is not prediction. It is a working hypothesis about the order in which futures become possible — useful precisely because it is falsifiable.",
      zh: "多数科技树都向后看。Civilization Tech Tree 向前看——把 35 年的能力按依赖关系排列，每个节点都注明它需要先落地的、精确的前置步骤。用户可挑一个目标（廉价聚变、长寿逃逸速度、脑机流利），向后走到今天正在研究的卡口节点。\n\n这不是预测。这是一份关于『未来变得可能之顺序』的工作假说——之所以有用，正因可被反驳。",
    },
    hue: "#9b6f3a", hue2: "#7a341c", glyph: "❦",
    tagline: { en: "what unlocks what — forward", zh: "什么解锁什么——向前" },
    modules: [
      { id: "future-nodes", name: { en: "Future capability nodes", zh: "未来能力节点" }, body: { en: "100+ projected capabilities with year ranges and confidence.", zh: "百余项预测能力，附年份区间与置信度。" } },
      { id: "deps",         name: { en: "Forward dependencies",     zh: "向前依赖" },     body: { en: "Which 2025 nodes must mature before each 2040 node.",         zh: "哪些 2025 节点必须先成熟，2040 节点才得以解锁。" } },
      { id: "walker",       name: { en: "Path walker",              zh: "路径漫游" },     body: { en: "Pick a target; trace it back to today.",                       zh: "选目标，走回今天。" } },
      { id: "alt-tree",     name: { en: "Alternative timelines",    zh: "替代时间线" },   body: { en: "Multiple branching futures with prerequisite forks.",          zh: "多条分支未来——前置条件的分叉。" } },
      { id: "evidence",     name: { en: "Evidence per node",        zh: "节点证据" },     body: { en: "Each prediction lists the empirical signals supporting it.",   zh: "每条预测列出支持它的经验信号。" } },
    ],
    kind: "tree",
    sampleData: {
      nodes: [
        { id: "today-llm",       year: 2025, label: { en: "Frontier LLM agents",          zh: "前沿 LLM 代理" },              tier: 0, deps: [] },
        { id: "today-robot-h",   year: 2025, label: { en: "Bipedal humanoid (1.5 m/s)",   zh: "双足人形（1.5 m/s）" },         tier: 0, deps: [] },
        { id: "today-fusion",    year: 2025, label: { en: "Net-energy ICF demo",          zh: "聚变净能量 ICF 演示" },         tier: 0, deps: [] },
        { id: "today-bci",       year: 2025, label: { en: "1k-channel implant",           zh: "千通道脑机植入" },               tier: 0, deps: [] },
        { id: "today-mrna",      year: 2025, label: { en: "Personalized mRNA pipeline",   zh: "个性化 mRNA 管线" },             tier: 0, deps: [] },
        { id: "agi-2030",        year: 2030, label: { en: "Domain-AGI in software",      zh: "软件领域的 AGI" },                 tier: 1, deps: ["today-llm"] },
        { id: "humanoid-mass",   year: 2030, label: { en: "Humanoid in light industry",  zh: "人形进入轻工业" },                 tier: 1, deps: ["today-robot-h"] },
        { id: "fusion-pilot",    year: 2032, label: { en: "Fusion pilot plant on grid",  zh: "聚变试点接入电网" },               tier: 1, deps: ["today-fusion"] },
        { id: "bci-2k",          year: 2030, label: { en: "10k-channel BCI clinical",    zh: "万通道 BCI 临床" },                 tier: 1, deps: ["today-bci"] },
        { id: "longevity-1",     year: 2032, label: { en: "Senolytic combo trials",      zh: "衰老细胞清除联合试验" },           tier: 1, deps: ["today-mrna"] },
        { id: "agi-strong",      year: 2035, label: { en: "Cross-domain AGI",            zh: "跨域 AGI" },                       tier: 2, deps: ["agi-2030", "humanoid-mass"] },
        { id: "fusion-scale",    year: 2038, label: { en: "Fusion-fed industrial parks", zh: "聚变供能的工业园" },               tier: 2, deps: ["fusion-pilot"] },
        { id: "bci-fluency",     year: 2038, label: { en: "BCI-aided fluent control",    zh: "脑机辅助流畅控制" },               tier: 2, deps: ["bci-2k"] },
        { id: "longevity-esc",   year: 2040, label: { en: "Healthspan +30 years",        zh: "健康寿命 +30 年" },               tier: 2, deps: ["longevity-1"] },
        { id: "post-labor",      year: 2042, label: { en: "Post-labor economy region",   zh: "无劳工经济区" },                   tier: 3, deps: ["agi-strong", "humanoid-mass", "fusion-scale"] },
        { id: "extra-planetary", year: 2050, label: { en: "Sustained off-Earth presence", zh: "持续的离地存在" },                tier: 3, deps: ["fusion-scale", "agi-strong"] },
        { id: "merge-agi-bci",   year: 2055, label: { en: "Symbiotic human-AI cognition", zh: "人—AI 共生认知" },                tier: 4, deps: ["agi-strong", "bci-fluency"] },
        { id: "civ-2060",        year: 2060, label: { en: "Civilization-grade abundance", zh: "文明级丰裕" },                     tier: 4, deps: ["post-labor", "longevity-esc", "extra-planetary"] },
      ],
    },
  },

  // ────────────────────────────────────────────────────────────────────
  {
    id: "quantum-computing-visualizer", slug: "quantum-computing-visualizer",
    name: { en: "Quantum Computing Visualizer", zh: "量子计算可视化器" },
    oneLine: { en: "Drop gates onto a circuit; watch a 3-qubit register's amplitudes evolve in real time.", zh: "把门放到电路上；实时看 3 比特寄存器的振幅演化。" },
    body: {
      en: "Quantum mechanics is best taught by watching it happen. The visualizer is a 3-qubit register and a gate palette: H, X, Y, Z, S, T, CNOT. Drag a gate onto a wire, drop, see the state vector update — magnitudes and phases — and the Bloch-sphere of each qubit re-orient. Run a small Grover circuit on a custom oracle. Watch entanglement appear as off-diagonal correlations.\n\nFor the curious: in 30 minutes, you have a working physical intuition that takes a textbook 3 chapters.",
      zh: "量子力学最好的学法，是边看边发生。可视化器是一个 3 比特寄存器加一组门面板：H、X、Y、Z、S、T、CNOT。把门拖到导线上、放下——状态向量便随之更新（幅与相）——每个比特的布洛赫球重新定向。在自定义谕示上运行一个小的 Grover 电路。看纠缠以非对角相关的形式出现。\n\n对好奇者：三十分钟，你便有一份教科书三章才能给的物理直觉。",
    },
    hue: "#5d7494", hue2: "#446ba0", glyph: "Ψ",
    tagline: { en: "see the state vector", zh: "看见状态向量" },
    modules: [
      { id: "circuit",  name: { en: "Circuit canvas",   zh: "电路画布" }, body: { en: "Drag gates, reorder, save circuits.",         zh: "拖动门、重新排列、保存电路。" } },
      { id: "state",    name: { en: "State vector",      zh: "状态向量" }, body: { en: "Live amplitudes and phases on |000⟩…|111⟩.",  zh: "在 |000⟩…|111⟩ 上的实时幅与相。" } },
      { id: "bloch",    name: { en: "Bloch spheres",     zh: "布洛赫球" }, body: { en: "Per-qubit, animated.",                        zh: "每个比特，动画呈现。" } },
      { id: "grover",   name: { en: "Grover demo",       zh: "Grover 演示" }, body: { en: "2-qubit search with custom oracle.",       zh: "可自定义谕示的 2 比特搜索。" } },
      { id: "export",   name: { en: "Export OpenQASM",   zh: "导出 OpenQASM" }, body: { en: "Run elsewhere — IBM, AWS Braket, Cirq.",  zh: "可在他处运行——IBM、AWS Braket、Cirq。" } },
    ],
    kind: "qubit",
    sampleData: {
      qubits: 3,
      basis: ["|000⟩","|001⟩","|010⟩","|011⟩","|100⟩","|101⟩","|110⟩","|111⟩"],
      // initial amplitudes (real for simplicity in demo)
      amplitudes: [1, 0, 0, 0, 0, 0, 0, 0],
      gates: ["H","X","Y","Z","CNOT"],
    },
  },

  // ────────────────────────────────────────────────────────────────────
  {
    id: "autonomous-software-civilization", slug: "autonomous-software-civilization",
    name: { en: "Autonomous Software Civilization", zh: "自主软件文明" },
    oneLine: { en: "A living world of agentic software companies — each one writes, ships, and earns autonomously.", zh: "一个由代理式软件公司构成的活世界——每家自动写代码、自动发布、自动赚钱。" },
    body: {
      en: "Software has begun building software. Each cell in this grid is one agentic software company: a planner agent, a coder agent, a tester agent, a billing agent. They take in user requests, ship updates, accept payments, refund failures. Their balance sheets are visible; their codebases are open; their decisions are explainable. Some thrive. Most die.\n\nThis is the petri-dish view. It is also a glimpse of an industry in which an MVP is one sentence away.",
      zh: "软件已经开始构建软件。这张网格上的每一格——是一家代理式软件公司：规划代理、写码代理、测试代理、计费代理。它们接收用户请求、发布更新、收款、为失败退款。资产负债表可见；代码库开放；决策可解释。少数兴盛，多数死去。\n\n这是培养皿视图，也是某个行业的一瞥——其中 MVP 离一句话仅一句之遥。",
    },
    hue: "#7d6c8a", hue2: "#5a4d6e", glyph: "◯",
    tagline: { en: "code that ships code", zh: "会发布代码的代码" },
    modules: [
      { id: "company-grid",  name: { en: "Company grid",       zh: "公司网格" },   body: { en: "Each cell = one autonomous software company. Live state.",      zh: "每格 = 一家自主软件公司——实时状态。" } },
      { id: "policy",        name: { en: "Policy slots",       zh: "策略槽" },     body: { en: "Swap planner / coder / pricing policies live.",                 zh: "实时换规划／写码／定价策略。" } },
      { id: "ledger",        name: { en: "Per-company ledger", zh: "公司账簿" },   body: { en: "Income, expenses, refunds, runway in cells of MRR.",            zh: "收入、支出、退款、跑道——以 MRR 为单位。" } },
      { id: "extinction",    name: { en: "Extinction monitor", zh: "倒闭监测" },   body: { en: "Watch which combinations of policies fail at what scale.",      zh: "看哪种策略组合在什么规模下失败。" } },
      { id: "fork",          name: { en: "Fork a winner",      zh: "Fork 赢家" }, body: { en: "Pick the most successful cell; spawn 5 mutated copies.",        zh: "选最成功的一格，产 5 个变异副本。" } },
    ],
    kind: "agents",
    sampleData: {
      grid: 5,             // 5x5 grid of companies
      tickRate: 700,
      defaults: {
        policies: ["greedy", "satisficer", "explorer"],
      },
    },
  },

  // ────────────────────────────────────────────────────────────────────
  {
    id: "future-energy-dashboard", slug: "future-energy-dashboard",
    name: { en: "Future Energy Dashboard", zh: "未来能源仪表盘" },
    oneLine: { en: "Drag the dials: see what 2050's energy mix actually has to look like to keep the lights on.", zh: "拨动旋钮：看 2050 年的能源构成必须长成什么样——电才能不灭。" },
    body: {
      en: "The energy transition is not one number — it's the simultaneous solution of several: solar TW deployed, battery storage hours, nuclear restart pace, fusion arrival year, demand growth from AI compute and electrification. Future Energy Dashboard lets you turn each dial, and tells you immediately whether the resulting mix actually serves the load — or browns out.\n\nNot a model of what will happen. A model of what would have to happen.",
      zh: "能源转型不是单一数字——而是几个数字必须同时成立：太阳能部署 TW、储能小时数、核能重启节奏、聚变到来年份、AI 算力与电气化带来的需求增长。Future Energy Dashboard 让你拨动每个旋钮——并立即告诉你：由此构成的能源结构能否承载负荷，还是会限电。\n\n它不是『将发生什么』的模型——它是『必须发生什么』的模型。",
    },
    hue: "#5fa379", hue2: "#3d7a6f", glyph: "△",
    tagline: { en: "what would have to happen", zh: "必须发生什么" },
    modules: [
      { id: "dials",       name: { en: "Source dials",       zh: "来源旋钮" }, body: { en: "Solar, wind, nuclear, fusion, hydro, geothermal — TW.",        zh: "太阳能、风、核能、聚变、水电、地热——TW 量级。" } },
      { id: "demand",      name: { en: "Demand projector",   zh: "需求预测" }, body: { en: "Population, EV stock, AI compute, heat-pump rollout.",          zh: "人口、电动车存量、AI 算力、热泵铺设。" } },
      { id: "storage",     name: { en: "Storage hours",       zh: "储能小时" }, body: { en: "Hours of full-system storage.",                                  zh: "全系统储能小时数。" } },
      { id: "verdict",     name: { en: "Verdict band",        zh: "结论带" },   body: { en: "Brownout / OK / surplus. Live.",                                zh: "限电／可控／盈余——实时。" } },
      { id: "scenarios",   name: { en: "Scenario library",    zh: "情景库" },   body: { en: "IEA STEPS, NZE, custom. Compare side-by-side.",                 zh: "IEA STEPS、NZE、自定义——并排对比。" } },
    ],
    kind: "energy",
    sampleData: {
      sources: [
        { id: "solar",     label: { en: "Solar PV (TW)",         zh: "光伏（TW）" },         min: 0,  max: 30,  default: 8,  capacity_factor: 0.22, hue: "#ffb340" },
        { id: "wind",      label: { en: "Wind (TW)",             zh: "风电（TW）" },         min: 0,  max: 12,  default: 4,  capacity_factor: 0.34, hue: "#7eb0a4" },
        { id: "nuclear",   label: { en: "Nuclear (TW)",          zh: "核能（TW）" },         min: 0,  max: 4,   default: 0.6,capacity_factor: 0.91, hue: "#bd5d2c" },
        { id: "fusion",    label: { en: "Fusion (TW, future)",   zh: "聚变（TW，未来）" },    min: 0,  max: 5,   default: 0,  capacity_factor: 0.85, hue: "#9a4d6e" },
        { id: "hydro",     label: { en: "Hydro (TW)",            zh: "水电（TW）" },         min: 0,  max: 2,   default: 1.4,capacity_factor: 0.40, hue: "#446ba0" },
        { id: "geo",       label: { en: "Geothermal (TW)",       zh: "地热（TW）" },         min: 0,  max: 2,   default: 0.1,capacity_factor: 0.78, hue: "#7a341c" },
      ],
      // Demand assumptions
      demand_TW: 5.5,   // baseline electricity demand 2025
      demand_growth_pct: 3.1, // % per year through 2050
      target_year: 2050,
      storage_hours: 8,
    },
  },

  // ────────────────────────────────────────────────────────────────────
  {
    id: "robot-civilization-observatory", slug: "robot-civilization-observatory",
    name: { en: "Robot Civilization Observatory", zh: "机器人文明观测台" },
    oneLine: { en: "Real-time roster of every commercial robot fleet on Earth — humanoids, AMRs, drones, surgical, ag.", zh: "地球上每一支商用机器人车队的实时名册——人形、AMR、无人机、手术、农业。" },
    body: {
      en: "Most people have no idea how many robots are already shipping. There are over 4 million industrial robots in factories, 1.5 million AMRs in warehouses, 100,000 surgical-assist arms in hospitals, and the first 10,000 humanoids walking around in pilot deployments. The Observatory is the public roster: vendor, model, fleet count, geography, capability, year of first deployment.\n\nFor founders: where the white space is. For workers: where the change is. For everyone else: how the population of non-human workers grows month by month.",
      zh: "大多数人不知道，今天已经在出货的机器人有多少。工厂里有四百万台工业机器人；仓库里有一百五十万台 AMR；医院里有十万台手术辅助臂；第一批一万台人形机器人正在试点部署中行走。观测台是这份公开名册：厂商、型号、车队规模、地理、能力、首次部署年份。\n\n对创业者：白地在哪。对劳动者：变化在哪。对其他人：非人类劳动者的人口——按月如何增长。",
    },
    hue: "#bd3a2c", hue2: "#7a341c", glyph: "▢",
    tagline: { en: "the non-human worker census", zh: "非人类劳动者人口普查" },
    modules: [
      { id: "fleets",     name: { en: "Fleet roster",          zh: "车队名册" },     body: { en: "Vendor, model, year, count, geography.",                          zh: "厂商、型号、年份、数量、地理。" } },
      { id: "growth",     name: { en: "Growth curves",         zh: "增长曲线" },     body: { en: "Monthly growth per category, last 36 months.",                    zh: "按类别的月度增长——过去 36 个月。" } },
      { id: "capabilities", name: { en: "Capability matrix",   zh: "能力矩阵" },     body: { en: "What each model can / cannot do, source-cited.",                  zh: "每款机器能／不能做什么——附来源。" } },
      { id: "geography",  name: { en: "Geography",             zh: "地理" },         body: { en: "Where each fleet operates, by city.",                             zh: "每支车队在哪运行——精到城市。" } },
      { id: "incidents",  name: { en: "Incident ledger",       zh: "事故账簿" },     body: { en: "Public incidents — what happened, what was learned.",            zh: "公开事故——发生了什么，学到了什么。" } },
    ],
    kind: "fleet",
    sampleData: {
      fleets: [
        { id: "boston-spot",      label: { en: "Boston Dynamics Spot",      zh: "波士顿动力 Spot" },     count: 5500,  growth: 18, vendor: "Boston Dynamics", category: "quadruped" },
        { id: "boston-atlas",     label: { en: "Boston Dynamics Atlas (electric)", zh: "波士顿动力 Atlas（电动）" }, count: 380,   growth: 42, vendor: "Boston Dynamics", category: "humanoid" },
        { id: "figure-01",        label: { en: "Figure 02",                 zh: "Figure 02" },          count: 720,   growth: 55, vendor: "Figure", category: "humanoid" },
        { id: "tesla-optimus",    label: { en: "Tesla Optimus (gen 2)",     zh: "特斯拉 Optimus（二代）" }, count: 1200,  growth: 80, vendor: "Tesla", category: "humanoid" },
        { id: "unitree-h1",       label: { en: "Unitree H1",                zh: "宇树 H1" },             count: 1900,  growth: 47, vendor: "Unitree", category: "humanoid" },
        { id: "amazon-amr",       label: { en: "Amazon Proteus AMR",        zh: "亚马逊 Proteus AMR" },   count: 750_000, growth: 12, vendor: "Amazon", category: "amr" },
        { id: "ocado-bot",        label: { en: "Ocado grocery bot",         zh: "Ocado 杂货机器人" },     count: 6200,  growth: 8,  vendor: "Ocado", category: "amr" },
        { id: "intuitive-davinci",label: { en: "Intuitive da Vinci",        zh: "Intuitive 达芬奇" },     count: 9200,  growth: 6,  vendor: "Intuitive Surgical", category: "surgical" },
        { id: "dji-agriculture",  label: { en: "DJI agriculture drone",     zh: "大疆农业无人机" },        count: 320_000, growth: 11, vendor: "DJI", category: "drone" },
        { id: "skydio-x10",       label: { en: "Skydio X10 (security)",     zh: "Skydio X10（安防）" },   count: 14000, growth: 22, vendor: "Skydio", category: "drone" },
        { id: "fanuc-arm",        label: { en: "FANUC industrial arm (legacy)", zh: "发那科工业臂（在役）" }, count: 750_000, growth: 4,  vendor: "FANUC", category: "industrial" },
        { id: "abb-arm",          label: { en: "ABB industrial arm (legacy)",   zh: "ABB 工业臂（在役）" }, count: 500_000, growth: 3,  vendor: "ABB", category: "industrial" },
        { id: "1x-neo",           label: { en: "1X Neo home robot",         zh: "1X Neo 家庭机器人" },     count: 200,   growth: 110, vendor: "1X Technologies", category: "humanoid" },
      ],
    },
  },

  // ────────────────────────────────────────────────────────────────────
  {
    id: "brain-computer-interface-world", slug: "brain-computer-interface-world",
    name: { en: "Brain-Computer Interface World", zh: "脑机接口世界" },
    oneLine: { en: "Every active BCI program on Earth — implants, EEG, fMRI hybrids, with channel counts and clinical milestones.", zh: "地球上每一项活跃的脑机接口项目——植入式、EEG、fMRI 混合——附通道数与临床节点。" },
    body: {
      en: "BCIs went from research curio to clinical reality in five years. Neuralink, Synchron, Precision Neuroscience, Paradromics, BlackRock, BrainGate — and a dozen non-invasive vendors. BCI World tracks active programs, channel counts, recipient counts, clinical-trial phase, and the quiet milestone every implant aims for: typing speed equivalent to a hearing person.\n\nFor researchers: the live competitive map. For neurology patients: the realistic horizon. For everyone else: the medium of the next century, being installed now.",
      zh: "脑机接口在五年内从研究奇物走入临床现实。Neuralink、Synchron、Precision Neuroscience、Paradromics、BlackRock、BrainGate——以及十几家非侵入式厂商。BCI World 追踪活跃项目、通道数、受试者数、临床试验阶段，以及每一款植入物默默瞄准的节点：打字速度赶上听力正常者。\n\n对研究者：实时竞争地图。对神经病学患者：现实的视野。对其他人：下一个百年的媒介——正在被安装。",
    },
    hue: "#9a4d6e", hue2: "#5a4d6e", glyph: "❉",
    tagline: { en: "the live BCI race", zh: "实时脑机接口竞赛" },
    modules: [
      { id: "programs",  name: { en: "Active programs",     zh: "活跃项目" }, body: { en: "Every BCI program publicly known, with milestones.",         zh: "每一个公开的 BCI 项目——附节点。" } },
      { id: "channels",  name: { en: "Channel race",        zh: "通道数竞赛" }, body: { en: "Channel count by quarter for the last 24 months.",            zh: "过去 24 个月按季度的通道数。" } },
      { id: "decoding",  name: { en: "Decoding metric",     zh: "解码指标" }, body: { en: "Words/min, click accuracy, force precision.",                  zh: "词每分钟、点击精度、力控精度。" } },
      { id: "trials",    name: { en: "Clinical trials",     zh: "临床试验" }, body: { en: "Phase, recipients, primary endpoint.",                         zh: "阶段、受试者、主要终点。" } },
      { id: "ethics",    name: { en: "Ethics & policy",     zh: "伦理与政策" }, body: { en: "Consent frameworks, FDA breakthrough designations, EU MDR.",  zh: "知情同意框架、FDA 突破性认定、欧盟 MDR。" } },
    ],
    kind: "bci",
    sampleData: {
      programs: [
        { id: "neuralink",  label: { en: "Neuralink N1",          zh: "Neuralink N1" },          channels: 1024, recipients: 8,  type: "implant",  status: "Phase 1" },
        { id: "synchron",   label: { en: "Synchron Stentrode",   zh: "Synchron Stentrode" },     channels: 16,   recipients: 10, type: "vascular", status: "Phase 2" },
        { id: "precision",  label: { en: "Precision Layer 7",    zh: "Precision Layer 7" },      channels: 1024, recipients: 12, type: "surface",  status: "Phase 1" },
        { id: "paradromics",label: { en: "Paradromics Connexus", zh: "Paradromics Connexus" },   channels: 1600, recipients: 4,  type: "implant",  status: "Phase 1" },
        { id: "blackrock",  label: { en: "BlackRock NeuroPort",  zh: "BlackRock NeuroPort" },    channels: 96,   recipients: 40, type: "implant",  status: "Approved" },
        { id: "braingate",  label: { en: "BrainGate consortium", zh: "BrainGate 联盟" },         channels: 100,  recipients: 25, type: "implant",  status: "Research" },
        { id: "iota",       label: { en: "Iota Biosciences",     zh: "Iota Biosciences" },       channels: 32,   recipients: 0,  type: "neural-dust", status: "Pre-clinical" },
        { id: "openbci",    label: { en: "OpenBCI Galea",        zh: "OpenBCI Galea" },          channels: 19,   recipients: 0,  type: "non-invasive EEG", status: "Consumer beta" },
        { id: "kernel",     label: { en: "Kernel Flow",          zh: "Kernel Flow" },            channels: 52,   recipients: 0,  type: "non-invasive fNIRS", status: "Research" },
      ],
      // signal channels for the live waveform demo
      signal_channels: 16,
      signal_hz: 250,
    },
  },

  // ────────────────────────────────────────────────────────────────────
  {
    id: "reality-simulation-engine", slug: "reality-simulation-engine",
    name: { en: "Reality Simulation Engine", zh: "现实模拟引擎" },
    oneLine: { en: "Run a society from first principles — physics, biology, economics, culture — and watch it diverge.", zh: "从第一性原理出发跑一个社会——物理、生物、经济、文化——看它如何分叉。" },
    body: {
      en: "Reality Simulation Engine is the toy version of every macro-simulation people imagine. A small population, a small environment, a small set of physical and social laws, and a fast clock. You set the initial conditions; the simulator runs forward in real time. Most runs collapse, repeatedly, in informative ways. A few stabilize into recognizable patterns: villages, cities, trade routes, conflicts.\n\nThe insight is not that the simulator predicts anything. The insight is that the qualitative space of stable civilizational outcomes is much smaller than the qualitative space of starting conditions.",
      zh: "Reality Simulation Engine 是所有人想象中的宏观模拟之玩具版。一个小种群、一片小环境、一组小的物理与社会律、一只快走的钟。你设初始条件——模拟器实时向前运行。多数运行会反复崩塌——但崩塌方式很有信息量。少数会稳定到可辨认的模式：村落、城市、贸易路线、冲突。\n\n洞见不是模拟器能预测什么——而是：稳定的文明结局之质性空间，远小于起始条件之质性空间。",
    },
    hue: "#3a6e62", hue2: "#7eb0a4", glyph: "∞",
    tagline: { en: "every run diverges", zh: "每一跑都分叉" },
    modules: [
      { id: "physics",     name: { en: "Physics rules",     zh: "物理规则" },   body: { en: "Energy, motion, decay — the substrate.",                          zh: "能量、运动、衰减——基底。" } },
      { id: "biology",     name: { en: "Biology rules",     zh: "生物规则" },   body: { en: "Reproduction, metabolism, mortality.",                            zh: "繁殖、代谢、死亡。" } },
      { id: "society",     name: { en: "Society rules",     zh: "社会规则" },   body: { en: "Trust, exchange, coercion — the meta-rules of cooperation.",      zh: "信任、交换、强制——合作的元规则。" } },
      { id: "clock",       name: { en: "Time controls",     zh: "时间控制" },   body: { en: "Pause, step, accelerate, branch.",                                zh: "暂停、步进、加速、分支。" } },
      { id: "branches",    name: { en: "Branch comparison", zh: "分支对比" },   body: { en: "Run two civilizations from the same seed; see where they diverge.", zh: "用同一种子跑两个文明——看它们在哪分叉。" } },
    ],
    kind: "recursion",
    sampleData: {
      // recursive nested rectangles representing sims-within-sims
      depth: 6,
      seed: 42,
    },
  },
];

export const PLATFORM_BY_ID: Record<string, Platform> = Object.fromEntries(PLATFORMS.map((p) => [p.id, p]));

export const ECOSYSTEM_NAME: Bilingual = { en: "civtech · 10 platforms for the 2035 stack", zh: "civtech · 2035 之栈的十个平台" };

export const PILLARS: Bilingual[] = [
  { en: "AI-native by default",        zh: "默认 AI 原生" },
  { en: "Live, not static",            zh: "活的，不是静的" },
  { en: "Bilingual",                   zh: "双语" },
  { en: "Source-cited",                zh: "有据可依" },
  { en: "Production from 2035",        zh: "来自 2035 的产品" },
];
