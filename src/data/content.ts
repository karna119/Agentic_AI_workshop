// Comprehensive content data structures for the Agentic AI Learning Platform
import { ModuleQuiz } from './quiz';

export interface Lab {
  id: string;
  title: string;
  module: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  duration: string;
  description: string;
  objectives: string[];
  prerequisites: string[];
  content: string;
  codeFile: string;
  challenges: string[];
  steps?: { title: string; detail: string; status: 'pending' | 'completed' | 'current' }[];
  simulationLogs?: { type: 'thought' | 'action' | 'observation' | 'system'; message: string }[];
}

export interface CaseStudy {
  id: string;
  title: string;
  industry: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  duration: string;
  description: string;
  problem: string;
  solution: string;
  agenticApproach: string;
  keyTakeaways: string[];
  relatedModules: number[];
  implementation: string;
}

export interface Resource {
  id: string;
  title: string;
  type: "article" | "video" | "paper" | "tool" | "documentation";
  url: string;
  author: string;
  date: string;
  description: string;
  relatedModules: number[];
}

export interface Reference {
  id: string;
  title: string;
  authors: string[];
  year: number;
  url: string;
  type: "research" | "documentation" | "blog" | "book";
  description: string;
}

export const labs: Lab[] = [
  {
    id: "lab-1",
    title: "Secure Tool Engineering",
    module: 3,
    difficulty: "intermediate",
    duration: "1.5 hours",
    description: "Build production-grade tools with Pydantic validation and security guardrails for LLM consumption.",
    objectives: [
      "Implement robust input validation using Pydantic V2",
      "Design secure interfaces for data access",
      "Handle tool execution errors without breaking the agent loop",
      "Implement audit logging for sensitive operations"
    ],
    prerequisites: ["Python 3.10+", "Understanding of LLM tool calling"],
    content: `# Secure Tool Engineering Lab

## The Challenge
AI Agents often need to interact with sensitive databases. A naive "SQL Tool" is a massive security risk. In this lab, you'll build a **Secure Data Connector** that uses structured schemas to prevent prompt injection and unauthorized access.

## Step 1: Defining the Guardrail Schema
Instead of raw strings, we use Pydantic to strictly define what the Agent can request.

\`\`\`python
from pydantic import BaseModel, Field
from typing import Optional

class UserQuerySchema(BaseModel):
    user_id: str = Field(pattern=r"^USR-\\d{4}$", description="ID in USR-XXXX format")
    table_scope: str = Field(pattern="^(profile|activity)$", description="Restricted to specific tables")
    include_pii: bool = Field(default=False)
\`\`\`

## Step 2: Implementing the Secure Tool
We wrap the data access in a class that enforces these constraints before hitting the database.

\`\`\`python
from langchain.tools import BaseTool

class SecureAuthenticator(BaseTool):
    name = "secure_user_explorer"
    description = "Retrieves user records from a restricted secure store."
    args_schema = UserQuerySchema

    def _run(self, user_id: str, table_scope: str, include_pii: bool) -> str:
        # Internal security check
        if include_pii and not self.metadata.get("authorized_agent"):
            return "Error: Security policy violation. PII access denied."
            
        return f"Fetching {table_scope} data for {user_id}... [ENCRYPTED SUCCESS]"
\`\`\`

![Tool Security INFOGRAPHIC:TOOL_ANATOMY]

## Step 3: Handling Edge Cases
Agents often hallucinate parameters. Your tool must provide clear, actionable error messages back to the LLM so it can self-correct.

\`\`\`python
def _run(self, **kwargs):
    try:
        return self.database.execute(kwargs)
    except ValidationError as e:
        return f"Correction needed: Your input didn't match the required format. {str(e)}"
\`\`\`

## Challenges
1. Implement a rate-limit decorator for the tool.
2. Add a 'dry_run' parameter to the schema.
3. Create a secondary tool that validates SQL tokens.
`,
    codeFile: "secure_connector_v1.py",
    challenges: [
      "Add Regex validation for multi-tenant IDs",
      "Implement a ToolException handler for LangChain",
      "Create an asynchronous arun method for high-concurrency"
    ],
    steps: [
      { title: "Schema Design", detail: "Define strict Pydantic models with Regex patterns.", status: 'completed' },
      { title: "Tool Wrapping", detail: "Inherit from BaseTool and map the args_schema.", status: 'current' },
      { title: "Sanitization", detail: "Implement internal logic to scrub sensitive outputs.", status: 'pending' },
      { title: "Simulation", detail: "Dry-run the tool inside a localized agent loop.", status: 'pending' }
    ],
    simulationLogs: [
      { type: 'system', message: 'Booting Secure Environment v2.4...' },
      { type: 'thought', message: 'Agent requires access to USR-8829 data in the profile table.' },
      { type: 'action', message: 'secure_user_explorer(user_id="USR-8829", table_scope="profile", include_pii=true)' },
      { type: 'system', message: 'LOG: Intercepting PII Access Request...' },
      { type: 'observation', message: 'Error: Access Denied. Agent metadata missing "HR_VERIFIED" token.' },
      { type: 'thought', message: 'The security policy blocked PII. I will re-request without PII to fulfill the general data goal.' },
      { type: 'action', message: 'secure_user_explorer(user_id="USR-8829", table_scope="profile", include_pii=false)' },
      { type: 'observation', message: 'Success: { status: "Active", joined: "2023-01", tier: "Gold" }' },
      { type: 'system', message: 'Audit log written to /logs/security/audit.log' }
    ]
  },
  {
    id: "lab-2",
    title: "Autonomous Cloud Ops",
    module: 4,
    difficulty: "advanced",
    duration: "2 hours",
    description: "Design a ReAct agent that can troubleshoot and resolve cloud infrastructure issues autonomously.",
    objectives: [
      "Master the ReAct (Reason-Act) workflow for complex branching",
      "Handle multi-step error recovery sequences",
      "Implement observation-based branching logic",
      "Prevent recursive API loops with max_iterations"
    ],
    prerequisites: ["Module 4 Completion", "Basic Cloud CLI knowledge"],
    content: `# Autonomous Cloud Ops Lab

## The Scenario
Your production server is returning 504 Gateway Timeouts. A human engineer is away. Your task is to build a ReAct agent that can investigate the logs, identify the bottleneck, and restart the necessary services.

## The ReAct Loop
The agent follows a cycle: **Thought → Action → Observation**.

### Phase 1: Investigation
\`\`\`
Thought: The site is down. I need to check the load balancer health first.
Action: cloud_provider.get_lb_health(target_group="web-front")
Observation: 2 of 5 instances are "Unhealthy".
\`\`\`

### Phase 2: Root Cause Analysis
\`\`\`
Thought: LB shows unhealthy instances. I should check the CPU and Memory logs for instance "i-0abc123".
Action: ssh_manager.tail_logs(instance_id="i-0abc123", lines=50)
Observation: "Out of Memory: Killed process 881 (node)".
\`\`\`

![Cloud Orchestration INFOGRAPHIC:AGENT_LOOP]

## Implementation Architecture

\`\`\`python
from langchain.agents import initialize_agent, AgentType

# 1. Provide the agent with specialized tools
tools = [LogAnalyzer(), ServerRestarter(), HealthChecker()]

# 2. Use the CHAT_CONVERSATIONAL_REACT_DESCRIPTION type
agent = initialize_agent(
    tools, 
    llm, 
    agent=AgentType.CHAT_CONVERSATIONAL_REACT_DESCRIPTION,
    max_iterations=5, # Safety guardrail
    verbose=True
)
\`\`\`

## Safety First
Autonomous actions in production are dangerous. You will learn to implement a "Confirmation Step" where the agent must wait for a human "OK" or a secondary "Safety Agent" approval.

## Challenges
1. Implement a 'rollback' tool in case the restart fails.
2. Add a 'cost_aware' thought process to prevent expensive scaling.
3. Integrate Slack notifications into every 'Action' step.
`,
    codeFile: "cloud_repair_agent.py",
    challenges: [
      "Limit the agent to read-only tools initially",
      "Implement a 'human-in-the-loop' breakpoint",
      "Handle JSON-parsing errors from the LLM output"
    ],
    steps: [
      { title: "Environment Init", detail: "Configure the simulated AWS/GCP environment variables.", status: 'completed' },
      { title: "Toolset Layout", detail: "Define the SSH, HTTP, and Cloud SDK tools.", status: 'current' },
      { title: "Define ReAct Prompt", detail: "Craft the system instructions for the loop.", status: 'pending' },
      { title: "Execution", detail: "Run the agent against a simulated memory leak.", status: 'pending' }
    ],
    simulationLogs: [
      { type: 'system', message: 'Monitoring System: 504 ERROR DETECTED' },
      { type: 'thought', message: 'Site is unreachable. Starting diagnostics on Nginx cluster.' },
      { type: 'action', message: 'check_endpoint("https://api.prod.svc")' },
      { type: 'observation', message: 'Timeout. Server failed to respond in 30s.' },
      { type: 'thought', message: 'Nginx is timing out. Likely the upstream Go service is crashed. Checking pod status.' },
      { type: 'action', message: 'k8s_get_pods(namespace="backend")' },
      { type: 'observation', message: 'pod/order-svc-x29: OOMKilled, Restarts: 12' },
      { type: 'thought', message: 'Detected memory leak on order-svc. Requesting transient memory increase before restart.' },
      { type: 'action', message: 'k8s_patch_resources(pod="order-svc", mem="2Gi")' },
      { type: 'observation', message: 'Patch applied. New limits active.' },
      { type: 'action', message: 'k8s_restart_deployment("order-svc")' },
      { type: 'system', message: 'Service RECOVERY: Traffic flow normalized.' }
    ]
  },
  {
    id: "lab-3",
    title: "Production Crew Sync",
    module: 4,
    difficulty: "advanced",
    duration: "3 hours",
    description: "Build a high-performance multi-agent crew for social media intelligence and automated response generation.",
    objectives: [
      "Master CrewAI's hierarchical process for task delegation",
      "Implement inter-agent state sharing",
      "Configure 'Manager' agents for quality oversight",
      "Deploy agents with specific personas and backstories"
    ],
    prerequisites: ["Lab 1 & 2 Completion", "Basic understanding of Crew design"],
    content: `# Production Crew Sync Lab

## The Objective
Individual agents are limited. Production systems require **Crews**. In this lab, you'll orchestrate three specialized agents to perform real-time sentiment analysis and generate context-aware responses for a global brand.

## Step 1: Defining the Specialized Personas
Agents are defined by their **Role**, **Goal**, and **Backstory**.

\`\`\`python
from crewai import Agent

# The Scraper: Finds data
researcher = Agent(
  role='Global Data Scout',
  goal='Discover trending conversations about Brand X',
  backstory='Expert in digital signal processing and social trends.',
  tools=[SearchTool()]
)

# The Analyst: Thinks deep
analyst = Agent(
  role='Sentiment Architect',
  goal='Categorize signals into positive, negative, or neutral',
  backstory='PhD in Behavioral Economics; ignores noise, focuses on intent.'
)
\`\`\`

## Step 2: Task Orchestration
Tasks link agents together. The Analyst's input is the Researcher's output.

\`\`\`python
from crewai import Task

analysis_task = Task(
  description='Analyze the context of 10 recent tweets.',
  agent=analyst,
  context=[research_task], # Sequential dependency
  expected_output='A JSON map of sentiment scores.'
)
\`\`\`

![Orchestration Flow INFOGRAPHIC:ORCHESTRATION]

## Step 3: Managing the Factory
Using the **Hierarchical Process**, we assign a Manager agent to ensure the output is polished and brand-safe.

\`\`\`python
from crewai import Crew, Process

production_crew = Crew(
  agents=[researcher, analyst, writer],
  tasks=[t1, t2, t3],
  process=Process.hierarchical,
  manager_llm=gpt_4_manager
)
\`\`\`

## Challenges
1. Implement a 5-minute timeout for the whole crew.
2. Add a 'Human Approval' step before the writer publishes.
3. Force the Analyst to output strictly in YAML format.
`,
    codeFile: "social_intel_crew.py",
    challenges: [
      "Integrate inter-agent collaboration (shared state)",
      "Implement a custom CrewAI Process",
      "Add Pydantic-based output validation for tasks"
    ],
    steps: [
      { title: "Agent Persona Design", detail: "Define unique roles and backstories for 3 agents.", status: 'completed' },
      { title: "Task Wiring", detail: "Chain tasks so outputs become inputs for the next stage.", status: 'current' },
      { title: "Manager Injection", detail: "Introduce a high-reasoning model as the crew manager.", status: 'pending' },
      { title: "Deployment", detail: "Run the full pipeline on live data streams.", status: 'pending' }
    ],
    simulationLogs: [
      { type: 'system', message: 'CrewAI Engine: Sequential Mode Initialized' },
      { type: 'thought', message: 'Project: Real-time Signal Processing for "Agentic AI" hashtag.' },
      { type: 'action', message: 'delegate(agent="ResearchScout", task="Find 5 top posts")' },
      { type: 'thought', message: 'Scout: Scanning platform X and Reddit... Filters active.' },
      { type: 'observation', message: 'Found: 5 mentions. Sentiment appears polarized.' },
      { type: 'action', message: 'delegate(agent="Analyst", task="Determine root cause of polarity")' },
      { type: 'observation', message: 'Analyst: 60% concerns about state persistence, 40% praise for speed.' },
      { type: 'thought', message: 'Sending analysis to Manager Agent for brand-safe response drafting.' },
      { type: 'action', message: 'manager.review_content(context=analyst_output)' },
      { type: 'system', message: 'Manager: Content approved. Routing to Output channel.' },
      { type: 'system', message: 'SUCCESS: Crew cycle finished in 42.5s.' }
    ]
  },
  {
    id: "lab-4",
    title: "Persistent Memory Architecture",
    module: 5,
    difficulty: "advanced",
    duration: "2.5 hours",
    description: "Implement long-term vector memory and short-term state persistence using Redis for stateful AI agents.",
    objectives: [
      "Understand the difference between buffer, summary, and vector memory",
      "Implement Redis-backed session persistence",
      "Design a 'Retrieval-Driven' agent that learns from past interactions",
      "Manage memory context windows to prevent token overflows"
    ],
    prerequisites: ["Lab 1-3 Completion", "Understanding of Vector Embeddings"],
    content: `# Persistent Memory Architecture Lab

## The Problem
Standard agents are "Goldfish"—they forget everything once the script ends. To build a true colleague, your agent needs a **Long-Term Memory (LTM)**.

## Step 1: Short-Term State (Redis)
We use Redis to store the ongoing conversation state so the agent can resume after a crash.

\`\`\`python
from langchain.memory import RedisChatMessageHistory

history = RedisChatMessageHistory(
    session_id="user_123_session_01",
    url="redis://localhost:6379"
)

# Agent now retrieves history on every start
memory = ConversationBufferMemory(chat_memory=history)
\`\`\`

## Step 2: Long-Term Memory (Semantic)
LTM uses a Vector Database. When a user asks something, the agent searches for *similar* things from 6 months ago.

\`\`\`python
from langchain.vectorstores import Pinecone

# The "Thought Search" tool
ltm_tool = create_retrieval_tool(
    vector_store.as_retriever(),
    "past_knowledge_search",
    "Search previous solved tickets and engineering docs."
)
\`\`\`

![Memory Systems INFOGRAPHIC:MEMORY_MGMT]

## Step 3: Executive Memory Management
Too much memory confuses the agent. You'll learn to implement **Summary Culling**—where old messages are compressed into a 1-paragraph summary by a secondary LLM.

\`\`\`python
memory = ConversationSummaryBufferMemory(
    llm=summary_model,
    max_token_limit=1000
)
\`\`\`

## Challenges
1. Implement a 'Forgetting' tool for GDRP compliance.
2. Rank memories by 'relevance' AND 'recency'.
3. Build a shared memory pool for two different agents.
`,
    codeFile: "persistent_agent.py",
    challenges: [
      "Implement Semantic search over chat history",
      "Manage buffer window pruning",
      "Build a multi-session Redis coordinator"
    ],
    steps: [
      { title: "Memory Buffer Init", detail: "Set up the basic conversation buffer window.", status: 'completed' },
      { title: "Vector Persistence", detail: "Connect the agent to a persistent Chroma/Pinecone DB.", status: 'current' },
      { title: "Summary Logic", detail: "Implement a compression agent for old context.", status: 'pending' },
      { title: "Verification", detail: "Test if the agent remembers a secret from session 1 in session 2.", status: 'pending' }
    ],
    simulationLogs: [
      { type: 'system', message: 'Memory Controller: Redis Connection OK' },
      { type: 'thought', message: 'Resuming session USR_77. Retrieving last 50 summary tokens...' },
      { type: 'observation', message: 'CONTEXT: User previously discussed Lab 2 deployment errors.' },
      { type: 'thought', message: 'The user is asking about the "same error". I will query LTM for "Lab 2 deployment errors".' },
      { type: 'action', message: 'ltm_search(query="Lab 2 deployment error solution")' },
      { type: 'observation', message: 'Vector Search Result: Solution was to increase RAM limits via k8s-patch.' },
      { type: 'thought', message: 'I now have the historical context. I will remind the user of the k8s solution.' },
      { type: 'system', message: 'STATUS: Contextual recall successful.' }
    ]
  },
];

