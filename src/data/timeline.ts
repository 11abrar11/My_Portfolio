import { 
  GraduationCap, 
  Briefcase, 
  Award, 
  Bot,
  BrainCircuit,
  MessageSquare,
  BookOpen
} from "lucide-react";
import React from "react";

export interface TimelineData {
  id: string;
  year: string;
  title: string;
  organization?: string;
  metrics?: string;
  description: string;
  iconName: string;
  isMajorProject?: boolean;
}

export const TIMELINE: TimelineData[] = [
  {
    id: "sslc-2019",
    year: "2019",
    title: "SSLC",
    organization: "New Noble English High School",
    metrics: "Score: 86.56%",
    description: "Completed secondary education with a strong academic foundation in mathematics, science, and analytical thinking.",
    iconName: "BookOpen",
  },
  {
    id: "puc-2021",
    year: "2021",
    title: "Pre-University (PCMC)",
    organization: "Physics • Chemistry • Mathematics • Computer Science",
    metrics: "Score: ~85%",
    description: "Built strong analytical and logical problem-solving skills while developing an interest in computer science and software development.",
    iconName: "BookOpen",
  },
  {
    id: "btech-2022-2026",
    year: "2022 – 2026",
    title: "Bachelor of Technology",
    organization: "Computer Science & Engineering",
    metrics: "CGPA: 8.13",
    description: "Studied computer science with a focus on software engineering, backend development, artificial intelligence, machine learning, databases, and cloud technologies.",
    iconName: "GraduationCap",
  },
  {
    id: "intern-2026",
    year: "Jan 2026 – May 2026",
    title: "Data Science Intern",
    organization: "Prinston Smart Engineers",
    metrics: "Duration: 5 Months",
    description: "Worked on practical Data Science and AI-related projects while gaining industry experience in Python development, machine learning workflows, data processing, and real-world software engineering practices.",
    iconName: "Briefcase",
  },
  {
    id: "cert-google",
    year: "May 7, 2026", 
    title: "Professional Generative AI Certificate",
    organization: "Google",
    description: "Completed Google's certification covering modern AI systems, large language models, prompt engineering, responsible AI, and production AI workflows.",
    iconName: "Award",
  },
  {
    id: "cert-ibm",
    year: "May 27, 2026", 
    title: "RAG & Agentic AI Professional Certificate",
    organization: "IBM",
    description: "Completed IBM's professional certification covering Retrieval-Augmented Generation (RAG), Agentic AI, vector databases, AI agents, and enterprise AI architectures.",
    iconName: "Award",
  },
  {
    id: "proj-whatsapp",
    year: "June 2026",
    title: "WhatsApp AI Assistant",
    description: "Designed and built a production-oriented AI-powered WhatsApp assistant featuring Retrieval-Augmented Generation (RAG), intelligent business automation, lead qualification, appointment booking, and knowledge retrieval.",
    iconName: "MessageSquare",
    isMajorProject: true,
  },
  {
    id: "proj-voice",
    year: "July 2026",
    title: "AI Voice Agent",
    description: "Designed and developed a real-time conversational AI Voice Agent with streaming speech recognition, large language model integration, natural voice interaction, and production-ready backend architecture.",
    iconName: "BrainCircuit",
    isMajorProject: true,
  }
];

export const TIMELINE_ICON_MAP: Record<string, React.FC<any>> = {
  GraduationCap,
  Briefcase,
  Award,
  Bot,
  BrainCircuit,
  MessageSquare,
  BookOpen
};
