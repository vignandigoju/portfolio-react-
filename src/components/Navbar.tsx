import { useState, useEffect, useMemo, useCallback, memo } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'

interface NavbarProps {
  darkMode: boolean
  toggleDarkMode: () => void
}

// ✅ OPTIMIZATION 1: Memoize icon components
const AboutIcon = memo(() => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="8" r="4"/>
    <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
  </svg>
))

const ProjectsIcon = memo(() => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <path d="M9 3v18M15 3v18M3 9h18M3 15h18"/>
  </svg>
))

const SkillsIcon = memo(() => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
    <polyline points="2 17 12 22 22 17"/>
    <polyline points="2 12 12 17 22 12"/>
  </svg>
))

const ExperienceIcon = memo(() => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="7" width="20" height="14" rx="2"/>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    <path d="M12 7h.01"/>
  </svg>
))

const ContactIcon = memo(() => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    <path d="M9 10h6M9 14h3"/>
  </svg>
))

// ✅ OPTIMIZATION 2: Move static data outside component
const NAV_ITEMS = [
  { name: 'About', icon: AboutIcon, gradient: 'from-red-600 to-red-800', number: '01' },
  { name: 'Projects', icon: ProjectsIcon, gradient: 'from-red-700 to-red-900', number: '02' },
  { name: 'Skills', icon: SkillsIcon, gradient: 'from-red-600 to-red-800', number: '03' },
  { name: 'Experience', icon: ExperienceIcon, gradient: 'from-red-700 to-red-900', number: '04' },
  { name: 'Contact', icon: ContactIcon, gradient: 'from-red-600 to-red-800', number: '05' }
] as const