export const caseStudies: CaseStudy[] = [
  {
    id: "case-1",
    title: "Autonomous Code Generation and Testing (Devin-style)",
    industry: "Software Development",
    difficulty: "advanced",
    duration: "4 hours",
    description: "How autonomous agents can handle end-to-end software development tasks, from planning to testing.",
    problem: "Software development is time-consuming and error-prone. Developers spend significant time on repetitive tasks like code generation, testing, and debugging.",
    solution: "An agentic system that can understand requirements, generate code, run tests, and fix issues autonomously.",
    agenticApproach: `
## Architecture: The Self-Healing Ecosystem
- **Planner Agent**: Uses Hierarchical Planning to break multi-file requirements into a 'Dependency Graph'.
- **Coder Agent**: Writes code in an isolated Docker sandbox to prevent host pollution.
- **Tester Agent**: Generates edge-case unit tests dynamically based on the Coder's output.
- **Debugger Agent**: Interprets traceback logs to identify logic errors vs. syntax errors.
- **Critic Agent**: Enforces 'Clean Code' principles and security best practices (e.g., checking for exposed API keys).

![Multi-Agent Coordination Mindmap]([MINDMAP:MULTI_AGENT])

## Workflow: The Self-Correction Loop
1. **Requirements Analysis**: Planner creates a \`roadmap.json\`.
2. **Drafting**: Coder generates files.
3. **Execution**: Tester runs the code.
4. **Correction**: If a test fails, the Debugger analyzes the *reason* and instructs the Coder on a specific fix. 
5. **Final Audit**: Critic approves only when all tests pass AND quality scores are > 90%.
    `,
    keyTakeaways: [
      "Agents can handle complex, multi-step technical tasks",
      "Tool integration is critical for accessing external systems (code execution, testing frameworks)",
      "Feedback loops enable self-correction and improvement",
      "Hierarchical orchestration manages specialized agents effectively",
    ],
    relatedModules: [2, 3, 4, 5],
    implementation: `
## Key Implementation Details

### Tool Stack
- Code Execution: Docker container for safe code execution
- Testing: pytest integration for automated testing
- Version Control: Git integration for code management
- Code Analysis: Static analysis tools for quality checks

### Agent Communication
- Agents share context through a central knowledge base
- Each agent logs its decisions and outputs
- Failures trigger escalation to specialized agents

### Performance Optimization
- Cache code generation results for similar requirements
- Parallelize independent tests
- Use smaller models for simple tasks, larger models for complex reasoning

## Results
- 70% reduction in development time for routine tasks
- 95% test coverage automatically achieved
- Significant reduction in human code review time
    `,
  },
  {
    id: "case-2",
    title: "Financial Analysis and Trading Agent",
    industry: "Finance",
    difficulty: "advanced",
    duration: "3 hours",
    description: "Multi-agent system for market analysis, report generation, and trade execution.",
    problem: "Financial analysts need to monitor multiple data sources, synthesize complex information, and make timely trading decisions. Manual analysis is slow and prone to human error.",
    solution: "An agentic system that continuously monitors markets, analyzes trends, generates reports, and executes trades based on predefined strategies.",
    agenticApproach: `
## System Architecture: Multi-Agent Intelligence
- **Market Monitor Agent**: Scrapes financial news and live WebSocket feeds for volatility signals.
- **Analyst Agent**: Uses RAG to compare current signals with 'Black Swan' events from 2008 and 2020.
- **Risk Manager Agent**: Enforces the 'Hard Stop' rule—if a trade exceeds 2% of the total portfolio, it's auto-rejected.
- **Trader Agent**: Executes orders via authenticated APIs with strict token rotation.

## Data Flow & Guardrails
1. **Signal Detection**: Monitor identifies a high-volume breakout.
2. **Semantic Analysis**: Analyst checks if the news is 'noise' vs. 'signal' using historical context.
3. **Safety Check**: Risk Manager audits the proposed trade against the 'Margin Policy'.
4. **Execution**: Trader only fires after all three preceding agents provide a 'JSON Signed' approval.

![Risk Matrix]([INFOGRAPHIC:SAFETY])

> [!IMPORTANT]
> **Real-World Guardrail**: This system implements a 'Kill Switch'—if any agent experiences > 3 consecutive tool-call errors, the entire crew hibernates to prevent runaway trading.
    `,
    keyTakeaways: [
      "Agents excel at continuous monitoring and reactive decision-making",
      "RAG enables agents to learn from historical patterns and context",
      "Risk management must be built into agent design from the start",
      "Transparency and auditability are critical in financial applications",
    ],
    relatedModules: [1, 3, 4, 5],
    implementation: `
## Implementation Considerations

### Data Integration
- Real-time market feeds (Bloomberg, Reuters)
- News aggregation APIs
- Economic calendar data
- Historical price data

### Risk Controls
- Position size limits per agent
- Daily loss limits (stop-loss)
- Correlation analysis to prevent over-concentration
- Manual override capability for high-risk trades

### Performance Metrics
- Sharpe ratio and other risk-adjusted returns
- Win rate and average trade size
- Drawdown analysis
- Agent decision accuracy

## Results
- 40% improvement in trade execution speed
- 25% reduction in trading costs through better analysis
- 99.9% uptime for monitoring systems
- Full compliance audit trail maintained
    `,
  },
  {
    id: "case-3",
    title: "Customer Support Triage and Resolution",
    industry: "Customer Service",
    difficulty: "intermediate",
    duration: "2 hours",
    description: "Intelligent support system that triages tickets, diagnoses issues, and routes to appropriate resources.",
    problem: "Support teams are overwhelmed with tickets of varying complexity. Simple issues are handled slowly, and complex issues often require multiple handoffs.",
    solution: "An agentic system that automatically triages tickets, attempts resolution for simple issues, and intelligently routes complex issues to human experts.",
    agenticApproach: `
## Architecture: The Intelligent Buffer
- **Triage Agent**: Categorizes tickets by sentiment and technical 'tags' (e.g., #Billing, #Hardware).
- **Knowledge Base Agent**: Uses Semantic Search to find matching documentation in the 'Support Vault'.
- **Diagnostic Agent**: If the ticket is technical, this agent initiates a 'SSH Probe' tool to check server logs.
- **Escalation Agent**: If resolution takes > 3 steps, this agent packages the 'Thought Trace' and sends it to a human expert.

## Resolution Flow
1. **Intake**: Triage identifies the issue type.
2. **Context Retrieval**: KB Agent provides relevant snippets.
3. **Reasoning**: The LLM determines if it can solve the issue with its available tools.
4. **Handover**: If it cannot, a summary of all *failed* attempts is sent to a human, reducing diagnostic time by 50%.

## Success Metrics
- **Mean Time to Resolution (MTTR)**: Reduced by 4 hours on average.
- **Deflection Rate**: 60% of tickets solved without human touch.
    `,
    keyTakeaways: [
      "Agents can significantly improve customer experience through intelligent routing",
      "RAG with company knowledge bases enables consistent, accurate responses",
      "Hybrid human-AI systems are more effective than pure automation",
      "Feedback from customers improves agent performance over time",
    ],
    relatedModules: [1, 3, 5],
    implementation: `
## Technical Implementation

### Knowledge Base Integration
- Indexed FAQ and documentation
- Vector embeddings for semantic search
- Regular updates with new solutions

### Escalation Logic
- Complexity scoring for automatic routing
- Skill-based routing to appropriate agents
- Load balancing across support team

### Quality Assurance
- Automated quality checks on responses
- Customer satisfaction surveys
- Continuous model improvement

## Results
- 60% of tickets resolved without human intervention
- 50% reduction in average resolution time
- 35% improvement in customer satisfaction scores
- 40% increase in support team productivity
    `,
  },
  {
    id: "case-4",
    title: "Content Creation and Publishing Pipeline",
    industry: "Media & Publishing",
    difficulty: "intermediate",
    duration: "2.5 hours",
    description: "Autonomous system for researching, writing, editing, and publishing content across multiple platforms.",
    problem: "Content creation is resource-intensive, requiring research, writing, editing, and distribution across multiple platforms.",
    solution: "A multi-agent system that researches topics, generates content, optimizes for different platforms, and manages publication.",
    agenticApproach: `
## The Content Factory: Role-Based Coordination
- **Researcher Agent**: Scrapes 'ArXiv' and 'Substack' to find the 5 most influential daily tech signals.
- **Writer Agent**: Converts facts into 'Themed Drafts' (e.g., 'The Future of Agency').
- **Editor Agent**: A high-reasoning model (e.g., Claude 3.5 Sonnet) focused on tone consistency.
- **SEO Agent**: Injects keywords without breaking the narrative flow.
- **Publisher Agent**: Formats the final markdown into HTML for Web and 'Thread-style' for Social Media.

## Pipeline Orchestration
1. **Fact-Finding**: Researcher identifies a trending topic.
2. **Drafting**: Writer creates a 1000-word draft.
3. **Looping**: Editor reviews. If tone score < 8, it's sent back to the Writer with specific feedback.
4. **Distribution**: Publisher agent splits the primary article into 10 'Micro-posts' for cross-platform reach.

![Memory Systems]([INFOGRAPHIC:MEMORY_MGMT])
    `,
    keyTakeaways: [
      "Agents can automate entire workflows from start to finish",
      "Specialized agents for different tasks produce better quality than generalist agents",
      "Multi-platform distribution requires content adaptation",
      "Quality control through multiple review stages is essential",
    ],
    relatedModules: [2, 4, 5],
    implementation: `
## System Architecture

### Content Management
- Central content repository
- Version control for all drafts
- Approval workflows
- Publication scheduling

### Quality Metrics
- Readability scores
- SEO metrics
- Engagement predictions
- Plagiarism detection

### Distribution
- Scheduled publishing
- Cross-platform formatting
- Analytics tracking
- Performance monitoring

## Results
- 70% reduction in content creation time
- 5x increase in content output
- 45% improvement in engagement metrics
- Consistent quality across all platforms
    `,
  },
];

