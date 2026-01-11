import { memo } from 'react'
import { motion } from 'framer-motion'

interface FocusInterestCardsProps {
  currentFocus: {
    title: string
    items: string[]
  }
  interests: {
    title: string
    items: string[]
  }
  darkMode: boolean
  isInView: boolean
}

// ✅ OPTIMIZATION 4: Memoized focus/interest cards
const FocusInterestCards = memo(({ currentFocus, interests, darkMode, isInView }: FocusInterestCardsProps) => {
  return (
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
          {currentFocus.title} 🚀
        </h3>
        <div className="space-y-3">
          {currentFocus.items.map((item, i) => (
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
          {interests.title} 🎮
        </h3>
        <div className="flex flex-wrap gap-2">
          {interests.items.map((interest, i) => (
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
  )
})

FocusInterestCards.displayName = 'FocusInterestCards'

export default FocusInterestCards
