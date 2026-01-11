import { memo, useMemo } from 'react'
import { motion } from 'framer-motion'

interface MinimalBackgroundProps {
  darkMode: boolean
  particleCount?: number
}

// ✅ OPTIMIZATION 3: Reusable minimal background
const MinimalBackground = memo(({ darkMode, particleCount = 15 }: MinimalBackgroundProps) => {
  // ✅ OPTIMIZATION 4: Memoize particle positions
  const particles = useMemo(() => 
    Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      left: `${10 + Math.random() * 80}%`,
      top: `${20 + Math.random() * 60}%`,
      duration: 4 + Math.random() * 3,
      delay: Math.random() * 3,
    })), [particleCount]
  )

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: darkMode
            ? 'radial-gradient(circle at 2px 2px, rgba(255, 0, 0, 0.15) 1px, transparent 0)'
            : 'radial-gradient(circle at 2px 2px, rgba(255, 0, 0, 0.08) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />
      
      {/* Flowing gradient */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: darkMode
            ? 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(255, 0, 0, 0.04), transparent 70%)'
            : 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(255, 0, 0, 0.02), transparent 70%)',
          willChange: 'transform, opacity',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: particle.left,
            top: particle.top,
            backgroundColor: darkMode ? 'rgba(255, 0, 0, 0.25)' : 'rgba(255, 0, 0, 0.15)',
            willChange: 'transform, opacity',
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
})

MinimalBackground.displayName = 'MinimalBackground'

export default MinimalBackground
