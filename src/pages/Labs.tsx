import { useState, useEffect } from 'react'
import { labs } from '@/data/content'
import {
    BarChart3, Cpu, CheckCircle2, Circle, FileCode, Beaker, Terminal as TerminalIcon
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import { RoadmapModal } from '@/components/RoadmapModal'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { LabSidebar } from '@/components/labs/LabSidebar'
import { LabTerminal } from '@/components/labs/LabTerminal'
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
    const [isRoadmapOpen, setIsRoadmapOpen] = useState(false)
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
    const [consoleHeight, setConsoleHeight] = useState<'minimized' | 'default' | 'maximized'>('default')
    const [activeTab, setActiveTab] = useState('instructions')

    const selectedLab = labs.find(l => l.id === selectedLabId)

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setIsSidebarCollapsed(true)
            } else {
                setIsSidebarCollapsed(false)
            }
        }
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

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
                    setVisibleLogs(prev => [...prev, { type: 'system', message: '► SIMULATION CYCLE COMPLETE: All tasks executed successfully.' }])
                    clearInterval(interval)
                    setIsSimulating(false)
                }
            }, 1200)
            return () => clearInterval(interval)
        }
    }, [isSimulating, selectedLab])

    const startSimulation = () => {
        if (selectedLab?.simulationLogs && selectedLab.simulationLogs.length > 0) {
            setIsSimulating(true)
        }
    }

    return (
        <div className="h-full flex flex-col bg-slate-50/50 dark:bg-slate-950/50">
            {/* Standardized Header */}
            <div className="px-6 md:px-12 py-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shrink-0 border-b border-slate-200/50 dark:border-slate-800/50 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                        <Beaker className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                            Autonomous <span className="text-primary">Agent Lab</span>
                        </h1>
                        <p className="text-slate-500 text-sm font-medium mt-1 uppercase tracking-widest flex items-center gap-2">
                            <Cpu className="w-4 h-4 text-primary" /> Industry Standard Workspace
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/50 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700">
                        <BarChart3 className="w-4 h-4 text-primary" />
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{labs.length} Simulations Active</span>
                    </div>
                </div>
            </div>

            {/* Main Workbench */}
            <div className="flex-1 flex gap-0 overflow-hidden min-h-0 relative">
                <LabSidebar
                    labs={labs}
                    selectedLabId={selectedLabId}
                    onSelectLab={(id) => {
                        setSelectedLabId(id)
                        setVisibleLogs([])
                        setIsSimulating(false)
                    }}
                    isCollapsed={isSidebarCollapsed}
                    onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                    onViewRoadmap={() => setIsRoadmapOpen(true)}
                />

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col min-w-0 p-6 md:p-10 gap-6 overflow-hidden">
                    <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden">
                        {/* Content & Code Panel */}
                        <div className="lg:col-span-8 flex flex-col bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2rem] border border-slate-200/50 dark:border-slate-800/50 overflow-hidden shadow-2xl shadow-slate-200/20 dark:shadow-none transition-all duration-500 hover:border-primary/20">
                            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
                                <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                    <TabsList className="bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                                        <TabsTrigger value="instructions" className="rounded-lg px-4 font-bold data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700">Instructions</TabsTrigger>
                                        <TabsTrigger value="implementation" className="rounded-lg px-4 font-bold data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700">Implementation</TabsTrigger>
                                    </TabsList>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                                            Module {selectedLab?.module}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8">
                                    <TabsContent value="instructions" className="m-0 focus-visible:ring-0">
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={`ins-${selectedLab?.id}`}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="prose prose-slate dark:prose-invert prose-sm max-w-none"
                                            >
                                                <h2 className="text-2xl font-bold mb-4">{selectedLab?.title}</h2>
                                                <p className="text-slate-500 text-lg mb-6 leading-relaxed">{selectedLab?.description}</p>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                                                    <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                                                        <h4 className="text-primary font-bold mb-3 uppercase tracking-wider text-xs">Prerequisites</h4>
                                                        <ul className="space-y-2 m-0 list-none p-0">
                                                            {selectedLab?.prerequisites.map((p, i) => (
                                                                <li key={i} className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center gap-2">
                                                                    <div className="w-1 h-1 rounded-full bg-primary" /> {p}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                    <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                                                        <h4 className="text-primary font-bold mb-3 uppercase tracking-wider text-xs">Learning Goals</h4>
                                                        <ul className="space-y-2 m-0 list-none p-0">
                                                            {selectedLab?.objectives.map((o, i) => (
                                                                <li key={i} className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center gap-2">
                                                                    <div className="w-1 h-1 rounded-full bg-primary" /> {o}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>

                                                <div className="h-px bg-slate-100 dark:bg-slate-800 my-8" />

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
                                                            if (s.includes('TOOL_CALL_FLOW')) return <ToolCallFlow />
                                                            return <img src={src} className="rounded-2xl shadow-lg my-6" />
                                                        }
                                                    }}
                                                >
                                                    {selectedLab?.content || ''}
                                                </ReactMarkdown>
                                            </motion.div>
                                        </AnimatePresence>
                                    </TabsContent>

                                    <TabsContent value="implementation" className="m-0 focus-visible:ring-0">
                                        <div className="space-y-6">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-xl font-bold">Lab Implementation Code</h3>
                                                <span className="font-mono text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg">
                                                    {selectedLab?.codeFile}
                                                </span>
                                            </div>
                                            <ReactMarkdown
                                                components={{
                                                    code({ node, inline, className, children, ...props }: any) {
                                                        return (
                                                            <code className={cn(
                                                                "bg-slate-900 text-slate-100 rounded-2xl p-6 block whitespace-pre overflow-x-auto text-[13px] border border-slate-800 shadow-inner leading-relaxed",
                                                            )} {...props}>
                                                                {children}
                                                            </code>
                                                        )
                                                    }
                                                }}
                                            >
                                                {`\`\`\`python\n${selectedLab?.content.split('```python')[1]?.split('```')[0] || '# No code implementation found for this step.'}\n\`\`\``}
                                            </ReactMarkdown>
                                        </div>
                                    </TabsContent>
                                </div>
                            </Tabs>
                        </div>

                        {/* Control Panel */}
                        <div className="lg:col-span-4 flex flex-col gap-6 overflow-hidden">
                            {/* Steps Card */}
                            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2rem] border border-slate-200/50 dark:border-slate-800/50 p-8 shadow-xl shadow-slate-200/20 dark:shadow-none shrink-0 transition-all duration-500 hover:border-primary/20">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-primary" /> Roadmap Progress
                                </h3>
                                <div className="space-y-4">
                                    {selectedLab?.steps?.map((step, idx) => (
                                        <div key={idx} className="flex items-start gap-4">
                                            <div className="mt-1">
                                                {step.status === 'completed' ? (
                                                    <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                                                        <CheckCircle2 className="w-3 h-3 text-white" />
                                                    </div>
                                                ) : step.status === 'current' ? (
                                                    <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center">
                                                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                                    </div>
                                                ) : (
                                                    <div className="w-5 h-5 rounded-full border-2 border-slate-200 dark:border-slate-700" />
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <p className={cn("text-sm font-bold", step.status === 'current' ? "text-slate-900 dark:text-white" : "text-slate-400")}>
                                                    {step.title}
                                                </p>
                                                {step.status === 'current' && (
                                                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{step.detail}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Terminal Component */}
                            <LabTerminal
                                visibleLogs={visibleLogs}
                                isSimulating={isSimulating}
                                onStartSimulation={startSimulation}
                                height={consoleHeight}
                                onHeightChange={setConsoleHeight}
                            />
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
