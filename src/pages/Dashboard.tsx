import { Rocket, BookOpen, Clock, Award, Star, ArrowRight, Play, Code, Brain, ChevronRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { curriculum, Module } from '@/data/curriculum'
import { labs } from '@/data/content'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { useState, useEffect } from 'react'
import { RoadmapModal } from '@/components/RoadmapModal'

const StatCard = ({ icon: Icon, label, value, color }: { icon: any, label: string, value: string, color: string }) => (
    <Card className="border-none shadow-md overflow-hidden relative group">
        <div className={cn("absolute top-0 right-0 w-24 h-24 opacity-10 rounded-full -mr-12 -mt-12", color)} />
        <CardContent className="p-6">
            <div className="flex items-center gap-4">
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg", color)}>
                    <Icon className="w-6 h-6" />
                </div>
                <div>
                    <p className="text-sm text-slate-500 font-medium">{label}</p>
                    <p className="text-2xl font-bold">{value}</p>
                </div>
            </div>
        </CardContent>
    </Card>
)

export default function Dashboard() {
    const [isRoadmapOpen, setIsRoadmapOpen] = useState(false)
    const [userName, setUserName] = useState(() => localStorage.getItem('lms_user_name') || 'Arun Karan')

    useEffect(() => {
        const handleStorage = () => {
            setUserName(localStorage.getItem('lms_user_name') || 'Arun Karan')
        }
        window.addEventListener('storage', handleStorage)
        return () => window.removeEventListener('storage', handleStorage)
    }, [])
    const totalModules = curriculum.length
    const totalHours = curriculum.reduce((acc, mod) => acc + mod.hours, 0)
    const totalLabs = labs.length

    // Resume Logic
    const [lastModule] = useState(() => localStorage.getItem('lms_last_module_id') || curriculum[0].id)
    const currentModule = curriculum.find(m => m.id === lastModule) || curriculum[0]

    return (
        <div className="w-full px-6 md:px-12 space-y-10 pb-20">
            {/* Welcome Banner */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative rounded-[2.5rem] overflow-hidden bg-slate-900 text-white p-8 md:p-12 shadow-2xl"
            >
                <div className="absolute top-0 right-0 w-1/3 h-full opacity-20 pointer-events-none p-12">
                    <Brain className="w-full h-full text-primary blur-3xl opacity-50" />
                </div>

                <div className="relative z-10 max-w-xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold uppercase tracking-wider mb-6">
                        <Star className="w-3 h-3 fill-current" /> Next Generation AI
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Master the Future of <span className="text-primary">Agentic AI</span></h1>
                    <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                        Welcome back, <strong className="text-white font-black">{userName}</strong>! You're currently on <strong className="text-primary">Module {currentModule.number}: {currentModule.name}</strong>.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link to={`/curriculum?module=${currentModule.id}`}>
                            <Button size="lg" className="bg-primary hover:bg-orange-600 text-white gap-2 h-14 px-8 rounded-2xl shadow-xl shadow-primary/20 font-bold">
                                <Play className="w-4 h-4 fill-current" /> Resume Learning
                            </Button>
                        </Link>
                        <Link to="/syllabus">
                            <Button variant="outline" size="lg" className="border-slate-700 text-white hover:bg-slate-800 h-14 px-8 rounded-2xl">
                                View Syllabus
                            </Button>
                        </Link>
                    </div>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard icon={BookOpen} label="Total Modules" value={`${totalModules} Modules`} color="bg-primary" />
                <StatCard icon={Clock} label="Total Duration" value={`${totalHours} Hours`} color="bg-purple-500" />
                <StatCard icon={Code} label="Practical Labs" value={`${totalLabs} Labs`} color="bg-emerald-500" />
                <StatCard icon={Award} label="Certification" value="Expert Level" color="bg-orange-500" />
            </div>

            {/* Recent Activity & Next Steps */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold">Current Progress</h2>
                        <Button variant="link" className="text-primary font-semibold p-0">View All</Button>
                    </div>

                    <div className="space-y-4">
                        {curriculum.slice(0, 3).map((module: Module, i: number) => (
                            <motion.div
                                key={module.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Card className="border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                                    <CardContent className="p-5 flex items-center gap-5">
                                        <div className={cn(
                                            "w-14 h-14 rounded-2xl flex items-center justify-center text-white shrink-0",
                                            i === 0 ? "bg-primary" : "bg-slate-200 dark:bg-slate-800 text-slate-500"
                                        )}>
                                            <span className="text-xl font-bold">{module.number}</span>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                                                {module.name}
                                            </h4>
                                            <div className="flex items-center gap-3 mt-1">
                                                <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                    <div
                                                        className={cn("h-full rounded-full transition-all duration-1000", i === 0 ? "bg-primary w-[45%]" : "bg-slate-300 dark:bg-slate-700 w-0")}
                                                    />
                                                </div>
                                                <span className="text-xs font-bold text-slate-500">{i === 0 ? '45%' : '0%'}</span>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="icon" className="group-hover:translate-x-1 transition-transform">
                                            <ArrowRight className="w-5 h-5 text-slate-400" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    <h2 className="text-2xl font-bold">Featured Lab</h2>
                    <Card className="border-none shadow-xl bg-gradient-to-br from-orange-600 to-orange-700 text-white overflow-hidden group">
                        <CardContent className="p-8">
                            <div className="p-3 bg-white/10 rounded-xl w-fit mb-6">
                                <Code className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Custom Tool Implementation</h3>
                            <p className="text-white/70 text-sm mb-8 leading-relaxed">
                                Learn to extend LLM capabilities by building your own custom tools with Pydantic and LangChain.
                            </p>
                            <Link to="/labs">
                                <Button className="w-full bg-white text-orange-700 hover:bg-slate-100 font-bold h-12 rounded-xl">
                                    Start Lab Now
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card className="border-slate-200 dark:border-slate-800 bg-transparent">
                        <CardHeader>
                            <CardTitle className="text-lg">Upcoming Sessions</CardTitle>
                            <CardDescription>Live Q&A and Project reviews</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {[{ title: "Building Multi-Agent Systems", time: "Tomorrow, 6 PM" }, { title: "RAG Best Practices", time: "Friday, 10 AM" }].map((event: any, i: number) => (
                                <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white dark:hover:bg-slate-900 transition-colors">
                                    <div className="w-2 h-2 rounded-full bg-primary" />
                                    <div className="flex-1">
                                        <p className="text-sm font-bold">{event.title}</p>
                                        <p className="text-[10px] text-slate-500 font-medium">{event.time}</p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <div className="mt-8 p-6 rounded-3xl bg-slate-900 text-white shadow-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                            <Rocket className="w-16 h-16 rotate-12" />
                        </div>
                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-2 text-primary">Mastery Journey</p>
                        <p className="text-lg font-bold leading-tight mb-4">View Your Professional Agentic AI Roadmap</p>
                        <Button
                            onClick={() => setIsRoadmapOpen(true)}
                            className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-none rounded-xl text-xs font-bold uppercase tracking-wider py-5"
                        >
                            Open Roadmap
                        </Button>
                    </div>
                </div>
            </div>

            <RoadmapModal isOpen={isRoadmapOpen} onClose={() => setIsRoadmapOpen(false)} />
        </div>
    )
}
