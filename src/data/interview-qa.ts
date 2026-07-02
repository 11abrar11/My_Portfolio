/**
 * AI Interview — Static question/answer data.
 * 
 * Each question has multiple answer variations. The streamer will pick one
 * at random so the experience feels natural on repeat visits.
 * 
 * Replace/extend these with real content once Abrar provides it.
 */

export interface QA {
  id: string;
  question: string;
  answers: string[]; // multiple variations — one is picked per session
  category: "intro" | "project" | "technical" | "personal";
}

export const SUGGESTED_PROMPTS: QA[] = [
  {
    id: "tell-me-about-yourself",
    question: "Tell me about yourself",
    category: "intro",
    answers: [
      `I'm Mohammed Abrar Hussain, an AI Engineer focused on building production-ready systems that solve real-world problems. My work sits at the intersection of machine learning, backend engineering, and intelligent automation.\n\nOver the past couple of years, I've built AI voice agents, WhatsApp automation pipelines, and RAG-based architectures that are actually deployed and used by real businesses — not just demos.\n\nI care deeply about systems that work reliably under pressure, not just in ideal conditions.`,
    ],
  },
  {
    id: "voice-agent",
    question: "Explain your AI Voice Agent",
    category: "project",
    answers: [
      `The AI Voice Agent is a real-time phone call system that can handle inbound and outbound calls autonomously.\n\nHere's how it works:\n\n**Speech → Text:** Incoming audio is transcribed using OpenAI Whisper for near-real-time accuracy.\n\n**Reasoning:** A LangGraph-based agent processes the transcript, decides the next action, and generates a response. It has access to tools like CRM lookups, appointment booking, and FAQ retrieval.\n\n**Text → Speech:** The response is synthesised back into natural-sounding audio and streamed to the caller.\n\nThe entire pipeline runs in under 800ms latency on average — fast enough to feel conversational. It's deployed on a Linux server behind Nginx with Docker for isolation.`,
    ],
  },
  {
    id: "rag-architecture",
    question: "Explain your RAG architecture",
    category: "technical",
    answers: [
      `RAG — Retrieval-Augmented Generation — is the foundation of most of my AI systems.\n\nRather than relying purely on an LLM's training data, I pair it with a vector database. Here's the pipeline:\n\n1. **Ingestion:** Documents are chunked, embedded using a sentence-transformer or OpenAI embeddings, and stored in Qdrant.\n\n2. **Retrieval:** At query time, the user's question is embedded and a cosine-similarity search returns the top-k most relevant chunks.\n\n3. **Generation:** Those chunks are injected into the LLM's context window as grounding evidence, and the model generates an answer anchored to real information.\n\nThis prevents hallucination, keeps the model up-to-date, and makes responses auditable. I've built this pattern for both customer-facing chatbots and internal knowledge tools.`,
    ],
  },
  {
    id: "docker",
    question: "Tell me about Docker in your work",
    category: "technical",
    answers: [
      `Docker is in every project I ship.\n\nEvery service I build — whether it's a FastAPI backend, a Celery worker, or an n8n automation node — lives in its own container. This gives me reproducible builds, zero dependency conflicts, and clean rollbacks.\n\nMy typical stack for a production deployment:\n- Multi-stage Dockerfiles to keep image sizes small\n- Docker Compose for local orchestration\n- Nginx as a reverse proxy in front of the containers\n- Persistent volumes for databases like PostgreSQL and Qdrant\n\nIt also makes handoff simple — anyone can spin up the entire environment with a single command.`,
    ],
  },
  {
    id: "challenges",
    question: "What challenges did you face?",
    category: "personal",
    answers: [
      `The hardest challenge in AI engineering isn't the models — it's reliability.\n\nEarly on, I'd build something that worked perfectly in testing, then fall apart under real-world conditions. Ambiguous inputs, unexpected edge cases, latency spikes, token limits — production surfaces all of it immediately.\n\nWhat changed my approach was building with failure in mind first. Every pipeline I design now has explicit fallback paths, logging, and graceful degradation. If the LLM returns garbage, the system catches it before the user ever sees it.\n\nThe second challenge was latency in voice systems. Shaving 200ms off a speech pipeline feels invisible as a metric but completely transforms the user experience. That kind of work taught me to measure everything.`,
    ],
  },
  {
    id: "why-hire",
    question: "Why should we hire you?",
    category: "personal",
    answers: [
      `Because I build things that actually work — not proof-of-concepts that need six months of productionisation before they're useful.\n\nMy background forces me to own the full stack: the AI reasoning layer, the API that wraps it, the infrastructure it runs on, and the reliability that keeps it up at 3am.\n\nI don't treat AI as magic. I treat it as engineering — with the same rigour around error handling, observability, and maintainability that any good system deserves.\n\nIf you're building AI products that need to work reliably for real users, I'm the engineer who's already done that.`,
    ],
  },
  {
    id: "whatsapp-assistant",
    question: "Tell me about your WhatsApp AI Assistant",
    category: "project",
    answers: [
      `The WhatsApp AI Assistant is an automated business communication agent that handles customer queries, qualifies leads, and books appointments — all within WhatsApp.\n\nIt's built on the WhatsApp Business API, with n8n handling the webhook orchestration and a FastAPI service providing the AI brain.\n\nThe agent uses a RAG pipeline to answer FAQs from the business's knowledge base, LangGraph to manage multi-turn conversation state, and integrates directly with Google Calendar for booking.\n\nThe key design constraint was that every response had to feel human — not robotic. That meant careful prompt engineering, natural language timing, and handling ambiguous user messages gracefully rather than just failing.`,
    ],
  },
];
