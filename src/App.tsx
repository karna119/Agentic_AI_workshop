import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Curriculum from './pages/Curriculum'
import Labs from './pages/Labs'
import CaseStudies from './pages/CaseStudies'
import Resources from './pages/Resources'
import Certificate from './pages/Certificate'
import Syllabus from './pages/Syllabus'

function App() {
    return (
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
    )
}

export default App
