import { resources, references } from '@/data/content'
import { Library, Link as LinkIcon, FileText, Video, Book, Globe, ExternalLink, Search, Filter, Rocket } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { RoadmapModal } from '@/components/RoadmapModal'

export default function Resources() {
    const [filter, setFilter] = useState<'all' | 'article' | 'video' | 'paper' | 'documentation'>('all')
    const [isRoadmapOpen, setIsRoadmapOpen] = useState(false)

    const filteredResources = filter === 'all'
        ? resources
        : resources.filter(r => r.type === filter)

    return (
        <div className="w-full px-6 md:px-12 space-y-12 pb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight">Resource Library</h1>
                    <p className="text-slate-500 text-lg mt-2 font-medium">Curated content to deepen your understanding of Agentic AI</p>
                </div>

                <div className="flex items-center gap-2 p-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-fit">
                    <Button
                        variant={filter === 'all' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setFilter('all')}
                        className="rounded-xl font-bold text-xs"
                    >
                        All
                    </Button>
                    <Button
                        variant={filter === 'article' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setFilter('article')}
                        className="rounded-xl font-bold text-xs"
                    >
                        Articles
                    </Button>
                    <Button
                        variant={filter === 'paper' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setFilter('paper')}
                        className="rounded-xl font-bold text-xs"
                    >
                        Papers
                    </Button>
                    <Button
                        variant={filter === 'video' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setFilter('video')}
                        className="rounded-xl font-bold text-xs"
                    >
                        Videos
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredResources.map((res, i) => (
                    <motion.div
                        key={res.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                    >
                        <Card className="h-full border-none shadow-lg hover:shadow-xl transition-all duration-300 group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                            <CardContent className="p-8 flex flex-col h-full">
                                <div className="flex items-center justify-between mb-6">
                                    <div className={cn(
                                        "p-3 rounded-2xl",
                                        res.type === 'article' ? "bg-orange-100 text-orange-600 dark:bg-orange-900/30" :
                                            res.type === 'video' ? "bg-rose-100 text-rose-600 dark:bg-rose-900/30" :
                                                res.type === 'paper' ? "bg-purple-100 text-purple-600 dark:bg-purple-900/30" :
                                                    "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30"
                                    )}>
                                        <ResourceIcon type={res.type} className="w-6 h-6" />
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{res.date}</span>
                                </div>

                                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">{res.title}</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 line-clamp-3 leading-relaxed flex-1">
                                    {res.description}
                                </p>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold">
                                            {res.author.charAt(0)}
                                        </div>
                                        <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{res.author}</span>
                                    </div>
                                    <a
                                        href={res.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-orange-700 group/link"
                                    >
                                        Explore Resource <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                                    </a>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <section className="pt-20 space-y-8">
                <div className="flex items-center gap-4">
                    <Book className="w-8 h-8 text-primary" />
                    <h2 className="text-3xl font-bold tracking-tight">Academic References</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {references.map((ref) => (
                        <motion.div key={ref.id} whileHover={{ scale: 1.02 }}>
                            <Card className="border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                                <CardContent className="p-6 flex gap-6">
                                    <div className="w-12 h-16 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded shadow-sm flex items-center justify-center text-slate-300">
                                        <FileText className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{ref.type}</span>
                                            <span className="text-xs font-bold text-slate-400">{ref.year}</span>
                                        </div>
                                        <h4 className="font-bold text-slate-900 dark:text-white mb-1">{ref.title}</h4>
                                        <p className="text-xs text-slate-500 font-medium mb-3">{ref.authors.join(', ')}</p>
                                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed italic mb-4">
                                            "{ref.description}"
                                        </p>
                                        <a href={ref.url} className="text-xs font-bold text-primary flex items-center gap-1 hover:underline">
                                            View Source <ExternalLink className="w-3 h-3" />
                                        </a>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </section>
            <section className="pt-20">
                <div className="p-8 rounded-[2.5rem] bg-slate-900 text-white shadow-2xl relative overflow-hidden group flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                        <Rocket className="w-24 h-24 rotate-12" />
                    </div>
                    <div className="relative z-10 space-y-2 text-center md:text-left">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Certification Path</p>
                        <h3 className="text-2xl font-bold">Ready to validate your skills?</h3>
                        <p className="text-slate-400 text-sm">Check your roadmap and see how close you are to your Expert Certificate.</p>
                    </div>
                    <Button
                        onClick={() => setIsRoadmapOpen(true)}
                        className="relative z-10 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-none rounded-xl font-bold py-6 px-10 shadow-xl"
                    >
                        View Mastery Roadmap
                    </Button>
                </div>
            </section>

            <RoadmapModal isOpen={isRoadmapOpen} onClose={() => setIsRoadmapOpen(false)} />
        </div>
    )
}

function ResourceIcon({ type, className }: { type: string, className?: string }) {
    if (type === 'article') return <FileText className={className} />
    if (type === 'video') return <Video className={className} />
    if (type === 'paper') return <Library className={className} />
    if (type === 'documentation') return <Globe className={className} />
    return <LinkIcon className={className} />
}
