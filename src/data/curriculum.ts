// Curriculum data structure for the Agentic AI Learning Platform
export interface SubTopic {
  title: string;
  content: string;
}

export interface Topic {
  id: string;
  number: string;
  title: string;
  subtopics: SubTopic[];
}

export interface Module {
  id: string;
  number: number;
  name: string;
  hours: number;
  description: string;
  topics: Topic[];
}

export const curriculum: Module[] = [
  {
    id: "module-1",
    number: 1,
    name: "Foundations of Agentic AI",
    hours: 3,
    description: "Introduction to AI agents, the agent loop, memory management, and ethical considerations.",
    topics: [
      {
        id: "1.1",
        number: "1.1",
        title: "Introduction to AI Agents",
        subtopics: [
          {
            title: "Definition and Evolution",
            content: "An AI Agent is a system that perceives its environment through sensors, processes that information, and acts upon that environment using effectors to achieve a specific goal. \n\n**Analogy: The Digital Employee vs. The Digital Tool.** \nA traditional LLM is like a calculator—it stays silent until you press a button and gives an immediate result. An AI Agent is like a junior analyst—you give it a goal ('Analyze this market'), and it goes away, searches the web, reads reports, and returns with a structured summary without you holding its hand through every step.\n\nThe evolution of AI agents has progressed from early rule-based systems to modern LLM-powered agents:\n\n1. **Classical AI Agents**: Focused on symbolic reasoning and search algorithms (e.g., chess programs or hard-coded chat scripts).\n2. **Machine Learning Agents**: Driven by statistical models (e.g., recommendation engines or reinforcement learning agents).\n3. **LLM-Powered Agents (Agentic AI)**: Agents where the LLM serves as the \"brain\" or \"controller\", responsible for planning, reasoning, and deciding which actions (tools) to take.\n\n![Evolution of Agency]([INFOGRAPHIC:EVOLUTION])",
          },
          {
            title: "Key Characteristics",
            content: "Modern AI agents possess four defining characteristics that move them beyond standard chat interfaces:\n\n• **Autonomy**: The ability to operate without constant human 'babysitting.' The agent decides the sequence of its own actions.\n• **Goal-Oriented**: Instead of just matching a prompt's text, it optimizes for a mission (e.g., 'Ensure the code is bug-free').\n• **Perception**: It doesn't just 'read text'; it observes tool outputs, API status codes, and user feedback as environmental signals.\n• **Reactivity & Proactivity**: It reacts to errors by self-correcting and proactively plans multi-step journeys toward its destination.\n\n> [!TIP]\n> **Industry Pro-Tip**: True agency is measured by the length of the 'reasoning chain'—how many autonomous steps an agent can take before requiring human intervention.\n\n![Agent Architecture Infographic]([INFOGRAPHIC:AGENT_ARCHITECTURE])",
          },
        ],
      },
      {
        id: "1.2",
        number: "1.2",
        title: "The Agent Loop and Core Components",
        subtopics: [
          {
            title: "Iterative Agent Loop",
            content: "The fundamental operational cycle of an AI agent is the Perceive-Reason-Act (P-R-A) Loop. \n\n**Analogy: The Pilot's OODA Loop.** \nJust as a fighter pilot must **Observe** the enemy, **Orient** themselves in the sky, **Decide** on a maneuver, and then **Act**, an AI agent must constantly loop through information to survive complex tasks.\n\n1. **Perceive (Observe)**: The agent takes in new information (user input, search results, Python error messages).\n2. **Reason (Think/Plan)**: The LLM 'brain' decides if the previous action worked or if a new direction is needed.\n3. **Act (Execute)**: The agent reaches out with its 'hands' (tools) to affect the world.\n4. **Iterate**: The loop creates a 'thought trace' that provides the agent with its current status.\n\n![The Agent Loop]([INFOGRAPHIC:AGENT_LOOP])",
          },
          {
            title: "Core Components (LLM, Memory, Tools, State)",
            content: "An agentic system is more than just an LLM; it's a modular 'body' built around the LLM 'brain':\n\n![Agent Architecture Infographic]([INFOGRAPHIC:ARCHITECTURE])\n\n• **LLM (The Brain)**: The controller. It doesn't just generate text; it predicts the most logical next action.\n• **Memory (The Diary)**: Stores past successes and failures so the agent doesn't repeat mistakes.\n• **Tools (The Hands)**: APIs, Calculators, or Search Engines that give the agent 'reach' outside its training data.\n• **State (The Global Board)**: A shared record of what has been done and what remains. This ensures the agent stays on track during long-running tasks.",
          },
        ],
      },
      {
        id: "1.3",
        number: "1.3",
        title: "Memory and Context Management",
        subtopics: [
          {
            title: "Short-Term vs. Long-Term Memory",
            content: "Memory is the bridge between a simple chat and a deep project. \n\n**Analogy: The Desk vs. The Filing Cabinet.** \n• **Short-Term Memory** is your immediate desk space. It's fast to access but can only hold a few papers (the context window). \n• **Long-Term Memory** is the filing cabinet in the basement. It holds massive amounts of data, but you need an index (Search/Retrieval) to find exactly what you need.\n\nIn implementation:\n• **Context Window Management**: Sliding windows that keep the last 10 messages but summarize older ones.\n• **Vector Databases**: Turning text into numbers (vectors) to perform semantic searches at scale.\n\n![Memory Systems]([INFOGRAPHIC:MEMORY_MGMT])\n\n![RAG Pipeline Infographic]([INFOGRAPHIC:RAG_PIPELINE])",
          },
          {
            title: "Retrieval-Augmented Generation (RAG) Deep Dive",
            content: "RAG solves the 'Hallucination Problem' by forcing the agent to look at real documents before speaking.\n\n**The RAG Pipeline:**\n1. **Indexing**: Pre-processing data into 'chunks' and storing them as vectors.\n2. **Retrieval**: The agent 'looks up' relevant chunks based on the user's current intent.\n3. **Augmentation**: The LLM prompt is updated with: *'Use the following facts to answer: [Retrieved Context]'*.\n4. **Generation**: The agent produces an answer grounded in the retrieved facts, not just its training data.",
          },
        ],
      },
      {
        id: "1.4",
        number: "1.4",
        title: "Ethical and Safety Considerations",
        subtopics: [
          {
            title: "Key Risks (Misalignment, Black Box)",
            content: "As agents gain autonomy, ethical and safety considerations become paramount.\n\n• Misalignment: The agent's objective function does not perfectly align with human values, leading to unintended or harmful actions. Mitigation: Careful goal definition, human-in-the-loop oversight, and value-alignment training.\n• Black Box Problem: The LLM's reasoning process is opaque, making it difficult to understand why an agent made a specific decision or failed a task. Mitigation: Transparency using reasoning patterns like ReAct (Thought, Action, Observation) to log the agent's internal monologue.\n• Tool Misuse/Security: An agent uses its tools (e.g., code execution, web access) to perform malicious or unauthorized actions. Mitigation: Sandboxing (isolating tool execution in secure environments) and Principle of Least Privilege (granting only necessary permissions).",
          },
          {
            title: "Guardrails and Oversight",
            content: "Guardrails are mechanisms designed to constrain the agent's behavior to acceptable boundaries.\n\n• Input/Output Filters: Screening user prompts and agent responses for harmful content.\n• Tool-Use Policies: Restricting which tools can be used in certain contexts or with specific inputs.\n• Human-in-the-loop (HITL): Requiring human approval for high-stakes actions (e.g., financial transactions, deployment).\n\n![Ethical Guardrails]([INFOGRAPHIC:SAFETY])",
          },
        ],
      },
    ],
  },
  {
    id: "module-2",
    number: 2,
    name: "Agent Architectures and Design Patterns",
    hours: 4,
    description: "Explore single-agent architectures, multi-agent systems, orchestration, and practical design patterns.",
    topics: [
      {
        id: "2.1",
        number: "2.1",
        title: "Single-Agent Architectures",
        subtopics: [
          {
            title: "Architecture Types",
            content: "These architectures, derived from classical AI, describe the 'wiring' of an agent's logic.\n\n• **Simple Reflex Agent**: The 'Light Switch' of agents. It only knows what's happening *now* (e.g., *If temperature > 30, turn on fan*). \n• **Model-Based Agent**: The 'Chess Player.' It keeps a mental map of what it can't see right now to anticipate future states.\n• **Goal-Based Agent**: The 'Project Manager.' It measures every move against a final destination.\n• **Utility-Based Agent**: The 'Investor.' It doesn't just want to reach the goal; it wants to reach it with the least cost and highest efficiency.\n\n![Cognitive Agent Patterns]([MINDMAP:PATTERNS])",
          },
        ],
      },
      {
        id: "2.2",
        number: "2.2",
        title: "Multi-Agent Systems (MAS) Fundamentals",
        subtopics: [
          {
            title: "Need for Collaboration",
            content: "Real-world problems are too big for one brain. Multi-Agent Systems (MAS) allow for specialized division of labor.\n\n**Analogy: The Corporate Orchestra.** \nIn a symphony, you don't expect the violinist to also play the drums. You have specialized performers and a conductor (The Orchestrator) to sync them. Similarly, in MAS, we have a 'Researcher' agent, a 'Writer' agent, and a 'Lead' agent.\n\n• **Specialization**: Agents are prompted with specific personas (e.g., 'You are a Senior Security Auditor').\n• **Robustness**: One agent failing doesn't kill the whole process.\n\n![Multi-Agent Systems Mindmap]([MINDMAP:MULTI_AGENT])",
          },
          {
            title: "Coordination Mechanisms (Hierarchical, P2P)",
            content: "How do agents talk? \n• **Hierarchical (Manager-Worker)**: A central agent dictates the plan. Best for strictly defined workflows (e.g., CrewAI).\n• **Peer-to-Peer (P2P/Conversational)**: Agents debate and collaborate as equals. Best for creative problem solving where the path isn't clear (e.g., AutoGen).",
          },
        ],
      },
      {
        id: "2.3",
        number: "2.3",
        title: "Agent Orchestration and Workflow",
        subtopics: [
          {
            title: "Orchestration Concepts",
            content: "Orchestration is the process of managing the sequence, flow, and dependencies of tasks within an agentic system.\n\n• Task Decomposition: Breaking down a high-level goal into a sequence of smaller, manageable sub-tasks. The LLM is often responsible for this initial planning step.\n• Dynamic Planning: The ability to adjust the plan mid-execution based on new observations (e.g., a tool error, an unexpected search result). This is a key differentiator from static, pre-defined workflows.\n• Feedback Loops: Mechanisms for agents to evaluate their own progress or the output of other agents, allowing for self-correction and refinement.\n\n![Orchestration Flow]([INFOGRAPHIC:ORCHESTRATION])",
          },
        ],
      },
      {
        id: "2.4",
        number: "2.4",
        title: "Practical Design Patterns",
        subtopics: [
          {
            title: "Key Design Patterns",
            content: "Patterns are the blueprints of successful agents.\n\n• **Planner-Executor**: One agent dreams up the plan; another carries it out. Prevents the agent from 'forgetting' the big picture while doing small tasks.\n• **ReAct (Reason + Act)**: The most popular pattern. The agent writes its 'Thought' before performing the 'Action'. This internal monologue is the key to debugging agency.\n• **Critique/Refine**: The agent writes a draft, and a second agent (The Critic) tears it apart. Only after 3 rounds of refinement is the result shown to the user.\n\n![Pattern Deep Dive]([INFOGRAPHIC:PATTERN_DEEP_DIVE])",
          },
        ],
      },
    ],
  },
  {
    id: "module-3",
    number: 3,
    name: "Tool Use and Integration",
    hours: 4,
    description: "Master tool design, tool-calling mechanisms, RAG integration, and hands-on tool implementation.",
    topics: [
      {
        id: "3.1",
        number: "3.1",
        title: "The Concept of Tools",
        subtopics: [
          {
            title: "What Constitutes a Tool",
            content: "In Agentic AI, a tool is anything that gives the LLM 'reach.'\n\n**Analogy: The Swiss Army Knife.**\nAn LLM is powerful but 'bare-handed.' Tools are the blades, scissors, and screwdrivers it can unfold to solve specific problems. \n\n• **Reach**: Searching the web for 2024 data.\n• **Precision**: Using a calculator to avoid 'LLM Math' (hallucinated calculations).\n• **Power**: Running code in a sandbox to process 1GB CSV files.\n\n![Tool Anatomy]([INFOGRAPHIC:TOOL_ANATOMY])",
          },
          {
            title: "Tool Library Importance",
            content: "A library isn't just a collection; it's the agent's identity. If an agent has a 'Database Tool,' it's a data analyst. If it has a 'GitHub Tool,' it's a coder. \n\n> [!CAUTION]\n> **Security Warning**: Every tool is a potential back-door. Tools must be strictly scoped to prevent an agent from autonomously deleting production data.",
          },
        ],
      },
      {
        id: "3.2",
        number: "3.2",
        title: "Tool-Calling Mechanisms",
        subtopics: [
          {
            title: "LLM Tool Interaction",
            content: "The process by which an LLM decides to use a tool and executes it is a core mechanism of agentic systems.\n\n1. LLM Decision Process: Based on the user's request and the current state, the LLM determines if a tool is necessary. This decision is often guided by the detailed descriptions provided for each tool.\n2. Argument Generation: If a tool is selected, the LLM uses the tool's schema (input parameters) to generate the correct arguments from the context. This is a critical step where errors (e.g., missing or incorrect parameters) frequently occur.\n3. Handling Tool Output/Errors:\n   • Success: The tool executes and returns an Observation (e.g., search results, calculation output). This observation is fed back into the Agent Loop.\n   • Error: If the tool fails (e.g., API timeout, invalid arguments), the error message is returned as the Observation. The LLM must then reason about the error and attempt to correct the arguments or choose an alternative tool.\n\n![Tool Call Flow]([INFOGRAPHIC:TOOL_CALL_FLOW])",
          },
        ],
      },
      {
        id: "3.3",
        number: "3.3",
        title: "Retrieval-Augmented Generation (RAG) Deep Dive",
        subtopics: [
          {
            title: "RAG as a Tool",
            content: "While RAG is covered as a memory component, it is also fundamentally a Tool that the agent can choose to use.\n\n• RAG as a Tool: The agent decides to call the retrieve_document(query) tool when it determines that external, domain-specific knowledge is required to answer the user's query.\n• Chunking and Embedding: Detailed discussion on strategies for optimal chunk size, overlap, and choice of embedding model to maximize retrieval accuracy.\n• Query Optimization: Techniques like HyDE (Hypothetical Document Embedding) or Query Rewriting where the LLM refines the user's query before embedding and retrieval to improve search results.",
          },
        ],
      },
      {
        id: "3.4",
        number: "3.4",
        title: "Designing Effective Tools",
        subtopics: [
          {
            title: "Tool Design Principles",
            content: "An agent is only as good as its tools. Design with **The 3 S's**:\n\n1. **Schema (Structured)**: Use Pydantic or JSON Schema to define *exactly* what input the tool expects. No raw strings.\n2. **Small (Atomic)**: A tool should do *one* thing. Instead of `manage_files()`, use `read_file()` and `write_file()`.\n3. **Safe (Sandboxed)**: Never run agent code directly on your host machine. Use Docker or ephemeral environments.\n\n![Reliable Tool Design]([INFOGRAPHIC:TOOL_DESIGN])",
          },
          {
            title: "Security and Sandboxing",
            content: "• Sandboxing: Running tools, especially those involving code execution or file system access, in an isolated environment (e.g., Docker containers, gVisor) to prevent the agent from causing harm to the host system or accessing unauthorized resources.\n• Principle of Least Privilege: Tools should only be granted the minimum permissions necessary to perform their function.",
          },
        ],
      },
      {
        id: "3.5",
        number: "3.5",
        title: "Tool Integration Lab",
        subtopics: [
          {
            title: "Hands-on Exercise: Custom Tool Implementation",
            content: "Objective: Implement a custom tool class using the langchain.tools.BaseTool structure, defining its input schema and execution logic. This exercise reinforces the concepts of tool definition, argument generation, and the separation of the LLM's reasoning from the tool's execution.\n\nFile: /home/ubuntu/module3_tool_lab.py\n\nSteps:\n1. Review the SimpleAdderTool implementation, focusing on the BaseModel for input validation and the _run method for logic.\n2. Challenge: Modify the code to create a new tool, SimpleMultiplierTool, that performs multiplication.\n3. Discuss how the LLM's prompt would need to be updated to make it aware of and correctly use the new tool.",
          },
        ],
      },
    ],
  },
  {
    id: "module-4",
    number: 4,
    name: "Agentic Frameworks and Implementation",
    hours: 4,
    description: "Deep dive into LangChain, AutoGen, and CrewAI frameworks with practical implementation examples.",
    topics: [
      {
        id: "4.1",
        number: "4.1",
        title: "Introduction to Agentic Frameworks",
        subtopics: [
          {
            title: "Framework Overview",
            content: "Agentic frameworks are the 'LEGO sets' of AI development. They provide the connectors and blocks so you don't have to reinvent the Agent Loop from scratch.\n\n• **LangChain**: The 'Master Builder' set. Powerful, modular, but requires you to snap every piece together manually.\n• **CrewAI**: The 'Pre-built Team' set. Focused on roles and tasks; you act as the manager, not the architect.\n• **AutoGen**: The 'Chat Room' set. Agents talk to each other to find solutions naturally.\n\n![Agentic Frameworks Comparison]([MINDMAP:FRAMEWORKS])",
          },
        ],
      },
      {
        id: "4.2",
        number: "4.2",
        title: "Deep Dive: Framework A (LangChain)",
        subtopics: [
          {
            title: "Key Abstractions (Chains, Agents)",
            content: "• Chains: Pre-defined sequences of calls (e.g., LLM -> Parser). Simple, linear workflows.\n• Agents: Use an LLM as a controller to decide which steps to take next, enabling dynamic, non-linear workflows (the Agent Loop).\n• LangGraph: An extension of LangChain that allows for defining agentic workflows as state machines (graphs), enabling complex loops, conditional logic, and human-in-the-loop steps.",
          },
          {
            title: "Hands-on Exercise: Building a Simple LangChain Agent (ReAct Pattern)",
            content: "Objective: Understand the core ReAct pattern by simulating a simple agent loop using LangChain's conceptual components (LLM, Tools, Agent Scratchpad).\n\nFile: /home/ubuntu/module4_langchain_lab.py\n\nSteps:\n1. Examine the MockLLM and MockWeatherTool to see how the Thought, Action, and Observation steps are simulated.\n2. Trace the flow of information through the agent loop, paying close attention to how the agent_scratchpad carries the history.\n3. Challenge: Extend the agent by adding a second tool, get_forecast, and update the MockLLM logic to dynamically choose between the two tools based on the user's query.",
          },
        ],
      },
      {
        id: "4.3",
        number: "4.3",
        title: "Deep Dive: Framework B (AutoGen/CrewAI)",
        subtopics: [
          {
            title: "Conversational Programming (AutoGen)",
            content: "AutoGen emphasizes the idea of agents talking to each other to solve a problem.\n\n• User Proxy Agent: Represents the human user, sending prompts and receiving final answers.\n• Assistant Agent: The primary worker agent, capable of using tools and code execution.\n• GroupChat: The mechanism that manages the conversation flow, deciding which agent speaks next.",
          },
          {
            title: "Role-Based Collaboration (CrewAI)",
            content: "CrewAI is built on top of LangChain and focuses on defining a structured team.\n\n• Agents: Defined by a role, goal, and backstory to give them personality and specialization.\n• Tasks: Specific units of work assigned to agents.\n• Crew: The orchestrator that manages the agents and tasks, often using a hierarchical or sequential process.",
          },
          {
            title: "Hands-on Exercise: Implementing a Multi-Agent Crew (CrewAI Conceptual)",
            content: "Objective: Learn the structured, role-based approach of Multi-Agent Systems by defining specialized agents, tasks, and an orchestration process using the CrewAI framework structure.\n\nFile: /home/ubuntu/module4_crewai_lab.py\n\nSteps:\n1. Review the conceptual definitions of the Researcher Agent and Writer Agent, noting the use of role, goal, and backstory.\n2. Analyze the Process.sequential orchestration and how the output of the research_task is passed as context to the writing_task.\n3. Challenge: Define a third agent, the Critic Agent, and a new task, critique_task, to insert a feedback loop into the sequential process, demonstrating the Critic Pattern. (Requires setting up a local environment with API keys to run.)",
          },
        ],
      },
      {
        id: "4.4",
        number: "4.4",
        title: "Deployment and Monitoring",
        subtopics: [
          {
            title: "Containerization and Serverless",
            content: "• Containerization (Docker): Packaging the agent and its dependencies (including tool environments) into a portable container for consistent deployment across environments.\n• Serverless (AWS Lambda, Azure Functions): Deploying agents as functions that scale automatically and only incur costs when running, ideal for event-driven or low-traffic agents.",
          },
          {
            title: "Logging and Cost Management",
            content: "Deploying an agent is easy; keeping it affordable is the real challenge.\n\n• **LLM Observability**: You must log every 'Thought' and 'Action'. Without logs, an agent in a loop is a 'Black Box' that eats your credit card balance.\n• **The Cost Trap**: Large models (GPT-4o) are expensive. Use 'Model Routing'—smaller models (GPT-4o-mini) for simple tool decisions, and larger models only for final synthesis.\n• **Token Pruning**: Periodically summarize your memory. If your agent's memory gets too long, it will start hallucinating and costing 5x more per message.",
          },
        ],
      },
    ],
  },
  {
    id: "module-5",
    number: 5,
    name: "Advanced Topics and Real-World Applications",
    hours: 3,
    description: "Explore business automation, scaling, performance optimization, and the future of Agentic AI.",
    topics: [
      {
        id: "5.1",
        number: "5.1",
        title: "Agentic Business Process Automation",
        subtopics: [
          {
            title: "High-Value Processes",
            content: "Don't use agents for everything. Use them for the **'Three D's'**:\n\n1. **Data-Heavy**: Synthesizing 100 PDFs into one report.\n2. **Decision-Rich**: Handling complex logic that 'If-Then' code can't follow.\n3. **Dynamic**: Interacting with APIs where the input changes every day (e.g., Social Media trends).",
          },
          {
            title: "Case Studies",
            content: "• Devin-style Code Agent: Autonomous software development, from planning to code execution, testing, and debugging. Agentic Approach: Planner-Executor pattern with a dedicated code interpreter tool and a Critic agent for testing.\n• Finance/Investment Analyst: Monitoring market news, synthesizing reports, and executing trades based on analysis. Agentic Approach: Multi-agent crew (Researcher, Analyst, Trader) using web search and proprietary API tools.\n• Customer Support Triage: Analyzing complex support tickets, diagnosing the issue, and routing it to the correct human or automated system. Agentic Approach: Goal-Based agent using RAG for knowledge base lookup and a routing tool.",
          },
        ],
      },
      {
        id: "5.2",
        number: "5.2",
        title: "Scaling and Performance Optimization",
        subtopics: [
          {
            title: "Asynchronous Execution and Parallelization",
            content: "• Asynchronous Execution: Using async/await to allow the agent to initiate multiple tool calls (e.g., multiple web searches) without blocking the main loop, significantly reducing latency.\n• Parallelization: In multi-agent systems, assigning independent sub-tasks to different agents to be executed simultaneously.",
          },
          {
            title: "Model Selection and Cost Management",
            content: "• Hierarchical Model Use: Employing a small, fast model for the initial tool-call decision and a large, powerful model only for the final, complex reasoning or creative generation steps.\n• Caching: Caching results of expensive tool calls (e.g., complex RAG queries) to avoid redundant computation.\n\n![Optimization Matrix]([MINDMAP:OPTIMIZATION])",
          },
        ],
      },
      {
        id: "5.3",
        number: "5.3",
        title: "The Future of Agentic AI",
        subtopics: [
          {
            title: "Market Trends and Predictions",
            content: "The future is **Agentic Workflows**, not just Chatbots.\n\n• **Ubiquitous Agency**: Every app will have an agent. Your email won't just 'filter' spam; it will autonomously reply to meeting requests based on your calendar.\n• **Self-Improving Agents**: Agents will eventually review their own logs to identify where they failed and 'prompt engineer' themselves for the next run.\n• **Protocol Standardization**: Industry protocols (like MCP - Model Context Protocol) will allow any agent to talk to any tool instantly.",
          },
          {
            title: "Governance and Regulation",
            content: "• The need for regulatory frameworks to govern the behavior of autonomous agents, particularly in high-stakes domains like finance, healthcare, and infrastructure.\n• Focus on accountability and traceability—ensuring that the actions of an agent can be audited and attributed.",
          },
        ],
      },
      {
        id: "5.4",
        number: "5.4",
        title: "Final Project/Capstone Overview",
        subtopics: [
          {
            title: "Project Idea: Autonomous Content Creation Crew",
            content: "Goal: Create a multi-agent system that can autonomously research a given topic, write a detailed blog post, and generate a social media summary.\n\nAgents:\n• Researcher Agent: Uses a web search tool and RAG to gather facts.\n• Writer Agent: Takes the research and drafts the blog post.\n• Critic Agent: Reviews the draft for clarity, tone, and factual accuracy.\n• Social Media Agent: Summarizes the final post for different platforms.",
          },
          {
            title: "Final Project Requirements and Submission Guidelines",
            content: "Goal: Implement the Autonomous Content Creation Crew using either LangChain (with LangGraph) or CrewAI/AutoGen.\n\nRequirements:\n1. Agent Definition: Must include at least three distinct, specialized agents (e.g., Researcher, Writer, Critic).\n2. Tool Integration: Must integrate at least one external tool (e.g., a web search tool, a file-writing tool).\n3. Orchestration: Must demonstrate a multi-step, non-linear workflow (e.g., research -> draft -> critique -> revise).\n4. Output: The final output must be a polished, 500-word article on a topic of the student's choice, along with a log of the agent's full execution trace (Thought, Action, Observation).\n\nSubmission:\n• A single Python file containing the complete agent system implementation.\n• A Markdown file containing the final article generated by the crew.\n• A text file containing the full execution log.",
          },
        ],
      },
    ],
  },
];
