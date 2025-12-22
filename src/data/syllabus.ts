export interface SyllabusTopic {
    title: string;
    description: string;
}

export interface SyllabusModule {
    id: string;
    number: number;
    name: string;
    hours: number;
    overview: string;
    learningOutcomes: string[];
    topics: SyllabusTopic[];
}

export const syllabusData: SyllabusModule[] = [
    {
        id: "m1",
        number: 1,
        name: "Foundations of Agentic AI",
        hours: 3,
        overview: "Explore the core concepts of AI agents, their evolution from traditional LLMs, and the fundamental Perceive-Reason-Act loop.",
        learningOutcomes: [
            "Define AI Agents and their key characteristics.",
            "Understand the internal architecture of agentic systems.",
            "Explain the Agent Loop (P-R-A).",
            "Identify ethical and safety risks in autonomous systems."
        ],
        topics: [
            {
                title: "Introduction to AI Agents",
                description: "Definition, evolution from LLMs, and key characteristics: autonomy, goal-orientation, perception, and reactivity."
            },
            {
                title: "The Agent Loop and Core Components",
                description: "Deep dive into the Perceive-Reason-Act (P-R-A) cycle and the roles of LLM, Memory, Tools, and State."
            },
            {
                title: "Memory and Context Management",
                description: "Short-term vs. Long-term memory, Vector Databases, and Retrieval-Augmented Generation (RAG) mechanisms."
            },
            {
                title: "Ethical and Safety Considerations",
                description: "Misalignment risks, the 'Black Box' problem, security sandboxing, and Principle of Least Privilege."
            }
        ]
    },
    {
        id: "m2",
        number: 2,
        name: "Agent Architectures and Design Patterns",
        hours: 4,
        overview: "Master the structural patterns used to build reliable agents, from single-agent reflex models to complex multi-agent orchestrations.",
        learningOutcomes: [
            "Distinguish between Reflex, Model-based, and Goal-based architectures.",
            "Implement the ReAct pattern for transparent reasoning.",
            "Design multi-agent coordination workflows.",
            "Apply Planner-Executor and Critic patterns."
        ],
        topics: [
            {
                title: "Single-Agent Architectures",
                description: "Simple Reflex, Model-Based, Goal-Based, and Utility-Based agents."
            },
            {
                title: "Multi-Agent Systems (MAS) Fundamentals",
                description: "Need for collaboration, specialization, robustness, and coordination mechanisms (Hierarchical vs. P2P)."
            },
            {
                title: "Agent Orchestration and Workflow",
                description: "Task decomposition, dynamic planning, and feedback loops for self-correction."
            },
            {
                title: "Practical Design Patterns",
                description: "Deep dive into ReAct (Reasoning and Acting), Planner-Executor, and the Critic Pattern."
            }
        ]
    },
    {
        id: "m3",
        number: 3,
        name: "Tool Use and Integration",
        hours: 4,
        overview: "Learn how to give agents 'hands' by integrating external tools, APIs, and sandboxed environments for real-world interaction.",
        learningOutcomes: [
            "Define tool schemas that LLMs can understand.",
            "Handle tool-calling errors and argument generation.",
            "Optimize RAG for high-accuracy retrieval.",
            "Design secure, atomic tools for complex tasks."
        ],
        topics: [
            {
                title: "The Concept of Tools",
                description: "Interpreting tools as external capabilities, schema definition, and the importance of a curated Tool Library."
            },
            {
                title: "Tool-Calling Mechanisms",
                description: "The LLM decision process, argument generation, and advanced error handling/recovery."
            },
            {
                title: "RAG Deep Dive",
                description: "Chunking strategies, Embedding models, and query optimization techniques like HyDE."
            },
            {
                title: "Security and Sandboxing",
                description: "Implementing execution isolation using Docker/gVisor and enforcing Principle of Least Privilege."
            }
        ]
    },
    {
        id: "m4",
        number: 4,
        name: "Agentic Frameworks and Implementation",
        hours: 4,
        overview: "Gain hands-on experience with industry-standard frameworks like LangChain, AutoGen, and CrewAI to build production-ready systems.",
        learningOutcomes: [
            "Build dynamic agents using LangChain and LangGraph.",
            "Implement conversational programming with AutoGen.",
            "Create role-based multi-agent teams with CrewAI.",
            "Deploy and monitor agents in containerized environments."
        ],
        topics: [
            {
                title: "Introduction to Agentic Frameworks",
                description: "Overview of LangChain, AutoGen, and CrewAI, and choosing the right tool for the job."
            },
            {
                title: "Deep Dive: LangChain & LangGraph",
                description: "Building chains, agents, and state-machine workflows for complex loops and HITL."
            },
            {
                title: "AutoGen & CrewAI Implementation",
                description: "Conversational programming, user proxy agents, and role-based backstories for structured teamwork."
            },
            {
                title: "Deployment and Monitoring",
                description: "Containerization (Docker), Serverless deployment (AWS Lambda), and comprehensive logging of the Agent Loop."
            }
        ]
    },
    {
        id: "m5",
        number: 5,
        name: "Advanced Topics and Real-World Applications",
        hours: 3,
        overview: "Apply your knowledge to solve enterprise-scale problems and explore the future trajectory of autonomous AI systems.",
        learningOutcomes: [
            "Identify high-value business processes for agentic automation.",
            "Scale agents using asynchronous execution and parallelization.",
            "Understand emerging market trends and regulatory landscapes.",
            "Complete a Capstone project: Autonomous Content Creation Crew."
        ],
        topics: [
            {
                title: "Agentic Business Process Automation",
                description: "Case studies in Devin-style code agents, Finance/Investment Analysis, and Customer Support Triage."
            },
            {
                title: "Scaling and Performance Optimization",
                description: "Asynchronous execution, parallelization, hierarchical model use, and result caching."
            },
            {
                title: "The Future of Agentic AI",
                description: "Market trends, ubiquitous personalized agents, standardization, and governance/regulation."
            },
            {
                title: "Capstone Project",
                description: "Building an Autonomous Content Creation Crew: A multi-agent system for research, drafting, and critique."
            }
        ]
    }
];
