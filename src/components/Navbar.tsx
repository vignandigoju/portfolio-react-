import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'

interface NavbarProps {
  darkMode: boolean
  toggleDarkMode: () => void
}

// Custom Icon Components
const AboutIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="8" r="4"/>
    <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
  </svg>
)

const ProjectsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <path d="M9 3v18M15 3v18M3 9h18M3 15h18"/>
  </svg>
)

const SkillsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
    <polyline points="2 17 12 22 22 17"/>
    <polyline points="2 12 12 17 22 12"/>
  </svg>
)

const ExperienceIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="7" width="20" height="14" rx="2"/>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    <path d="M12 7h.01"/>
  </svg>
)

const ContactIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    <path d="M9 10h6M9 14h3"/>
  </svg>
)

const Navbar = ({ darkMode, toggleDarkMode }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState<boolean>(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  
  const { scrollY } = useScroll()
  const navbarOpacity = useTransform(scrollY, [0, 100], [0.9, 1])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
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

  const navItems = [
    { name: 'About', icon: AboutIcon, gradient: 'from-red-600 to-red-800', number: '01' },
    { name: 'Projects', icon: ProjectsIcon, gradient: 'from-red-700 to-red-900', number: '02' },
    { name: 'Skills', icon: SkillsIcon, gradient: 'from-red-600 to-red-800', number: '03' },
    { name: 'Experience', icon: ExperienceIcon, gradient: 'from-red-700 to-red-900', number: '04' },
    { name: 'Contact', icon: ContactIcon, gradient: 'from-red-600 to-red-800', number: '05' }
  ]

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
              
              {/* Logo */}
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <motion.div
                  className="text-3xl font-black cursor-pointer relative flex items-center space-x-2"
                  onMouseEnter={() => setHoveredItem('logo')}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                 

                  <motion.span
                    style={{
                      background: 'linear-gradient(135deg, #FF0000 0%, #8B0000 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      filter: hoveredItem === 'logo' ? 'drop-shadow(0 0 10px #FF0000)' : 'none',
                      transition: 'filter 0.3s ease',
                    }}
                  >
                    Vignan Digoju
                  </motion.span>

                  
                </motion.div>
                
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5"
                  style={{ backgroundColor: '#FF0000' }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: hoveredItem === 'logo' ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-1">
                {navItems.map((item, index) => {
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
                
                {/* Premium Toggle Switch */}
                <motion.button
                  onClick={toggleDarkMode}
                  className="relative w-20 h-10 rounded-full p-1 transition-all duration-500"
                  style={{
                    background: darkMode
                      ? 'linear-gradient(135deg, #3D0000 0%, #1a0000 100%)'
                      : 'linear-gradient(135deg, #e5e5e5 0%, #d4d4d4 100%)',
                    boxShadow: darkMode
                      ? '0 4px 15px rgba(255, 0, 0, 0.3), inset 0 2px 5px rgba(0, 0, 0, 0.5)'
                      : '0 4px 15px rgba(0, 0, 0, 0.1), inset 0 2px 5px rgba(0, 0, 0, 0.1)',
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="relative w-8 h-8 rounded-full flex items-center justify-center"
                    style={{
                      background: darkMode
                        ? 'linear-gradient(135deg, #FF0000 0%, #8B0000 100%)'
                        : 'linear-gradient(135deg, #FFFFFF 0%, #F5F5F5 100%)',
                      boxShadow: darkMode
                        ? '0 0 20px rgba(255, 0, 0, 0.6)'
                        : '0 2px 10px rgba(0, 0, 0, 0.2)',
                    }}
                    animate={{
                      x: darkMode ? 40 : 0,
                      rotate: darkMode ? 180 : 0,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 700,
                      damping: 30
                    }}
                  >
                    {!darkMode && (
                      <motion.svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#FF0000"
                        strokeWidth="2"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                      >
                        <circle cx="12" cy="12" r="5"/>
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

                    {darkMode && (
                      <motion.svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        initial={{ scale: 0, rotate: 180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: -180 }}
                      >
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                      </motion.svg>
                    )}
                  </motion.div>

                  <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{
                      boxShadow: darkMode
                        ? ['0 0 10px rgba(255, 0, 0, 0.3)', '0 0 20px rgba(255, 0, 0, 0.5)', '0 0 10px rgba(255, 0, 0, 0.3)']
                        : ['0 0 10px rgba(0, 0, 0, 0.1)', '0 0 15px rgba(0, 0, 0, 0.15)', '0 0 10px rgba(0, 0, 0, 0.1)']
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                </motion.button>

                {/* Enhanced Mobile Menu Button */}
                <motion.button
                  onClick={() => setIsOpen(!isOpen)}
                  className="md:hidden relative w-14 h-14 rounded-2xl flex items-center justify-center overflow-hidden"
                  style={{
                    background: darkMode
                      ? 'linear-gradient(135deg, #3D0000 0%, #1a0000 100%)'
                      : 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
                    boxShadow: isOpen 
                      ? '0 0 30px rgba(255, 0, 0, 0.5)'
                      : '0 4px 15px rgba(0, 0, 0, 0.1)',
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    rotate: isOpen ? 180 : 0,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Animated background pulse */}
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background: 'radial-gradient(circle, rgba(255, 0, 0, 0.3) 0%, transparent 70%)',
                    }}
                    animate={{
                      scale: isOpen ? [1, 1.5, 1] : 1,
                      opacity: isOpen ? [0.5, 0, 0.5] : 0,
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: isOpen ? Infinity : 0,
                    }}
                  />

                  <div className="w-7 h-6 flex flex-col justify-around relative z-10">
                    <motion.span
                      className="w-full h-0.5 rounded-full"
                      style={{ backgroundColor: '#FF0000' }}
                      animate={{
                        rotate: isOpen ? 45 : 0,
                        y: isOpen ? 11 : 0,
                        scaleX: isOpen ? 1 : 1,
                      }}
                      transition={{ duration: 0.3 }}
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
                      className="w-full h-0.5 rounded-full"
                      style={{ backgroundColor: '#FF0000' }}
                      animate={{
                        rotate: isOpen ? -45 : 0,
                        y: isOpen ? -11 : 0,
                        scaleX: isOpen ? 1 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
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

      {/* PREMIUM MOBILE MENU - COMPLETELY REDESIGNED */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Enhanced Backdrop with Radial Gradient */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 z-40 md:hidden"
              style={{
                background: darkMode 
                  ? 'radial-gradient(circle at top right, rgba(61, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.95) 100%)'
                  : 'radial-gradient(circle at top right, rgba(254, 226, 226, 0.8) 0%, rgba(0, 0, 0, 0.6) 100%)',
                backdropFilter: 'blur(20px)',
              }}
              onClick={() => setIsOpen(false)}
            >
              {/* Animated particles in background */}
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full"
                  style={{
                    backgroundColor: darkMode ? 'rgba(255, 0, 0, 0.3)' : 'rgba(255, 0, 0, 0.2)',
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    opacity: [0.2, 0.8, 0.2],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </motion.div>

            {/* Premium Full-Screen Menu */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-0 z-50 md:hidden flex items-center justify-center p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full max-w-md">
                
                {/* Glowing border effect */}
                <motion.div
                  className="absolute -inset-1 rounded-3xl blur-xl"
                  style={{
                    background: 'linear-gradient(135deg, #FF0000 0%, #3D0000 100%)',
                    opacity: 0.3,
                  }}
                  animate={{
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />

                {/* Main menu container */}
                <motion.div
                  className="relative rounded-3xl overflow-hidden"
                  style={{
                    background: darkMode
                      ? 'linear-gradient(135deg, rgba(0, 0, 0, 0.98) 0%, rgba(26, 0, 0, 0.98) 100%)'
                      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(245, 245, 245, 0.98) 100%)',
                    backdropFilter: 'blur(40px)',
                    boxShadow: darkMode
                      ? '0 25px 80px rgba(255, 0, 0, 0.3)'
                      : '0 25px 80px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  {/* Top decorative wave */}
                  <div className="absolute top-0 left-0 right-0 h-2"
                    style={{
                      background: 'linear-gradient(90deg, #FF0000 0%, #3D0000 50%, #FF0000 100%)',
                    }}
                  />

                  {/* Header Section */}
                  <div className="relative p-8 pb-6">
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-center"
                    >
                      <h2 className="text-3xl font-black mb-2"
                        style={{
                          background: 'linear-gradient(135deg, #FF0000 0%, #8B0000 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}
                      >
                        Navigation
                      </h2>
                      <p className="text-sm"
                        style={{ color: darkMode ? '#888' : '#666' }}
                      >
                        Choose your destination
                      </p>
                    </motion.div>

                    {/* Close button */}
                    <motion.button
                      onClick={() => setIsOpen(false)}
                      className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center"
                      style={{
                        background: darkMode
                          ? 'linear-gradient(135deg, #3D0000 0%, #1a0000 100%)'
                          : 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
                      }}
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF0000" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    </motion.button>
                  </div>

                  {/* Navigation Items - Premium Cards */}
                  <div className="px-6 pb-6 space-y-3 max-h-[60vh] overflow-y-auto">
                    {navItems.map((item, index) => {
                      const IconComponent = item.icon
                      return (
                        <motion.a
                          key={item.name}
                          href={`#${item.name.toLowerCase()}`}
                          className="relative block group"
                          onClick={() => setIsOpen(false)}
                          initial={{ opacity: 0, x: -50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ 
                            delay: 0.3 + index * 0.1,
                            type: "spring",
                            stiffness: 100
                          }}
                          onMouseEnter={() => setActiveIndex(index)}
                          onMouseLeave={() => setActiveIndex(null)}
                          whileTap={{ scale: 0.98 }}
                        >
                          <motion.div
                            className="relative rounded-2xl p-5 overflow-hidden"
                            style={{
                              background: darkMode
                                ? activeIndex === index
                                  ? 'linear-gradient(135deg, #3D0000 0%, #1a0000 100%)'
                                  : 'rgba(61, 0, 0, 0.2)'
                                : activeIndex === index
                                  ? 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)'
                                  : 'rgba(254, 226, 226, 0.3)',
                              border: `2px solid ${activeIndex === index ? '#FF0000' : 'transparent'}`,
                              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                              boxShadow: activeIndex === index
                                ? '0 10px 40px rgba(255, 0, 0, 0.3)'
                                : '0 4px 15px rgba(0, 0, 0, 0.1)',
                            }}
                          >
                            {/* Number badge */}
                            <motion.div
                              className="absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center text-xs font-black"
                              style={{
                                background: activeIndex === index
                                  ? 'linear-gradient(135deg, #FF0000 0%, #8B0000 100%)'
                                  : darkMode ? 'rgba(255, 0, 0, 0.2)' : 'rgba(255, 0, 0, 0.15)',
                                color: activeIndex === index ? '#FFFFFF' : '#FF0000',
                              }}
                              animate={{
                                scale: activeIndex === index ? [1, 1.1, 1] : 1,
                                rotate: activeIndex === index ? [0, 10, -10, 0] : 0,
                              }}
                              transition={{ duration: 0.5 }}
                            >
                              {item.number}
                            </motion.div>

                            {/* Icon and content */}
                            <div className="flex items-center space-x-4">
                              {/* Icon container */}
                              <motion.div
                                className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                                style={{
                                  background: activeIndex === index
                                    ? 'linear-gradient(135deg, #FF0000 0%, #8B0000 100%)'
                                    : darkMode ? 'rgba(255, 0, 0, 0.2)' : 'rgba(255, 0, 0, 0.15)',
                                  color: activeIndex === index ? '#FFFFFF' : '#FF0000',
                                }}
                                animate={{
                                  scale: activeIndex === index ? 1.1 : 1,
                                  rotate: activeIndex === index ? [0, 5, -5, 0] : 0,
                                }}
                                transition={{ duration: 0.5 }}
                              >
                                <IconComponent />
                              </motion.div>

                              {/* Text content */}
                              <div className="flex-1">
                                <motion.h3
                                  className="text-xl font-bold mb-1"
                                  animate={{
                                    color: activeIndex === index 
                                      ? '#FF0000'
                                      : darkMode ? '#E5E5E5' : '#1F2937',
                                  }}
                                  transition={{ duration: 0.3 }}
                                >
                                  {item.name}
                                </motion.h3>
                                <motion.p
                                  className="text-sm"
                                  style={{ 
                                    color: darkMode ? '#888' : '#666',
                                    opacity: activeIndex === index ? 1 : 0.7,
                                  }}
                                  transition={{ duration: 0.3 }}
                                >
                                  View {item.name.toLowerCase()} section
                                </motion.p>
                              </div>

                              {/* Arrow indicator */}
                              <motion.div
                                animate={{
                                  x: activeIndex === index ? 5 : 0,
                                  opacity: activeIndex === index ? 1 : 0.3,
                                }}
                                transition={{ duration: 0.3 }}
                              >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF0000" strokeWidth="2">
                                  <line x1="5" y1="12" x2="19" y2="12"/>
                                  <polyline points="12 5 19 12 12 19"/>
                                </svg>
                              </motion.div>
                            </div>

                            {/* Animated shine effect */}
                            {activeIndex === index && (
                              <motion.div
                                className="absolute inset-0 opacity-20"
                                style={{
                                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent)',
                                }}
                                animate={{
                                  x: [-100, 300],
                                }}
                                transition={{
                                  duration: 1.5,
                                  repeat: Infinity,
                                  repeatDelay: 1,
                                }}
                              />
                            )}
                          </motion.div>
                        </motion.a>
                      )
                    })}
                  </div>

                  {/* Footer Section - Social & Info */}
                  <motion.div
                    className="border-t p-6"
                    style={{
                      borderColor: darkMode ? '#3D0000' : '#fee2e2',
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    <p className="text-xs text-center mb-4"
                      style={{ color: darkMode ? '#666' : '#888' }}
                    >
                      Let's connect and create something amazing
                    </p>
                    
                    <div className="flex justify-center space-x-3">
                      {[
                        { name: 'GitHub', icon: 'GH', url: '#' },
                        { name: 'LinkedIn', icon: 'IN', url: '#' },
                        { name: 'Twitter', icon: 'TW', url: '#' },
                        { name: 'Email', icon: '@', url: '#' }
                      ].map((social, i) => (
                        <motion.a
                          key={social.name}
                          href={social.url}
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-black"
                          style={{
                            background: darkMode
                              ? 'linear-gradient(135deg, #3D0000 0%, #1a0000 100%)'
                              : 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
                            color: '#FF0000',
                          }}
                          whileHover={{ 
                            scale: 1.15,
                            rotate: [0, -10, 10, 0],
                            boxShadow: '0 10px 30px rgba(255, 0, 0, 0.4)',
                          }}
                          whileTap={{ scale: 0.9 }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1 + i * 0.1 }}
                        >
                          {social.icon}
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
