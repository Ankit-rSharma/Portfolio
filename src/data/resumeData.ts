export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  highlights: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  location: string;
  duration: string;
  details: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  highlights: string[];
}

export interface ResumeData {
  personal: {
    name: string;
    title: string;
    email: string;
    phone: string;
    linkedin: string;
    leetcode: string;
    summary: string;
  };
  skills: {
    category: string;
    items: string[];
  }[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
  achievements: string[];
}

export const resumeData: ResumeData = {
  personal: {
    name: "Ankit Sharma",
    title: "Software Development Engineer",
    email: "ankitsharma.dev@outlook.com",
    phone: "+91-6377871942",
    linkedin: "linkedin.com/in/ankitsharma-dev",
    leetcode: "leetcode.com/u/ankitsharma-dev",
    summary: "Results-driven Backend Engineer with hands-on experience designing scalable microservices, distributed systems, and event-driven architectures. Proven expertise in orchestrating complex asynchronous workflows and standardizing system observability."
  },
  skills: [
    { category: "Languages", items: ["Java", "Python", "SQL"] },
    { category: "Backend & Frameworks", items: ["Spring Boot", "Temporal", "JUnit", "Testcontainers", "GraphQL", "REST APIs"] },
    { category: "Databases", items: ["PostgreSQL", "MySQL", "Elasticsearch"] },
    { category: "Messaging & Streaming", items: ["Apache Kafka", "GCP Pub/Sub", "Debezium (CDC)"] },
    { category: "Cloud & DevOps", items: ["AWS (ECS, EC2)", "GCP (GKE)", "Docker", "Jenkins", "Nexus Repository", "OpenTelemetry", "New Relic"] }
  ],
  experience: [
    {
      id: "aeo",
      company: "American Eagle Outfitters",
      role: "Software Development Engineer I",
      location: "Remote",
      startDate: "May 2025",
      endDate: "Present",
      highlights: [
        "Architected an asynchronous appeasement settlement engine utilizing GCP Pub/Sub, achieving 99.9% processing reliability via strict idempotency guarantees and robust dead-letter queue (DLQ) handling.",
        "Built and deployed a greenfield Spring Boot appeasement microservice to replace a legacy Oracle ATG monolith, successfully scaling the backend to handle 10,000+ daily requests in a read-heavy production environment.",
        "Developed an event-driven data pipeline leveraging Apache Kafka, Avro schemas, and Debezium CDC to reliably stream 50,000+ daily events into downstream audit services.",
        "Designed a reusable Spring Boot Error Handling Starter Library and drove platform-wide adoption, significantly improving system observability and standardizing API fault responses.",
        "Led fleet-wide infrastructure observability migration from New Relic agents to OpenTelemetry (OTEL), configuring a centralized OTEL collector to streamline telemetry data."
      ]
    },
    {
      id: "beepkart",
      company: "Beepkart",
      role: "Software Development Engineer I",
      location: "Bangalore, India",
      startDate: "Aug 2023",
      endDate: "April 2025",
      highlights: [
        "Orchestrated complex, multi-day distributed business workflows using the Temporal SDK in Java, guaranteeing state consistency and automating critical seller-lead refurbishment processes.",
        "Optimized database query performance by migrating slow SQL filters to a real-time Elasticsearch index via Debezium (CDC), slashing query latency by 80%.",
        "Deployed an automated AI-powered image processing pipeline leveraging Python and PyTorch, reaching 95% orientation detection accuracy and accelerating bike listing approvals by 40%.",
        "Streamlined enterprise CI/CD workflows by migrating internal deployment libraries to a centralized Nexus Repository, reducing Jenkins pipeline build times by 50%.",
        "Developed a shared encryption library to secure highly sensitive customer PII stored across the MySQL ecosystem, ensuring rigorous GDPR compliance.",
        "Engineered a conversational AI agent using Dialogflow CX to automate customer inquiries, handling high daily volumes and driving a 30% reduction in manual support tickets."
      ]
    }
  ],
  education: [
    {
      id: "mca",
      institution: "Vellore Institute of Technology (VIT)",
      degree: "Master of Computer Applications (MCA)",
      location: "Vellore, India",
      duration: "2022 - 2024",
      details: "CGPA: 9.58/10.0 (Top 5 of batch)"
    },
    {
      id: "bca",
      institution: "University of Rajasthan",
      degree: "Bachelor of Computer Applications (BCA)",
      location: "Rajasthan, India",
      duration: "2019 - 2022",
      details: "75.2%"
    }
  ],
  projects: [
    {
      id: "gateway",
      title: "Resilient API Gateway",
      description: "Designed a centralized, fault-tolerant API gateway utilizing Spring Cloud Gateway and Redis to enforce distributed rate limiting, reducing backend failures by 35% under high load.",
      highlights: []
    },
    {
      id: "orchestrator",
      title: "Fault-Tolerant Job Orchestrator",
      description: "Developed a scalable distributed task queue system using Python and RabbitMQ to efficiently manage asynchronous background job processing, cutting overall processing time by 70%.",
      highlights: []
    }
  ],
  achievements: [
    "Published Author: Co-authored the book Application of Artificial Intelligence in Agriculture (ISBN: 978-620-6-18156-9).",
    "LeetCode Knight Badge: Solved 600+ computational problems, ranking in the top 5% of global users for advanced problem-solving."
  ]
};
