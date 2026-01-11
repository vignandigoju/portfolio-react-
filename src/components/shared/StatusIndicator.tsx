import { memo } from 'react'
import { motion } from 'framer-motion'

interface StatusIndicatorProps {
  status: 'active' | 'inactive'
  label: string
  darkMode: boolean
}

// ✅ OPTIMIZATION: Reusable status indicator with pulse animation
const StatusIndicator = memo(({ status, label, darkMode }: StatusIndicatorProps) => {
  const isActive = status === 'active'

  return (
    <motion.div
      className="flex items-center gap-2 px-2 py-1 rounded-lg"
      style={{
        backgroundColor: isActive 
          ? darkMode ? 'rgba(0, 255, 0, 0.1)' : 'rgba(0, 255, 0, 0.08)'
          : darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
      }}
      animate={{
        opacity: isActive ? [1, 0.7, 1] : 1,
      }}
      transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
    >
      <motion.div
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: isActive ? '#00FF00' : '#999' }}
        animate={{
          scale: isActive ? [1, 1.3, 1] : 1,
        }}
        transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
      />
      <span className="text-xs font-bold" style={{ color: isActive ? '#00FF00' : '#999' }}>
        {label}
      </span>
    </motion.div>
  )
})

StatusIndicator.displayName = 'StatusIndicator'

export default StatusIndicator
