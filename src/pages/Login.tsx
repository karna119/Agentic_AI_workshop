import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, User, Mail, Phone, ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'
import { saveUser } from '@/lib/auth'
import { syncUserToDatabase } from '@/lib/userService'

export default function Login() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            // Save to database/persistence layer
            await syncUserToDatabase(formData)

            // Save to local session
            saveUser(formData)

            // Navigate to dashboard
            setTimeout(() => {
                setIsLoading(false)
                navigate('/')
            }, 800)
        } catch (error) {
            console.error('Login error:', error)
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-500/10 blur-[120px] rounded-full" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-lg relative z-10"
            >
                <div className="text-center mb-10">
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="inline-flex items-center justify-center w-20 h-20 rounded-[2rem] premium-gradient shadow-2xl shadow-primary/30 mb-6"
                    >
                        <GraduationCap className="w-10 h-10 text-white" />
                    </motion.div>
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-3">
                        Join the <span className="text-primary">Future</span> of AI
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">
                        Master Autonomous Agent Orchestration with our premium LMS.
                    </p>
                </div>

                <Card className="border-none shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] overflow-hidden">
                    <CardContent className="p-8 md:p-12">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                                    <input
                                        required
                                        type="text"
                                        placeholder="Enter your name"
                                        className="w-full h-14 pl-12 pr-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-primary/20 dark:focus:border-primary/20 rounded-2xl outline-none transition-all font-bold text-slate-900 dark:text-white"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                                    <input
                                        required
                                        type="email"
                                        placeholder="name@company.com"
                                        className="w-full h-14 pl-12 pr-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-primary/20 dark:focus:border-primary/20 rounded-2xl outline-none transition-all font-bold text-slate-900 dark:text-white"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                                <div className="relative group">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                                    <input
                                        required
                                        type="tel"
                                        placeholder="+1 (555) 000-0000"
                                        className="w-full h-14 pl-12 pr-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-primary/20 dark:focus:border-primary/20 rounded-2xl outline-none transition-all font-bold text-slate-900 dark:text-white"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-16 bg-primary hover:bg-orange-600 text-white rounded-2xl text-lg font-black gap-3 shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-98 mt-4"
                            >
                                {isLoading ? (
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                        className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                                    />
                                ) : (
                                    <>
                                        Get Started <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </Button>
                        </form>

                        <div className="mt-8 flex items-center justify-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider">
                            <Sparkles className="w-4 h-4 text-primary" /> Powered by Agentic AI Systems
                        </div>
                    </CardContent>
                </Card>

                <p className="text-center mt-8 text-slate-400 text-sm font-medium">
                    By joining, you agree to our <span className="text-slate-900 dark:text-white font-bold cursor-pointer hover:underline">Terms of Service</span> and <span className="text-slate-900 dark:text-white font-bold cursor-pointer hover:underline">Privacy Policy</span>.
                </p>
            </motion.div>
        </div>
    )
}
