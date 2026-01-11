import { memo } from 'react'
import { motion } from 'framer-motion'

interface ValueCardProps {
  value: {
    icon: string
    title: string
    description: string
  }
  darkMode: boolean
}

// Icon Component
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

// ✅ OPTIMIZATION 1: Memoized value card component
const ValueCard = memo(({ value, darkMode }: ValueCardProps) => {
  return (
    <motion.div
      className="group p-6 rounded-2xl text-center relative overflow-hidden"
      style={{
        backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.8)',
        border: `2px solid ${darkMode ? 'rgba(255, 0, 0, 0.2)' : 'rgba(255, 0, 0, 0.15)'}`,
        willChange: 'transform',
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
  )
})

ValueCard.displayName = 'ValueCard'

export default ValueCard