const Navbar = ({ darkMode, toggleDarkMode }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState<boolean>(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  
  const { scrollY } = useScroll()
  const navbarOpacity = useTransform(scrollY, [0, 100], [0.9, 1])

  // ✅ OPTIMIZATION 3: Throttle scroll handler with RAF
  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // ✅ OPTIMIZATION 4: Memoize handlers
  const handleMenuToggle = useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])

  const handleMenuClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  return (
    <>
      {/* Glassmorphism Navbar */}
      <motion.nav 
        style={{ opacity: navbarOpacity }}
        className="fixed w-full z-50 transition-all duration-700"
      >
        {/* Animated top border */}
        <motion.div 
          className="absolute top-0 left-0 right-0 h-0.5"
          style={{
            background: darkMode 
              ? 'linear-gradient(90deg, transparent, #FF0000, transparent)'
              : 'linear-gradient(90deg, transparent, #FF0000, #3D0000, #FF0000, transparent)',
            willChange: 'background-position',
          }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        <div 
          className="relative transition-all duration-700"
          style={{
            backgroundColor: darkMode 
              ? scrolled ? 'rgba(0, 0, 0, 0.95)' : 'rgba(0, 0, 0, 0.8)'
              : scrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(20px)',
            boxShadow: scrolled 
              ? darkMode 
                ? '0 10px 40px rgba(255, 0, 0, 0.1)' 
                : '0 10px 40px rgba(0, 0, 0, 0.1)'
              : 'none',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              
              {/* ✨ REDESIGNED LOGO */}
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <motion.a
                href="#hero"
                className="relative flex items-center space-x-3 cursor-pointer group"
                onMouseEnter={() => setHoveredItem('logo')}
                onMouseLeave={() => setHoveredItem(null)}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {/* Code Icon */}
                <motion.div
                  className="relative"
                  animate={{
                    rotate: hoveredItem === 'logo' ? [0, -10, 10, 0] : 0,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="16 18 22 12 16 6" stroke="#FF0000"/>
                    <polyline points="8 6 2 12 8 18" stroke="#FF0000"/>
                    <line x1="12" y1="2" x2="12" y2="22" stroke="#FF0000" strokeOpacity="0.3"/>
                  </svg>
                </motion.div>

                {/* Text */}
                <div className="flex flex-col">
                  <motion.span
                    className="text-xl font-black tracking-tight"
                    style={{
                      color: darkMode ? '#FFFFFF' : '#000000',
                    }}
                  >
                    VD
                  </motion.span>
                  <motion.div
                    className="h-0.5 rounded-full"
                    style={{ backgroundColor: '#FF0000' }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: hoveredItem === 'logo' ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.a>
                
                {/* Underline effect */}
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                  style={{ backgroundColor: '#FF0000' }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: hoveredItem === 'logo' ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-1">
                {NAV_ITEMS.map((item, index) => {
                  const IconComponent = item.icon
                  return (
                    <motion.a
                      key={item.name}
                      href={`#${item.name.toLowerCase()}`}
                      className="relative px-5 py-2.5 rounded-full font-semibold overflow-hidden group"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onMouseEnter={() => setHoveredItem(item.name)}
                      onMouseLeave={() => setHoveredItem(null)}
                      style={{
                        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    >
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                          scale: hoveredItem === item.name ? 1 : 0,
                          opacity: hoveredItem === item.name ? 1 : 0,
                        }}
                        transition={{ duration: 0.4 }}
                        style={{
                          background: darkMode
                            ? 'linear-gradient(135deg, #FF0000 0%, #3D0000 100%)'
                            : 'linear-gradient(135deg, #FF0000 0%, #FF6B6B 100%)',
                        }}
                      />

                      <motion.span 
                        className="relative z-10 flex items-center space-x-2"
                        animate={{
                          color: hoveredItem === item.name 
                            ? '#FFFFFF'
                            : darkMode ? '#E5E5E5' : '#1F2937'
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        <motion.span
                          className="relative"
                          animate={{
                            scale: hoveredItem === item.name ? [1, 1.2, 1] : 1,
                            rotate: hoveredItem === item.name ? [0, 10, -10, 0] : 0,
                          }}
                          transition={{ duration: 0.5 }}
                        >
                          <IconComponent />
                        </motion.span>

                        <motion.span
                          animate={{
                            letterSpacing: hoveredItem === item.name ? '0.05em' : '0em',
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {item.name}
                        </motion.span>
                      </motion.span>

                      {hoveredItem === item.name && (
                        <>
                          {[...Array(6)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-1 h-1 rounded-full"
                              style={{ backgroundColor: '#FF0000' }}
                              initial={{ 
                                x: 0, 
                                y: 0, 
                                opacity: 1,
                                left: '50%',
                                top: '50%',
                              }}
                              animate={{
                                x: Math.cos((i * Math.PI * 2) / 6) * 30,
                                y: Math.sin((i * Math.PI * 2) / 6) * 30,
                                opacity: 0,
                              }}
                              transition={{ duration: 0.8, delay: i * 0.05 }}
                            />
                          ))}
                        </>
                      )}
                    </motion.a>
                  )
                })}
              </div>

              {/* Right Side Container */}
              <div className="flex items-center space-x-4">
                
                {/* ✨ REDESIGNED TOGGLE BUTTON */}
                <motion.button
                  onClick={toggleDarkMode}
                  className="relative w-16 h-8 rounded-full p-0.5 transition-all duration-500"
                  style={{
                    background: darkMode
                      ? 'linear-gradient(135deg, #1a0000 0%, #000000 100%)'
                      : 'linear-gradient(135deg, #fecaca 0%, #fee2e2 100%)',
                    border: `2px solid ${darkMode ? '#FF0000' : '#dc2626'}`,
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="w-6 h-6 rounded-full flex items-center justify-center relative z-10"
                    style={{
                      background: darkMode
                        ? 'linear-gradient(135deg, #FF0000 0%, #8B0000 100%)'
                        : 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
                      boxShadow: darkMode
                        ? '0 0 15px rgba(255, 0, 0, 0.6), 0 2px 8px rgba(0, 0, 0, 0.3)'
                        : '0 0 10px rgba(220, 38, 38, 0.4), 0 2px 8px rgba(0, 0, 0, 0.2)',
                    }}
                    animate={{
                      x: darkMode ? 28 : 0,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30
                    }}
                  >
                    <AnimatePresence mode="wait">
                      {darkMode ? (
                        <motion.svg
                          key="moon"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="#FFFFFF"
                          initial={{ rotate: -90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: 90, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                        </motion.svg>
                      ) : (
                        <motion.svg
                          key="sun"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#FFFFFF"
                          strokeWidth="2.5"
                          initial={{ rotate: 90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: -90, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <circle cx="12" cy="12" r="4"/>
                          <line x1="12" y1="1" x2="12" y2="3"/>
                          <line x1="12" y1="21" x2="12" y2="23"/>
                          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                          <line x1="1" y1="12" x2="3" y2="12"/>
                          <line x1="21" y1="12" x2="23" y2="12"/>
                          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                        </motion.svg>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Background glow */}
                  <motion.div
                    className="absolute inset-0 rounded-full blur-sm"
                    style={{
                      background: darkMode
                        ? 'radial-gradient(circle, rgba(255, 0, 0, 0.4) 0%, transparent 70%)'
                        : 'radial-gradient(circle, rgba(220, 38, 38, 0.3) 0%, transparent 70%)',
                    }}
                    animate={{
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                </motion.button>

                {/* ✨ REDESIGNED MOBILE MENU BUTTON */}
                <motion.button
                  onClick={handleMenuToggle}
                  className="md:hidden relative w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden"
                  style={{
                    background: darkMode
                      ? 'linear-gradient(135deg, #1a0000 0%, #000000 100%)'
                      : 'linear-gradient(135deg, #fecaca 0%, #fee2e2 100%)',
                    border: `2px solid ${darkMode ? '#FF0000' : '#dc2626'}`,
                    boxShadow: isOpen 
                      ? '0 0 20px rgba(255, 0, 0, 0.5)'
                      : '0 2px 10px rgba(0, 0, 0, 0.1)',
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-6 h-5 flex flex-col justify-around relative z-10">
                    <motion.span
                      className="w-full h-0.5 rounded-full origin-center"
                      style={{ backgroundColor: '#FF0000' }}
                      animate={{
                        rotate: isOpen ? 45 : 0,
                        y: isOpen ? 8 : 0,
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    />
                    <motion.span
                      className="w-full h-0.5 rounded-full"
                      style={{ backgroundColor: '#FF0000' }}
                      animate={{
                        opacity: isOpen ? 0 : 1,
                        scaleX: isOpen ? 0 : 1,
                      }}
                      transition={{ duration: 0.2 }}
                    />
                    <motion.span
                      className="w-full h-0.5 rounded-full origin-center"
                      style={{ backgroundColor: '#FF0000' }}
                      animate={{
                        rotate: isOpen ? -45 : 0,
                        y: isOpen ? -8 : 0,
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    />
                  </div>

                  {/* Pulse effect when open */}
                  {isOpen && (
                    <motion.div
                      className="absolute inset-0 rounded-xl"
                      style={{
                        background: 'radial-gradient(circle, rgba(255, 0, 0, 0.3) 0%, transparent 70%)',
                      }}
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                      }}
                    />
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          className="h-px w-full"
          style={{
            background: darkMode
              ? 'linear-gradient(90deg, transparent, rgba(255, 0, 0, 0.5), transparent)'
              : 'linear-gradient(90deg, transparent, rgba(255, 0, 0, 0.3), transparent)',
          }}
          animate={{
            opacity: scrolled ? 1 : 0,
          }}
          transition={{ duration: 0.5 }}
        />
      </motion.nav>

      {/* ✨ REDESIGNED MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 md:hidden"
              style={{
                background: darkMode 
                  ? 'rgba(0, 0, 0, 0.95)'
                  : 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(10px)',
              }}
              onClick={handleMenuClose}
            />

            {/* Mobile Menu Panel - Slide from Right */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-80 z-50 md:hidden"
              style={{
                background: darkMode
                  ? 'linear-gradient(135deg, #0a0a0a 0%, #1a0000 100%)'
                  : 'linear-gradient(135deg, #ffffff 0%, #fef2f2 100%)',
                boxShadow: '-10px 0 50px rgba(0, 0, 0, 0.5)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Red accent border */}
              <div 
                className="absolute left-0 top-0 bottom-0 w-1"
                style={{
                  background: 'linear-gradient(180deg, #FF0000 0%, #8B0000 100%)',
                }}
              />

              {/* Header */}
              <div className="p-6 border-b" style={{ borderColor: darkMode ? '#3D0000' : '#fee2e2' }}>
                <div className="flex items-center justify-between mb-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <h2 
                      className="text-2xl font-black"
                      style={{
                        background: 'linear-gradient(135deg, #FF0000 0%, #8B0000 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      Menu
                    </h2>
                    <p 
                      className="text-xs mt-1"
                      style={{ color: darkMode ? '#666' : '#999' }}
                    >
                      Navigate to section
                    </p>
                  </motion.div>

                  <motion.button
                    onClick={handleMenuClose}
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{
                      background: darkMode
                        ? 'linear-gradient(135deg, #1a0000 0%, #000000 100%)'
                        : 'linear-gradient(135deg, #fecaca 0%, #fee2e2 100%)',
                      border: `2px solid ${darkMode ? '#FF0000' : '#dc2626'}`,
                    }}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF0000" strokeWidth="2.5">
                      <line x1="18" y1="6" x2="6" y2="18"/>
                      <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </motion.button>
                </div>
              </div>

              {/* Navigation Items */}
              <div className="flex-1 overflow-y-auto p-6 space-y-2">
                {NAV_ITEMS.map((item, index) => {
                  const IconComponent = item.icon
                  return (
                    <motion.a
                      key={item.name}
                      href={`#${item.name.toLowerCase()}`}
                      className="block group"
                      onClick={handleMenuClose}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        delay: 0.1 + index * 0.05,
                        type: "spring",
                        stiffness: 200
                      }}
                      onMouseEnter={() => setActiveIndex(index)}
                      onMouseLeave={() => setActiveIndex(null)}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div
                        className="relative rounded-xl p-4 overflow-hidden transition-all duration-300"
                        style={{
                          background: activeIndex === index
                            ? darkMode
                              ? 'linear-gradient(135deg, #1a0000 0%, #000000 100%)'
                              : 'linear-gradient(135deg, #fecaca 0%, #fee2e2 100%)'
                            : 'transparent',
                          border: `2px solid ${
                            activeIndex === index 
                              ? '#FF0000' 
                              : 'transparent'
                          }`,
                        }}
                      >
                        <div className="flex items-center space-x-4">
                          {/* Number Badge */}
                          <motion.div
                            className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0"
                            style={{
                              background: activeIndex === index
                                ? 'linear-gradient(135deg, #FF0000 0%, #8B0000 100%)'
                                : darkMode 
                                  ? 'rgba(255, 0, 0, 0.1)' 
                                  : 'rgba(220, 38, 38, 0.1)',
                              color: activeIndex === index ? '#FFFFFF' : '#FF0000',
                            }}
                            animate={{
                              scale: activeIndex === index ? [1, 1.1, 1] : 1,
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            {item.number}
                          </motion.div>

                          {/* Content */}
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <motion.div
                                animate={{
                                  color: activeIndex === index ? '#FF0000' : darkMode ? '#E5E5E5' : '#1F2937',
                                }}
                                transition={{ duration: 0.2 }}
                              >
                                <IconComponent />
                              </motion.div>
                              <h3
                                className="text-lg font-bold"
                                style={{
                                  color: activeIndex === index 
                                    ? '#FF0000'
                                    : darkMode ? '#E5E5E5' : '#1F2937',
                                }}
                              >
                                {item.name}
                              </h3>
                            </div>
                            <p
                              className="text-xs"
                              style={{ 
                                color: darkMode ? '#666' : '#999',
                                opacity: activeIndex === index ? 1 : 0.7,
                              }}
                            >
                              Go to {item.name.toLowerCase()}
                            </p>
                          </div>

                          {/* Arrow */}
                          <motion.div
                            animate={{
                              x: activeIndex === index ? 5 : 0,
                              opacity: activeIndex === index ? 1 : 0.3,
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF0000" strokeWidth="2">
                              <line x1="5" y1="12" x2="19" y2="12"/>
                              <polyline points="12 5 19 12 12 19"/>
                            </svg>
                          </motion.div>
                        </div>

                        {/* Shine effect */}
                        {activeIndex === index && (
                          <motion.div
                            className="absolute inset-0 opacity-20 pointer-events-none"
                            style={{
                              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent)',
                            }}
                            animate={{
                              x: [-100, 300],
                            }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              repeatDelay: 1,
                            }}
                          />
                        )}
                      </div>
                    </motion.a>
                  )
                })}
              </div>

              {/* Footer */}
              <motion.div
                className="p-6 border-t"
                style={{ borderColor: darkMode ? '#3D0000' : '#fee2e2' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <p 
                  className="text-xs text-center mb-3"
                  style={{ color: darkMode ? '#666' : '#999' }}
                >
                  Connect with me
                </p>
                
                <div className="flex justify-center space-x-2">
                  {[
                    { name: 'GitHub', icon: 'GH', url: '#' },
                    { name: 'LinkedIn', icon: 'IN', url: '#' },
                    { name: 'Twitter', icon: 'X', url: '#' },
                    { name: 'Email', icon: '@', url: '#' }
                  ].map((social, i) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-black"
                      style={{
                        background: darkMode
                          ? 'linear-gradient(135deg, #1a0000 0%, #000000 100%)'
                          : 'linear-gradient(135deg, #fecaca 0%, #fee2e2 100%)',
                        border: `2px solid ${darkMode ? '#FF0000' : '#dc2626'}`,
                        color: '#FF0000',
                      }}
                      whileHover={{ 
                        scale: 1.15,
                        boxShadow: '0 5px 20px rgba(255, 0, 0, 0.4)',
                      }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.05 }}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
