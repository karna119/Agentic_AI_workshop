import { motion } from 'framer-motion'
import { Terminal, ChevronUp, ChevronDown, Maximize2, Play, RefreshCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface LabTerminalProps {
    visibleLogs: any[]
    isSimulating: boolean
    onStartSimulation: () => void
    height: 'minimized' | 'default' | 'maximized'
    onHeightChange: (h: 'minimized' | 'default' | 'maximized') => void
}

export function LabTerminal({
    visibleLogs,
    isSimulating,
    onStartSimulation,
    height,
    onHeightChange
}: LabTerminalProps) {
    return (
        <div className={cn(
            "bg-slate-950 rounded-[2rem] border border-slate-800/50 shadow-2xl flex flex-col overflow-hidden relative group ring-1 ring-white/5 transition-all duration-500 mb-6",
            height === 'minimized' ? "h-[60px]" :
                height === 'maximized' ? "flex-1" : "h-[300px]"
        )}>
            <div className="flex items-center justify-between px-6 py-3 border-b border-white/5 bg-white/5 backdrop-blur-md shrink-0">
                <div className="flex items-center gap-2 text-slate-400">
                    <Terminal className="w-5 h-5 text-primary" />
                    <span className="text-xs font-mono tracking-wider uppercase">Agentic Console</span>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="w-8 h-8 rounded-lg hover:bg-white/10 text-slate-400"
                        onClick={() => onHeightChange(height === 'minimized' ? 'default' : 'minimized')}
                        title={height === 'minimized' ? "Restore Console" : "Collapse Console"}
                    >
                        {height === 'minimized' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                            "w-8 h-8 rounded-lg hover:bg-white/10",
                            height === 'maximized' ? "text-primary bg-white/10" : "text-slate-400"
                        )}
                        onClick={() => onHeightChange(height === 'maximized' ? 'default' : 'maximized')}
                        title={height === 'maximized' ? "Split View" : "Maximize Console"}
                    >
                        <Maximize2 className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {height !== 'minimized' && (
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
            )}

            <div className="p-4 border-t border-white/5 bg-white/5 backdrop-blur-md">
                <Button
                    onClick={onStartSimulation}
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

            {/* Decorative HUD element */}
            <div className="absolute top-1/2 -right-1 text-white/5 rotate-90 text-[80px] font-bold pointer-events-none select-none uppercase tracking-tighter">
                AGENTIC
            </div>
        </div>
    )
}
