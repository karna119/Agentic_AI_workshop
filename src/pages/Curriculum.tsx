import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, Zap, Code, Rocket, BookOpen, ChevronDown, CheckCircle2, Circle, Clock, RefreshCcw } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { curriculum, Module, Topic, SubTopic } from '@/data/curriculum'
import { quizzes } from '@/data/content'
import QuizCard from '@/components/QuizCard'
import { cn } from '@/lib/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
import { useSearchParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'

export default function Curriculum() {
    const [searchParams] = useSearchParams()
    const [activeModuleId, setActiveModuleId] = useState<string>(() => {
        const urlMod = searchParams.get('module')
        if (urlMod && curriculum.some(m => m.id === urlMod)) return urlMod
        return localStorage.getItem('lms_last_module_id') || curriculum[0].id
    })
    const [expandedTopicId, setExpandedTopicId] = useState<string | null>(null)
    const [isRoadmapOpen, setIsRoadmapOpen] = useState(false)
    const [completedSubtopics, setCompletedSubtopics] = useState<string[]>(() => {
        const saved = localStorage.getItem('lms_completed_subtopics')
        return saved ? JSON.parse(saved) : []
    })

    useEffect(() => {
        localStorage.setItem('lms_last_module_id', activeModuleId)
    }, [activeModuleId])

    const handleMarkComplete = (subtopicTitle: string) => {
        const id = `${activeModuleId}-${subtopicTitle}`
        setCompletedSubtopics(prev => {
            const next = prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
            localStorage.setItem('lms_completed_subtopics', JSON.stringify(next))
            window.dispatchEvent(new Event('storage'))
            return next
        })
    }

    const activeModule = curriculum.find((m: Module) => m.id === activeModuleId) || curriculum[0]

    return (
        <div className="w-full px-6 md:px-12 space-y-8 pb-20">
            <div className="flex flex-col md:flex-row gap-10">
                {/* Module Pipeline Sidebar */}
                <div className="md:w-1/3 space-y-4">
                    <div className="mb-6 px-2">
                        <h1 className="text-3xl font-bold tracking-tight">Curriculum</h1>
                        <p className="text-slate-500 text-sm mt-1 font-medium">18 hours of expert content</p>
                    </div>

                    <div className="space-y-3">
                        {curriculum.map((module: Module) => (
                            <ModuleSelector
                                key={module.id}
                                module={module}
                                isActive={activeModuleId === module.id}
                                onClick={() => setActiveModuleId(module.id)}
                            />
                        ))}
                    </div>

                    <div className="mt-8 p-6 rounded-3xl bg-gradient-to-br from-primary/90 to-orange-700 text-white shadow-xl shadow-primary/20 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                            <Rocket className="w-16 h-16 rotate-12" />
                        </div>
                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-2">Learning Path</p>
                        <p className="text-lg font-bold leading-tight mb-4">Master the Agentic AI Roadmap</p>
                        <Button
                            onClick={() => setIsRoadmapOpen(true)}
                            className="w-full bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-md rounded-xl text-xs font-bold uppercase tracking-wider py-5"
                        >
                            View Roadmap
                        </Button>
                    </div>
                </div>

                {/* Module Content */}
                <div className="flex-1 space-y-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeModuleId}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-8"
                        >
                            <div className="p-10 rounded-[2.5rem] bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-slate-200/50 dark:border-slate-800/50 shadow-2xl shadow-slate-200/50 dark:shadow-none transition-all duration-500 hover:border-primary/20">
                                <div className="flex flex-col md:flex-row md:items-center gap-8 mb-10">
                                    <div className="w-20 h-20 rounded-3xl premium-gradient flex items-center justify-center text-white shadow-2xl shadow-primary/30 shrink-0 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                                        <ModuleIcon number={activeModule.number} className="w-10 h-10" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-primary font-black text-xs uppercase tracking-[0.2em] px-3 py-1 bg-primary/10 rounded-full h-fit">Module {activeModule.number}</span>
                                            <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/50 px-3 py-1 rounded-full text-slate-500 font-bold text-[10px] uppercase tracking-wider">
                                                <Clock className="w-3 h-3" /> {activeModule.hours}h Duration
                                            </div>
                                        </div>
                                        <h2 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">{activeModule.name}</h2>
                                    </div>
                                </div>
                                <p className="text-slate-600 dark:text-slate-400 text-xl leading-relaxed font-medium">
                                    {activeModule.description}
                                </p>
                            </div>

                            <Tabs defaultValue="topics" className="space-y-6">
                                <div className="flex items-center justify-between px-2">
                                    <h3 className="text-xl font-bold flex items-center gap-2">
                                        <div className="w-1.5 h-6 bg-primary rounded-full" /> Module Content
                                    </h3>
                                    <TabsList className="bg-slate-100 dark:bg-slate-800 p-1 rounded-xl h-10">
                                        <TabsTrigger value="topics" className="rounded-lg px-4 font-bold text-xs data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-sm border-none">
                                            Lessons
                                        </TabsTrigger>
                                        <TabsTrigger value="quiz" className="rounded-lg px-4 font-bold text-xs data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-sm border-none">
                                            Quiz
                                        </TabsTrigger>
                                    </TabsList>
                                </div>

                                <TabsContent value="topics" className="space-y-4 outline-none">
                                    {activeModule.topics.map((topic: Topic, i: number) => (
                                        <TopicAccordion
                                            key={topic.id}
                                            topic={topic}
                                            isExpanded={expandedTopicId === topic.id}
                                            onToggle={() => setExpandedTopicId(expandedTopicId === topic.id ? null : topic.id)}
                                            index={i}
                                            completedSubtopics={completedSubtopics}
                                            activeModuleId={activeModuleId}
                                            onMarkComplete={handleMarkComplete}
                                        />
                                    ))}
                                </TabsContent>

                                <TabsContent value="quiz" className="outline-none">
                                    {quizzes.find(q => q.moduleId === activeModule.id) ? (
                                        <QuizCard
                                            quiz={quizzes.find(q => q.moduleId === activeModule.id)!}
                                            onComplete={(score) => console.log(`Completed ${activeModule.id} with score ${score}`)}
                                        />
                                    ) : (
                                        <Card className="border-dashed border-2 p-12 text-center text-slate-400 bg-transparent">
                                            <p className="font-medium">No quiz available for this module yet.</p>
                                        </Card>
                                    )}
                                </TabsContent>
                            </Tabs>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
            <RoadmapModal
                isOpen={isRoadmapOpen}
                onClose={() => setIsRoadmapOpen(false)}
            />
        </div>
    )
}

function ModuleIcon({ number, className }: { number: number, className?: string }) {
    const icons: any = {
        1: Brain,
        2: Zap,
        3: Code,
        4: Rocket,
        5: BookOpen
    }
    const Icon = icons[number] || BookOpen
    return <Icon className={className} />
}

function ModuleSelector({ module, isActive, onClick }: { module: Module, isActive: boolean, onClick: () => void }) {
    return (
        <div
            onClick={onClick}
            className={cn(
                "group cursor-pointer p-4 rounded-2xl border-2 transition-all duration-300 relative overflow-hidden",
                isActive
                    ? "border-primary bg-orange-50 dark:bg-primary/10 shadow-md"
                    : "border-transparent bg-white dark:bg-slate-900 hover:border-slate-200 dark:hover:border-slate-800"
            )}
        >
            <div className="flex items-center gap-4 relative z-10">
                <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center transition-colors shadow-sm",
                    isActive ? "bg-primary text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:bg-slate-200"
                )}>
                    <ModuleIcon number={module.number} className="w-5 h-5" />
                </div>
                <div className="flex-1">
                    <h4 className={cn("font-bold text-sm", isActive ? "text-primary" : "text-slate-900 dark:text-white")}>
                        {module.name}
                    </h4>
                    <p className="text-[10px] text-slate-500 mt-1 font-bold uppercase tracking-wider">
                        {module.topics.length} Lessons • {module.hours}h
                    </p>
                </div>
                {isActive ? (
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                ) : (
                    <Circle className="w-5 h-5 text-slate-300 dark:text-slate-700 group-hover:text-slate-400" />
                )}
            </div>
        </div>
    )
}

