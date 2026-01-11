import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { aboutData } from '../data/aboutData'

interface AboutProps {
  darkMode?: boolean
}

const About = ({ darkMode = false }: AboutProps) => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]as const 
      }
    }
  }

  // Value Icons
  const ValueIcon = ({ name }: { name: string }) => {
    const icons: { [key: string]: React.JSX.Element } = {

      heart: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      ),
      target: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <circle cx="12" cy="12" r="6"/>
          <circle cx="12" cy="12" r="2"/>
        </svg>
      ),
      rocket: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
        </svg>
      ),
    }
    return icons[name] || icons.heart
  }

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-20 md:py-24 transition-colors duration-700 overflow-hidden"
      style={{
        backgroundColor: darkMode ? '#0A0A0A' : '#F8F8F8',
      }}
    >
      {/* Minimal Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle gradient orb */}
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

        {/* Subtle grid */}
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
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
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
          <motion.div variants={itemVariants} className="mb-12">
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
          <motion.div variants={itemVariants} className="mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(aboutData.stats).map(([key, value], i) => (
                <motion.div
                  key={key}
                  className="p-6 rounded-2xl text-center transition-all duration-300"
                  style={{
                    backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.8)',
                    border: `2px solid ${darkMode ? 'rgba(255, 0, 0, 0.2)' : 'rgba(255, 0, 0, 0.15)'}`,
                  }}
                  whileHover={{
                    y: -5,
                    borderColor: '#FF0000',
                    backgroundColor: darkMode ? 'rgba(255, 0, 0, 0.05)' : 'rgba(255, 0, 0, 0.03)',
                  }}
                >
                  <div
                    className="text-2xl md:text-3xl font-black mb-2"
                    style={{ color: '#FF0000' }}
                  >
                    {value}
                  </div>
                  <div
                    className="text-xs md:text-sm font-semibold uppercase tracking-wide"
                    style={{ color: darkMode ? '#999' : '#666' }}
                  >
                    {key}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Company & Location */}
          <motion.div variants={itemVariants} className="mb-16">
            <div className="flex flex-wrap justify-center gap-6 text-sm md:text-base font-medium">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{ color: '#FF0000' }}
                >
                  <rect x="2" y="7" width="20" height="14" rx="2"/>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                </svg>
                <span style={{ color: darkMode ? '#E5E5E5' : '#2D2D2D' }}>
                  Software Developer at <span className="font-bold" style={{ color: '#FF0000' }}>{aboutData.personal.company}</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{ color: '#FF0000' }}
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span style={{ color: darkMode ? '#E5E5E5' : '#2D2D2D' }}>
                  {aboutData.personal.location}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{ color: '#FF0000' }}
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span style={{ color: darkMode ? '#E5E5E5' : '#2D2D2D' }}>
                  <a href="https://linkedin.com/in/vignandigoju" target="_blank" rel="noopener noreferrer">
                    linkedin.com/in/vignandigoju
                  </a>
                </span>
              </div>
            </div>
          </motion.div>

          {/* Core Values */}
          <motion.div variants={itemVariants} className="mb-16">
            <h3
              className="text-2xl md:text-3xl font-black text-center mb-8"
              style={{ color: darkMode ? '#FFFFFF' : '#000000' }}
            >
              Core Values
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {aboutData.values.map((value, i) => (
                <motion.div
                  key={i}
                  className="group p-6 rounded-2xl text-center relative overflow-hidden"
                  style={{
                    backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.8)',
                    border: `2px solid ${darkMode ? 'rgba(255, 0, 0, 0.2)' : 'rgba(255, 0, 0, 0.15)'}`,
                  }}
                  whileHover={{
                    y: -8,
                    borderColor: '#FF0000',
                  }}
                >
                  {/* Icon */}
                  <motion.div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 mx-auto"
                    style={{ backgroundColor: '#FF0000' }}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="w-7 h-7 text-white">
                      <ValueIcon name={value.icon} />
                    </div>
                  </motion.div>

                  <h4
                    className="text-xl font-bold mb-2"
                    style={{ color: darkMode ? '#FFFFFF' : '#000000' }}
                  >
                    {value.title}
                  </h4>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: darkMode ? '#999' : '#666' }}
                  >
                    {value.description}
                  </p>

                  {/* Hover glow */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: darkMode
                        ? 'radial-gradient(circle at center, rgba(255, 0, 0, 0.08), transparent)'
                        : 'radial-gradient(circle at center, rgba(255, 0, 0, 0.04), transparent)',
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Bottom Section: Current Focus + Interests */}
          <motion.div variants={itemVariants}>
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Current Focus */}
              <motion.div
                className="p-6 rounded-2xl"
                style={{
                  backgroundColor: darkMode ? 'rgba(255, 0, 0, 0.05)' : 'rgba(255, 0, 0, 0.03)',
                  border: `2px solid ${darkMode ? 'rgba(255, 0, 0, 0.2)' : 'rgba(255, 0, 0, 0.15)'}`,
                }}
                whileHover={{ scale: 1.02 }}
              >
                <h3
                  className="text-xl font-black mb-4"
                  style={{ color: darkMode ? '#FFFFFF' : '#000000' }}
                >
                  {aboutData.currentFocus.title} 🚀
                </h3>
                <div className="space-y-3">
                  {aboutData.currentFocus.items.map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                        style={{ backgroundColor: '#FF0000' }}
                      />
                      <span
                        className="text-sm leading-relaxed"
                        style={{ color: darkMode ? '#B8B8B8' : '#4A4A4A' }}
                      >
                        {item}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Interests */}
              <motion.div
                className="p-6 rounded-2xl"
                style={{
                  backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.8)',
                  border: `2px solid ${darkMode ? 'rgba(255, 0, 0, 0.2)' : 'rgba(255, 0, 0, 0.15)'}`,
                }}
                whileHover={{ scale: 1.02 }}
              >
                <h3
                  className="text-xl font-black mb-4"
                  style={{ color: darkMode ? '#FFFFFF' : '#000000' }}
                >
                  {aboutData.interests.title} 🎮
                </h3>
                <div className="flex flex-wrap gap-2">
                  {aboutData.interests.items.map((interest, i) => (
                    <motion.div
                      key={i}
                      className="px-4 py-2 rounded-full text-sm font-semibold"
                      style={{
                        backgroundColor: darkMode ? 'rgba(255, 0, 0, 0.1)' : 'rgba(255, 0, 0, 0.08)',
                        color: '#FF0000',
                        border: `1px solid ${darkMode ? 'rgba(255, 0, 0, 0.3)' : 'rgba(255, 0, 0, 0.2)'}`,
                      }}
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ delay: 0.5 + i * 0.05, type: "spring" }}
                      whileHover={{
                        scale: 1.1,
                        backgroundColor: darkMode ? 'rgba(255, 0, 0, 0.15)' : 'rgba(255, 0, 0, 0.12)',
                      }}
                    >
                      {interest}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
