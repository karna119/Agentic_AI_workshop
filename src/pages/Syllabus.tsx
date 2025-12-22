import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Download,
    ChevronRight,
    CheckCircle2,
    Clock,
    BookOpen,
    Target,
    Layers,
    Lightbulb,
    FileText
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { syllabusData, SyllabusModule } from '@/data/syllabus'
import { cn } from '@/lib/utils'

export default function Syllabus() {
    const [activeModuleId, setActiveModuleId] = useState<string>(syllabusData[0].id)
    const activeModule = syllabusData.find(m => m.id === activeModuleId) || syllabusData[0]

    return (
        <div className="w-full px-6 md:px-12 space-y-10 pb-20">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
                        Course Syllabus
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight">Agentic AI Engineering</h1>
                    <p className="text-slate-500 font-medium">Foundations, Architectures, and Implementation • 18 Total Hours</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="gap-2 border-slate-200 dark:border-slate-800 rounded-xl h-12 shadow-sm">
                        <Share2 className="w-4 h-4" /> Share
                    </Button>
                    <Button className="gap-2 bg-primary hover:bg-orange-600 text-white rounded-xl h-12 px-6 shadow-lg shadow-primary/20">
                        <Download className="w-4 h-4" /> Download Full PDF
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Module Sidebar */}
                <div className="lg:col-span-4 space-y-4">
                    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-4 shadow-xl shadow-slate-200/50 dark:shadow-none">
                        <div className="px-4 py-3 mb-2">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Modules</h3>
                        </div>
                        <div className="space-y-1">
                            {syllabusData.map((module) => (
                                <button
                                    key={module.id}
                                    onClick={() => setActiveModuleId(module.id)}
                                    className={cn(
                                        "w-full text-left p-4 rounded-2xl transition-all flex items-center gap-4 group",
                                        activeModuleId === module.id
                                            ? "bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]"
                                            : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                                    )}
                                >
                                    <div className={cn(
                                        "w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0",
                                        activeModuleId === module.id ? "bg-white/20" : "bg-slate-100 dark:bg-slate-800"
                                    )}>
                                        {module.number}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className={cn("font-bold text-sm truncate", activeModuleId === module.id ? "text-white" : "text-slate-900 dark:text-white")}>
                                            {module.name}
                                        </p>
                                        <p className={cn("text-[10px] font-medium opacity-70", activeModuleId === module.id ? "text-white" : "text-slate-500")}>
                                            {module.hours} Hours • {module.topics.length} Lessons
                                        </p>
                                    </div>
                                    {activeModuleId === module.id && <ChevronRight className="w-4 h-4" />}
                                </button>
                            ))}
                        </div>
                    </div>

                    <Card className="border-none bg-slate-900 text-white overflow-hidden p-0">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 rounded-lg bg-orange-500/20 text-orange-400">
                                    <Lightbulb className="w-5 h-5" />
                                </div>
                                <h4 className="font-bold">Next Steps</h4>
                            </div>
                            <p className="text-sm text-slate-400 mb-6">Start your journey today and earn a professional certificate in Agentic AI Engineering.</p>
                            <Button className="w-full bg-white text-slate-900 hover:bg-slate-100 font-bold rounded-xl">
                                Begin Course
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Content Area */}
                <div className="lg:col-span-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeModuleId}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-8"
                        >
                            {/* Module Hero */}
                            <div className="p-10 rounded-[3rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-primary/10 transition-colors" />

                                <div className="relative z-10 space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div className="w-16 h-16 rounded-3xl bg-primary/10 text-primary flex items-center justify-center">
                                            <Layers className="w-8 h-8" />
                                        </div>
                                        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-2xl text-slate-600 dark:text-slate-400 font-bold text-sm">
                                            <Clock className="w-4 h-4" /> {activeModule.hours} Hours
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                                            Module {activeModule.number}: {activeModule.name}
                                        </h2>
                                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                            {activeModule.overview}
                                        </p>
                                    </div>

                                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                                        <h4 className="flex items-center gap-2 font-bold mb-4">
                                            <Target className="w-5 h-5 text-primary" /> Learning Outcomes
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {activeModule.learningOutcomes.map((outcome, i) => (
                                                <div key={i} className="flex gap-3 items-start">
                                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1 shrink-0" />
                                                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400 italic">
                                                        {outcome}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Topics Grid */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold flex items-center gap-3 px-4">
                                    <div className="w-1.5 h-6 bg-primary rounded-full" /> Detailed Lessons
                                </h3>
                                <div className="grid grid-cols-1 gap-4">
                                    {activeModule.topics.map((topic, i) => (
                                        <Card key={i} className="border-none bg-white dark:bg-slate-900 shadow-md hover:shadow-xl transition-all duration-300 group rounded-[2rem] overflow-hidden">
                                            <CardContent className="p-8 flex items-start gap-6">
                                                <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-primary font-bold text-lg shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                                                    {i + 1}
                                                </div>
                                                <div className="space-y-2">
                                                    <h4 className="text-lg font-bold group-hover:text-primary transition-colors">{topic.title}</h4>
                                                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-[15px]">
                                                        {topic.description}
                                                    </p>
                                                </div>
                                                <div className="ml-auto flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <span className="text-xs font-bold text-primary">Explore</span>
                                                    <ChevronRight className="w-4 h-4 text-primary" />
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}

function Share2(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
            <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
        </svg>
    )
}