export const resources: Resource[] = [
  {
    id: "res-1",
    title: "Building Effective AI Agents",
    type: "article",
    url: "https://www.anthropic.com/research/building-effective-agents",
    author: "Anthropic",
    date: "2024-12-19",
    description: "Comprehensive guide on designing and implementing effective AI agents with best practices from Anthropic.",
    relatedModules: [1, 2, 4],
  },
  {
    id: "res-2",
    title: "LangChain Documentation",
    type: "documentation",
    url: "https://python.langchain.com/",
    author: "LangChain",
    date: "2025-01-01",
    description: "Official documentation for LangChain framework with examples and API reference.",
    relatedModules: [3, 4],
  },
  {
    id: "res-3",
    title: "CrewAI Framework Guide",
    type: "documentation",
    url: "https://docs.crewai.com/",
    author: "CrewAI",
    date: "2025-01-01",
    description: "Complete guide to building multi-agent systems with CrewAI.",
    relatedModules: [2, 4],
  },
  {
    id: "res-4",
    title: "ReAct: Synergizing Reasoning and Acting in Language Models",
    type: "paper",
    url: "https://arxiv.org/abs/2210.03629",
    author: "Yao et al.",
    date: "2022-10-07",
    description: "Seminal paper introducing the ReAct pattern for combining reasoning and acting in LLMs.",
    relatedModules: [2, 4],
  },
  {
    id: "res-5",
    title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks",
    type: "paper",
    url: "https://arxiv.org/abs/2005.11401",
    author: "Lewis et al.",
    date: "2020-05-22",
    description: "Foundational paper on RAG techniques for improving LLM knowledge and accuracy.",
    relatedModules: [1, 3],
  },
  {
    id: "res-6",
    title: "AutoGen: Enabling Next-Gen LLM Applications via Multi-Agent Conversation",
    type: "paper",
    url: "https://arxiv.org/abs/2308.08155",
    author: "Wu et al.",
    date: "2023-08-16",
    description: "Research paper on AutoGen framework for multi-agent systems.",
    relatedModules: [2, 4],
  },
  {
    id: "res-7",
    title: "The Prompt Engineering Guide",
    type: "article",
    url: "https://www.promptingguide.ai/",
    author: "DAIR.AI",
    date: "2024-01-01",
    description: "Comprehensive guide to prompt engineering techniques for working with LLMs.",
    relatedModules: [1, 2],
  },
  {
    id: "res-8",
    title: "Function Calling with LLMs",
    type: "article",
    url: "https://www.promptingguide.ai/applications/function_calling",
    author: "DAIR.AI",
    date: "2024-10-30",
    description: "Guide to implementing function calling and tool use with LLMs.",
    relatedModules: [3, 4],
  },
];

