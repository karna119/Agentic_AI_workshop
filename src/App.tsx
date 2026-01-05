import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Curriculum from './pages/Curriculum'
import Labs from './pages/Labs'
import CaseStudies from './pages/CaseStudies'
import Resources from './pages/Resources'
import Certificate from './pages/Certificate'
import Syllabus from './pages/Syllabus'
import Login from './pages/Login'
import { useState, useEffect } from 'react'
import { getUser } from './lib/auth'

function App() {
    const [user, setUser] = useState(getUser())

    useEffect(() => {
        const handleStorage = () => {
            setUser(getUser())
        }
        window.addEventListener('storage', handleStorage)
        return () => window.removeEventListener('storage', handleStorage)
    }, [])

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route
                path="*"
                element={
                    user ? (
                        <Layout>
                            <Routes>
                                <Route path="/" element={<Dashboard />} />
                                <Route path="/curriculum" element={<Curriculum />} />
                                <Route path="/labs" element={<Labs />} />
                                <Route path="/case-studies" element={<CaseStudies />} />
                                <Route path="/resources" element={<Resources />} />
                                <Route path="/certificate" element={<Certificate />} />
                                <Route path="/syllabus" element={<Syllabus />} />
                            </Routes>
                        </Layout>
                    ) : (
                        <Navigate to="/login" replace />
                    )
                }
            />
        </Routes>
    )
}

export default App
