export interface Project {
  id: string;
  title: string;
  category: 'AI / RAG' | 'Multi-Agent' | 'Data Analytics' | 'Systems & C++' | 'Full-Stack';
  description: string;
  longDescription: string;
  metrics?: { label: string; value: string }[];
  tags: string[];
  githubUrl: string;
  demoUrl?: string;
  featured: boolean;
  highlights: string[];
}

export interface SkillCategory {
  title: string;
  skills: {
    name: string;
    level: string;
    icon: string;
    description: string;
    color: string;
  }[];
}

export interface TimelineItem {
  year: string;
  period: string;
  title: string;
  organization: string;
  location: string;
  description: string;
  tags: string[];
}

export const PERSONAL_INFO = {
  name: "Lakshya Rishi",
  handle: "Lakshya1213",
  title: "Applied AI Engineer & Data Analytics Specialist",
  tagline: "Turning research papers and mathematical ideas into production AI systems.",
  institution: "Indian Institute of Technology Indore (IIT Indore)",
  email: "mems240005026@iiti.ac.in",
  linkedin: "https://www.linkedin.com/in/lakshya-rishi-708081331/",
  github: "https://github.com/Lakshya1213",
  avatarUrl: "https://avatars.githubusercontent.com/u/196454748?v=4",
  stats: {
    repos: 34,
    institution: "IIT Indore",
    primaryStack: "Python, C++, SQL",
    topLanguages: ["Python", "C++", "Jupyter", "JavaScript", "SQL"]
  },
  bio: [
    "I am an Applied AI Engineer and undergraduate scholar at IIT Indore specializing in Machine Learning, autonomous agent frameworks, and high-performance data analytics.",
    "My focus is bridging theoretical mathematical modeling and production engineering—building resilient software that solves real-world challenges with high throughput and reliable system architecture."
  ]
};