export const references: Reference[] = [
  {
    id: "ref-1",
    title: "Artificial Intelligence: A Modern Approach",
    authors: ["Russell, S.", "Norvig, P."],
    year: 2020,
    url: "https://aima.cs.berkeley.edu/",
    type: "book",
    description: "Comprehensive textbook on AI fundamentals and agent design.",
  },
  {
    id: "ref-2",
    title: "ReAct: Synergizing Reasoning and Acting in Language Models",
    authors: ["Yao, S.", "Zhao, J.", "Yu, D.", "et al."],
    year: 2022,
    url: "https://arxiv.org/abs/2210.03629",
    type: "research",
    description: "Introduces the ReAct pattern for combining reasoning and acting.",
  },
  {
    id: "ref-3",
    title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks",
    authors: ["Lewis, P.", "Perez, E.", "Piktus, A.", "et al."],
    year: 2020,
    url: "https://arxiv.org/abs/2005.11401",
    type: "research",
    description: "Foundational work on RAG for improving LLM knowledge.",
  },
  {
    id: "ref-4",
    title: "AutoGen: Enabling Next-Gen LLM Applications via Multi-Agent Conversation",
    authors: ["Wu, Q.", "Bansal, G.", "Zhang, J.", "et al."],
    year: 2023,
    url: "https://arxiv.org/abs/2308.08155",
    type: "research",
    description: "Research on multi-agent systems and conversational programming.",
  },
  {
    id: "ref-5",
    title: "LangChain: Building applications with LLMs through composability",
    authors: ["Chase, H."],
    year: 2023,
    url: "https://python.langchain.com/",
    type: "documentation",
    description: "Documentation and guide for LangChain framework.",
  },
  {
    id: "ref-6",
    title: "A Practical Guide to Building Agents",
    authors: ["OpenAI"],
    year: 2024,
    url: "https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf",
    type: "blog",
    description: "Practical guide from OpenAI on building production agents.",
  },
];

