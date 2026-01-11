import { memo, useCallback } from 'react'
import { motion } from 'framer-motion'

interface Metric {
  value: string
  label: string
}

interface ExperienceCardProps {
  experience: {
    id: number
    type: string
    company: string
    role: string
    location: string
    startDate: string
    endDate: string
    description: string
    highlights?: string[]
    technologies: string[]
    metrics?: Metric[]
  }
  index: number
  isInView: boolean
  darkMode: boolean
  isHovered: boolean
  onHover: (id: number | null) => void
}

// ✅ OPTIMIZATION 1: Memoized card component
const ExperienceCard = memo(({
  experience: exp,
  index,
  isInView,
  darkMode,
  isHovered,
  onHover
}: ExperienceCardProps) => {
  
  const handleMouseEnter = useCallback(() => {
    onHover(exp.id)
  }, [exp.id, onHover])

  const handleMouseLeave = useCallback(() => {
    onHover(null)
  }, [onHover])

  const isCurrent = exp.endDate === 'Present'
  const topTechnologies = exp.technologies.slice(0, 6)
  const remainingTechCount = exp.technologies.length - 6

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        delay: index * 0.2,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative h-full rounded-3xl p-6 group"
        style={{
          backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.9)',
          border: `2px solid ${darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'}`,
          boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
          willChange: 'transform',
        }}
        whileHover={{
          y: -8,
          borderColor: '#FF0000',
          backgroundColor: darkMode ? 'rgba(255, 0, 0, 0.05)' : 'rgba(255, 0, 0, 0.03)',
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Type Badge & Status */}
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
          {isCurrent && (
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
        {exp.metrics && exp.metrics.length > 0 && (
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
        {exp.highlights && exp.highlights.length > 0 && (
          <div className="space-y-2 mb-4">
            {exp.highlights.slice(0, 3).map((highlight, i) => (
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
          {topTechnologies.map((tech, i) => (
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
          {remainingTechCount > 0 && (
            <span
              className="px-2 py-1 rounded-lg text-xs font-bold"
              style={{
                backgroundColor: 'rgba(255, 0, 0, 0.1)',
                color: '#FF0000',
              }}
            >
              +{remainingTechCount}
            </span>
          )}
        </div>

        {/* Hover Glow */}
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
  )
})

ExperienceCard.displayName = 'ExperienceCard'

export default ExperienceCard
