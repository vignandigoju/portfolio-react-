import { useInView } from 'framer-motion'
import { useRef, useMemo } from 'react'
import { skillsData } from '../data/skillsData'
import { useOrbitAnimation } from '../hooks/useOrbitAnimation'
import SkillOrbit from './skills/SkillOrbit'
import CosmicBackground from './skills/CosmicBackground'
import SectionHeader from './shared/SectionHeader'

interface SkillsProps {
  darkMode?: boolean
}

const Skills = ({ darkMode = false }: SkillsProps) => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  
  const { outerRotation, innerRotation } = useOrbitAnimation()

  const { outerSkills, innerSkills } = useMemo(() => {
    const midPoint = Math.ceil(skillsData.length / 2)
    return {
      outerSkills: skillsData.slice(0, midPoint),
      innerSkills: skillsData.slice(midPoint)
    }
  }, [])

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-12 md:py-16 transition-colors duration-700 overflow-hidden"
      style={{ 
        backgroundColor: darkMode ? '#0A0A0A' : '#F8F8F8',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <CosmicBackground darkMode={darkMode} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Header */}
        <div className="text-center mb-8">
          <div
            className="inline-block px-3 py-1.5 rounded-full mb-3"
            style={{
              backgroundColor: darkMode ? 'rgba(255, 0, 0, 0.1)' : 'rgba(255, 0, 0, 0.08)',
              border: `1px solid ${darkMode ? 'rgba(255, 0, 0, 0.3)' : 'rgba(255, 0, 0, 0.2)'}`,
            }}
          >
            <span className="text-xs font-bold" style={{ color: '#FF0000' }}>
              EXPERTISE
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-black mb-3"
            style={{ color: darkMode ? '#FFFFFF' : '#000000' }}
          >
            Skills
          </h2>
          <div 
            className="w-16 h-1 mx-auto rounded-full" 
            style={{ backgroundColor: '#FF0000' }} 
          />
        </div>

        {/* Compact Dual Orbit System */}
        <div className="relative mx-auto" style={{ height: '500px', maxHeight: '60vh' }}>
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none" 
            style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
          >
            <ellipse
              cx="50%"
              cy="50%"
              rx="380"
              ry="180"
              fill="none"
              stroke={darkMode ? 'rgba(255, 0, 0, 0.25)' : 'rgba(255, 0, 0, 0.2)'}
              strokeWidth="1"
              strokeDasharray="6,6"
              filter="url(#glow)"
            />
            <ellipse
              cx="50%"
              cy="50%"
              rx="260"
              ry="120"
              fill="none"
              stroke={darkMode ? 'rgba(255, 0, 0, 0.25)' : 'rgba(255, 0, 0, 0.2)'}
              strokeWidth="1"
              strokeDasharray="6,6"
              filter="url(#glow)"
            />
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
          </svg>

          {outerSkills.map((skill, index) => (
            <SkillOrbit
              key={`outer-${skill.name}`}
              skill={skill}
              index={index}
              total={outerSkills.length}
              rotation={outerRotation}
              radiusX={380}
              radiusY={180}
              darkMode={darkMode}
              isInView={isInView}
            />
          ))}

          {innerSkills.map((skill, index) => (
            <SkillOrbit
              key={`inner-${skill.name}`}
              skill={skill}
              index={index}
              total={innerSkills.length}
              rotation={innerRotation}
              radiusX={260}
              radiusY={120}
              darkMode={darkMode}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
