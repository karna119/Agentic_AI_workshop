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
            content: "An AI Agent is a system that perceives its environment through sensors, processes that information, and acts upon that environment using effectors to achieve a specific goal. Unlike traditional Large Language Models (LLMs) that are primarily reactive to a single prompt, an AI agent is proactive and autonomous, capable of performing multi-step reasoning and dynamic planning.\n\nThe evolution of AI agents has progressed from early rule-based systems to modern LLM-powered agents:\n\n1. Classical AI Agents: Focused on symbolic reasoning and search algorithms (e.g., chess programs).\n2. Machine Learning Agents: Agents driven by statistical models (e.g., reinforcement learning agents).\n3. LLM-Powered Agents (Agentic AI): Agents where the LLM serves as the \"brain\" or \"controller\", responsible for planning, reasoning, and deciding which actions (tools) to take.\n\n![Evolution of Agency]([INFOGRAPHIC:EVOLUTION])",
          },
          {
            title: "Key Characteristics",
            content: "Modern AI agents possess four key characteristics:\n\n• Autonomy: The ability to operate without constant human intervention, making decisions and executing tasks independently.\n• Goal-Oriented: Agents are designed to achieve a specific, often complex, objective (e.g., \"book a flight,\" \"write a research paper\").\n• Perception: The ability to observe and interpret the environment, which includes the user's prompt, tool outputs, and internal state.\n• Reactivity & Proactivity: Reactivity to immediate changes in the environment (e.g., tool error) and Proactivity in initiating steps towards a long-term goal (e.g., dynamic planning).\n\n![Agent Architecture Infographic]([INFOGRAPHIC:AGENT_ARCHITECTURE])",
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
            content: "The fundamental operational cycle of an AI agent is the Perceive-Reason-Act (P-R-A) Loop, often referred to as the Agent Loop. This iterative process allows the agent to continuously adapt and progress toward its goal.\n\n1. Perceive (Observe): The agent takes in new information from the environment (user input, tool results, memory).\n2. Reason (Think/Plan): The LLM processes the observations, updates its internal state, and decides the next step. This involves task decomposition and tool selection.\n3. Act (Execute): The agent executes the chosen action, typically by calling an external tool or generating a response.\n4. Iterate: The result of the action becomes the new observation, and the loop repeats until the goal is met or a failure condition is reached.\n\n![The Agent Loop]([INFOGRAPHIC:AGENT_LOOP])",
          },
          {
            title: "Core Components (LLM, Memory, Tools, State)",
            content: "An agentic system is built upon four interconnected components:\n\n![Agent Architecture Infographic]([INFOGRAPHIC:ARCHITECTURE])\n\n• LLM (The Brain): The central controller responsible for all cognitive functions. Planning, reasoning, tool selection, argument generation, and final response generation.\n• Memory: Stores and retrieves information necessary for context and long-term knowledge. Manages conversation history (short-term) and external knowledge (long-term via RAG).\n• Tools (The Hands): External functions or APIs that allow the agent to interact with the real world. Performing calculations, searching the web, running code, accessing databases, etc.\n• State: The agent's internal representation of the current task, progress, and environment. Tracks the goal, sub-tasks completed, and the history of the P-R-A loop.",
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
            content: "Effective memory management is crucial for agents to handle complex, multi-step tasks that exceed the LLM's context window.\n\n• Short-Term Memory (STM): Holds the immediate context of the current conversation or task. Implementation: Context Window (the most recent turns of the conversation are passed directly to the LLM) and Conversation Buffer (simple storage of recent messages).\n• Long-Term Memory (LTM): Stores knowledge that persists across sessions and is too large for the context window. Implementation:\n• Vector Databases: Stores embeddings of external documents, retrieved via RAG. Use for long-term knowledge retention.\n• Summary/Reflection: The agent periodically summarizes its experiences and stores the summary.\n\n![Memory Systems]([INFOGRAPHIC:MEMORY_MGMT])\n\n![RAG Pipeline Infographic]([INFOGRAPHIC:RAG_PIPELINE])",
          },
          {
            title: "Retrieval-Augmented Generation (RAG) Deep Dive",
            content: "RAG is a core mechanism for providing agents with external, up-to-date, and domain-specific knowledge, effectively serving as the agent's long-term memory.\n\nIndexing (The RAG Pipeline):\n• Chunking: Breaking down large documents into smaller, manageable pieces (chunks).\n• Embedding: Converting each chunk into a numerical vector (embedding) using an embedding model.\n• Storage: Storing the embeddings and their corresponding text chunks in a Vector Database.\n\nRetrieval (The Agent Loop):\n• The agent receives a query.\n• The query is embedded.\n• The vector database is searched for the most semantically similar chunks (nearest neighbors).\n• The retrieved chunks are passed to the LLM as part of the prompt (context).\n\nGeneration: The LLM uses the retrieved context to generate a grounded, accurate response.",
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
            content: "These architectures, derived from classical AI, describe how an agent makes decisions based on its perception of the environment.\n\n• Simple Reflex Agent: Acts only on the current percept, ignoring history. Uses \"If-Then\" rules. Decision-making basis: Current state (percept) only.\n• Model-Based Agent: Maintains an internal \"world model\" (state) to track unobserved aspects of the environment. Decision-making basis: Current state + internal model of the world.\n• Goal-Based Agent: Uses its internal state and a defined goal to choose actions that move it closer to the target. Decision-making basis: Current state + goal state.\n• Utility-Based Agent: A refinement of the goal-based agent, choosing actions based on a utility function that measures how \"good\" a state is, allowing for trade-offs (e.g., speed vs. cost). Decision-making basis: Current state + utility function (maximizes expected happiness/success).\n\n![Cognitive Agent Patterns]([MINDMAP:PATTERNS])",
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
            content: "Complex, real-world problems often require capabilities beyond a single agent. Multi-Agent Systems (MAS) involve multiple specialized agents collaborating to achieve a shared, complex goal.\n\n• Specialization: Each agent can be optimized for a specific role (e.g., a \"Researcher\" agent, a \"Writer\" agent, a \"Critic\" agent).\n\n![Multi-Agent Systems Mindmap]([MINDMAP:MULTI_AGENT])\n\n• Robustness: Failure of one agent does not necessarily halt the entire system.\n• Scalability: Tasks can be decomposed and executed in parallel.",
          },
          {
            title: "Coordination Mechanisms (Hierarchical, P2P)",
            content: "• Hierarchical: A Manager or Orchestrator agent decomposes the task, assigns sub-tasks to specialized Worker agents, and synthesizes the final result. Example: CrewAI framework, where a central Crew manages the workflow of specialized Agents.\n• Peer-to-Peer (P2P): Agents communicate directly with each other, often in a conversational manner, to negotiate tasks and share information. Example: AutoGen framework, where agents engage in \"conversational programming\" to solve problems.",
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
            content: "These patterns provide structured ways for the LLM to reason and act.\n\n• Planner-Executor: A Planner agent generates a multi-step plan. An Executor agent follows the plan, step-by-step, using tools. If a step fails, the Planner is re-invoked to replan. Use case: Complex tasks requiring long-term coherence, such as writing a multi-chapter report.\n• Critic Pattern: An agent (the Generator or Executor) produces an output. A separate Critic agent reviews the output against a set of criteria and provides feedback. Use case: Quality assurance, code review, or refining creative content.\n• ReAct (Reasoning and Acting): The agent interleaves Thought, Action, and Observation steps. The LLM's internal monologue (Thought) is logged, making the decision process transparent. Use case: General-purpose agent design, providing transparency and enabling dynamic, self-correcting behavior.\n\n![Pattern Deep Dive]([INFOGRAPHIC:PATTERN_DEEP_DIVE])",
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
            content: "In the context of Agentic AI, a Tool (or Function) is any external capability that extends the LLM's reach beyond its training data and text generation ability. Tools are defined by a clear name, a detailed description, and a schema for their input arguments.\n\nExamples: A web search API, a code interpreter, a file system access function, a database query function, or a proprietary business API.\n\n![Tool Anatomy]([INFOGRAPHIC:TOOL_ANATOMY])",
          },
          {
            title: "Tool Library Importance",
            content: "A well-curated Tool Library is essential for an agent's effectiveness.\n\n• Capability: The library defines the universe of actions the agent can take.\n• Reliability: Tools must be robust and handle errors gracefully, as the LLM relies on their output.\n• Security: The library must be secured, with tools sandboxed to prevent unauthorized access or malicious execution.",
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
            content: "• Clarity and Specificity: Tools must have clear, unambiguous names and descriptions. The LLM relies heavily on these descriptions to decide when and how to use the tool.\n• Atomicity: Each tool should perform a single, well-defined function (e.g., search_web vs. search_web_and_summarize).\n• Robustness: Tools must include internal error handling and return informative error messages that the LLM can interpret and act upon.\n\n![Reliable Tool Design]([INFOGRAPHIC:TOOL_DESIGN])",
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
            content: "Agentic frameworks provide the necessary abstractions and infrastructure to build and manage complex agents without starting from scratch.\n\n• LangChain: Modular components for building chains and agents. Key Feature: Chains and Agents.\n• AutoGen: Multi-agent conversation and collaboration. Key Feature: Conversational Programming.\n• CrewAI: Role-based multi-agent systems. Key Feature: Role-Based Agents.\n\n![Agentic Frameworks Comparison]([MINDMAP:FRAMEWORKS])",
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
            content: "• Logging the Agent Loop: Essential for debugging, auditing, and understanding the agent's decision-making process. Log every step of the ReAct pattern (Thought, Action, Observation), tool inputs/outputs, and state changes.\n• Cost Management: Token Optimization - Minimizing the size of the context window (e.g., through summarization or efficient RAG) to reduce LLM API costs. Model Selection - Using smaller, faster models (e.g., GPT-4.1-nano) for simple reasoning steps and reserving larger, more expensive models for complex planning or final generation.",
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
            content: "Agents are best applied to processes that are:\n1. Repetitive: Tasks that are performed frequently.\n2. Complex: Tasks requiring multi-step reasoning and tool use.\n3. Data-Intensive: Tasks requiring synthesis of information from multiple sources.",
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
            content: "• Ubiquitous Agents: Agents will move from specialized tools to integrated components of all software, acting as personalized operating systems.\n• Increased Autonomy: Future agents will exhibit greater self-improvement capabilities, learning from their failures and updating their own tools and plans.\n• Standardization: The industry will converge on standardized protocols for agent communication and tool definition (e.g., OpenAI's function calling standard).",
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
