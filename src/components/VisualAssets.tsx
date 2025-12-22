import React from 'react'
import { Brain, Cpu, Database, Link as LinkIcon, Layers, Server, ShieldCheck, Zap, Repeat, Search, PenTool, ClipboardCheck, MessageSquare, Filter, Share2, Users, Workflow, Eye, Shield, Lock, Activity, BarChart3, TrendingUp, ZapOff, History, ArrowRight, ArrowDown, Construction, Terminal, Code2, Globe, Boxes } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export const AgentLoopInfographic = () => {
    const steps = [
        { label: 'Perceive', icon: Eye, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
        { label: 'Reason', icon: Brain, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
        { label: 'Act', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20' },
        { label: 'Observe', icon: Search, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20' }
    ]

    return (
        <div className="w-full bg-white dark:bg-slate-950 rounded-[2.5rem] p-12 border border-slate-200 dark:border-slate-800 my-10 shadow-xl relative overflow-hidden flex flex-col items-center">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-12">The Iterative Agent Loop</h4>

            <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
                {/* Rotating Ring */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-full"
                />

                {steps.map((step, i) => {
                    const angle = (i * 90) * (Math.PI / 180)
                    const x = Math.cos(angle) * 120
                    const y = Math.sin(angle) * 120

                    return (
                        <motion.div
                            key={step.label}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="absolute z-10 flex flex-col items-center gap-2"
                            style={{ transform: `translate(${x}px, ${y}px)` }}
                        >
                            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg border border-white dark:border-slate-800", step.bg, step.color)}>
                                <step.icon className="w-6 h-6" />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-tighter text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 px-2 py-0.5 rounded-full border border-slate-100 dark:border-slate-800">{step.label}</span>
                        </motion.div>
                    )
                })}

                <div className="z-0 p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-inner">
                    <Repeat className="w-12 h-12 text-slate-300 animate-spin-slow" />
                </div>
            </div>

            <div className="mt-12 text-center max-w-md">
                <p className="text-xs text-slate-500 font-medium leading-relaxed italic">
                    "Agents continuously adapt by processing feedforward tool results as new environmental feedback."
                </p>
            </div>
        </div>
    )
}

export const EthicalGuardrailsInfographic = () => {
    return (
        <div className="w-full bg-rose-50/30 dark:bg-rose-950/10 rounded-[2.5rem] p-10 border border-rose-100 dark:border-rose-900/30 my-10 overflow-hidden relative">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-rose-500 mb-8 flex items-center gap-2">
                <Shield className="w-4 h-4" /> Agentic Safety & Guardrails
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { title: 'Input Shields', icon: Eye, desc: 'Filtering malicious prompts & prompt injection attempts.' },
                    { title: 'Tool sandboxing', icon: Lock, desc: 'Isolating code execution in secure, ephemeral kernels.' },
                    { title: 'HITL Verification', icon: Users, desc: 'Human-in-the-loop for high-stakes financial/system actions.' }
                ].map((item, i) => (
                    <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-rose-50 dark:border-rose-900/20 shadow-sm"
                    >
                        <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-900/20 text-rose-500 flex items-center justify-center mb-4">
                            <item.icon className="w-5 h-5" />
                        </div>
                        <h5 className="font-bold text-sm mb-2">{item.title}</h5>
                        <p className="text-[11px] text-slate-500 leading-relaxed">{item.desc}</p>
                    </motion.div>
                ))}
            </div>

            <div className="mt-8 flex items-center justify-center p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20">
                <p className="text-[10px] font-bold text-rose-600 uppercase tracking-widest">Alignment Status: High Assurance</p>
            </div>
        </div>
    )
}

export const SingleAgentPatternsMindmap = () => {
    const patterns = [
        { name: 'Reflex', desc: 'Direct mapping from state to action.', complexity: 'Linear' },
        { name: 'Model-Based', desc: 'Maintains internal world state.', complexity: 'Stateful' },
        { name: 'Goal-Based', desc: 'Driven by objective attainment.', complexity: 'Directional' },
        { name: 'Utility-Based', desc: 'Optimizes for satisfaction/rules.', complexity: 'Multi-Variate' }
    ]

    return (
        <div className="w-full bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] p-10 border border-slate-200 dark:border-slate-800 my-10">
            <h4 className="text-center text-[10px] font-black uppercase tracking-widest text-slate-400 mb-10 italic underline decoration-primary decoration-2 underline-offset-8">Cognitive Agent Patterns</h4>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {patterns.map((p, i) => (
                    <motion.div
                        key={p.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:border-primary/30 transition-colors group"
                    >
                        <p className="text-[10px] font-black text-primary mb-1 uppercase tracking-widest">{p.complexity}</p>
                        <h5 className="font-bold text-lg mb-3 group-hover:text-primary transition-colors">{p.name}</h5>
                        <p className="text-[11px] text-slate-500 leading-snug">{p.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export const ToolDesignInfographic = () => {
    return (
        <div className="w-full bg-amber-50/20 dark:bg-amber-950/10 rounded-[2.5rem] p-10 border border-amber-100 dark:border-amber-900/30 my-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
                <PenTool className="w-32 h-32" />
            </div>

            <h4 className="text-xs font-black uppercase tracking-widest text-amber-500 mb-10">Reliable Tool Design Principles</h4>

            <div className="space-y-4">
                {[
                    { label: 'Atomic Capability', desc: 'Each tool should perform a single, predictable unit of work.', icon: Zap },
                    { label: 'Semantic Description', desc: 'LLMs choose tools based on text depth, so descriptions must be precise.', icon: MessageSquare },
                    { label: 'Structured Schema', desc: 'Strict Pydantic models prevent hallucinated arguments.', icon: Database }
                ].map((item, i) => (
                    <motion.div
                        key={item.label}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-6 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-amber-50 dark:border-amber-900/20"
                    >
                        <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-900/20 text-amber-600 flex items-center justify-center shrink-0">
                            <item.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <h5 className="font-bold text-sm">{item.label}</h5>
                            <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export const AdvancedOptimizationMindmap = () => {
    const nodes = [
        { label: 'Parallelization', icon: Workflow, color: 'text-blue-500' },
        { label: 'Caching', icon: Database, color: 'text-emerald-500' },
        { label: 'Model Selection', icon: Brain, color: 'text-primary' },
        { label: 'Token Trimming', icon: ZapOff, color: 'text-rose-500' }
    ]

    return (
        <div className="w-full bg-slate-900 rounded-[2.5rem] p-12 border border-slate-800 my-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50" />

            <div className="relative z-10 flex flex-col items-center">
                <div className="flex items-center gap-3 mb-10">
                    <TrendingUp className="w-6 h-6 text-primary" />
                    <h4 className="text-sm font-black uppercase tracking-widest text-white">Performance Optimization Matrix</h4>
                </div>

                <div className="grid grid-cols-2 gap-4 w-full">
                    {nodes.map((node, i) => (
                        <motion.div
                            key={node.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-slate-800/80 backdrop-blur-md p-6 rounded-3xl border border-white/5 flex flex-col items-center text-center group hover:bg-slate-800 transition-all shadow-2xl"
                        >
                            <div className={cn("w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center mb-4 shadow-xl border border-white/10 group-hover:scale-110 transition-transform", node.color)}>
                                <node.icon className="w-7 h-7" />
                            </div>
                            <h5 className="text-xs font-bold text-white uppercase tracking-wider">{node.label}</h5>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export const AgentArchitectureInfographic = () => {
    return (
        <div className="w-full bg-white/50 dark:bg-slate-950/50 backdrop-blur-xl rounded-[2.5rem] p-12 border border-slate-200 dark:border-slate-800 my-10 shadow-2xl shadow-slate-200/50 dark:shadow-none overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
            <h4 className="text-center text-sm font-bold uppercase tracking-widest text-slate-400 mb-12">Core Agent Architecture</h4>

            <div className="relative max-w-2xl mx-auto flex flex-col items-center">
                {/* Central Brain (LLM) */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="z-10 w-32 h-32 rounded-3xl bg-primary flex flex-col items-center justify-center text-white shadow-2xl shadow-primary/40 text-center p-4 border-4 border-white dark:border-slate-900"
                >
                    <Brain className="w-8 h-8 mb-2" />
                    <span className="text-xs font-bold leading-tight">LLM<br />(The Brain)</span>
                </motion.div>

                {/* Connecting Lines (Simulated with div borders) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[200px] pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 400 200">
                        <line x1="50" y1="30" x2="200" y2="100" stroke="currentColor" strokeWidth="2" strokeDasharray="4" className="text-slate-300 dark:text-slate-700" />
                        <line x1="350" y1="30" x2="200" y2="100" stroke="currentColor" strokeWidth="2" strokeDasharray="4" className="text-slate-300 dark:text-slate-700" />
                        <line x1="50" y1="170" x2="200" y2="100" stroke="currentColor" strokeWidth="2" strokeDasharray="4" className="text-slate-300 dark:text-slate-700" />
                        <line x1="350" y1="170" x2="200" y2="100" stroke="currentColor" strokeWidth="2" strokeDasharray="4" className="text-slate-300 dark:text-slate-700" />
                    </svg>
                </div>

                {/* Satellite Components */}
                <div className="w-full grid grid-cols-2 gap-y-16 mt-[-60px]">
                    {/* Top Left: Memory */}
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col items-center gap-2"
                    >
                        <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 text-primary border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-lg">
                            <Database className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Memory</span>
                        <p className="text-[9px] text-slate-400 text-center max-w-[80px]">Conversation & Global Context</p>
                    </motion.div>

                    {/* Top Right: Tools */}
                    <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col items-center gap-2"
                    >
                        <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 text-amber-500 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-lg">
                            <LinkIcon className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Tools</span>
                        <p className="text-[9px] text-slate-400 text-center max-w-[80px]">APIs & Search Capabilities</p>
                    </motion.div>

                    {/* Bottom Left: Planning */}
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col items-center gap-2"
                    >
                        <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 text-emerald-500 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-lg">
                            <Layers className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Planning</span>
                        <p className="text-[9px] text-slate-400 text-center max-w-[80px]">Task Decomposition Logic</p>
                    </motion.div>

                    {/* Bottom Right: Execution */}
                    <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-col items-center gap-2"
                    >
                        <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 text-rose-500 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-lg">
                            <Zap className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Execution</span>
                        <p className="text-[9px] text-slate-400 text-center max-w-[80px]">Actions & State Management</p>
                    </motion.div>
                </div>
            </div>

            <div className="mt-12 flex justify-center gap-8 border-t border-slate-200 dark:border-slate-800 pt-6">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter italic">Reason-Action Loop</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700" />
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">Feedback Driven</span>
                </div>
            </div>
        </div>
    )
}

export const MultiAgentMindmap = () => {
    const agents = [
        { role: 'Researcher', icon: Search, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20', desc: 'Data Gathering' },
        { role: 'Analyst', icon: Cpu, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20', desc: 'Pattern ID' },
        { role: 'Writer', icon: PenTool, color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/20', desc: 'Content Gen' },
        { role: 'Critic', icon: ClipboardCheck, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20', desc: 'QA & Review' },
    ]

    return (
        <div className="w-full bg-white dark:bg-slate-900 rounded-3xl p-8 border-2 border-slate-100 dark:border-slate-800 my-8 shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <MessageSquare className="w-24 h-24" />
            </div>

            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 mb-10 border-l-4 border-primary pl-6">Multi-Agent Collaboration Flow</h4>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {agents.map((agent, i) => (
                    <motion.div
                        key={agent.role}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex flex-col items-center"
                    >
                        <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-3 shadow-sm border border-slate-100 dark:border-slate-800", agent.bg, agent.color)}>
                            <agent.icon className="w-8 h-8" />
                        </div>
                        <span className="text-xs font-bold text-slate-900 dark:text-white uppercase">{agent.role}</span>
                        <span className="text-[10px] text-slate-500 font-medium italic mt-1">{agent.desc}</span>

                        {i < 3 && (
                            <div className="hidden md:block absolute mt-8 translate-x-[90px]">
                                <ArrowRight className="w-4 h-4 text-slate-300 animate-pulse" />
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>

            <div className="mt-8 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between text-[11px] font-bold">
                <span className="text-slate-400">STATUS: ACTIVE ORCHESTRATION</span>
                <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-emerald-600 uppercase tracking-tighter">Sync Complete</span>
                </div>
            </div>
        </div>
    )
}



export const RoadmapInfographic = () => {
    const steps = [
        { id: 1, title: 'Foundations', desc: 'Core agent concepts & history' },
        { id: 2, title: 'Architectures', desc: 'ReAct, Multi-Agent & Orchestration' },
        { id: 3, title: 'Tool Use', desc: 'RAG, APIs & Schema Design' },
        { id: 4, title: 'Frameworks', desc: 'LangChain, AutoGen & CrewAI' },
        { id: 5, title: 'Real-World', desc: 'Enterprise deployment & Scaling' },
    ]

    return (
        <div className="w-full py-4 space-y-6">
            {steps.map((step, i) => (
                <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4 group"
                >
                    <div className="flex flex-col items-center">
                        <div className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center font-bold relative z-10 transition-transform group-hover:scale-110",
                            i === 0 ? "bg-primary text-white shadow-lg shadow-primary/30" : "bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700"
                        )}>
                            {step.id}
                        </div>
                        {i < steps.length - 1 && (
                            <div className="w-0.5 flex-1 bg-slate-200 dark:bg-slate-800 my-2" />
                        )}
                    </div>
                    <div className="flex-1 pb-8">
                        <h4 className={cn("font-bold text-sm tracking-tight", i === 0 ? "text-primary" : "text-slate-600 dark:text-slate-300")}>
                            {step.title}
                        </h4>
                        <p className="text-xs text-slate-500 mt-1">{step.desc}</p>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}

export const RAGInfographic = () => {
    const steps = [
        { label: 'User Query', icon: MessageSquare, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
        { label: 'Embedding', icon: Fingerprint, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
        { label: 'Vector DB', icon: Database, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20' },
        { label: 'Context', icon: Filter, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
        { label: 'LLM Reason', icon: Brain, color: 'text-primary', bg: 'bg-orange-50 dark:bg-orange-900/20' }
    ]

    return (
        <div className="w-full bg-slate-50 dark:bg-slate-900/50 rounded-[2rem] p-8 border border-slate-200 dark:border-slate-800 my-8 overflow-hidden relative">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-8 flex items-center gap-2">
                <Search className="w-4 h-4" /> RAG Retrieval Pipeline
            </h4>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative">
                {steps.map((step, i) => (
                    <React.Fragment key={step.label}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex flex-col items-center gap-2 z-10"
                        >
                            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 dark:border-slate-800", step.bg, step.color)}>
                                <step.icon className="w-6 h-6" />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-tighter text-slate-600 dark:text-slate-400">{step.label}</span>
                        </motion.div>
                        {i < steps.length - 1 && (
                            <div className="hidden md:block">
                                <ArrowRight className="w-4 h-4 text-slate-300" />
                            </div>
                        )}
                        {i < steps.length - 1 && (
                            <div className="md:hidden">
                                <ArrowDown className="w-4 h-4 text-slate-300 my-2" />
                            </div>
                        )}
                    </React.Fragment>
                ))}

                {/* Connecting Path Background */}
                <div className="absolute top-7 left-0 w-full h-0.5 bg-slate-100 dark:bg-slate-800 -z-0 hidden md:block" />
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                    <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Retrieval</p>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-tight">Semantic search identifies relevant knowledge chunks from vector space.</p>
                </div>
                <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                    <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Generation</p>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-tight">LLM uses retrieved context to ground responses in factual data.</p>
                </div>
            </div>
        </div>
    )
}

export const FrameworkMindmap = () => {
    const frameworks = [
        {
            name: 'LangChain',
            icon: LinkIcon,
            color: 'text-emerald-500',
            features: ['Chains & LCEL', 'LangGraph Loops', 'Massive Tooling']
        },
        {
            name: 'AutoGen',
            icon: Users,
            color: 'text-primary',
            features: ['Conversational AI', 'User Proxy Agents', 'Multi-model Support']
        },
        {
            name: 'CrewAI',
            icon: Workflow,
            color: 'text-blue-500',
            features: ['Role-based Agents', 'Process Driven', 'Autonomous Tasks']
        }
    ]

    return (
        <div className="w-full bg-white dark:bg-slate-950 rounded-[2.5rem] p-10 border border-slate-200 dark:border-slate-800 my-10 shadow-xl overflow-hidden relative">
            <h4 className="text-center text-[10px] font-black uppercase tracking-widest text-slate-400 mb-12">Agentic Framework Comparison</h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                {/* Central Connecting Hub */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                    <Cpu className="w-64 h-64 text-primary" />
                </div>

                {frameworks.map((fw, i) => (
                    <motion.div
                        key={fw.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="relative z-10 flex flex-col items-center text-center p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-900 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-800 group"
                    >
                        <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-lg transition-transform group-hover:scale-110", fw.color, "bg-white dark:bg-slate-800 shadow-slate-200/50 dark:shadow-none")}>
                            <fw.icon className="w-8 h-8" />
                        </div>
                        <h5 className="font-bold text-lg mb-4">{fw.name}</h5>
                        <ul className="space-y-2">
                            {fw.features.map(feat => (
                                <li key={feat} className="text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-white/50 dark:bg-slate-800/50 px-3 py-1 rounded-full border border-slate-100 dark:border-slate-700">
                                    {feat}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export const EvolutionTimeline = () => {
    const events = [
        { year: '1950s', title: 'Symbolatist AI', icon: History, color: 'text-slate-400', desc: 'Rules & Logic' },
        { year: '1990s', title: 'ML Agents', icon: Cpu, color: 'text-blue-400', desc: 'Statistical Learning' },
        { year: '2022', title: 'LLM Era', icon: Brain, color: 'text-primary', desc: 'Reasoning Engines' },
        { year: '2024+', title: 'Agentic AI', icon: Zap, color: 'text-amber-500', desc: 'Autonomous Agency' }
    ]

    return (
        <div className="w-full bg-slate-50 dark:bg-slate-900/50 rounded-[2rem] p-8 border border-slate-200 dark:border-slate-800 my-8 overflow-hidden relative">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-10">Evolution of Agency</h4>
            <div className="flex flex-col md:flex-row justify-between items-start gap-8 relative">
                {events.map((event, i) => (
                    <motion.div
                        key={event.year}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex-1 relative z-10"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className={cn("w-10 h-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm border border-slate-100 dark:border-slate-700", event.color)}>
                                <event.icon className="w-5 h-5" />
                            </div>
                            <div>
                                <span className="text-[10px] font-black text-slate-400 uppercase">{event.year}</span>
                                <h5 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{event.title}</h5>
                            </div>
                        </div>
                        <p className="text-[11px] text-slate-500">{event.desc}</p>
                    </motion.div>
                ))}
                {/* Connecting Line */}
                <div className="absolute top-5 left-0 w-full h-[2px] bg-slate-100 dark:bg-slate-800 -z-0 hidden md:block" />
            </div>
        </div>
    )
}

export const MemoryManagementInfographic = () => {
    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div className="bg-blue-50/50 dark:bg-blue-900/10 p-8 rounded-[2rem] border border-blue-100 dark:border-blue-900/30">
                <h5 className="flex items-center gap-2 font-bold mb-4 text-blue-600">
                    <Zap className="w-4 h-4" /> Short-Term (STM)
                </h5>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    Immediate context held within the LLM's finite context window. Extremely fast but volatile.
                </p>
                <div className="space-y-2">
                    {['Conversation History', 'Intermediate Thoughts', 'Tool Outputs'].map(item => (
                        <div key={item} className="p-2 rounded-lg bg-white dark:bg-slate-900 text-[10px] font-bold border border-blue-50 dark:border-blue-900/20">{item}</div>
                    ))}
                </div>
            </div>
            <div className="bg-emerald-50/50 dark:bg-emerald-900/10 p-8 rounded-[2rem] border border-emerald-100 dark:border-emerald-900/30">
                <h5 className="flex items-center gap-2 font-bold mb-4 text-emerald-600">
                    <Database className="w-4 h-4" /> Long-Term (LTM)
                </h5>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    Persistent knowledge stored externally (Vector DBs) and retrieved via semantic search.
                </p>
                <div className="space-y-2">
                    {['RAG Index', 'Learned Reflexes', 'Domain Knowledge'].map(item => (
                        <div key={item} className="p-2 rounded-lg bg-white dark:bg-slate-900 text-[10px] font-bold border border-emerald-50 dark:border-emerald-900/20">{item}</div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export const OrchestrationFlow = () => {
    return (
        <div className="w-full bg-slate-950 rounded-[2.5rem] p-10 border border-slate-800 my-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
                <Workflow className="w-32 h-32 text-primary" />
            </div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-10">Workflow Orchestration</h4>

            <div className="space-y-6">
                {[
                    { title: 'Task Decomposition', icon: Layers, color: 'text-primary' },
                    { title: 'Dynamic Dispatch', icon: Share2, color: 'text-blue-500' },
                    { title: 'Output Synthesis', icon: Boxes, color: 'text-emerald-500' }
                ].map((step, i) => (
                    <motion.div
                        key={step.title}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-6"
                    >
                        <div className={cn("w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center border border-white/10 shadow-xl", step.color)}>
                            <step.icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1 h-[2px] bg-slate-800" />
                        <span className="text-xs font-bold text-white uppercase tracking-wider">{step.title}</span>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export const PatternDeepDive = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
            {[
                { name: 'Planner-Executor', icon: Construction, color: 'bg-orange-500', desc: 'Separates planning from execution.' },
                { name: 'Critic Pattern', icon: ShieldCheck, color: 'bg-emerald-500', desc: 'Adversarial refinement cycle.' },
                { name: 'ReAct Loop', icon: Repeat, color: 'bg-blue-500', desc: 'Thought -> Act -> Observe.' }
            ].map(item => (
                <div key={item.name} className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all group">
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-white", item.color)}>
                        <item.icon className="w-5 h-5" />
                    </div>
                    <h5 className="font-bold text-sm mb-2">{item.name}</h5>
                    <p className="text-[11px] text-slate-500">{item.desc}</p>
                </div>
            ))}
        </div>
    )
}

export const ToolAnatomyInfographic = () => {
    return (
        <div className="w-full bg-slate-50 dark:bg-slate-900/50 rounded-[2rem] p-10 border border-slate-200 dark:border-slate-800 my-8">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-10 text-center">Anatomy of a Reliable Tool</h4>
            <div className="max-w-md mx-auto relative border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-8 bg-white dark:bg-slate-950">
                <div className="space-y-4">
                    <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
                        <span className="text-[9px] font-bold text-primary uppercase">Name & Description</span>
                        <p className="text-[10px] text-slate-500">"Search the web for up-to-date facts"</p>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
                        <span className="text-[9px] font-bold text-blue-500 uppercase">Input Schema</span>
                        <p className="text-[10px] font-mono text-slate-500">query: string (required)</p>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
                        <span className="text-[9px] font-bold text-emerald-500 uppercase">Execution Logic</span>
                        <p className="text-[10px] text-slate-500">Python/JS function or API Call</p>
                    </div>
                </div>
                <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white shadow-lg">
                    <Code2 className="w-4 h-4" />
                </div>
            </div>
        </div>
    )
}

export const ToolCallFlow = () => {
    return (
        <div className="w-full py-8">
            <div className="flex items-center justify-between gap-4">
                {[
                    { label: 'LLM Reasoning', icon: Brain },
                    { label: 'Tool Selection', icon: Filter },
                    { label: 'Arg Generation', icon: Terminal },
                    { label: 'Execution', icon: Zap }
                ].map((step, i) => (
                    <React.Fragment key={step.label}>
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center shadow-sm">
                                <step.icon className="w-6 h-6 text-slate-500" />
                            </div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase text-center">{step.label}</span>
                        </div>
                        {i < 3 && <ArrowRight className="w-5 h-5 text-slate-200" />}
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}



const Fingerprint = ({ className }: { className: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 0012 3c1.223 0 2.389.22 3.467.621m0 0l.023.016a10.005 10.005 0 014.2 8.363" />
    </svg>
)
