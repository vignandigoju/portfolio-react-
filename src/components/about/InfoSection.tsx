import { memo } from 'react'
import { motion } from 'framer-motion'

interface InfoItem {
  icon: React.ReactNode
  text: string | React.ReactNode
}

interface InfoSectionProps {
  items: InfoItem[]
  darkMode: boolean
}

// ✅ OPTIMIZATION 3: Memoized info section component
const InfoSection = memo(({ items, darkMode }: InfoSectionProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-6 text-sm md:text-base font-medium">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <div style={{ color: '#FF0000' }}>
            {item.icon}
          </div>
          <span style={{ color: darkMode ? '#E5E5E5' : '#2D2D2D' }}>
            {item.text}
          </span>
        </div>
      ))}
    </div>
  )
})

InfoSection.displayName = 'InfoSection'

export default InfoSection
