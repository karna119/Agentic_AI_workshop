import { useState, useEffect } from 'react'
import { labs } from '@/data/content'
import {
    Code, Clock, BarChart3, ChevronRight, PlayCircle, FileCode,
    Terminal, CheckCircle2, Circle, ArrowRight, Play, RefreshCcw,
    Layout, PanelLeft, Cpu
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import { RoadmapModal } from '@/components/RoadmapModal'
import {
    AgentArchitectureInfographic,
    MultiAgentMindmap,
    RAGInfographic,
    FrameworkMindmap,
    AgentLoopInfographic,
    EthicalGuardrailsInfographic,
    SingleAgentPatternsMindmap,
    ToolDesignInfographic,
    AdvancedOptimizationMindmap,
    EvolutionTimeline,
    MemoryManagementInfographic,
    OrchestrationFlow,
    PatternDeepDive,
    ToolAnatomyInfographic,
    ToolCallFlow
} from '@/components/VisualAssets'

export default function Labs() {
    const [selectedLabId, setSelectedLabId] = useState<string | null>(labs.length > 0 ? labs[0].id : null)
    const [isSimulating, setIsSimulating] = useState(false)
    const [visibleLogs, setVisibleLogs] = useState<any[]>([])
    const [currentStepIndex, setCurrentStepIndex] = useState(0)
    const [isRoadmapOpen, setIsRoadmapOpen] = useState(false)

    const selectedLab = labs.find(l => l.id === selectedLabId)

    useEffect(() => {
        if (isSimulating && selectedLab?.simulationLogs) {
            let i = 0
            setVisibleLogs([selectedLab.simulationLogs[0]])
            i = 1
            const interval = setInterval(() => {
                if (i < selectedLab.simulationLogs!.length) {
                    setVisibleLogs(prev => [...prev, selectedLab.simulationLogs![i]])
                    i++
                } else {
                    // Add a completion message
                    setVisibleLogs(prev => [...prev, { type: 'system', message: '► SIMULATION CYCLE COMPLETE: All tasks executed successfully.' }])
                    clearInterval(interval)
                    setIsSimulating(false)
                }
            }, 1200) // Slightly slower for better readability
            return () => clearInterval(interval)
        }
    }, [isSimulating, selectedLab])

    const startSimulation = () => {
        if (selectedLab?.simulationLogs && selectedLab.simulationLogs.length > 0) {
            setIsSimulating(true)
        }
    }

    return (
        <div className="h-[calc(100vh-120px)] flex flex-col space-y-4 px-6 md:px-12">
            {/* Header Area */}
            <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                        <Cpu className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight">Agentic Engineering Lab</h1>
                        <p className="text-slate-500 text-sm font-medium">Immersive environment for building autonomous systems</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/50 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700">
                        <BarChart3 className="w-4 h-4 text-primary" />
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{labs.length} Projects Available</span>
                    </div>
                </div>
            </div>

            {/* Main Workbench */}
            <div className="flex-1 flex gap-6 overflow-hidden min-h-0">
                {/* Left Sidebar: Lab Navigator */}
                <div className="w-80 flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar shrink-0">
                    {labs.map((lab, i) => (
                        <motion.div
                            key={lab.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                        >
                            <div
                                onClick={() => {
                                    setSelectedLabId(lab.id)
                                    setVisibleLogs([])
                                    setIsSimulating(false)
                                }}
                                className={cn(
                                    "p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 group relative overflow-hidden",
                                    selectedLabId === lab.id
                                        ? "border-primary bg-white dark:bg-slate-900 shadow-xl shadow-primary/5 scale-[1.02]"
                                        : "border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 hover:border-slate-200 dark:hover:border-slate-700"
                                )}
                            >
                                <div className="flex items-start gap-3">
                                    <div className={cn(
                                        "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                                        selectedLabId === lab.id ? "bg-primary text-white" : "bg-white dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700"
                                    )}>
                                        <FileCode className="w-4 h-4" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className={cn("text-sm font-bold truncate", selectedLabId === lab.id ? "text-primary" : "text-slate-600 dark:text-slate-300")}>
                                            {lab.title}
                                        </h4>
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                                                <Clock className="w-3 h-3" /> {lab.duration}
                                            </span>
                                            <div className={cn(
                                                "w-1.5 h-1.5 rounded-full",
                                                lab.difficulty === 'beginner' ? "bg-emerald-500" : lab.difficulty === 'intermediate' ? "bg-amber-500" : "bg-rose-500"
                                            )} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    <div className="mt-auto p-4 rounded-2xl bg-gradient-to-br from-primary to-orange-700 text-white shadow-lg shadow-primary/20">
                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-2">Next Milestone</p>
                        <p className="text-sm font-bold leading-snug">Multi-Agent Orchestration Masterclass</p>
                        <button
                            onClick={() => setIsRoadmapOpen(true)}
                            className="mt-3 w-full py-2 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-colors"
                        >
                            View Roadmap
                        </button>
                    </div>
                </div>

                {/* Main Content Area: IDE Layout */}
                <div className="flex-1 flex flex-col gap-6 overflow-hidden min-w-0">
                    <div className="flex-1 grid grid-cols-1 lg:grid-cols-5 gap-6 overflow-hidden">
                        {/* Documentation Panel */}
                        <div className="lg:col-span-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2rem] border border-slate-200/50 dark:border-slate-800/50 flex flex-col overflow-hidden shadow-2xl shadow-slate-200/20 dark:shadow-none transition-all duration-500 hover:border-primary/20">
                            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <PanelLeft className="w-5 h-5 text-primary" />
                                    <span className="text-sm font-bold tracking-tight uppercase">Lab Specification</span>
                                </div>
                                <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                                    Module {selectedLab?.module}
                                </span>
                            </div>
                            <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={selectedLab?.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="prose prose-slate dark:prose-invert prose-sm max-w-none"
                                    >
                                        <h2 className="text-2xl font-bold mb-4">{selectedLab?.title}</h2>
                                        <p className="text-slate-500 mb-6">{selectedLab?.description}</p>

                                        <div className="h-px bg-slate-100 dark:bg-slate-800 my-6" />

                                        <ReactMarkdown
                                            components={{
                                                img: ({ src }: any) => {
                                                    const s = src || ''
                                                    if (s.includes('AGENT_ARCHITECTURE') || s.includes('ARCHITECTURE')) return <AgentArchitectureInfographic />
                                                    if (s.includes('MULTI_AGENT')) return <MultiAgentMindmap />
                                                    if (s.includes('RAG_PIPELINE')) return <RAGInfographic />
                                                    if (s.includes('FRAMEWORKS')) return <FrameworkMindmap />
                                                    if (s.includes('AGENT_LOOP')) return <AgentLoopInfographic />
                                                    if (s.includes('SAFETY')) return <EthicalGuardrailsInfographic />
                                                    if (s.includes('PATTERNS')) return <SingleAgentPatternsMindmap />
                                                    if (s.includes('TOOL_DESIGN')) return <ToolDesignInfographic />
                                                    if (s.includes('OPTIMIZATION')) return <AdvancedOptimizationMindmap />
                                                    if (s.includes('EVOLUTION')) return <EvolutionTimeline />
                                                    if (s.includes('MEMORY_MGMT')) return <MemoryManagementInfographic />
                                                    if (s.includes('ORCHESTRATION')) return <OrchestrationFlow />
                                                    if (s.includes('PATTERN_DEEP_DIVE')) return <PatternDeepDive />
                                                    if (s.includes('TOOL_ANATOMY')) return <ToolAnatomyInfographic />
                                                    if (src.includes('TOOL_CALL_FLOW')) return <ToolCallFlow />
                                                    return <img src={src} className="rounded-2xl shadow-lg my-6" />
                                                },
                                                code({ node, inline, className, children, ...props }: any) {
                                                    return (
                                                        <code className={cn(
                                                            "bg-slate-100 dark:bg-slate-800 rounded px-1.5 py-0.5 font-mono text-primary dark:text-orange-400",
                                                            !inline && "block p-4 whitespace-pre overflow-x-auto text-[11px] my-4 border border-slate-200 dark:border-slate-800"
                                                        )} {...props}>
                                                            {children}
                                                        </code>
                                                    )
                                                }
                                            }}
                                        >
                                            {selectedLab?.content || ''}
                                        </ReactMarkdown>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Interactive Steps & Console Panel */}
                        <div className="lg:col-span-2 flex flex-col gap-6 overflow-hidden">
                            {/* Progress Stepper */}
                            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2rem] border border-slate-200/50 dark:border-slate-800/50 p-8 shadow-xl shadow-slate-200/20 dark:shadow-none shrink-0 transition-all duration-500 hover:border-primary/20">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-5 flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-primary" /> Implementation Steps
                                </h3>
                                <div className="space-y-3">
                                    {selectedLab?.steps?.map((step, idx) => (
                                        <div key={idx} className="flex items-start gap-3">
                                            <div className="mt-0.5">
                                                {step.status === 'completed' ? (
                                                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                                ) : step.status === 'current' ? (
                                                    <div className="w-4 h-4 rounded-full border-2 border-primary flex items-center justify-center">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                                    </div>
                                                ) : (
                                                    <Circle className="w-4 h-4 text-slate-200 dark:text-slate-700" />
                                                )}
                                            </div>
                                            <div>
                                                <p className={cn("text-sm font-bold leading-none", step.status === 'current' ? "text-slate-900 dark:text-white" : "text-slate-400")}>
                                                    {step.title}
                                                </p>
                                                {step.status === 'current' && (
                                                    <p className="text-xs text-slate-500 mt-2">{step.detail}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Simulation Console */}
                            <div className="flex-1 bg-slate-950 rounded-[2rem] border border-slate-800/50 shadow-2xl flex flex-col overflow-hidden relative group ring-1 ring-white/5">
                                <div className="flex items-center justify-between px-6 py-3 border-b border-white/5 bg-white/5 backdrop-blur-md">
                                    <div className="flex items-center gap-2 text-slate-400">
                                        <Terminal className="w-5 h-5" />
                                        <span className="text-xs font-mono tracking-wider uppercase">Agentic Console v1.0.4</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2 h-2 rounded-full bg-rose-500" />
                                        <div className="w-2 h-2 rounded-full bg-amber-500" />
                                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                    </div>
                                </div>
                                <div className="flex-1 overflow-y-auto p-6 font-mono text-sm space-y-4 custom-scrollbar scroll-smooth">
                                    {visibleLogs.length === 0 ? (
                                        <div className="h-full flex flex-col items-center justify-center text-slate-600 text-center px-8">
                                            <Play className="w-10 h-10 mb-4 opacity-20" />
                                            <p className="font-bold text-lg">System Standby</p>
                                            <p className="text-xs mt-2 opacity-50 uppercase tracking-tighter">Initialize simulation to monitor agent reasoning and tool execution</p>
                                        </div>
                                    ) : (
                                        visibleLogs.map((log, idx) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="flex gap-3"
                                            >
                                                <span className={cn(
                                                    "px-2 py-1 rounded text-[10px] font-bold uppercase shrink-0 h-fit",
                                                    log.type === 'thought' ? "bg-primary/20 text-orange-400 border border-primary/30" :
                                                        log.type === 'action' ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" :
                                                            log.type === 'observation' ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" :
                                                                "bg-slate-500/20 text-slate-300 border border-slate-500/30"
                                                )}>
                                                    {log.type}
                                                </span>
                                                <span className={cn(
                                                    "leading-relaxed",
                                                    log.type === 'thought' ? "text-slate-200 italic" : "text-white"
                                                )}>{log.message}</span>
                                            </motion.div>
                                        ))
                                    )}
                                </div>

                                <div className="p-4 border-t border-white/5 bg-white/5 backdrop-blur-md">
                                    <Button
                                        onClick={startSimulation}
                                        disabled={isSimulating}
                                        className="w-full bg-primary hover:bg-orange-500 text-white font-bold text-sm py-6 rounded-2xl gap-3 shadow-lg shadow-primary/20 group/btn"
                                    >
                                        {isSimulating ? (
                                            <>
                                                <RefreshCcw className="w-4 h-4 animate-spin" />
                                                Processing Logic...
                                            </>
                                        ) : (
                                            <>
                                                <Play className="w-4 h-4 group-hover/btn:scale-125 transition-transform" />
                                                Initialize Simulation
                                            </>
                                        )}
                                    </Button>
                                </div>

                                {/* Decorative HUD elements */}
                                <div className="absolute top-1/2 -right-1 text-white/5 rotate-90 text-[80px] font-bold pointer-events-none select-none uppercase tracking-tighter">
                                    AGENTIC
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .custom-scrollbar::-webkit-scrollbar {
                  width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                  background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                  background: rgba(100, 116, 139, 0.2);
                  border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                  background: rgba(242, 110, 28, 0.5);
                }
            `}} />

            <RoadmapModal
                isOpen={isRoadmapOpen}
                onClose={() => setIsRoadmapOpen(false)}
            />
        </div>
    )
}
