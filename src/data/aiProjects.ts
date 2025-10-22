
export interface AIProject {
  name: string;
  category: 'AI/ML Engineering' | 'Full-Stack Development';
  year: string;
  description: string;
  technologies: string[];
}

export const aiProjects: AIProject[] = [
  {
    name: "Cognitive Conversation Deck",
    category: "AI/ML Engineering",
    year: "2024-2025",
    description: "Privacy-first AI agent platform with RAG capabilities for document and video knowledge management. Built with FastAPI, React, Ollama LLMs, and OpenSearch for vector search, featuring email ingestion, Whisper voice processing, and LangGraph multi-agent orchestration.",
    technologies: ["FastAPI", "React", "Ollama", "OpenSearch", "RAG", "Whisper", "LangGraph"]
  },
  {
    name: "Agent Nexus 85",
    category: "AI/ML Engineering",
    year: "2024-2025",
    description: "Multi-agent orchestration system enabling coordinated AI task execution through specialized agents (Research, Code, Planning, Review). Implemented using FastAPI, React, Memgraph graph database, and Ollama, with WebSocket support, JWT authentication, and enterprise-grade rate limiting.",
    technologies: ["FastAPI", "React", "Memgraph", "Ollama", "WebSocket", "JWT", "Multi-Agent Systems"]
  },
  {
    name: "Luminous Email Agent",
    category: "AI/ML Engineering",
    year: "2024-2025",
    description: "AI-powered email productivity platform with intelligent agentic pipelines for automated email classification, summarization, and reply generation. Built with Flask, React, Auth0, LangGraph workflows, and multi-account IMAP/SMTP support backed by PostgreSQL, Redis, and OpenSearch.",
    technologies: ["Flask", "React", "Auth0", "LangGraph", "PostgreSQL", "Redis", "OpenSearch", "IMAP/SMTP"]
  },
  {
    name: "Knowledge Nexus Secure View",
    category: "AI/ML Engineering",
    year: "2024-2025",
    description: "Secure knowledge base with RAG-powered Q&A for analyzing organizational email patterns and communication flows. Features React-based visualization with D3.js and Neo4j, FastAPI backend, OpenSearch semantic search, role-based access control, and Prometheus metrics integration.",
    technologies: ["React", "D3.js", "Neo4j", "FastAPI", "OpenSearch", "RAG", "RBAC", "Prometheus"]
  },
  {
    name: "PKI-AD Match",
    category: "AI/ML Engineering",
    year: "2024-2025",
    description: "ML-powered CV optimization engine that analyzes candidate profiles against job requirements using NLP to provide actionable improvement suggestions. Developed with FastAPI, React, and custom ML algorithms for gap analysis and dynamic content rewriting.",
    technologies: ["FastAPI", "React", "NLP", "ML", "Gap Analysis"]
  },
  {
    name: "LogPT",
    category: "AI/ML Engineering",
    year: "2024-2025",
    description: "Intelligent log analysis utility leveraging Ollama API for automated error detection and interpretation in system logs. Implements pattern matching, contextual error extraction, SMTP alerting, and file system monitoring using Python 3.11.",
    technologies: ["Python 3.11", "Ollama", "Pattern Matching", "SMTP", "File System Monitoring"]
  },
  {
    name: "Status Synth",
    category: "Full-Stack Development",
    year: "2024-2025",
    description: "Real-time infrastructure monitoring dashboard integrating Uptime Kuma, Proxmox VE, Wazuh SIEM, and UniFi metrics. Developed with React, TypeScript, Recharts visualization, and deployed via Kubernetes Helm charts with 15+ templates including HPA and ServiceMonitor.",
    technologies: ["React", "TypeScript", "Recharts", "Kubernetes", "Helm", "Prometheus", "Wazuh"]
  }
];

export const projectTechnologies = {
  "AI/ML Stack": ["Ollama", "LangChain", "LangGraph", "Whisper", "CLIP", "RAG", "Vector Databases (ChromaDB, OpenSearch)", "NLP/ML"],
  "Frontend": ["React", "TypeScript", "Vite", "Shadcn UI", "Tailwind CSS", "D3.js", "Recharts", "Leaflet"],
  "Backend": ["FastAPI", "Flask", "Django", "Python 3.8+", "PostgreSQL", "Redis", "Neo4j", "Memgraph"],
  "DevOps": ["Docker", "Kubernetes", "Helm", "GitLab CI/CD", "Nginx", "Prometheus", "CUDA GPU Optimization"],
  "Security": ["Authelia", "Auth0 JWT/OIDC", "PKI/Certificate Management", "RBAC", "Input Validation", "Rate Limiting"]
};
