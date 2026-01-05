import { motion } from 'framer-motion'
import { FileCode, Clock, ChevronRight, ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Lab } from '@/data/content'

interface LabSidebarProps {
    labs: Lab[]
    selectedLabId: string | null
    onSelectLab: (id: string) => void
    isCollapsed: boolean
    onToggle: () => void
    onViewRoadmap: () => void
}

export function LabSidebar({
    labs,
    selectedLabId,
    onSelectLab,
    isCollapsed,
    onToggle,
    onViewRoadmap
}: LabSidebarProps) {
    return (
        <div className="relative flex h-full">
            <motion.div
                initial={false}
                animate={{
                    width: isCollapsed ? 0 : 320,
                    opacity: isCollapsed ? 0 : 1,
                    marginRight: isCollapsed ? 0 : 24
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="flex flex-col gap-4 overflow-hidden pr-2 custom-scrollbar shrink-0"
            >
                <div className="flex flex-col gap-4 overflow-y-auto min-h-0 h-full scroll-smooth custom-scrollbar pb-6">
                    {labs.map((lab, i) => (
                        <motion.div
                            key={lab.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                        >
                            <div
                                onClick={() => onSelectLab(lab.id)}
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

                    <div className="mt-auto p-4 rounded-2xl bg-gradient-to-br from-primary to-orange-700 text-white shadow-lg shadow-primary/20 shrink-0">
                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-2">Next Milestone</p>
                        <p className="text-sm font-bold leading-snug">Multi-Agent Orchestration Masterclass</p>
                        <button
                            onClick={onViewRoadmap}
                            className="mt-3 w-full py-2 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-colors"
                        >
                            View Roadmap
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Sidebar Toggle Handle */}
            <button
                onClick={onToggle}
                className={cn(
                    "absolute top-1/2 -translate-y-1/2 z-20 w-5 h-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-r-xl flex items-center justify-center text-slate-400 hover:text-primary transition-all shadow-md group",
                    isCollapsed ? "left-0" : "left-[320px]"
                )}
            >
                {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
        </div>
    )
}
