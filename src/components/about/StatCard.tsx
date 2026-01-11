import { memo } from 'react'
import { motion } from 'framer-motion'

interface StatCardProps {
  label: string
  value: string
  darkMode: boolean
}

// ✅ OPTIMIZATION 2: Memoized stat card component
const StatCard = memo(({ label, value, darkMode }: StatCardProps) => {
  return (
    <motion.div
      className="p-6 rounded-2xl text-center transition-all duration-300"
      style={{
        backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.8)',
        border: `2px solid ${darkMode ? 'rgba(255, 0, 0, 0.2)' : 'rgba(255, 0, 0, 0.15)'}`,
        willChange: 'transform',
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
        {label}
      </div>
    </motion.div>
  )
})

StatCard.displayName = 'StatCard'

export default StatCard
