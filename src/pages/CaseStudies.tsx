import { caseStudies } from '@/data/content'
import { Rocket, BarChart3, Globe, Zap, ArrowUpRight, Lightbulb, Puzzle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import { useState } from 'react'
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
import { RoadmapModal } from '@/components/RoadmapModal'

export default function CaseStudies() {
    const [selectedCaseId, setSelectedCaseId] = useState<string | null>(caseStudies.length > 0 ? caseStudies[0].id : null)
    const [isRoadmapOpen, setIsRoadmapOpen] = useState(false)

    const selectedCase = caseStudies.find(c => c.id === selectedCaseId)

    return (
        <div className="w-full px-6 md:px-12 space-y-10 pb-20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-4">
                <div className="max-w-2xl space-y-2">
                    <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-primary to-slate-900 dark:from-white dark:via-primary dark:to-white">Real-World Case Studies</h1>
                    <p className="text-slate-500 text-lg font-medium">Explore how Agentic AI is transforming industries and solving complex automation challenges.</p>
                </div>
                <Button
                    onClick={() => setIsRoadmapOpen(true)}
                    className="shrink-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold h-12 px-6 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none hover:bg-primary hover:text-white transition-all duration-300"
                >
                    <BarChart3 className="w-4 h-4 mr-2" /> View Roadmap
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {caseStudies.map((cs) => (
                    <motion.div
                        key={cs.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        className="h-full"
                    >
                        <Card
                            onClick={() => setSelectedCaseId(cs.id)}
                            className={cn(
                                "h-full cursor-pointer transition-all duration-500 border-[3px] rounded-[2rem] overflow-hidden group",
                                selectedCaseId === cs.id
                                    ? "border-primary bg-white dark:bg-slate-900 shadow-2xl shadow-primary/20"
                                    : "border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm hover:border-slate-200 dark:hover:border-slate-700"
                            )}
                        >
                            <CardContent className="p-8 flex flex-col h-full relative">
                                <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                                    <Rocket className="w-24 h-24 rotate-12" />
                                </div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-2 rounded-lg bg-orange-50 dark:bg-orange-900/30 text-primary">
                                        <Rocket className="w-5 h-5" />
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{cs.industry}</span>
                                </div>
                                <h3 className="font-bold text-lg mb-4 line-clamp-2">{cs.title}</h3>
                                <div className="mt-auto flex items-center justify-between">
                                    <span className={cn(
                                        "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter",
                                        cs.difficulty === 'beginner' ? "bg-emerald-100 text-emerald-700" :
                                            cs.difficulty === 'intermediate' ? "bg-amber-100 text-amber-700" :
                                                "bg-rose-100 text-rose-700"
                                    )}>
                                        {cs.difficulty}
                                    </span>
                                    <Button variant="ghost" size="sm" className="text-primary font-bold p-0 h-auto">
                                        Read More <ArrowUpRight className="w-3 h-3 ml-1" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {selectedCase && (
                    <motion.div
                        key={selectedCase.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-10 pt-10 border-t border-slate-200 dark:border-slate-800"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                            <div className="lg:col-span-2 space-y-12">
                                <section className="space-y-6">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest">
                                        The Challenge
                                    </div>
                                    <h2 className="text-3xl font-bold">The Problem Statement</h2>
                                    <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                                        {selectedCase.problem}
                                    </p>
                                </section>

                                <section className="space-y-6">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest">
                                        The Solution
                                    </div>
                                    <h2 className="text-3xl font-bold">Agentic Approach</h2>
                                    <div className="prose prose-slate dark:prose-invert max-w-none bg-slate-50 dark:bg-slate-900/50 p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
                                        <ReactMarkdown
                                            components={{
                                                img: ({ src, alt }: any) => {
                                                    if (src === "[MINDMAP:MULTI_AGENT]") {
                                                        return <MultiAgentMindmap />
                                                    }
                                                    if (src === "[INFOGRAPHIC:AGENT_ARCHITECTURE]") {
                                                        return <AgentArchitectureInfographic />
                                                    }
                                                    return <img src={src} alt={alt} className="rounded-2xl shadow-lg" />
                                                }
                                            }}
                                        >
                                            {selectedCase.agenticApproach}
                                        </ReactMarkdown>
                                    </div>
                                </section>

                                <section className="space-y-6">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest">
                                        The Implementation
                                    </div>
                                    <h2 className="text-3xl font-bold">Deep Dive</h2>
                                    <div className="prose prose-slate dark:prose-invert max-w-none">
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
                                                    return <img src={src} className="rounded-2xl shadow-lg" />
                                                }
                                            }}
                                        >
                                            {selectedCase.implementation}
                                        </ReactMarkdown>
                                    </div>
                                </section>
                            </div>

                            <div className="space-y-6">
                                <Card className="border-none shadow-xl bg-slate-900 text-white p-2">
                                    <CardContent className="p-6">
                                        <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
                                            <Lightbulb className="w-5 h-5 text-amber-400" /> Key Takeaways
                                        </h4>
                                        <div className="space-y-4">
                                            {selectedCase.keyTakeaways.map((task, i) => (
                                                <div key={i} className="flex gap-3">
                                                    <div className="p-1 rounded bg-white/10 text-orange-400 shrink-0">
                                                        <Zap className="w-4 h-4" />
                                                    </div>
                                                    <p className="text-sm text-slate-300 font-medium">{task}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border-slate-200 dark:border-slate-800 bg-transparent">
                                    <CardContent className="p-6">
                                        <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                                            <Puzzle className="w-5 h-5 text-primary" /> Related Modules
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedCase.relatedModules.map(m => (
                                                <div key={m} className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold">
                                                    Module {m}
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <RoadmapModal
                isOpen={isRoadmapOpen}
                onClose={() => setIsRoadmapOpen(false)}
            />
        </div>
    )
}

