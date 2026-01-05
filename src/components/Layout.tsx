import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Brain, BookOpen, Code, Rocket, Library, Menu, X, ChevronRight, GraduationCap, Award, User, Settings, LogOut, Edit2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { getUser, logout } from '@/lib/auth'

const SidebarItem = ({ to, icon: Icon, label, active }: { to: string, icon: any, label: string, active: boolean }) => (
    <Link
        to={to}
        className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
            active
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
        )}
    >
        <Icon className={cn("w-5 h-5", active ? "text-white" : "group-hover:scale-110 transition-transform")} />
        <span className="font-medium">{label}</span>
        {active && <ChevronRight className="w-4 h-4 ml-auto" />}
    </Link>
)

const Layout = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation()
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)
    const [user, setUser] = React.useState(getUser())
    const [userName, setUserName] = React.useState(user?.name || 'Dr.Karunakar')
    const [isEditing, setIsEditing] = React.useState(false)

    React.useEffect(() => {
        const handleStorage = () => {
            const updatedUser = getUser()
            setUser(updatedUser)
            setUserName(updatedUser?.name || 'Dr.Karunakar')
        }
        window.addEventListener('storage', handleStorage)
        return () => window.removeEventListener('storage', handleStorage)
    }, [])

    const handleNameSave = (e: React.FormEvent) => {
        e.preventDefault()
        const updatedUser = user ? { ...user, name: userName } : { name: userName, email: '', phone: '' }
        localStorage.setItem('lms_user', JSON.stringify(updatedUser))
        localStorage.setItem('lms_user_name', userName)
        setIsEditing(false)
        window.dispatchEvent(new Event('storage'))
    }

    const navItems = [
        { to: "/", icon: Brain, label: "Dashboard" },
        { to: "/curriculum", icon: BookOpen, label: "Curriculum" },
        { to: "/labs", icon: Code, label: "Hands-on Labs" },
        { to: "/case-studies", icon: Rocket, label: "Case Studies" },
        { to: "/resources", icon: Library, label: "Resources" },
        { to: "/certificate", icon: Award, label: "Certifications" },
    ]

    return (
        <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={cn(
                "fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:block",
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="h-full flex flex-col p-6">
                    <div className="flex items-center gap-3 mb-10 px-2">
                        <div className="w-10 h-10 rounded-xl premium-gradient flex items-center justify-center shadow-lg shadow-primary/20">
                            <GraduationCap className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-none">Autonomous Agent</h2>
                            <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mt-1">Orchestration Foundations</p>
                        </div>
                    </div>

                    <nav className="flex-1 space-y-2">
                        {navItems.map((item) => (
                            <SidebarItem
                                key={item.to}
                                {...item}
                                active={location.pathname === item.to}
                            />
                        ))}
                    </nav>

                    {/* Pro Option Hidden as requested */}
                    {/* <div className="mt-auto p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden relative group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-12 -mt-12 blur-2xl group-hover:scale-110 transition-transform" />
                        <h4 className="font-bold relative z-10">Advanced Topics?</h4>
                        <p className="text-xs text-slate-400 mt-1 relative z-10">Unlock real-world agent blueprints and templates.</p>
                        <Button size="sm" className="w-full mt-4 bg-white text-black hover:bg-slate-100 relative z-10">
                            Upgrade Pro
                        </Button>
                    </div> */}
                    {/* User Profile */}
                    <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
                        {isEditing ? (
                            <form onSubmit={handleNameSave} className="space-y-2">
                                <input
                                    autoFocus
                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-sm font-bold focus:ring-2 focus:ring-primary focus:outline-none"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    onBlur={() => setIsEditing(false)}
                                />
                                <div className="flex gap-2">
                                    <Button type="submit" size="sm" className="flex-1 bg-primary text-white text-[10px] font-black uppercase">Save</Button>
                                    <Button type="button" size="sm" variant="ghost" className="flex-1 text-[10px] font-black uppercase" onClick={() => setIsEditing(false)}>Cancel</Button>
                                </div>
                            </form>
                        ) : (
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 group/profile">
                                    <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover/profile:bg-primary/10 group-hover/profile:text-primary transition-colors">
                                        <User className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-1">
                                            <p className="text-sm font-bold truncate text-slate-900 dark:text-white">{userName}</p>
                                            <button onClick={() => setIsEditing(true)} className="opacity-0 group-hover/profile:opacity-100 p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-all">
                                                <Edit2 className="w-3 h-3 text-slate-400" />
                                            </button>
                                        </div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">{user?.email || 'Agentic Engineer'}</p>
                                    </div>
                                </div>
                                <Button
                                    onClick={logout}
                                    variant="ghost"
                                    className="w-full justify-start gap-3 h-12 px-4 rounded-xl text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all font-bold group"
                                >
                                    <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    <span>Logout</span>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0">
                {/* Top Navbar */}
                <header className="h-16 flex items-center justify-between px-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="lg:hidden"
                        onClick={() => setIsSidebarOpen(true)}
                    >
                        <Menu className="w-6 h-6" />
                    </Button>

                    <div className="hidden lg:flex items-center gap-2 text-sm font-medium text-slate-500">
                        {location.pathname === '/' ? 'Dashboard' : location.pathname.split('/')[1].charAt(0).toUpperCase() + location.pathname.split('/')[1].slice(1)}
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Removed active students count as requested */}
                    </div>
                </header>

                {/* Scrollable Area */}
                <div className="flex-1 overflow-y-auto p-6 md:p-10">
                    {children}
                </div>
            </main>
        </div>
    )
}

export default Layout
