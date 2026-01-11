import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Contact from './components/Contact'

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(true)  // Changed from false to true


  useEffect(() => {
    const storedMode = localStorage.getItem('darkMode')
    // If there's a stored preference, use it; otherwise default to true (dark mode)
    const isDark = storedMode !== null ? storedMode === 'true' : true
    setDarkMode(isDark)
    if (isDark) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleDarkMode = (): void => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
    localStorage.setItem('darkMode', (!darkMode).toString())
  }

  return (
    <div className="min-h-screen transition-colors duration-700" style={{ backgroundColor: darkMode ? '#000000' : '#FFFFFF' }}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Hero darkMode={darkMode} />
      <About darkMode={darkMode} />
      <Projects darkMode={darkMode} />
      <Skills darkMode={darkMode} />
      <Experience darkMode={darkMode}  />
      <Contact darkMode={darkMode} />
      /
    </div>
  )
}

export default App
