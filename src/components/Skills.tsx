import { motion, useInView, useTransform, useMotionValue, MotionValue } from 'framer-motion'
import { useRef, useEffect } from 'react'
import { skillsData } from '../data/skillsData'

interface SkillsProps {
  darkMode?: boolean
}

const Skills = ({ darkMode = false }: SkillsProps) => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  
  const outerRotation = useMotionValue(0)
  const innerRotation = useMotionValue(0)

  useEffect(() => {
    let animationId: number
    let lastTime = performance.now()
    
    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime
      lastTime = currentTime
      
      outerRotation.set((outerRotation.get() + (deltaTime * 0.015)) % 360)
      innerRotation.set((innerRotation.get() - (deltaTime * 0.025)) % 360)
      
      animationId = requestAnimationFrame(animate)
    }
    
    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [outerRotation, innerRotation])

  const midPoint = Math.ceil(skillsData.length / 2)
  const outerSkills = skillsData.slice(0, midPoint)
  const innerSkills = skillsData.slice(midPoint)

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-20 md:py-28 transition-colors duration-700 overflow-hidden"
      style={{ backgroundColor: darkMode ? '#0A0A0A' : '#F8F8F8' }}
    >
      {/* COSMIC BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Twinkling Stars Field */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: 1 + Math.random() * 2,
              height: 1 + Math.random() * 2,
              backgroundColor: darkMode ? '#FFFFFF' : 'rgba(255, 0, 0, 0.6)',
              boxShadow: `0 0 ${2 + Math.random() * 4}px ${darkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 0, 0, 0.8)'}`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 1 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}

        {/* Shooting Stars */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`shooting-${i}`}
            className="absolute"
            style={{
              left: `${-10 + Math.random() * 50}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, 800],
              y: [0, 400],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 4 + Math.random() * 3,
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
        {[
          { x: '15%', y: '20%', size: 60, delay: 0 },
          { x: '85%', y: '25%', size: 80, delay: 1 },
          { x: '10%', y: '75%', size: 70, delay: 2 },
          { x: '90%', y: '80%', size: 50, delay: 1.5 },
        ].map((planet, i) => (
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
        {[
          { start: '-10%', top: '30%', delay: 0 },
          { start: '-10%', top: '60%', delay: 5 },
        ].map((rocket, i) => (
          <motion.div
            key={`rocket-${i}`}
            className="absolute"
            style={{
              left: rocket.start,
              top: rocket.top,
              fontSize: '24px',
              filter: 'drop-shadow(0 0 8px rgba(255, 0, 0, 0.8))',
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
        {[
          { x: '20%', y: '15%' },
          { x: '75%', y: '70%' },
        ].map((sat, i) => (
          <motion.div
            key={`satellite-${i}`}
            className="absolute"
            style={{
              left: sat.x,
              top: sat.y,
              fontSize: '20px',
              filter: 'drop-shadow(0 0 6px rgba(255, 0, 0, 0.6))',
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
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`asteroid-${i}`}
            className="absolute"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              fontSize: '16px',
              opacity: 0.6,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.sin(i) * 20, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            ☄️
          </motion.div>
        ))}

        {/* Glowing Particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`glow-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${5 + Math.random() * 90}%`,
              top: `${10 + Math.random() * 80}%`,
              width: 3 + Math.random() * 3,
              height: 3 + Math.random() * 3,
              backgroundColor: darkMode ? 'rgba(255, 50, 50, 0.8)' : 'rgba(255, 0, 0, 0.5)',
              boxShadow: `0 0 ${8 + Math.random() * 8}px ${darkMode ? 'rgba(255, 50, 50, 0.8)' : 'rgba(255, 0, 0, 0.6)'}`,
            }}
            animate={{
              y: [0, -70 - Math.random() * 30, 0],
              opacity: [0, 1, 0],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-block px-4 py-2 rounded-full mb-4"
            style={{
              backgroundColor: darkMode ? 'rgba(255, 0, 0, 0.1)' : 'rgba(255, 0, 0, 0.08)',
              border: `1px solid ${darkMode ? 'rgba(255, 0, 0, 0.3)' : 'rgba(255, 0, 0, 0.2)'}`,
              boxShadow: '0 0 20px rgba(255, 0, 0, 0.2)',
            }}
          >
            <span className="text-sm font-bold" style={{ color: '#FF0000' }}>
              EXPERTISE
            </span>
          </motion.div>
          <h2
            className="text-5xl md:text-6xl font-black mb-4"
            style={{ 
              color: darkMode ? '#FFFFFF' : '#000000',
              textShadow: darkMode ? '0 0 30px rgba(255, 0, 0, 0.3)' : 'none',
            }}
          >
            Skills
          </h2>
          <div 
            className="w-20 h-1 mx-auto rounded-full" 
            style={{ 
              backgroundColor: '#FF0000',
              boxShadow: '0 0 10px rgba(255, 0, 0, 0.5)',
            }} 
          />
        </motion.div>

        {/* Dual Orbit System */}
        <div className="relative mx-auto" style={{ height: '600px' }}>
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
            <ellipse
              cx="50%"
              cy="50%"
              rx="450"
              ry="220"
              fill="none"
              stroke={darkMode ? 'rgba(255, 0, 0, 0.25)' : 'rgba(255, 0, 0, 0.2)'}
              strokeWidth="1"
              strokeDasharray="6,6"
              filter="url(#glow)"
            />
            <ellipse
              cx="50%"
              cy="50%"
              rx="320"
              ry="150"
              fill="none"
              stroke={darkMode ? 'rgba(255, 0, 0, 0.25)' : 'rgba(255, 0, 0, 0.2)'}
              strokeWidth="1"
              strokeDasharray="6,6"
              filter="url(#glow)"
            />
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
          </svg>

          {outerSkills.map((skill, index) => (
            <SkillOrbit
              key={`outer-${skill.name}`}
              skill={skill}
              index={index}
              total={outerSkills.length}
              rotation={outerRotation}
              radiusX={450}
              radiusY={220}
              darkMode={darkMode}
              isInView={isInView}
            />
          ))}

          {innerSkills.map((skill, index) => (
            <SkillOrbit
              key={`inner-${skill.name}`}
              skill={skill}
              index={index}
              total={innerSkills.length}
              rotation={innerRotation}
              radiusX={320}
              radiusY={150}
              darkMode={darkMode}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

interface SkillOrbitProps {
  skill: any; // Replace with your skill type
  index: number;
  total: number;
  rotation: MotionValue<number>; // Key fix here
  radiusX: number;
  radiusY: number;
  darkMode: boolean;
  isInView: boolean;
}

const SkillOrbit = ({ 
  skill, 
  index, 
  total, 
  rotation, 
  radiusX, 
  radiusY, 
  darkMode, 
  isInView 
}: SkillOrbitProps) => {
  const position = useTransform(rotation, (r : number) => {
    const angle = (index / total) * Math.PI * 2 + r * (Math.PI / 180)
    return {
      x: Math.cos(angle) * radiusX,
      y: Math.sin(angle) * radiusY,
      z: Math.sin(angle) * 80,
    }
  })

  const x = useTransform(position, (p: any) => p.x)
  const y = useTransform(position, (p: any) => p.y)
  const z = useTransform(position, (p: any) => p.z)
  
  const scale = useTransform(z, (val: number) => Math.max(0.75, (val + 120) / 200))
  const opacity = useTransform(z, (val: number) => val > -40 ? 1 : 0.5)

  return (
    <motion.div
      className="absolute will-change-transform"
      style={{
        left: '50%',
        top: '50%',
        x: useTransform(x, (val) => val - 45),
        y: useTransform(y, (val) => val - 45),
        scale: isInView ? scale : 0,
        opacity: isInView ? opacity : 0,
        zIndex: useTransform(z, (val) => Math.round(val + 200)),
      }}
    >
      <motion.div
        className="relative rounded-2xl flex flex-col items-center justify-center group"
        style={{
          width: 90,
          height: 90,
          backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.9)',
          border: `2px solid ${darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'}`,
          boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
          backdropFilter: 'blur(10px)',
        }}
        whileHover={{
          scale: 1.2,
          y: -10,
          borderColor: skill.color,
          backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.9)' : '#FFFFFF',
          boxShadow: `0 15px 40px ${skill.color}40, 0 0 30px ${skill.color}30`,
          transition: { duration: 0.2 },
        }}
      >
        <motion.div
          className="text-2xl font-black"
          style={{ 
            color: skill.color,
            filter: `drop-shadow(0 0 8px ${skill.color}40)`,
          }}
          whileHover={{ rotate: [0, 10, -10, 0], scale: 1.15 }}
          transition={{ duration: 0.4 }}
        >
          {skill.icon}
        </motion.div>
        
        <div
          className="text-xs font-bold text-center mt-1"
          style={{ color: darkMode ? '#E5E5E5' : '#2D2D2D', fontSize: '10px' }}
        >
          {skill.name.split(' ')[0].slice(0, 7)}
        </div>

        <motion.div
          className="absolute -top-11 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100"
          style={{
            backgroundColor: skill.color,
            color: '#FFFFFF',
            boxShadow: `0 8px 20px ${skill.color}60, 0 0 20px ${skill.color}40`,
          }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-xs font-bold">{skill.name}</div>
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45" style={{ backgroundColor: skill.color }} />
        </motion.div>

        <motion.div
          className="absolute -bottom-0.5 w-full h-0.5 rounded-full"
          style={{ 
            backgroundColor: skill.color,
            boxShadow: `0 0 8px ${skill.color}`,
          }}
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </motion.div>
  )
}

export default Skills