export const quizzes: ModuleQuiz[] = [
  {
    moduleId: "module-1",
    title: "Module 1 Assessment: Agentic Foundations",
    description: "Validate your understanding of LLM basics and the core concepts of agentic systems.",
    questions: [
      {
        id: "q1-1",
        question: "What is the primary difference between a standard LLM call and an Agentic AI system?",
        options: [
          "Agents are faster than standard LLMs",
          "Agents use a loop (Thought-Action-Observation) to solve multi-step problems autonomously",
          "Standard LLMs cannot use tools",
          "Agents don't require prompts"
        ],
        correctAnswer: 1,
        explanation: "Agentic AI systems are characterized by their ability to reason, act, and observe in a loop to recursively solve complex tasks."
      },
      {
        id: "q1-2",
        question: "Which pattern is fundamental for agents to reason and act concurrently?",
        options: ["Chain of Thought", "ReAct", "Self-Consistency", "Least-to-Most prompting"],
        correctAnswer: 1,
        explanation: "The ReAct (Reasoning + Acting) pattern is the foundation of most modern agentic frameworks."
      }
    ]
  },
  {
    moduleId: "module-3",
    title: "Module 3 Assessment: Frameworks & Tools",
    description: "Test your knowledge on LangChain tools and Pydantic schemas.",
    questions: [
      {
        id: "q3-1",
        question: "In LangChain, what is required to define the input schema of a custom tool?",
        options: [
          "A JSON file",
          "A Python dictionary",
          "A Pydantic BaseModel",
          "A YAML configuration"
        ],
        correctAnswer: 2,
        explanation: "LangChain uses Pydantic BaseModels to define structured input schemas for tools, which helps with type safety and LLM parsing."
      }
    ]
  }
];