function TopicAccordion({ topic, isExpanded, onToggle, index, completedSubtopics, activeModuleId, onMarkComplete }: {
    topic: Topic,
    isExpanded: boolean,
    onToggle: () => void,
    index: number,
    completedSubtopics: string[],
    activeModuleId: string,
    onMarkComplete: (title: string) => void
}) {
    const topicProgress = topic.subtopics.filter(sub => completedSubtopics.includes(`${activeModuleId}-${sub.title}`)).length
    const isTopicComplete = topicProgress === topic.subtopics.length

    return (
        <div className={cn(
            "bg-white dark:bg-slate-900 border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all",
            isTopicComplete ? "border-emerald-100 dark:border-emerald-900/30" : "border-slate-200 dark:border-slate-800"
        )}>
            <div
                onClick={onToggle}
                className={cn(
                    "p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors",
                    isTopicComplete && "bg-emerald-50/30 dark:bg-emerald-950/10"
                )}
            >
                <div className="flex items-center gap-4">
                    <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-colors",
                        isTopicComplete ? "bg-emerald-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                    )}>
                        {isTopicComplete ? <CheckCircle2 className="w-4 h-4" /> : topic.number}
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white">{topic.title}</h4>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                            {topicProgress}/{topic.subtopics.length} Lessons Complete
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    {isTopicComplete && (
                        <span className="text-[10px] font-black text-emerald-500 uppercase tracking-tighter bg-emerald-100 dark:bg-emerald-900/40 px-2 py-0.5 rounded-full">Complete</span>
                    )}
                    <ChevronDown className={cn("w-5 h-5 text-slate-400 transition-transform shrink-0", isExpanded && "rotate-180")} />
                </div>
            </div>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="overflow-hidden bg-slate-50/50 dark:bg-slate-800/20 border-t border-slate-100 dark:border-slate-800"
                    >
                        <div className="p-8 space-y-12">
                            {topic.subtopics.map((sub: SubTopic, i: number) => {
                                const isSubComplete = completedSubtopics.includes(`${activeModuleId}-${sub.title}`)
                                return (
                                    <div key={i} className="relative pl-10">
                                        <div className={cn(
                                            "absolute left-0 top-1.5 w-6 h-6 rounded-full flex items-center justify-center transition-all",
                                            isSubComplete
                                                ? "bg-emerald-500 text-white shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                                                : "bg-primary/20 text-primary border border-primary/30"
                                        )}>
                                            {isSubComplete ? <CheckCircle2 className="w-3 h-3" /> : <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                            <div className="flex-1">
                                                <h5 className="font-bold text-slate-900 dark:text-white text-lg mb-4">
                                                    {sub.title}
                                                </h5>
                                                <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 text-[15px] leading-relaxed whitespace-pre-wrap">
                                                    <ReactMarkdown
                                                        components={{
                                                            img: ({ node, ...props }) => {
                                                                const src = (props.src || '').toUpperCase()
                                                                const alt = (props.alt || '').toUpperCase()

                                                                if (src.includes('AGENT_ARCHITECTURE') || src.includes('ARCHITECTURE') || alt.includes('ARCHITECTURE')) return <AgentArchitectureInfographic />
                                                                if (src.includes('MULTI_AGENT') || alt.includes('MULTI-AGENT') || alt.includes('MULTIAGENT')) return <MultiAgentMindmap />
                                                                if (src.includes('RAG_PIPELINE') || alt.includes('RAG PIPELINE')) return <RAGInfographic />
                                                                if (src.includes('FRAMEWORKS') || alt.includes('FRAMEWORKS')) return <FrameworkMindmap />
                                                                if (src.includes('AGENT_LOOP') || alt.includes('AGENT LOOP')) return <AgentLoopInfographic />
                                                                if (src.includes('SAFETY') || alt.includes('SAFETY') || alt.includes('GUARDRAILS')) return <EthicalGuardrailsInfographic />
                                                                if (src.includes('PATTERNS') || alt.includes('PATTERNS')) return <SingleAgentPatternsMindmap />
                                                                if (src.includes('TOOL_DESIGN') || alt.includes('TOOL DESIGN')) return <ToolDesignInfographic />
                                                                if (src.includes('OPTIMIZATION') || alt.includes('OPTIMIZATION')) return <AdvancedOptimizationMindmap />
                                                                if (src.includes('EVOLUTION') || alt.includes('EVOLUTION')) return <EvolutionTimeline />
                                                                if (src.includes('MEMORY_MGMT') || alt.includes('MEMORY')) return <MemoryManagementInfographic />
                                                                if (src.includes('ORCHESTRATION') || alt.includes('ORCHESTRATION')) return <OrchestrationFlow />
                                                                if (src.includes('PATTERN_DEEP_DIVE') || alt.includes('PATTERN DEEP DIVE')) return <PatternDeepDive />
                                                                if (src.includes('TOOL_ANATOMY') || alt.includes('TOOL ANATOMY')) return <ToolAnatomyInfographic />
                                                                if (src.includes('TOOL_CALL_FLOW') || alt.includes('TOOL CALL FLOW')) return <ToolCallFlow />

                                                                return <img {...props} className="rounded-lg shadow-md my-4" />
                                                            }
                                                        }}
                                                    >
                                                        {sub.content}
                                                    </ReactMarkdown>
                                                </div>
                                            </div>
                                            <Button
                                                onClick={() => onMarkComplete(sub.title)}
                                                className={cn(
                                                    "shrink-0 rounded-xl gap-2 h-10 px-4 font-bold transition-all hover:scale-105 active:scale-95 shadow-lg",
                                                    isSubComplete
                                                        ? "bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200"
                                                        : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20"
                                                )}
                                            >
                                                {isSubComplete ? (
                                                    <><RefreshCcw className="w-4 h-4" /> Redo Lesson</>
                                                ) : (
                                                    <><CheckCircle2 className="w-4 h-4" /> Complete</>
                                                )}
                                            </Button>
                                        </div>
                                        {i < topic.subtopics.length - 1 && <div className="h-12 w-px bg-slate-200 dark:bg-slate-800 ml-3 mt-4" />}
                                    </div>
                                )
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
