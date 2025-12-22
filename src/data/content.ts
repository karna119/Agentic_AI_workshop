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
    title: "Custom Tool Implementation",
    module: 3,
    difficulty: "beginner",
    duration: "1.5 hours",
    description: "Learn to implement custom tools using LangChain's BaseTool structure.",
    objectives: [
      "Understand the BaseTool class structure",
      "Define input schemas using Pydantic",
      "Implement tool execution logic",
      "Handle tool errors gracefully",
    ],
    prerequisites: ["Basic Python knowledge", "Module 3 completion"],
    content: `# Custom Tool Implementation Lab

## Overview
In this lab, you'll create a custom tool that extends the LLM's capabilities. You'll learn how to:
- Define tool schemas
- Implement execution logic
- Handle errors and edge cases
- Integrate with LangChain agents

## Step 1: Understanding BaseTool
The BaseTool class is the foundation for all custom tools in LangChain. It requires:
- A unique name
- A detailed description
- An input schema (Pydantic BaseModel)
- A _run method for synchronous execution
- An _arun method for asynchronous execution

## Step 2: Define Input Schema
Use Pydantic to define what arguments your tool accepts:
\`\`\`python
from pydantic import BaseModel, Field

class CalculatorInput(BaseModel):
    a: float = Field(description="First number")
    b: float = Field(description="Second number")
\`\`\`

## Step 3: Implement Tool Class
Create your tool by extending BaseTool and implementing the _run method:
\`\`\`python
from langchain.tools import BaseTool

class SimpleAdderTool(BaseTool):
    name = "simple_adder"
    description = "Adds two numbers together"
    args_schema = CalculatorInput
    
    def _run(self, a: float, b: float) -> str:
        result = a + b
        return f"The sum of {a} and {b} is {result}"
\`\`\`

## Step 4: Test Your Tool
Test the tool to ensure it works correctly:
\`\`\`python
tool = SimpleAdderTool()
result = tool._run(a=5, b=3)
print(result)  # Output: The sum of 5 and 3 is 8
\`\`\`

![Tool Anatomy]([INFOGRAPHIC:TOOL_ANATOMY])

## Challenges
1. Create a SimpleMultiplierTool that multiplies two numbers
2. Add input validation to ensure numbers are positive
3. Implement error handling for invalid inputs
4. Create a tool that combines multiple operations
`,
    codeFile: "/home/ubuntu/module3_tool_lab.py",
    challenges: [
      "Create a SimpleMultiplierTool for multiplication",
      "Add validation to ensure inputs are within a valid range",
      "Implement a tool that performs multiple operations sequentially",
      "Create an async version of your tool using _arun",
    ],
    steps: [
      { title: "Define Schema", detail: "Create the Pydantic model for tool arguments.", status: 'current' },
      { title: "Inherit BaseTool", detail: "Create a class that extends the LangChain BaseTool.", status: 'pending' },
      { title: "Implement _run", detail: "Write the logic for synchronous execution.", status: 'pending' },
      { title: "Verification", detail: "Run the tool with test inputs to check results.", status: 'pending' }
    ],
    simulationLogs: [
      { type: 'system', message: 'Initializing Tool Development Environment...' },
      { type: 'thought', message: 'I need to create a tool that can perform mathematical additions reliably.' },
      { type: 'action', message: 'Importing Pydantic and LangChain Tooling...' },
      { type: 'observation', message: 'Standard modules loaded (pydantic==2.5.2, langchain==0.1.0).' },
      { type: 'thought', message: 'Defining CalculatorInput schema with two floats: a and b.' },
      { type: 'action', message: 'Validating Pydantic BaseModel structure...' },
      { type: 'system', message: 'Schema validated. No conflicts detected.' },
      { type: 'thought', message: 'Implementing SimpleAdderTool(BaseTool) with _run method.' },
      { type: 'action', message: 'Executing unit tests for SimpleAdderTool...' },
      { type: 'observation', message: 'Tests passed: 5 + 3 = 8.0' },
      { type: 'system', message: 'Tool registration successful. Ready for agent integration.' }
    ]
  },
  {
    id: "lab-2",
    title: "Building a ReAct Agent",
    module: 4,
    difficulty: "intermediate",
    duration: "2 hours",
    description: "Implement a simple ReAct (Reasoning and Acting) agent using LangChain.",
    objectives: [
      "Understand the ReAct pattern (Thought, Action, Observation)",
      "Implement agent loop logic",
      "Handle tool selection and execution",
      "Manage agent scratchpad and history",
    ],
    prerequisites: ["Module 1-3 completion", "Lab 1 completion"],
    content: `# Building a ReAct Agent Lab

## Overview
The ReAct pattern is fundamental to modern agentic AI. This lab teaches you to build an agent that:
- Thinks through problems step-by-step
- Chooses appropriate tools
- Observes and learns from results
- Iterates until the goal is achieved

## The ReAct Pattern

### Thought
The agent's internal reasoning about what to do next:
\`\`\`
Thought: I need to find information about weather in San Francisco
\`\`\`

### Action
The agent selects and executes a tool:
\`\`\`
Action: get_current_weather(city="San Francisco")
\`\`\`

### Observation
The result from the tool:
\`\`\`
Observation: The weather in San Francisco is 75°F and sunny
\`\`\`

## Implementation Steps

### Step 1: Define Your Tools
Create tools that your agent can use:
\`\`\`python
class WeatherTool:
    name = "get_current_weather"
    description = "Get current weather for a city"
    
    def run(self, city: str) -> str:
        # Simulated weather data
        return f"Weather in {city}: 75°F and sunny"
\`\`\`

### Step 2: Implement the Agent Loop
Create the main agent loop that orchestrates Thought, Action, Observation:
\`\`\`python
def run_agent(user_query):
    history = []
    
    while not done:
        # Thought: LLM reasons about next step
        thought = llm.think(user_query, history)
        history.append(("Thought", thought))
        
        # Action: LLM selects and executes tool
        action = llm.select_tool(thought)
        result = execute_tool(action)
        history.append(("Action", action))
        
        # Observation: Store result
        history.append(("Observation", result))
        
        # Check if done
        if should_stop(result):
            done = True
    
    return format_final_answer(history)
\`\`\`

### Step 3: Add Error Handling
Handle tool failures gracefully:
\`\`\`python
try:
    result = execute_tool(action)
except ToolError as e:
    result = f"Error: {str(e)}. Please try a different approach."
\`\`\`

![Tool Call Flow]([INFOGRAPHIC:TOOL_CALL_FLOW])

## Challenges
1. Add a second tool (e.g., get_forecast) and make the agent choose between them
2. Implement a maximum iteration limit to prevent infinite loops
3. Add a confidence score to the agent's decisions
4. Implement tool result caching to avoid redundant calls
`,
    codeFile: "/home/ubuntu/module4_langchain_lab.py",
    challenges: [
      "Add a second tool and implement dynamic tool selection",
      "Implement iteration limits and early stopping",
      "Add logging to track all Thought, Action, Observation steps",
      "Create a tool that uses results from previous tools",
    ],
    steps: [
      { title: "Agent Setup", detail: "Initialize the LLM and memory components.", status: 'current' },
      { title: "Tool Mapping", detail: "Define the set of tools available to the agent.", status: 'pending' },
      { title: "ReAct Loop", detail: "Implement the Thought-Action-Observation cycle.", status: 'pending' },
      { title: "Final Conclusion", detail: "Handle the exit condition and final response.", status: 'pending' }
    ],
    simulationLogs: [
      { type: 'system', message: 'Agent Brain Initialized. Model: gpt-4-turbo' },
      { type: 'thought', message: 'Goal: Find the current weather in Paris and compare with London.' },
      { type: 'action', message: 'get_weather(city="Paris")' },
      { type: 'observation', message: 'Paris: 12°C, Overcast. Humidity: 82%.' },
      { type: 'thought', message: 'Paris found. Now checking London for comparison data.' },
      { type: 'action', message: 'get_weather(city="London")' },
      { type: 'observation', message: 'London: 10°C, Rain. Wind: 15km/h NW.' },
      { type: 'thought', message: 'Paris (12°C) is slightly warmer than London (10°C). Generating comparison report.' },
      { type: 'action', message: 'format_output(data=["Paris", "London"])' },
      { type: 'observation', message: 'Report formatted successfully.' },
      { type: 'system', message: 'Task complete. Returning final answer to user.' }
    ]
  },
  {
    id: "lab-3",
    title: "Multi-Agent Crew Implementation",
    module: 4,
    difficulty: "advanced",
    duration: "3 hours",
    description: "Build a multi-agent system using CrewAI with specialized agents collaborating on a complex task.",
    objectives: [
      "Design specialized agents with distinct roles",
      "Define tasks and dependencies",
      "Implement hierarchical orchestration",
      "Handle inter-agent communication",
    ],
    prerequisites: ["Module 1-4 completion", "Lab 1 and 2 completion"],
    content: `# Multi-Agent Crew Implementation Lab

## Overview
In this advanced lab, you'll build a complete multi-agent system where specialized agents collaborate to solve complex problems.

## System Architecture

### Agent Roles
1. **Researcher Agent**: Gathers information from multiple sources
2. **Analyst Agent**: Synthesizes and analyzes the research
3. **Writer Agent**: Creates polished content from analysis
4. **Critic Agent**: Reviews and provides feedback

### Task Flow
\`\`\`
Research → Analysis → Writing → Critique → Final Output
\`\`\`

## Implementation

### Step 1: Define Agents
\`\`\`python
from crewai import Agent

researcher = Agent(
    role="Senior Research Analyst",
    goal="Find and summarize latest trends",
    backstory="Expert in AI frameworks with deep research skills",
    tools=[search_tool, rag_tool],
    verbose=True
)

writer = Agent(
    role="Technical Writer",
    goal="Write compelling technical content",
    backstory="Professional writer skilled in technical topics",
    tools=[],
    verbose=True
)
\`\`\`

### Step 2: Define Tasks
\`\`\`python
from crewai import Task

research_task = Task(
    description="Research the latest developments in Agentic AI",
    agent=researcher,
    expected_output="Comprehensive research summary"
)

writing_task = Task(
    description="Write a 500-word blog post based on research",
    agent=writer,
    context=[research_task],
    expected_output="Polished blog post in Markdown"
)
\`\`\`

### Step 3: Create and Execute Crew
\`\`\`python
from crewai import Crew, Process

crew = Crew(
    agents=[researcher, writer],
    tasks=[research_task, writing_task],
    process=Process.sequential,
    verbose=2
)

result = crew.kickoff()
\`\`\`

## Advanced Features

### Hierarchical Process
Use a manager agent to coordinate others:
\`\`\`python
crew = Crew(
    agents=[manager, researcher, writer, critic],
    tasks=[...],
    process=Process.hierarchical,
    manager_agent=manager
)
\`\`\`

### Error Handling and Retries
Implement robust error handling:
\`\`\`python
try:
    result = crew.kickoff()
except AgentError as e:
    # Implement retry logic
    result = crew.kickoff(max_retries=3)
\`\`\`

![Orchestration Flow]([INFOGRAPHIC:ORCHESTRATION])

## Challenges
1. Add a Critic agent that reviews the Writer's output
2. Implement feedback loops where the Writer revises based on Critic feedback
3. Add tool result caching to improve performance
4. Create a monitoring dashboard to track agent progress
`,
    codeFile: "/home/ubuntu/module4_crewai_lab.py",
    challenges: [
      "Implement a feedback loop between Writer and Critic agents",
      "Add a Manager agent using hierarchical orchestration",
      "Create tool result caching to avoid redundant API calls",
      "Build a complete content creation pipeline with 4+ agents",
    ],
    steps: [
      { title: "Define Agents", detail: "Create Researcher, Writer, and Critic agents with roles/backstories.", status: 'current' },
      { title: "Task Definition", detail: "Define research, writing, and review tasks with dependencies.", status: 'pending' },
      { title: "Crew Assembly", detail: "Assemble the agents into a sequential or hierarchical process.", status: 'pending' },
      { title: "Execution Trace", detail: "Run the crew and observe agent collaboration logs.", status: 'pending' }
    ],
    simulationLogs: [
      { type: 'system', message: 'CrewAI Orchestrator v1.2.0 Initialized.' },
      { type: 'thought', message: 'Project: Long-form technical report on "AI Agent Governance".' },
      { type: 'system', message: 'Delegating [Research Task] to Researcher Agent.' },
      { type: 'thought', message: 'Searching latest Arxiv papers for "Agentic AI Safety"...' },
      { type: 'action', message: 'search_arxiv(query="Agentic AI Safety", limit=5)' },
      { type: 'observation', message: 'Found 12 relevant papers. Summarizing top 3.' },
      { type: 'thought', message: 'Research complete. Passing findings to Writer Agent.' },
      { type: 'action', message: 'delegate_to_writer(context=research_summary)' },
      { type: 'thought', message: 'Writer is drafting content. Monitoring progress...' },
      { type: 'system', message: 'Draft received from Writer. Escalating to Critic Agent for review.' },
      { type: 'thought', message: 'Critic is evaluating factual accuracy and tone.' },
      { type: 'observation', message: 'Critic found 2 minor errors. Requesting revisions.' },
      { type: 'system', message: 'Revision cycle complete. Finalizing output.' },
      { type: 'system', message: 'COMPLETED: AI Agent Governance Report generated successfully.' }
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
## Architecture
- **Planner Agent**: Breaks down requirements into implementation steps
- **Coder Agent**: Generates code based on the plan
- **Tester Agent**: Runs tests and identifies failures
- **Debugger Agent**: Analyzes failures and fixes code
- **Critic Agent**: Reviews code quality and suggests improvements

![Multi-Agent Coordination Mindmap]([MINDMAP:MULTI_AGENT])

## Workflow
1. User provides requirements
2. Planner creates a detailed implementation plan
3. Coder generates initial code
4. Tester runs unit and integration tests
5. If tests fail, Debugger fixes issues
6. Critic reviews final code
7. Output: Production-ready code with full test coverage
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
## System Architecture
- **Market Monitor Agent**: Continuously tracks market data and news
- **Analyst Agent**: Performs technical and fundamental analysis
- **Report Generator Agent**: Creates comprehensive market reports
- **Risk Manager Agent**: Evaluates risk and sets position limits
- **Trader Agent**: Executes trades based on analysis and risk parameters

## Data Flow
1. Market Monitor fetches real-time data from multiple sources
2. Analyst performs complex analysis using RAG for historical context
3. Report Generator creates executive summaries
4. Risk Manager evaluates potential trades
5. Trader executes approved trades with proper risk controls

![Risk Matrix]([INFOGRAPHIC:SAFETY])

## Key Features
- Real-time market monitoring
- Multi-source data integration (news, price feeds, economic indicators)
- Risk-aware decision making
- Audit trail for all trades and decisions
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
## System Components
- **Triage Agent**: Analyzes tickets and categorizes by complexity
- **Knowledge Base Agent**: Searches company knowledge base for solutions
- **Diagnostic Agent**: Performs troubleshooting for technical issues
- **Escalation Agent**: Routes complex issues to appropriate human experts
- **Follow-up Agent**: Ensures customer satisfaction and closes resolved tickets

## Ticket Resolution Flow
1. Ticket arrives and is analyzed by Triage Agent
2. If simple: Knowledge Base Agent searches for solution
3. If technical: Diagnostic Agent runs troubleshooting steps
4. If unresolved: Escalation Agent routes to expert
5. Once resolved: Follow-up Agent confirms satisfaction

## Success Metrics
- First-contact resolution rate
- Average resolution time
- Customer satisfaction score
- Reduction in escalations
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
## Agent Team
- **Researcher Agent**: Gathers information from multiple sources
- **Writer Agent**: Creates engaging, well-structured content
- **Editor Agent**: Reviews for clarity, tone, and accuracy
- **SEO Agent**: Optimizes for search engines
- **Publisher Agent**: Formats and distributes across platforms

## Content Pipeline
1. Topic selection and research
2. Content generation with proper structure
3. Editorial review and revisions
4. SEO optimization
5. Multi-platform formatting (blog, social media, email)
6. Scheduled publication

![Memory Systems]([INFOGRAPHIC:MEMORY_MGMT])

## Platform Optimization
- Blog: Long-form, SEO-optimized content
- Twitter: Concise, engaging summaries
- LinkedIn: Professional insights
- Email: Personalized newsletters
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
