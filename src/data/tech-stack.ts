export interface TechSkill {
  name: string;
  category: string;
  description: string;
  accentColor: string;
  logoUrl: string;
}

export const TECH_STACK: TechSkill[] = [
  {
    name: "Python",
    category: "Core Language",
    description: "Primary language for orchestrating AI agents, building robust backend services, and executing complex data pipelines.",
    accentColor: "rgba(55, 118, 171, 0.5)",
    logoUrl: "https://cdn.simpleicons.org/python",
  },
  {
    name: "FastAPI",
    category: "Backend Framework",
    description: "High-performance API development with async support, ensuring sub-second latencies for real-time AI endpoints.",
    accentColor: "rgba(0, 150, 136, 0.5)",
    logoUrl: "https://cdn.simpleicons.org/fastapi",
  },
  {
    name: "Docker",
    category: "Infrastructure",
    description: "Containerizing AI workloads for consistent, isolated deployments across development, staging, and production environments.",
    accentColor: "rgba(36, 150, 237, 0.5)",
    logoUrl: "https://cdn.simpleicons.org/docker",
  },
  {
    name: "PostgreSQL",
    category: "Database",
    description: "Robust relational data storage for user metadata, conversational histories, and complex transactional logic.",
    accentColor: "rgba(51, 103, 145, 0.5)",
    logoUrl: "https://cdn.simpleicons.org/postgresql",
  },
  {
    name: "Qdrant",
    category: "Vector Database",
    description: "High-performance vector search engine powering semantic retrieval in enterprise RAG pipelines.",
    accentColor: "rgba(255, 60, 90, 0.5)",
    logoUrl: "https://cdn.simpleicons.org/qdrant",
  },
  {
    name: "Gemini",
    category: "Large Language Model",
    description: "Google's frontier model utilized for multimodal reasoning, lightning-fast generation, and complex logic extraction.",
    accentColor: "rgba(66, 133, 244, 0.5)",
    logoUrl: "https://cdn.simpleicons.org/googlegemini",
  },
  {
    name: "OpenAI",
    category: "Large Language Model",
    description: "Leveraging GPT-4 and GPT-4o for nuanced conversational agents and zero-shot reasoning capabilities.",
    accentColor: "rgba(16, 163, 127, 0.5)",
    logoUrl: "https://cdn.simpleicons.org/openai/FFFFFF",
  },
  {
    name: "Whisper STT",
    category: "Audio Intelligence",
    description: "State-of-the-art automatic speech recognition for transcribing real-time inbound audio streams.",
    accentColor: "rgba(255, 255, 255, 0.3)",
    logoUrl: "https://cdn.simpleicons.org/openai/FFFFFF",
  },
  {
    name: "Kokoro TTS",
    category: "Audio Intelligence",
    description: "Ultra-realistic text-to-speech generation for creating lifelike voice agents with natural prosody.",
    accentColor: "rgba(234, 88, 12, 0.5)",
    logoUrl: "https://cdn.simpleicons.org/audacity", // Using Audacity logo for audio
  },
  {
    name: "Embedding Models",
    category: "Vectorization",
    description: "Translating complex documents and semantic concepts into dense high-dimensional vectors for similarity search.",
    accentColor: "rgba(99, 102, 241, 0.5)",
    logoUrl: "https://cdn.simpleicons.org/huggingface",
  },
  {
    name: "LangGraph",
    category: "Agent Orchestration",
    description: "Designing cyclic computational graphs to build reliable, stateful, and autonomous multi-agent systems.",
    accentColor: "rgba(255, 100, 100, 0.5)",
    logoUrl: "https://cdn.simpleicons.org/langchain",
  },
  {
    name: "LangChain",
    category: "LLM Framework",
    description: "The foundational framework for connecting LLMs to external data sources, tools, and memory modules.",
    accentColor: "rgba(50, 150, 50, 0.5)",
    logoUrl: "https://cdn.simpleicons.org/langchain",
  },
  {
    name: "n8n",
    category: "Workflow Automation",
    description: "Visual node-based orchestration for connecting APIs, databases, and AI models into seamless autonomous business pipelines.",
    accentColor: "rgba(234, 76, 137, 0.5)",
    logoUrl: "https://cdn.simpleicons.org/n8n",
  },
  {
    name: "RAG",
    category: "Architecture",
    description: "Retrieval-Augmented Generation for grounding LLMs in proprietary enterprise data to eliminate hallucinations.",
    accentColor: "rgba(128, 90, 213, 0.5)",
    logoUrl: "https://cdn.simpleicons.org/databricks", 
  },
  {
    name: "MCP",
    category: "AI Protocol",
    description: "Model Context Protocol integration allowing AI agents to dynamically interact with custom local and remote tools.",
    accentColor: "rgba(245, 158, 11, 0.5)",
    logoUrl: "https://cdn.simpleicons.org/anthropic/FFFFFF",
  },
  {
    name: "REST APIs",
    category: "Integration",
    description: "Designing stateless, scalable, and secure API architectures to serve as the backbone of AI communication.",
    accentColor: "rgba(75, 85, 99, 0.5)",
    logoUrl: "https://cdn.simpleicons.org/postman",
  },
  {
    name: "Linux & Nginx",
    category: "Infrastructure",
    description: "Server administration, load balancing, and reverse proxying for deploying high-availability AI services.",
    accentColor: "rgba(252, 198, 36, 0.5)",
    logoUrl: "https://cdn.simpleicons.org/linux/FFFFFF",
  },
  {
    name: "GitHub",
    category: "Version Control",
    description: "Advanced branching strategies, collaborative workflows, and CI/CD integration for robust software lifecycles.",
    accentColor: "rgba(255, 255, 255, 0.5)",
    logoUrl: "https://cdn.simpleicons.org/github/FFFFFF",
  },
  {
    name: "Antigravity",
    category: "Agentic Engineering",
    description: "Powered by advanced agentic AI coding assistants for ultra-rapid prototyping and complex architectural orchestration.",
    accentColor: "rgba(66, 133, 244, 0.5)",
    logoUrl: "https://cdn.simpleicons.org/googledeepmind/FFFFFF",
  }
];
