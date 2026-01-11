import { memo, useMemo } from 'react'
import { motion } from 'framer-motion'

interface SpaceBackgroundProps {
  darkMode: boolean
}

// ✅ OPTIMIZATION 6: Memoized space background
const SpaceBackground = memo(({ darkMode }: SpaceBackgroundProps) => {
  // ✅ OPTIMIZATION 7: Memoize star positions
  const stars = useMemo(() => 
    Array.from({ length: 150 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: 1 + Math.random() * 2,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 2,
    })), []
  )

  const shootingStars = useMemo(() => 
    Array.from({ length: 3 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 50}%`,
      top: `${Math.random() * 100}%`,
      delay: i * 5,
    })), []
  )

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Twinkling Stars */}
      {stars.map((star) => (
        <motion.div
          key={`star-${star.id}`}
          className="absolute rounded-full"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            backgroundColor: darkMode ? '#FFFFFF' : 'rgba(0, 0, 0, 0.3)',
            boxShadow: `0 0 ${3 + Math.random() * 3}px ${darkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.6)'}`,
            willChange: 'opacity, transform',
          }}
          animate={{
            opacity: [0.1, 1, 0.1],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
          }}
        />
      ))}

      {/* Shooting Stars */}
      {shootingStars.map((star) => (
        <motion.div
          key={`shooting-${star.id}`}
          className="absolute"
          style={{
            left: star.left,
            top: star.top,
            willChange: 'transform, opacity',
          }}
          animate={{
            x: [0, 800],
            y: [0, 400],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeOut",
          }}
        >
          <div
            style={{
              width: 3,
              height: 3,
              backgroundColor: '#FFFFFF',
              boxShadow: '0 0 30px 8px rgba(255, 255, 255, 0.8)',
              borderRadius: '50%',
            }}
          />
        </motion.div>
      ))}

      {/* Orbital Paths */}
      <svg className="absolute inset-0 w-full h-full opacity-15">
        {[...Array(3)].map((_, i) => (
          <motion.ellipse
            key={i}
            cx="50%"
            cy="50%"
            rx={`${35 + i * 8}%`}
            ry={`${30 + i * 6}%`}
            fill="none"
            stroke={darkMode ? 'rgba(255, 0, 0, 0.3)' : 'rgba(255, 0, 0, 0.2)'}
            strokeWidth="1"
            strokeDasharray="8,8"
            animate={{
              strokeDashoffset: [0, 16],
            }}
            transition={{
              duration: 10 + i * 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  )
})

SpaceBackground.displayName = 'SpaceBackground'

export default SpaceBackground
