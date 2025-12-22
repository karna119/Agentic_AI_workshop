import { motion } from 'framer-motion'
import { Award, Download, Share2, CheckCircle2, GraduationCap, Star, ShieldCheck, Code, Rocket } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useState, useEffect } from 'react'
import { RoadmapModal } from '@/components/RoadmapModal'

export default function Certificate() {
    const [isRoadmapOpen, setIsRoadmapOpen] = useState(false)
    const [userName, setUserName] = useState(() => localStorage.getItem('lms_user_name') || 'Arun Karan')

    useEffect(() => {
        const handleStorage = () => {
            setUserName(localStorage.getItem('lms_user_name') || 'Arun Karan')
        }
        window.addEventListener('storage', handleStorage)
        return () => window.removeEventListener('storage', handleStorage)
    }, [])
    // Simulated completion state
    const isCompleted = true
    const completionDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    const certificateId = "AAI-2025-0892-X"

    if (!isCompleted) {
        return (
            <div className="flex flex-col items-center justify-center h-[70vh] text-center space-y-6">
                <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                    <ShieldCheck className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-bold">Certification Locked</h2>
                <p className="text-slate-500 max-w-md">
                    Complete all module quizzes with at least 70% to unlock your professional certificate in Agentic AI Engineering.
                </p>
                <Button className="bg-primary hover:bg-orange-600 text-white rounded-xl h-12 px-8 font-bold">
                    Return to Curriculum
                </Button>
            </div>
        )
    }

    return (
        <div className="w-full px-6 md:px-12 space-y-12 pb-20">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">Your Achievement</h1>
                <p className="text-slate-500 text-lg font-medium">Congratulations! You've successfully completed the Agentic AI Engineering program.</p>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative"
            >
                {/* The Certificate Canvas */}
                <div className="aspect-[1.414/1] bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border-8 border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center p-16 relative">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full -ml-32 -mt-32 blur-3xl" />
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full -mr-32 -mb-32 blur-3xl" />

                    <div className="w-full flex justify-between items-start mb-12">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl premium-gradient flex items-center justify-center shadow-lg">
                                <GraduationCap className="w-7 h-7 text-white" />
                            </div>
                            <div className="text-left font-bold tracking-tight">
                                <p className="text-slate-900 dark:text-white text-xl leading-none">AGENTIC AI</p>
                                <p className="text-[10px] text-primary uppercase tracking-widest mt-1">Foundations 2025</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Certificate ID</p>
                            <p className="font-mono text-xs text-slate-900 dark:text-slate-400 font-bold">{certificateId}</p>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
                        <div className="space-y-2">
                            <p className="text-primary font-bold text-sm uppercase tracking-[0.3em]">Certificate of Completion</p>
                            <h2 className="text-2xl font-medium text-slate-500 italic">This is to certify that</h2>
                        </div>

                        <h3 className="text-5xl font-bold text-slate-900 dark:text-white font-serif">{userName}</h3>

                        <div className="max-w-2xl mx-auto border-t border-b border-slate-100 dark:border-slate-800 py-6">
                            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                Has successfully mastered the core principles and implementation strategies of
                                <span className="text-slate-900 dark:text-white font-bold ml-1">Agentic AI Architecture</span>,
                                including Frameworks, RAG Systems, Multi-Agent Orchestration, and Real-World Deployment.
                            </p>
                        </div>

                        <div className="flex items-center gap-12 pt-8">
                            <div className="text-center space-y-2">
                                <div className="w-32 h-px bg-slate-300 dark:bg-slate-700 mx-auto" />
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Lead Instructor</p>
                            </div>
                            <div className="px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center gap-3">
                                <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                                <span className="text-sm font-bold">Expert Track Verified</span>
                            </div>
                            <div className="text-center space-y-2">
                                <div className="w-32 h-px bg-slate-300 dark:bg-slate-700 mx-auto" />
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Date Issued</p>
                                <p className="text-xs font-bold">{completionDate}</p>
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-0 inset-x-0 h-4 premium-gradient opacity-20" />
                </div>
            </motion.div>

            <div className="flex justify-center gap-6">
                <Button className="bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-2xl h-14 px-8 font-bold gap-3 shadow-xl hover:scale-105 active:scale-95 transition-all">
                    <Download className="w-5 h-5" /> Download PDF
                </Button>
                <Button variant="outline" className="border-slate-200 dark:border-slate-800 rounded-2xl h-14 px-8 font-bold gap-3 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
                    <Share2 className="w-5 h-5" /> Share Achievement
                </Button>
            </div>

            {/* Course Summary Card */}
            <Card className="border-none shadow-xl bg-slate-50 dark:bg-slate-900/50">
                <CardContent className="p-8">
                    <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Award className="w-6 h-6 text-primary" /> Program Milestone Summary
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Milestone label="Modules Mastery" value="5/5 Completed" icon={CheckCircle2} color="text-emerald-500" />
                        <Milestone label="Practical Labs" value="100% Passed" icon={Code} color="text-primary" />
                        <Milestone label="Case Analysis" value="All Industries Explored" icon={Rocket} color="text-purple-500" />
                    </div>
                </CardContent>
            </Card>

            <div className="pt-10 flex justify-center">
                <Button
                    variant="link"
                    onClick={() => setIsRoadmapOpen(true)}
                    className="text-slate-400 hover:text-primary font-bold uppercase tracking-[0.2em] text-[10px]"
                >
                    View Engineering Roadmap
                </Button>
            </div>

            <RoadmapModal isOpen={isRoadmapOpen} onClose={() => setIsRoadmapOpen(false)} />
        </div >
    )
}

function Milestone({ label, value, icon: Icon, color }: { label: string, value: string, icon: any, color: string }) {
    return (
        <div className="flex gap-4">
            <div className={cn("p-2 rounded-xl bg-white dark:bg-slate-800 shadow-sm", color)}>
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{label}</p>
                <p className="text-sm font-bold">{value}</p>
            </div>
        </div>
    )
}
