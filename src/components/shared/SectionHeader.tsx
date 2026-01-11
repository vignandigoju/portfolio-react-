import { memo } from 'react'
import { motion } from 'framer-motion'
import { slideUpVariants } from '../../utils/animations'

interface SectionHeaderProps {
  badge: string
  title: string
  darkMode: boolean
  isInView: boolean
}

// ✅ OPTIMIZATION 2: Reusable section header component
const SectionHeader = memo(({ badge, title, darkMode, isInView }: SectionHeaderProps) => {
  return (
    <motion.div
      variants={slideUpVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
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
          {badge}
        </span>
      </motion.div>
      <h2
        className="text-5xl md:text-6xl font-black mb-4"
        style={{ color: darkMode ? '#FFFFFF' : '#000000' }}
      >
        {title}
      </h2>
      <div className="w-20 h-1 mx-auto rounded-full" style={{ backgroundColor: '#FF0000' }} />
    </motion.div>
  )
})

SectionHeader.displayName = 'SectionHeader'

export default SectionHeader
