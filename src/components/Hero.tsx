import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useState, useEffect } from 'react'

interface HeroProps {
  darkMode?: boolean
}

// Tech Stack Icons
const TechIcon = ({ name, darkMode }: { name: string; darkMode: boolean }) => {
  const icons: { [key: string]: React.JSX.Element } = {

    React: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="1.5"/>
        <ellipse cx="12" cy="12" rx="3" ry="11" transform="rotate(60 12 12)"/>
        <ellipse cx="12" cy="12" rx="3" ry="11" transform="rotate(-60 12 12)"/>
        <ellipse cx="12" cy="12" rx="11" ry="3"/>
      </svg>
    ),
    TypeScript: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <rect width="22" height="22" x="1" y="1" rx="3"/>
        <path d="M15.5 16.5h-2v-5h2v5zm-3-6.5v-1h-5v1h2v5h1v-5h2z" fill={darkMode ? "#000" : "#fff"}/>
      </svg>
    ),
    Python: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 3h6a6 6 0 0 1 0 12H9a6 6 0 0 1 0-12z"/>
        <path d="M9 9h6m-6 6h6"/>
        <circle cx="9" cy="6" r="1" fill="currentColor"/>
        <circle cx="15" cy="18" r="1" fill="currentColor"/>
      </svg>
    ),
    FastAPI: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 3l8 8-8 8M11 21l-8-8 8-8"/>
        <path d="M6 12h12"/>
      </svg>
    ),
    MySQL: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="4" y="4" width="16" height="16" rx="2"/>
        <path d="M8 10h8M8 14h5"/>
        <circle cx="17" cy="17" r="1" fill="currentColor"/>
      </svg>
    ),
    MongoDB: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 3c-1.5 0-4 4-4 9s2.5 9 4 9 4-4 4-9-2.5-9-4-9z"/>
        <path d="M12 3v18"/>
      </svg>
    ),
    LangChain: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="8" cy="8" r="3"/>
        <circle cx="16" cy="16" r="3"/>
        <path d="M10 10l4 4M8 11v6a2 2 0 0 0 2 2h6"/>
      </svg>
    ),
    OpenAI: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
    Docker: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="4" y="8" width="3" height="3"/>
        <rect x="8" y="8" width="3" height="3"/>
        <rect x="12" y="8" width="3" height="3"/>
        <rect x="8" y="12" width="3" height="3"/>
        <path d="M4 8V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2"/>
      </svg>
    ),
    Git: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="2"/>
        <circle cx="6" cy="18" r="2"/>
        <circle cx="18" cy="6" r="2"/>
        <line x1="12" y1="14" x2="6" y2="16"/>
        <line x1="12" y1="10" x2="18" y2="8"/>
      </svg>
    ),
  }
  return icons[name] || null
}