export const FEATURED_PROJECTS: Project[] = [
  {
    id: "rankup-learning-assistant",
    title: "RankUp — Smart AI Learning Assistant & Multiplayer Study Arena",
    category: "Full-Stack",
    description: "Full-stack AI academic platform transforming study notes and PDFs into live multiplayer quiz battles, active recall flashcards, and diagnostic roadmaps.",
    longDescription: "Engineered RankUp, a production-grade full-stack learning platform. Features a zero-base64 high-capacity document engine (ingesting 150-180 pages per document with raw in-memory text parsing that reduces database bloat by >95%), real-time WebSocket multiplayer quiz arenas with synchronized room countdown clocks and dynamic leaderboards, dual-mode document-locked RAG and web-grounded AI tutoring via Groq LPU inference, 3D active recall flashcards with vector PDFKit export, and interactive WebGL Three.js Earth graphics.",
    metrics: [
      { label: "Capacity", value: "180+ Pages" },
      { label: "Storage Saved", value: ">95% Lean" },
      { label: "Multiplayer", value: "Socket.io" }
    ],
    tags: ["React 18", "Node.js", "Express", "Socket.io", "Groq LPU", "Three.js", "MongoDB", "Tailwind CSS v4"],
    githubUrl: "https://github.com/Krish-Prasad09/RankUp-LearningAssistant",
    demoUrl: "https://rank-up-learning-assistant.vercel.app/",
    featured: true,
    highlights: [
      "Zero-Base64 High-Capacity Engine parsing up to 180 pages directly from memory buffers with pdf-parse",
      "Real-time multiplayer battle arena over Socket.io with 6-character room codes and server-authoritative timers",
      "Document-locked RAG study tutor with instant Groq tensor streaming and automated gap analysis diagnostics",
      "Interactive 3D Earth globe with atmospheric cloud shaders and Newton's Cradle physics loader"
    ]
  },
  {
    id: "rag-qa-system",
    title: "RAG-Based Multi-Document QA Engine",
    category: "AI / RAG",
    description: "Production-grade enterprise RAG pipeline for complex multi-document contextual synthesis with sub-35ms latency.",
    longDescription: "Engineered an end-to-end Retrieval-Augmented Generation system capable of processing heterogeneous corporate PDFs and documents. Features hybrid dense retrieval with BGE embeddings, FAISS vector indexing, Cross-Encoder reranking, and Groq-accelerated Llama 3.1 generation.",
    metrics: [
      { label: "Recall@3", value: "~95%" },
      { label: "MRR@3", value: "0.867" },
      { label: "Query Latency", value: "~31 ms" }
    ],
    tags: ["Python", "FastAPI", "FAISS", "BGE Embeddings", "Cross-Encoder", "Groq Llama 3.1"],
    githubUrl: "https://github.com/Lakshya1213",
    featured: true,
    highlights: [
      "Custom semantic chunking strategy with dynamic token budget management",
      "Two-stage retrieval pipeline: high-recall FAISS filtering followed by cross-encoder reranking",
      "Asynchronous FastAPI endpoint designed for high concurrency and streaming responses"
    ]
  },
  {
    id: "stock-screener-ai",
    title: "Advanced Stock Screener & AI Chatbot",
    category: "Data Analytics",
    description: "AI financial assistant combining quantitative technical screening with Prophet time-series price forecasting.",
    longDescription: "Built an intelligent financial assistant that empowers users to query market trends in natural language, screen equities using RSI, MACD, and Bollinger bands, and generate predictive price trajectory forecasts.",
    metrics: [
      { label: "Indicators", value: "15+ Tech Signals" },
      { label: "Forecasting", value: "Prophet ML" },
      { label: "Interface", value: "Conversational NLP" }
    ],
    tags: ["Python", "LangChain", "Prophet", "Pandas", "NumPy", "YFinance"],
    githubUrl: "https://github.com/Lakshya1213/sales-brain",
    featured: true,
    highlights: [
      "Natural language financial query translation into automated data pipelines",
      "Prophet additive time-series models for stock volatility and trend decomposition",
      "Automated financial report generation with structured metric summaries"
    ]
  },
  {
    id: "multi-agent-system",
    title: "Autonomous Multi-Agent Orchestration Framework",
    category: "Multi-Agent",
    description: "Distributed multi-agent execution architecture where autonomous agents decompose and solve complex tasks.",
    longDescription: "Developed an autonomous agent framework enabling multi-role collaboration, planning loops, web intelligence retrieval, and tool synthesis with self-correcting error handling.",
    metrics: [
      { label: "Architecture", value: "ReAct Loops" },
      { label: "Tool Routing", value: "Dynamic" },
      { label: "Execution", value: "Asynchronous" }
    ],
    tags: ["Python", "Multi-Agent", "LangGraph", "Tool Use", "AsyncIO"],
    githubUrl: "https://github.com/Lakshya1213/Multi_agent-main",
    featured: true,
    highlights: [
      "Hierarchical agent role delegation with supervisor and worker topologies",
      "Integrated web-scraping agents with dynamic information synthesis",
      "Robust state management and context preservation across multi-step execution"
    ]
  },
  {
    id: "real-estate-doc-intelligence",
    title: "Real Estate Document Intelligence",
    category: "AI / RAG",
    description: "Deep learning document intelligence platform extracting contractual terms and entities from real estate deeds.",
    longDescription: "Specialized OCR and NLP pipeline designed to parse complex, messy legal agreements, extract critical deed clauses, tabular pricing data, and flag compliance risks automatically.",
    metrics: [
      { label: "Accuracy", value: "98.2% Extraction" },
      { label: "Speed", value: "5x vs Manual" },
      { label: "Format", value: "Multi-page PDF" }
    ],
    tags: ["Python", "Document AI", "OCR", "Transformers", "NLP"],
    githubUrl: "https://github.com/Lakshya1213/real-estate-doc-intelligence",
    featured: true,
    highlights: [
      "Custom layout parsing for unstructured tabular clauses and multi-column deeds",
      "Automated extraction of parties, financial obligations, and critical dates",
      "Export directly into structured JSON & relational database schemas"
    ]
  },
  {
    id: "movie-recommender",
    title: "Neural Content Recommender Engine",
    category: "Data Analytics",
    description: "Vector similarity recommendation engine analyzing film metadata and narrative embeddings in real-time.",
    longDescription: "Constructed a high-performance content-based recommendation platform leveraging TF-IDF vectorization, cosine similarity matrices, and interactive Streamlit UI for instant recommendations.",
    metrics: [
      { label: "Dataset", value: "5,000+ Movies" },
      { label: "Inference", value: "<15 ms" },
      { label: "Similarity", value: "Cosine / TF-IDF" }
    ],
    tags: ["Python", "Scikit-Learn", "Streamlit", "Pandas", "NLP"],
    githubUrl: "https://github.com/Lakshya1213/My-project",
    featured: false,
    highlights: [
      "Vectorized genre, cast, director, and plot synopsis feature fusion",
      "Dynamic similarity ranking with customizable preference weighting",
      "Interactive dashboard with visual poster retrieval and metadata display"
    ]
  },
  {
    id: "task-5-cli-markdown",
    title: "C++ High-Performance CLI Markdown Parser",
    category: "Systems & C++",
    description: "Ultra-fast command line markdown processor and syntax highlighter written in modern C++.",
    longDescription: "High-throughput terminal tool that parses Markdown AST, formats headings, tables, code fences, and streams rendered ANSI terminal color outputs with zero external dependencies.",
    metrics: [
      { label: "Language", value: "Modern C++" },
      { label: "Speed", value: "Sub-millisecond" },
      { label: "Dependencies", value: "Zero" }
    ],
    tags: ["C++", "CLI", "AST Parsing", "Systems Programming"],
    githubUrl: "https://github.com/Lakshya1213/Task-5",
    featured: false,
    highlights: [
      "Handcrafted tokenizer and recursive descent AST parser",
      "ANSI color palette engine for syntax-highlighted terminal outputs",
      "Memory-safe C++17 architecture with minimal overhead"
    ]
  },
  {
    id: "sales-brain",
    title: "Sales Brain Predictive Analytics",
    category: "Data Analytics",
    description: "Machine learning forecasting engine uncovering seasonal patterns, customer churn, and revenue projections.",
    longDescription: "Comprehensive data science suite analyzing multivariate retail sales data, clustering customer profiles, and predicting quarterly revenue using regression and ensemble modeling.",
    metrics: [
      { label: "R² Score", value: "0.91" },
      { label: "Analysis", value: "Cohort & Churn" },
      { label: "Stack", value: "Scikit-Learn & Seaborn" }
    ],
    tags: ["Python", "Pandas", "Scikit-Learn", "Seaborn", "Power BI"],
    githubUrl: "https://github.com/Lakshya1213/sales_analysis",
    featured: false,
    highlights: [
      "Automated exploratory data analysis with statistical anomaly detection",
      "Customer RFM (Recency, Frequency, Monetary) segmentation clustering",
      "Interactive visualization suites ready for executive reporting"
    ]
  },
  {
    id: "meet-translator",
    title: "Real-Time Meeting Speech Translator",
    category: "AI / RAG",
    description: "Audio streaming pipeline for real-time speech recognition, transcription, and multi-language translation.",
    longDescription: "Live audio processing application designed to capture speaker audio from virtual conferences, transcribe speech with high fidelity, and translate live subtitles on the fly.",
    metrics: [
      { label: "Audio", value: "Low Latency" },
      { label: "Languages", value: "Multi-Lingual" },
      { label: "Format", value: "Live Stream" }
    ],
    tags: ["Python", "SpeechRecognition", "Whisper", "Translation API"],
    githubUrl: "https://github.com/Lakshya1213/meet_translator",
    featured: false,
    highlights: [
      "Real-time audio buffer chunking and background noise suppression",
      "Seamless speech-to-text pipeline with multi-language translation hooks",
      "Lightweight architecture suitable for low-spec client systems"
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "AI & Machine Learning",
    skills: [
      { name: "RAG Systems", level: "Production", icon: "Brain", description: "FAISS, Dense Retrieval, Cross-Encoders, Chunking", color: "#06b6d4" },
      { name: "LangChain & LangGraph", level: "Advanced", icon: "Network", description: "Agent orchestration, Graph state machines, ReAct loops", color: "#8b5cf6" },
      { name: "Transformers & LLMs", level: "Advanced", icon: "Cpu", description: "Hugging Face, Groq Llama 3.1, Prompt Engineering", color: "#ec4899" },
      { name: "PyTorch & Scikit-Learn", level: "Proficient", icon: "Layers", description: "Neural architectures, Regression, Classification, Clustering", color: "#f97316" },
      { name: "Vector Databases", level: "Advanced", icon: "Database", description: "FAISS, ChromaDB, Cosine distance indexing", color: "#10b981" },
      { name: "MLOps & Deploy", level: "Active", icon: "Server", description: "FastAPI inference serving, Model containerization", color: "#3b82f6" }
    ]
  },
  {
    title: "Programming Languages",
    skills: [
      { name: "Python", level: "Core Specialist", icon: "Terminal", description: "AsyncIO, NumPy, Pandas, FastAPI, Scientific Stack", color: "#3b82f6" },
      { name: "C++", level: "Proficient", icon: "Code", description: "Data structures, Algorithms, AST parsers, STL", color: "#0ea5e9" },
      { name: "SQL", level: "Advanced", icon: "Database", description: "PostgreSQL, complex analytical joins, indexing", color: "#38bdf8" },
      { name: "JavaScript / TypeScript", level: "Proficient", icon: "FileCode", description: "React, Three.js, Modern ESNext, Node.js", color: "#eab308" },
      { name: "Kotlin", level: "Familiar", icon: "Smartphone", description: "Modern Android application foundations", color: "#a855f7" }
    ]
  },
  {
    title: "Data Analytics & Forecasting",
    skills: [
      { name: "Pandas & NumPy", level: "Core Specialist", icon: "Activity", description: "High-volume data wrangling, vectorization, aggregation", color: "#06b6d4" },
      { name: "Prophet Time Series", level: "Advanced", icon: "TrendingUp", description: "Additive trend decomposition, seasonality forecasting", color: "#10b981" },
      { name: "Power BI & Dashboards", level: "Advanced", icon: "BarChart3", description: "Interactive data storytelling, KPI drill-downs", color: "#eab308" },
      { name: "Streamlit", level: "Advanced", icon: "Laptop", description: "Rapid prototyping of interactive AI / ML data apps", color: "#ef4444" },
      { name: "Web Scraping", level: "Advanced", icon: "Globe", description: "BeautifulSoup, Selenium, automated data ingestion", color: "#8b5cf6" }
    ]
  },
  {
    title: "Backend & Systems",
    skills: [
      { name: "FastAPI", level: "Advanced", icon: "Zap", description: "Asynchronous REST APIs, Pydantic schemas, Swagger", color: "#10b981" },
      { name: "PostgreSQL", level: "Proficient", icon: "Database", description: "Relational data design, indexing, ACID transactions", color: "#3b82f6" },
      { name: "Git & GitHub", level: "Advanced", icon: "GitBranch", description: "Branching strategies, CI/CD, collaborative workflows", color: "#f97316" },
      { name: "Linux & Bash", level: "Proficient", icon: "Terminal", description: "Shell scripting, server management, CLI tooling", color: "#a855f7" },
      { name: "Three.js & Graphics", level: "Creative", icon: "Box", description: "3D scenes, particle physics, WebGL canvas shaders", color: "#06b6d4" }
    ]
  }
];

export const TIMELINE_DATA: TimelineItem[] = [
  {
    year: "2024 - Present",
    period: "Undergraduate Degree",
    title: "B.Tech Undergraduate Scholar",
    organization: "Indian Institute of Technology Indore (IIT Indore)",
    location: "Indore, India",
    description: "Pursuing Bachelor of Technology with intensive coursework in Applied Mathematics, Computational Methods, and self-directed research in Machine Learning, RAG, and Autonomous Systems. Active in IITISOC and technical initiatives.",
    tags: ["IIT Indore", "Applied Mathematics", "AI/ML", "Algorithms"]
  },
  {
    year: "2025",
    period: "Production Engineering",
    title: "RAG & LLM Architect",
    organization: "Independent R&D / Open Source",
    location: "IIT Indore",
    description: "Designed and benchmarked the RAG-based multi-document QA engine achieving 95% Recall@3 and 31ms latency using BGE embeddings, FAISS, and Groq-powered Llama 3.1. Explored token-budget compression and cross-encoder re-ranking.",
    tags: ["RAG", "FAISS", "Groq Llama 3.1", "FastAPI"]
  },
  {
    year: "2025 - 2026",
    period: "Autonomous Systems",
    title: "Multi-Agent & Quantitative Intelligence",
    organization: "Open Source / Projects",
    location: "IIT Indore",
    description: "Built multi-agent coordination frameworks and quantitative financial screeners (Prophet time-series + LangChain chatbot). Developed specialized document intelligence systems parsing legal deeds and contracts.",
    tags: ["Multi-Agent", "Prophet ML", "Time Series", "Document AI"]
  },
  {
    year: "Current & Future",
    period: "Career Horizon",
    title: "Applied AI Engineer / Researcher",
    organization: "Open for Opportunities",
    location: "Global / Remote / On-Site",
    description: "Actively seeking summer internships, research fellowships, and full-time engineering roles in Applied AI, LLM Systems, and Quantitative Analytics where cutting-edge engineering meets real-world scale.",
    tags: ["AI Engineer", "MLOps", "LLM Systems", "Research"]
  }
];

export const WHAT_I_DO_DATA = [
  {
    number: "01",
    title: "RETRIEVAL-AUGMENTED GENERATION (RAG)",
    subtitle: "Enterprise Semantic Retrieval",
    description: "I build high-throughput RAG systems that query gigabytes of heterogeneous documents with ultra-low latency and verifiable citation grounding.",
    skills: ["Dense & Sparse Retrieval", "FAISS Vector Indexing", "BGE Embeddings", "Cross-Encoder Rerankers", "FastAPI Streaming", "Groq Inference"],
    accent: "from-cyan-500/20 to-blue-500/10",
    border: "border-cyan-500/40"
  },
  {
    number: "02",
    title: "AUTONOMOUS MULTI-AGENT SYSTEMS",
    subtitle: "Intelligent Workflow Orchestration",
    description: "Architecting cooperative LLM agents capable of autonomous research, web data scraping, recursive tool invocation, and self-correcting execution loops.",
    skills: ["LangGraph & LangChain", "Agent Tool Use", "ReAct Framework", "Multi-Agent Collaboration", "Context Memory State", "AsyncIO Execution"],
    accent: "from-violet-500/20 to-purple-500/10",
    border: "border-violet-500/40"
  },
  {
    number: "03",
    title: "QUANTITATIVE ANALYTICS & FORECASTING",
    subtitle: "Predictive Machine Learning",
    description: "Transforming raw time series and tabular datasets into actionable market forecasts, risk indicators, and automated interactive business intelligence dashboards.",
    skills: ["Prophet Time Series", "Technical Indicators (RSI, MACD)", "Pandas & NumPy", "Power BI Dashboards", "Streamlit Apps", "Statistical Inference"],
    accent: "from-emerald-500/20 to-teal-500/10",
    border: "border-emerald-500/40"
  },
  {
    number: "04",
    title: "HIGH-PERFORMANCE FULL-STACK PLATFORMS",
    subtitle: "End-to-End Production Software",
    description: "Developing robust backends, interactive 3D WebGL interfaces, and high-performance C++ systems to deliver AI capabilities directly into the hands of users.",
    skills: ["FastAPI & REST APIs", "Modern C++ (C++17)", "Three.js & WebGL", "React & TypeScript", "PostgreSQL", "Docker & Linux"],
    accent: "from-amber-500/20 to-orange-500/10",
    border: "border-amber-500/40"
  }
];
