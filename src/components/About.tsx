import { motion, useInView } from 'framer-motion'
import { useRef, useMemo } from 'react'
import { aboutData } from '../data/aboutData'
import { fadeInVariants, slideUpVariants } from '../utils/animations'
import SectionHeader from './shared/SectionHeader'
import MinimalBackground from './shared/MinimalBackground'
import ValueCard from './about/ValueCard'
import StatCard from './about/StatCard'
import InfoSection from './about/InfoSection'
import FocusInterestCards from './about/FocusInterestCards'

interface AboutProps {
  darkMode?: boolean
}

const About = ({ darkMode = false }: AboutProps) => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  // ✅ OPTIMIZATION 5: Memoize info items
  const infoItems = useMemo(() => [
    {
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="7" width="20" height="14" rx="2"/>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
        </svg>
      ),
      text: (
        <>
          Software Developer at <span className="font-bold" style={{ color: '#FF0000' }}>{aboutData.personal.company}</span>
        </>
      )
    },
    {
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      ),
      text: aboutData.personal.location
    },
    {
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      ),
      text: (
        <a href="https://linkedin.com/in/vignandigoju" target="_blank" rel="noopener noreferrer">
          linkedin.com/in/vignandigoju
        </a>
      )
    }
  ], [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-20 md:py-24 transition-colors duration-700 overflow-hidden"
      style={{
        backgroundColor: darkMode ? '#0A0A0A' : '#F8F8F8',
      }}
    >
      {/* ✅ OPTIMIZATION 6: Reusable background */}
      <MinimalBackground darkMode={darkMode} particleCount={0} />

      {/* Additional subtle effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 800,
            height: 800,
            left: '50%',
            top: '40%',
            transform: 'translate(-50%, -50%)',
            background: darkMode
              ? `radial-gradient(circle, rgba(255, 0, 0, 0.03) 0%, transparent 70%)`
              : `radial-gradient(circle, rgba(255, 0, 0, 0.02) 0%, transparent 70%)`,
            filter: 'blur(80px)',
            willChange: 'transform, opacity',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
        />

        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: darkMode
              ? 'linear-gradient(rgba(255, 0, 0, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 0, 0, 0.03) 1px, transparent 1px)'
              : 'linear-gradient(rgba(255, 0, 0, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 0, 0, 0.02) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeInVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={slideUpVariants} className="text-center mb-16">
            <motion.div
              className="inline-block px-4 py-2 rounded-full mb-4"
              style={{
                backgroundColor: darkMode ? 'rgba(255, 0, 0, 0.1)' : 'rgba(255, 0, 0, 0.08)',
                border: `1px solid ${darkMode ? 'rgba(255, 0, 0, 0.3)' : 'rgba(255, 0, 0, 0.2)'}`,
              }}
            >
              <span className="text-sm font-bold" style={{ color: '#FF0000' }}>
                ABOUT ME
              </span>
            </motion.div>
            <h2
              className="text-4xl md:text-5xl font-black mb-4"
              style={{ color: darkMode ? '#FFFFFF' : '#000000' }}
            >
              Who I Am
            </h2>
            <p
              className="text-lg md:text-xl font-medium max-w-2xl mx-auto"
              style={{ color: '#FF0000' }}
            >
              {aboutData.personal.tagline}
            </p>
          </motion.div>

          {/* Introduction */}
          <motion.div variants={slideUpVariants} className="mb-12">
            <p
              className="text-base md:text-lg leading-relaxed text-center max-w-4xl mx-auto"
              style={{
                color: darkMode ? '#B8B8B8' : '#4A4A4A',
                lineHeight: '1.8',
              }}
            >
              {aboutData.personal.introduction}
            </p>
          </motion.div>

          {/* Quick Stats Grid */}
          <motion.div variants={slideUpVariants} className="mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(aboutData.stats).map(([key, value]) => (
                <StatCard
                  key={key}
                  label={key}
                  value={value}
                  darkMode={darkMode}
                />
              ))}
            </div>
          </motion.div>

          {/* Company & Location */}
          <motion.div variants={slideUpVariants} className="mb-16">
            <InfoSection items={infoItems} darkMode={darkMode} />
          </motion.div>

          {/* Core Values */}
          <motion.div variants={slideUpVariants} className="mb-16">
            <h3
              className="text-2xl md:text-3xl font-black text-center mb-8"
              style={{ color: darkMode ? '#FFFFFF' : '#000000' }}
            >
              Core Values
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {aboutData.values.map((value, i) => (
                <ValueCard
                  key={i}
                  value={value}
                  darkMode={darkMode}
                />
              ))}
            </div>
          </motion.div>

          {/* Bottom Section: Current Focus + Interests */}
          <motion.div variants={slideUpVariants}>
            <FocusInterestCards
              currentFocus={aboutData.currentFocus}
              interests={aboutData.interests}
              darkMode={darkMode}
              isInView={isInView}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
