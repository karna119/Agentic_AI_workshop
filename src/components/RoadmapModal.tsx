import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Trophy, Star, Target, Flag } from 'lucide-react'
import { Button } from './ui/button'
import { RoadmapInfographic } from './VisualAssets'

interface RoadmapModalProps {
    isOpen: boolean
    onClose: () => void
}

export const RoadmapModal = ({ isOpen, onClose }: RoadmapModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800"
                    >
                        <div className="absolute top-0 right-0 p-6">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={onClose}
                                className="rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                            >
                                <X className="w-5 h-5 text-slate-400" />
                            </Button>
                        </div>

                        <div className="p-8 md:p-10">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                                    <Target className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold tracking-tight">Agentic AI Mastery Path</h3>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Your Engineering Journey</p>
                                </div>
                            </div>

                            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-6 border border-slate-100 dark:border-slate-700 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-110 transition-transform" />
                                <RoadmapInfographic />
                            </div>

                            <div className="mt-8 space-y-4">
                                <div className="flex items-center justify-between px-1">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Progress</span>
                                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">45% Complete</span>
                                </div>
                                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: '45%' }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                        className="h-full bg-primary shadow-[0_0_15px_rgba(249,115,22,0.5)]"
                                    />
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-4">
                                <div className="p-4 rounded-2xl bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/20 group/stat">
                                    <Trophy className="w-5 h-5 text-primary mb-2 group-hover:scale-110 transition-transform" />
                                    <p className="text-[10px] font-bold text-slate-500 uppercase">Final Certification</p>
                                    <p className="text-xs font-bold mt-1">Expert Level Engineer</p>
                                </div>
                                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 group/stat">
                                    <Flag className="w-5 h-5 text-slate-400 mb-2 group-hover:scale-110 transition-transform" />
                                    <p className="text-[10px] font-bold text-slate-500 uppercase">Current Stage</p>
                                    <p className="text-xs font-bold mt-1">Foundations (1/5)</p>
                                </div>
                            </div>

                            <Button
                                onClick={onClose}
                                className="w-full mt-8 bg-primary hover:bg-orange-600 text-white font-bold h-14 rounded-2xl gap-2 shadow-lg shadow-primary/20"
                            >
                                <Star className="w-4 h-4 fill-current" /> Continue Learning
                            </Button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
