import { useInView } from 'framer-motion'
import { useRef, useState, useCallback } from 'react'
import { experienceData } from '../data/experienceData'
import ExperienceCard from './experience/ExperienceCard'
import SectionHeader from './shared/SectionHeader'
import MinimalBackground from './shared/MinimalBackground'

interface ExperienceProps {
  darkMode?: boolean
}

const Experience = ({ darkMode = false }: ExperienceProps) => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  // ✅ OPTIMIZATION 5: Memoize hover handler
  const handleHover = useCallback((id: number | null) => {
    setHoveredId(id)
  }, [])

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-20 md:py-28 transition-colors duration-700 overflow-hidden"
      style={{ 
        backgroundColor: darkMode ? '#0A0A0A' : '#F8F8F8',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* ✅ OPTIMIZATION 6: Reusable background component */}
      <MinimalBackground darkMode={darkMode} particleCount={15} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ✅ OPTIMIZATION 7: Reusable header component */}
        <SectionHeader
          badge="PROFESSIONAL JOURNEY"
          title="Experience"
          darkMode={darkMode}
          isInView={isInView}
        />

        {/* Experience Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {experienceData.map((exp, index) => (
            <ExperienceCard
              key={exp.id}
              experience={exp}
              index={index}
              isInView={isInView}
              darkMode={darkMode}
              isHovered={hoveredId === exp.id}
              onHover={handleHover}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
