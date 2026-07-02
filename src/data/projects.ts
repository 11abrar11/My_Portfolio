export interface ProjectHighlight {
  label: string;
  detail: string;
}

export interface ProjectStat {
  label: string;
  value: string;
}

export interface ProjectData {
  id: string;
  category: string;
  title: string;
  description: string;
  tech: string[];
  highlights: ProjectHighlight[];
  cta: { label: string; href: string };
  accentColor: string; // subtle tint per card
}

export const PROJECTS: ProjectData[] = [
  {
    id: "ai-voice-agent",
    category: "Real-time Conversational Infrastructure",
    title: "AI Voice Agent",
    description:
      "An autonomous inbound/outbound phone agent achieving sub-800ms end-to-end latency. Integrates speech-to-text, LLM reasoning chains, and neural TTS into a single low-latency pipeline built for zero-downtime production environments.",
    tech: ["Python", "FastAPI", "Whisper", "LangGraph", "Docker", "WebRTC"],
    highlights: [
      { label: "Latency", detail: "< 800ms end-to-end" },
      { label: "Architecture", detail: "Event-driven microservices" },
      { label: "Reliability", detail: "99.9% uptime SLA design" },
    ],
    cta: { label: "Explore Architecture", href: "#" },
    accentColor: "rgba(59, 130, 246, 0.12)",
  },
  {
    id: "whatsapp-assistant",
    category: "Enterprise RAG on Messaging Rails",
    title: "WhatsApp AI Assistant",
    description:
      "Production-grade business communication agent operating inside WhatsApp. Handles customer queries, lead qualification, and appointment booking via a custom Retrieval-Augmented Generation pipeline grounded on company knowledge bases.",
    tech: ["n8n", "WhatsApp API", "RAG", "PostgreSQL", "OpenAI", "Qdrant"],
    highlights: [
      { label: "RAG Pipeline", detail: "Hybrid semantic + keyword search" },
      { label: "Scale", detail: "10,000+ queries / month" },
      { label: "Resolution", detail: "85% autonomous resolution rate" },
    ],
    cta: { label: "View Case Study", href: "#" },
    accentColor: "rgba(34, 197, 94, 0.08)",
  },
  {
    id: "workflow-automation",
    category: "Intelligent Process Automation",
    title: "Workflow Automation & AI Invoice Generator",
    description:
      "End-to-end business automation system integrating document intelligence with structured extraction. Generates, validates, and routes invoices autonomously using multi-agent orchestration and LLM-powered document parsing.",
    tech: ["LangChain", "n8n", "OpenAI", "Python", "PostgreSQL", "REST APIs"],
    highlights: [
      { label: "Document Intelligence", detail: "Structured LLM extraction" },
      { label: "Automation", detail: "Multi-agent orchestration" },
      { label: "Integration", detail: "ERP-ready REST pipeline" },
    ],
    cta: { label: "View Case Study", href: "#" },
    accentColor: "rgba(168, 85, 247, 0.08)",
  },
];
