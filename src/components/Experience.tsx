import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { experienceData } from '../data/experienceData'

interface ExperienceProps {
  darkMode?: boolean
}

const Experience = ({ darkMode = false }: ExperienceProps) => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [hoveredId, setHoveredId] = useState<number | null>(null)

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
      {/* THEME-MATCHED BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Dot pattern - Same as Skills */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: darkMode
              ? 'radial-gradient(circle at 2px 2px, rgba(255, 0, 0, 0.15) 1px, transparent 0)'
              : 'radial-gradient(circle at 2px 2px, rgba(255, 0, 0, 0.08) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
        
        {/* Flowing gradient - Same as Skills */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: darkMode
              ? 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(255, 0, 0, 0.04), transparent 70%)'
              : 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(255, 0, 0, 0.02), transparent 70%)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating particles - Same as Skills */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${20 + Math.random() * 60}%`,
              backgroundColor: darkMode ? 'rgba(255, 0, 0, 0.25)' : 'rgba(255, 0, 0, 0.15)',
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Same style as Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-block px-4 py-2 rounded-full mb-4"
            style={{
              backgroundColor: darkMode ? 'rgba(255, 0, 0, 0.1)' : 'rgba(255, 0, 0, 0.08)',
              border: `1px solid ${darkMode ? 'rgba(255, 0, 0, 0.3)' : 'rgba(255, 0, 0, 0.2)'}`,
            }}
          >
            <span className="text-sm font-bold" style={{ color: '#FF0000' }}>
              PROFESSIONAL JOURNEY
            </span>
          </motion.div>
          <h2
            className="text-5xl md:text-6xl font-black mb-4"
            style={{ color: darkMode ? '#FFFFFF' : '#000000' }}
          >
            Experience
          </h2>
          <div className="w-20 h-1 mx-auto rounded-full" style={{ backgroundColor: '#FF0000' }} />
        </motion.div>

        {/* Experience Cards - Side by Side */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {experienceData.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{
                delay: index * 0.2,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              onMouseEnter={() => setHoveredId(exp.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <motion.div
                className="relative h-full rounded-3xl p-6 group"
                style={{
                  backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.9)',
                  border: `2px solid ${darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'}`,
                  boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                }}
                whileHover={{
                  y: -8,
                  borderColor: '#FF0000',
                  backgroundColor: darkMode ? 'rgba(255, 0, 0, 0.05)' : 'rgba(255, 0, 0, 0.03)',
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Type Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="inline-block px-3 py-1 rounded-lg text-xs font-bold"
                    style={{
                      backgroundColor: '#FF0000',
                      color: '#FFFFFF',
                    }}
                  >
                    {exp.type}
                  </div>
                  {exp.endDate === 'Present' && (
                    <motion.div
                      className="flex items-center gap-2 px-2 py-1 rounded-lg"
                      style={{
                        backgroundColor: darkMode ? 'rgba(0, 255, 0, 0.1)' : 'rgba(0, 255, 0, 0.08)',
                      }}
                      animate={{
                        opacity: [1, 0.7, 1],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <motion.div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: '#00FF00' }}
                        animate={{
                          scale: [1, 1.3, 1],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span className="text-xs font-bold" style={{ color: '#00FF00' }}>
                        Current
                      </span>
                    </motion.div>
                  )}
                </div>

                {/* Company Icon */}
                <motion.div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                  style={{
                    backgroundColor: darkMode ? 'rgba(255, 0, 0, 0.1)' : 'rgba(255, 0, 0, 0.08)',
                    border: '2px solid rgba(255, 0, 0, 0.2)',
                  }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <span className="text-3xl">
                    {exp.company === 'UST' ? '🏢' : '💼'}
                  </span>
                </motion.div>

                {/* Role & Company */}
                <h3
                  className="text-2xl font-black mb-2"
                  style={{ color: darkMode ? '#FFFFFF' : '#000000' }}
                >
                  {exp.role}
                </h3>
                <p
                  className="text-lg font-bold mb-1"
                  style={{ color: '#FF0000' }}
                >
                  {exp.company}
                </p>
                <p
                  className="text-sm mb-4"
                  style={{ color: darkMode ? '#999' : '#666' }}
                >
                  {exp.location} • {exp.startDate} - {exp.endDate}
                </p>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{ color: darkMode ? '#B8B8B8' : '#4A4A4A' }}
                >
                  {exp.description}
                </p>

                {/* Metrics */}
                {exp.metrics && (
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {exp.metrics.map((metric, i) => (
                      <motion.div
                        key={i}
                        className="text-center p-3 rounded-xl"
                        style={{
                          backgroundColor: darkMode ? 'rgba(255, 0, 0, 0.05)' : 'rgba(255, 0, 0, 0.03)',
                          border: `1px solid ${darkMode ? 'rgba(255, 0, 0, 0.15)' : 'rgba(255, 0, 0, 0.1)'}`,
                        }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="text-xl font-black mb-1" style={{ color: '#FF0000' }}>
                          {metric.value}
                        </div>
                        <div className="text-xs font-semibold" style={{ color: darkMode ? '#999' : '#666' }}>
                          {metric.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Key Highlights */}
                {exp.highlights && (
                  <div className="space-y-2 mb-4">
                    {exp.highlights.slice(0, 3).map((highlight: string, i: number) => (
                      <motion.div
                        key={i}
                        className="flex items-start gap-2 text-xs"
                        style={{ color: darkMode ? '#B8B8B8' : '#4A4A4A' }}
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                        transition={{ delay: index * 0.2 + i * 0.05 }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0" style={{ backgroundColor: '#FF0000' }} />
                        {highlight}
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.slice(0, 6).map((tech: string, i: number) => (
                    <span
                      key={i}
                      className="px-2 py-1 rounded-lg text-xs font-semibold"
                      style={{
                        backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                        color: darkMode ? '#E5E5E5' : '#2D2D2D',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                  {exp.technologies.length > 6 && (
                    <span
                      className="px-2 py-1 rounded-lg text-xs font-bold"
                      style={{
                        backgroundColor: 'rgba(255, 0, 0, 0.1)',
                        color: '#FF0000',
                      }}
                    >
                      +{exp.technologies.length - 6}
                    </span>
                  )}
                </div>

                {/* Hover Glow - Same as Skills */}
                <motion.div
                  className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100"
                  style={{
                    background: darkMode
                      ? 'radial-gradient(circle at 50% 50%, rgba(255, 0, 0, 0.1), transparent 70%)'
                      : 'radial-gradient(circle at 50% 50%, rgba(255, 0, 0, 0.05), transparent 70%)',
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