const Hero = ({ darkMode = false }: HeroProps) => {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null)
  const [orbitTime, setOrbitTime] = useState(0)

  // Mouse tracking for 3D tilt
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-400, 400], [8, -8]), {
    stiffness: 80,
    damping: 25
  })
  const rotateY = useSpring(useTransform(mouseX, [-400, 400], [-8, 8]), {
    stiffness: 80,
    damping: 25
  })

  // Continuous orbit animation - optimized
  useEffect(() => {
    let animationFrameId: number

    const animate = () => {
      setOrbitTime(prev => prev + 0.016)
      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrameId)
  }, [])

  // Typing animation
  const roles = ['Software Developer', 'AI Engineer', 'Full Stack Developer']
  const [currentRole, setCurrentRole] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentText = roles[currentRole]
      
      if (!isDeleting) {
        if (displayText !== currentText) {
          setDisplayText(currentText.slice(0, displayText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        if (displayText === '') {
          setIsDeleting(false)
          setCurrentRole((prev) => (prev + 1) % roles.length)
        } else {
          setDisplayText(currentText.slice(0, displayText.length - 1))
        }
      }
    }, isDeleting ? 50 : 100)

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentRole])

  // Tech stack configuration
  const techStack = [
    { name: 'Python', radius: 115, speed: 0.5, offset: 0 },
    { name: 'React', radius: 115, speed: 0.5, offset: Math.PI / 2 },
    { name: 'TypeScript', radius: 115, speed: 0.5, offset: Math.PI },
    { name: 'FastAPI', radius: 115, speed: 0.5, offset: (3 * Math.PI) / 2 },
    
    { name: 'LangChain', radius: 175, speed: 0.4, offset: Math.PI / 4 },
    { name: 'OpenAI', radius: 175, speed: 0.4, offset: (3 * Math.PI) / 4 },
    { name: 'MongoDB', radius: 175, speed: 0.4, offset: (5 * Math.PI) / 4 },
    { name: 'MySQL', radius: 175, speed: 0.4, offset: (7 * Math.PI) / 4 },
    
    { name: 'Docker', radius: 235, speed: 0.3, offset: 0 },
    { name: 'Git', radius: 235, speed: 0.3, offset: Math.PI },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const 
      }
    }
  }

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-700"
      style={{
        backgroundColor: darkMode ? '#000000' : '#FFFFFF',
        paddingTop: '5rem',
        paddingBottom: '3rem',
      }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        mouseX.set(x * 0.5)
        mouseY.set(y * 0.5)
      }}
    >
      {/* CLEAN MINIMAL BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: darkMode
              ? 'radial-gradient(circle at 30% 40%, rgba(255, 0, 0, 0.03) 0%, transparent 50%)'
              : 'radial-gradient(circle at 30% 40%, rgba(255, 0, 0, 0.02) 0%, transparent 50%)',
          }}
        />

        {/* Minimal grid - very subtle */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: darkMode
              ? 'linear-gradient(rgba(255, 0, 0, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 0, 0, 0.03) 1px, transparent 1px)'
              : 'linear-gradient(rgba(0, 0, 0, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.02) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* LEFT SIDE - Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6 lg:space-y-8"
          >
            <motion.div variants={itemVariants} className="space-y-3">
              <p 
                className="text-lg md:text-xl font-medium tracking-wide transition-colors duration-500"
                style={{ color: darkMode ? '#999' : '#666' }}
              >
                Hi, I'm
              </p>
              
              <h1 
                className="font-black leading-none tracking-tight"
                style={{ 
                  fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                  letterSpacing: '-0.02em',
                }}
              >
                <span
                  className="inline-block transition-colors duration-500"
                  style={{ color: darkMode ? '#FFFFFF' : '#000000' }}
                >
                  Vignan
                </span>
                <br />
                <span style={{ color: '#FF0000' }}>Digoju</span>
              </h1>

              <div 
                className="flex items-center font-semibold tracking-wide min-h-[2.5rem]"
                style={{ 
                  fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
                  color: darkMode ? '#B8B8B8' : '#4A4A4A',
                }}
              >
                <span style={{ color: '#FF0000' }} className="mr-3 text-xl">→</span>
                <span>{displayText}</span>
                <motion.span
                  className="inline-block w-0.5 ml-1"
                  style={{ 
                    backgroundColor: '#FF0000',
                    height: '1.2em',
                  }}
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              </div>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg leading-relaxed transition-colors duration-500 max-w-xl"
              style={{ 
                color: darkMode ? '#A0A0A0' : '#5A5A5A',
                lineHeight: '1.75',
              }}
            >
              Software Developer with <span className="font-semibold" style={{ color: '#FF0000' }}></span> hands-on experience building{' '}
              <span className="font-semibold" style={{ color: darkMode ? '#E5E5E5' : '#2D2D2D' }}>
                AI-powered solutions
              </span>. Specialized in{' '}
              <span className="font-semibold" style={{ color: darkMode ? '#E5E5E5' : '#2D2D2D' }}>
                LLM integration, GenAI applications, and full-stack development
              </span>{' '}
              with Python, React, and FastAPI.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-4 md:gap-6"
            >
              {[
                { number: '11+', label: 'Months Exp' },
                { number: '10+', label: 'Projects' },
                { number: '15+', label: 'Tech Stack' },
              ].map((stat, i) => (
                <motion.div 
                  key={i} 
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div 
                    className="text-2xl md:text-3xl font-black mb-1"
                    style={{ color: '#FF0000' }}
                  >
                    {stat.number}
                  </div>
                  <div 
                    className="text-xs md:text-sm font-medium transition-colors duration-500"
                    style={{ color: darkMode ? '#666' : '#888' }}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-3 md:gap-4"
            >
              <motion.button
                className="px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-sm md:text-base tracking-wide transition-all duration-300"
                style={{
                  backgroundColor: '#FF0000',
                  color: '#FFFFFF',
                  boxShadow: '0 10px 30px rgba(255, 0, 0, 0.3)',
                }}
                whileHover={{ 
                  scale: 1.02,
                  backgroundColor: '#CC0000',
                  boxShadow: '0 15px 40px rgba(255, 0, 0, 0.5)',
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center space-x-2">
                  <span>View Projects</span>
                  <motion.svg 
                    width="18" 
                    height="18" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </motion.svg>
                </span>
              </motion.button>

              
            </motion.div>

            
          </motion.div>

          {/* RIGHT SIDE - OPTIMIZED 3D ORBITAL SYSTEM */}
          <motion.div
            id="hero-3d"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 1, 
              delay: 0.5,
            }}
            className="relative flex items-center justify-center"
            style={{ 
              perspective: 1600,
              minHeight: '600px',
            }}
          >
            <motion.div
              className="relative w-full max-w-lg aspect-square"
              style={{
                transformStyle: 'preserve-3d',
                rotateX,
                rotateY,
              }}
            >
              {/* Orbital Rings */}
              {[
                { radius: 115, duration: 20 },
                { radius: 175, duration: 30 },
                { radius: 235, duration: 40 },
              ].map((ring, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full pointer-events-none transition-colors duration-700"
                  style={{
                    width: ring.radius * 2,
                    height: ring.radius * 2,
                    left: '50%',
                    top: '50%',
                    marginLeft: -ring.radius,
                    marginTop: -ring.radius,
                    border: `2px solid ${darkMode 
                      ? `rgba(255, 0, 0, ${0.35 - i * 0.06})` 
                      : `rgba(255, 0, 0, ${0.25 - i * 0.04})`}`,
                    boxShadow: darkMode
                      ? `0 0 30px rgba(255, 0, 0, ${0.2 - i * 0.04})`
                      : `0 0 20px rgba(255, 0, 0, ${0.15 - i * 0.03})`,
                  }}
                  animate={{
                    rotate: i % 2 === 0 ? [0, 360] : [360, 0],
                  }}
                  transition={{
                    duration: ring.duration,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              ))}

              {/* Central Core */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                  className="relative w-40 h-40 md:w-44 md:h-44 rounded-full flex items-center justify-center transition-all duration-700"
                  style={{
                    background: darkMode 
                      ? 'radial-gradient(circle, rgba(255, 0, 0, 0.25) 0%, rgba(255, 0, 0, 0.08) 50%, rgba(255, 0, 0, 0.01) 100%)'
                      : 'radial-gradient(circle, rgba(255, 0, 0, 0.15) 0%, rgba(255, 0, 0, 0.05) 50%, rgba(255, 0, 0, 0.01) 100%)',
                    border: `3px solid ${darkMode ? 'rgba(255, 0, 0, 0.5)' : 'rgba(255, 0, 0, 0.35)'}`,
                    boxShadow: darkMode
                      ? '0 0 60px rgba(255, 0, 0, 0.4)'
                      : '0 0 40px rgba(255, 0, 0, 0.25)',
                  }}
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {/* Rotating inner rings */}
                  {[12, 18].map((inset, idx) => (
                    <motion.div
                      key={idx}
                      className="absolute rounded-full border-2 transition-colors duration-700"
                      style={{
                        inset: inset,
                        borderColor: darkMode ? 'rgba(255, 0, 0, 0.4)' : 'rgba(255, 0, 0, 0.3)' ,
                      }}
                      animate={{
                        rotate: idx % 2 === 0 ? [0, -360] : [0, 360],
                      }}
                      transition={{
                        duration: 10 - idx * 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  ))}

                  <motion.span 
                    className="text-6xl md:text-7xl font-black transition-colors duration-700 relative z-10"
                    style={{ 
                      color: '#FF0000',
                      textShadow: darkMode ? '0 0 30px rgba(255, 0, 0, 0.6)' : '0 0 20px rgba(255, 0, 0, 0.4)',
                    }}
                    animate={{
                      scale: [1, 1.06, 1],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {'</>'}
                  </motion.span>
                </motion.div>
              </div>

              {/* Orbiting Tech Icons - Optimized */}
              {techStack.map((tech, i) => {
                const angle = orbitTime * tech.speed + tech.offset
                const x = Math.cos(angle) * tech.radius
                const y = Math.sin(angle) * tech.radius

                return (
                  <div
                    key={tech.name}
                    className="absolute pointer-events-auto"
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                      width: 64,
                      height: 64,
                    }}
                  >
                    <motion.div
                      className="relative w-full h-full rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-300"
                      style={{
                        backgroundColor: hoveredTech === tech.name
                          ? '#FF0000'
                          : darkMode 
                            ? 'rgba(0, 0, 0, 0.9)' 
                            : 'rgba(255, 255, 255, 0.95)',
                        border: `3px solid ${
                          hoveredTech === tech.name 
                            ? '#FF0000' 
                            : darkMode 
                              ? 'rgba(255, 0, 0, 0.4)' 
                              : 'rgba(255, 0, 0, 0.3)'
                        }`,
                        color: hoveredTech === tech.name ? '#FFFFFF' : '#FF0000',
                        backdropFilter: 'blur(12px)',
                        boxShadow: hoveredTech === tech.name
                          ? '0 12px 50px rgba(255, 0, 0, 0.6)'
                          : darkMode
                            ? '0 6px 30px rgba(0, 0, 0, 0.6)'
                            : '0 6px 30px rgba(0, 0, 0, 0.2)',
                      }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: 0.7 + i * 0.04,
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                      }}
                      onMouseEnter={() => setHoveredTech(tech.name)}
                      onMouseLeave={() => setHoveredTech(null)}
                      whileHover={{
                        scale: 1.4,
                        zIndex: 100,
                      }}
                    >
                      <div className="w-8 h-8">
                        <TechIcon name={tech.name} darkMode={darkMode} />
                      </div>

                      {/* Tooltip */}
                      {hoveredTech === tech.name && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute -top-14 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg text-sm font-bold whitespace-nowrap pointer-events-none"
                          style={{
                            backgroundColor: darkMode ? '#000000' : '#FFFFFF',
                            color: '#FF0000',
                            border: '2px solid #FF0000',
                            boxShadow: '0 8px 25px rgba(255, 0, 0, 0.4)',
                            zIndex: 10000,
                          }}
                        >
                          {tech.name}
                        </motion.div>
                      )}

                      {/* Glow on hover */}
                      {hoveredTech === tech.name && (
                        <motion.div
                          className="absolute inset-0 rounded-2xl pointer-events-none"
                          style={{
                            background: 'radial-gradient(circle, rgba(255, 0, 0, 0.8) 0%, transparent 70%)',
                            filter: 'blur(20px)',
                          }}
                          animate={{
                            scale: [1, 1.8, 1],
                            opacity: [0.5, 0.8, 0.5],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                          }}
                        />
                      )}
                    </motion.div>
                  </div>
                )
              })}

              {/* Subtle energy waves */}
              {[...Array(2)].map((_, i) => (
                <motion.div
                  key={`wave-${i}`}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    left: '50%',
                    top: '50%',
                    width: 100,
                    height: 100,
                    marginLeft: -50,
                    marginTop: -50,
                    border: `1px solid ${darkMode ? 'rgba(255, 0, 0, 0.2)' : 'rgba(255, 0, 0, 0.15)'}`,
                  }}
                  animate={{
                    scale: [1, 4.5],
                    opacity: [0.4, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 2,
                    ease: "easeOut",
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            className="flex flex-col items-center space-y-2 cursor-pointer"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            whileHover={{ scale: 1.1 }}
          >
            <span 
              className="text-xs font-semibold tracking-widest uppercase transition-colors duration-500"
              style={{ color: darkMode ? '#666' : '#999' }}
            >
              Scroll
            </span>
            <div
              className="w-5 h-9 border-2 rounded-full flex justify-center pt-2 transition-colors duration-500"
              style={{ borderColor: darkMode ? 'rgba(255, 0, 0, 0.35)' : 'rgba(255, 0, 0, 0.25)' }}
            >
              <motion.div
                className="w-1 h-2 rounded-full"
                style={{ backgroundColor: '#FF0000' }}
                animate={{ 
                  y: [0, 10, 0],
                  opacity: [1, 0.3, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
