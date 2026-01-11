import { memo, useMemo } from 'react'
import { motion } from 'framer-motion'

interface CosmicBackgroundProps {
  darkMode: boolean
}

// ✅ OPTIMIZATION 3: Memoized background to prevent re-renders
const CosmicBackground = memo(({ darkMode }: CosmicBackgroundProps) => {
  // ✅ OPTIMIZATION 4: Pre-calculate random positions once
  const stars = useMemo(() => 
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: 1 + Math.random() * 2,
      duration: 1 + Math.random() * 2,
      delay: Math.random() * 3,
    })), []
  )

  const shootingStars = useMemo(() => 
    Array.from({ length: 3 }, (_, i) => ({
      id: i,
      left: `${-10 + Math.random() * 50}%`,
      top: `${Math.random() * 100}%`,
      delay: i * 4 + Math.random() * 3,
    })), []
  )

  const planets = useMemo(() => [
    { x: '15%', y: '20%', size: 60, delay: 0 },
    { x: '85%', y: '25%', size: 80, delay: 1 },
    { x: '10%', y: '75%', size: 70, delay: 2 },
    { x: '90%', y: '80%', size: 50, delay: 1.5 },
  ], [])

  const rockets = useMemo(() => [
    { start: '-10%', top: '30%', delay: 0 },
    { start: '-10%', top: '60%', delay: 5 },
  ], [])

  const satellites = useMemo(() => [
    { x: '20%', y: '15%' },
    { x: '75%', y: '70%' },
  ], [])

  const asteroids = useMemo(() => 
    Array.from({ length: 6 }, (_, i) => ({
      id: i,
      left: `${10 + i * 15}%`,
      top: `${20 + (i % 3) * 25}%`,
      delay: i * 0.5,
      duration: 8 + i * 2,
    })), []
  )

  const glowParticles = useMemo(() => 
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${5 + Math.random() * 90}%`,
      top: `${10 + Math.random() * 80}%`,
      size: 3 + Math.random() * 3,
      duration: 4 + Math.random() * 3,
      delay: Math.random() * 4,
      distance: 70 + Math.random() * 30,
    })), []
  )

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Twinkling Stars Field */}
      {stars.map((star) => (
        <motion.div
          key={`star-${star.id}`}
          className="absolute rounded-full"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            backgroundColor: darkMode ? '#FFFFFF' : 'rgba(255, 0, 0, 0.6)',
            boxShadow: `0 0 ${2 + Math.random() * 4}px ${darkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 0, 0, 0.8)'}`,
            willChange: 'opacity, transform',
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
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
              width: 2,
              height: 2,
              backgroundColor: darkMode ? '#FFFFFF' : '#FF0000',
              boxShadow: darkMode
                ? '0 0 20px 5px rgba(255, 255, 255, 0.8), 0 0 40px 10px rgba(255, 255, 255, 0.4)'
                : '0 0 20px 5px rgba(255, 0, 0, 0.8), 0 0 40px 10px rgba(255, 0, 0, 0.4)',
              borderRadius: '50%',
            }}
          />
        </motion.div>
      ))}

      {/* Glowing Planets/Orbs */}
      {planets.map((planet, i) => (
        <motion.div
          key={`planet-${i}`}
          className="absolute rounded-full"
          style={{
            left: planet.x,
            top: planet.y,
            width: planet.size,
            height: planet.size,
            background: darkMode
              ? `radial-gradient(circle at 30% 30%, rgba(255, 50, 50, 0.4), rgba(255, 0, 0, 0.2) 40%, transparent 70%)`
              : `radial-gradient(circle at 30% 30%, rgba(255, 100, 100, 0.3), rgba(255, 0, 0, 0.15) 40%, transparent 70%)`,
            boxShadow: darkMode
              ? `0 0 60px rgba(255, 0, 0, 0.5), inset -10px -10px 30px rgba(0, 0, 0, 0.5)`
              : `0 0 40px rgba(255, 0, 0, 0.3), inset -10px -10px 20px rgba(0, 0, 0, 0.2)`,
            filter: 'blur(1px)',
            willChange: 'transform',
          }}
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.05, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 15 + i * 3,
            repeat: Infinity,
            delay: planet.delay,
          }}
        />
      ))}

      {/* Rocket Ships */}
      {rockets.map((rocket, i) => (
        <motion.div
          key={`rocket-${i}`}
          className="absolute"
          style={{
            left: rocket.start,
            top: rocket.top,
            fontSize: '24px',
            filter: 'drop-shadow(0 0 8px rgba(255, 0, 0, 0.8))',
            willChange: 'transform',
          }}
          animate={{
            x: ['0%', '110vw'],
            rotate: [45, 45],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: rocket.delay,
            ease: "linear",
          }}
        >
          🚀
        </motion.div>
      ))}

      {/* Satellites */}
      {satellites.map((sat, i) => (
        <motion.div
          key={`satellite-${i}`}
          className="absolute"
          style={{
            left: sat.x,
            top: sat.y,
            fontSize: '20px',
            filter: 'drop-shadow(0 0 6px rgba(255, 0, 0, 0.6))',
            willChange: 'transform',
          }}
          animate={{
            rotate: [0, 360],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
          }}
        >
          🛰️
        </motion.div>
      ))}

      {/* Cosmic Dust/Nebula */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: darkMode
            ? 'radial-gradient(ellipse 100% 60% at 50% 50%, rgba(255, 0, 0, 0.08), transparent 65%)'
            : 'radial-gradient(ellipse 100% 60% at 50% 50%, rgba(255, 0, 0, 0.05), transparent 65%)',
          willChange: 'transform, opacity',
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Glowing Rings */}
      <svg className="absolute inset-0 w-full h-full opacity-15">
        <defs>
          <radialGradient id="glowGradient">
            <stop offset="0%" stopColor="#FF0000" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FF0000" stopOpacity="0" />
          </radialGradient>
        </defs>
        {[...Array(4)].map((_, i) => (
          <motion.circle
            key={`ring-${i}`}
            cx="50%"
            cy="50%"
            r={150 + i * 80}
            fill="none"
            stroke="url(#glowGradient)"
            strokeWidth="1"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </svg>

      {/* Floating Asteroids */}
      {asteroids.map((asteroid) => (
        <motion.div
          key={`asteroid-${asteroid.id}`}
          className="absolute"
          style={{
            left: asteroid.left,
            top: asteroid.top,
            fontSize: '16px',
            opacity: 0.6,
            willChange: 'transform',
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.sin(asteroid.id) * 20, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: asteroid.duration,
            repeat: Infinity,
            delay: asteroid.delay,
          }}
        >
          ☄️
        </motion.div>
      ))}

      {/* Glowing Particles */}
      {glowParticles.map((particle) => (
        <motion.div
          key={`glow-${particle.id}`}
          className="absolute rounded-full"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            backgroundColor: darkMode ? 'rgba(255, 50, 50, 0.8)' : 'rgba(255, 0, 0, 0.5)',
            boxShadow: `0 0 ${8 + Math.random() * 8}px ${darkMode ? 'rgba(255, 50, 50, 0.8)' : 'rgba(255, 0, 0, 0.6)'}`,
            willChange: 'transform, opacity',
          }}
          animate={{
            y: [0, -particle.distance, 0],
            opacity: [0, 1, 0],
            scale: [0.5, 1.2, 0.5],
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

CosmicBackground.displayName = 'CosmicBackground'

export default CosmicBackground
