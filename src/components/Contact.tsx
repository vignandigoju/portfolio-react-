import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'  // 🔥 Added useEffect here
import emailjs from '@emailjs/browser'

interface ContactProps {
  darkMode?: boolean
}

const Contact = ({ darkMode = false }: ContactProps) => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'transmitting' | 'success' | 'error'>('idle')
  const [signalStrength, setSignalStrength] = useState(0)

  // 🔥 Initialize EmailJS on component mount
  useEffect(() => {
    // Replace with your actual public key or use env variable
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    if (publicKey) {
      emailjs.init(publicKey)
      console.log('✅ EmailJS initialized')
    } else {
      console.error('❌ EmailJS public key not found')
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitStatus('transmitting')
    setIsSubmitting(true)
    
    const interval = setInterval(() => {
      setSignalStrength(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 200)
    
    try {
      const now = new Date()
      const dateOptions: Intl.DateTimeFormatOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }
      const timeOptions: Intl.DateTimeFormatOptions = { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
      }

      // Send email via EmailJS
      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          sent_date: now.toLocaleDateString('en-US', dateOptions),
          sent_time: now.toLocaleTimeString('en-US', timeOptions),
          reply_to: formData.email,
        }
      )
      
      console.log('✅ Email sent successfully:', result.text)
      
      setTimeout(() => {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', message: '' })
        setSignalStrength(0)
      }, 2500)
    } catch (error: any) {
      console.error('❌ Email send failed:', error)
      setSubmitStatus('error')
      setSignalStrength(0)
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus('idle'), 5000)
    }
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-20 md:py-28 transition-colors duration-700 overflow-hidden"
      style={{ 
        backgroundColor: darkMode ? '#0A0A0A' : '#F8F8F8',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* SPACE BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Twinkling Stars */}
        {[...Array(150)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: 1 + Math.random() * 2,
              height: 1 + Math.random() * 2,
              backgroundColor: darkMode ? '#FFFFFF' : 'rgba(0, 0, 0, 0.3)',
              boxShadow: `0 0 ${3 + Math.random() * 3}px ${darkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.6)'}`,
            }}
            animate={{
              opacity: [0.1, 1, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Shooting Stars */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`shooting-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 50}%`,
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
              delay: i * 5,
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

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-block px-4 py-2 rounded-full mb-4"
            style={{
              backgroundColor: darkMode ? 'rgba(255, 0, 0, 0.1)' : 'rgba(255, 0, 0, 0.08)',
              border: `1px solid ${darkMode ? 'rgba(255, 0, 0, 0.3)' : 'rgba(255, 0, 0, 0.2)'}`,
            }}
          >
            <span className="text-sm font-bold" style={{ color: '#FF0000' }}>
              SATELLITE LINK
            </span>
          </motion.div>
          <h2
            className="text-5xl md:text-6xl font-black mb-4"
            style={{ color: darkMode ? '#FFFFFF' : '#000000' }}
          >
            Contact
          </h2>
          <div className="w-20 h-1 mx-auto rounded-full" style={{ backgroundColor: '#FF0000' }} />
        </motion.div>

        {/* SATELLITE COMMUNICATION GRID */}
        <div className="grid lg:grid-cols-5 gap-8 items-center">
          {/* CLIENT STATION */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
            transition={{ duration: 0.8 }}
          >
            <div
              className="relative rounded-3xl p-8"
              style={{
                backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.95)',
                border: `2px solid ${darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'}`,
                boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
              }}
            >
              {/* Radar Pulse Effect */}
              {submitStatus === 'transmitting' && (
                <motion.div
                  className="absolute -top-20 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full"
                  style={{
                    border: '2px solid #FF0000',
                  }}
                  animate={{
                    scale: [1, 2.5],
                    opacity: [0.8, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              )}

              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  className="text-3xl relative"
                  animate={{
                    rotate: submitStatus === 'transmitting' ? [0, 10, -10, 0] : 0,
                  }}
                  transition={{ duration: 1, repeat: submitStatus === 'transmitting' ? Infinity : 0 }}
                >
                  📡
                  {/* Transmission Rings */}
                  {submitStatus === 'transmitting' && (
                    <>
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute inset-0 rounded-full"
                          style={{
                            border: '2px solid #FF0000',
                          }}
                          animate={{
                            scale: [1, 2, 3],
                            opacity: [0.8, 0.4, 0],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.5,
                          }}
                        />
                      ))}
                    </>
                  )}
                </motion.div>
                <div>
                  <div className="text-xs font-bold uppercase" style={{ color: '#FF0000' }}>
                    CLIENT TERMINAL
                  </div>
                  <div className="text-sm font-semibold" style={{ color: darkMode ? '#999' : '#666' }}>
                    Transmitting Station
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase mb-2" style={{ color: darkMode ? '#999' : '#666' }}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl text-sm font-semibold outline-none transition-all"
                    style={{
                      backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                      border: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                      color: darkMode ? '#FFFFFF' : '#000000',
                    }}
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase mb-2" style={{ color: darkMode ? '#999' : '#666' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-xl text-sm font-semibold outline-none"
                    style={{
                      backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                      border: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                      color: darkMode ? '#FFFFFF' : '#000000',
                    }}
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase mb-2" style={{ color: darkMode ? '#999' : '#666' }}>
                    Message
                  </label>
                  <textarea
                    required
                    className="w-full px-4 py-3 rounded-xl text-sm font-semibold outline-none resize-none"
                    style={{
                      backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                      border: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                      color: darkMode ? '#FFFFFF' : '#000000',
                    }}
                    rows={4}
                    placeholder="Your message here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative w-full py-4 rounded-xl font-bold text-sm overflow-hidden"
                  style={{
                    backgroundColor: '#FF0000',
                    color: '#FFFFFF',
                    boxShadow: '0 4px 15px rgba(255, 0, 0, 0.3)',
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting && (
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                      }}
                      animate={{
                        x: ['-200%', '200%'],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  )}
                  <span className="relative z-10">
                    {isSubmitting ? '◉ TRANSMITTING...' : '▶ SEND MESSAGE'}
                  </span>
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* SATELLITE CENTER */}
          <motion.div
            className="lg:col-span-1 relative"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ delay: 0.3, type: "spring" }}
            style={{ height: '500px' }}
          >
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{
                  rotate: submitStatus === 'transmitting' ? 360 : 0,
                }}
                transition={{
                  duration: 3,
                  repeat: submitStatus === 'transmitting' ? Infinity : 0,
                  ease: "linear",
                }}
              >
                <motion.div
                  className="text-7xl"
                  style={{
                    filter: submitStatus === 'transmitting' 
                      ? 'drop-shadow(0 0 40px rgba(255, 0, 0, 1))' 
                      : 'drop-shadow(0 0 15px rgba(255, 0, 0, 0.5))',
                  }}
                  animate={{
                    scale: submitStatus === 'transmitting' ? [1, 1.15, 1] : 1,
                  }}
                  transition={{ duration: 0.8, repeat: submitStatus === 'transmitting' ? Infinity : 0 }}
                >
                  🛰️
                </motion.div>

                {submitStatus === 'transmitting' && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      boxShadow: '0 0 60px 20px rgba(255, 0, 0, 0.5)',
                    }}
                    animate={{
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}
              </motion.div>
            </div>

            <AnimatePresence>
              {submitStatus === 'transmitting' && (
                <>
                  <motion.div
                    className="absolute left-0 top-1/2 w-1/2 h-20 -translate-y-1/2"
                    style={{
                      background: 'linear-gradient(90deg, rgba(255, 0, 0, 0.3), rgba(255, 0, 0, 0))',
                      filter: 'blur(8px)',
                    }}
                    animate={{
                      opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />

                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={`packet-left-${i}`}
                      className="absolute top-1/2 -translate-y-1/2"
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: '#FF0000',
                        boxShadow: '0 0 15px rgba(255, 0, 0, 1), 0 0 30px rgba(255, 0, 0, 0.5)',
                        left: 0,
                      }}
                      animate={{
                        left: ['0%', '50%'],
                        opacity: [0, 1, 0.5, 0],
                        scale: [0.5, 1.2, 1, 0.8],
                      }}
                      transition={{
                        duration: 1.5,
                        delay: i * 0.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  ))}

                  {signalStrength > 50 && (
                    <>
                      <motion.div
                        className="absolute right-0 top-1/2 w-1/2 h-20 -translate-y-1/2"
                        style={{
                          background: 'linear-gradient(270deg, rgba(0, 255, 0, 0.3), rgba(0, 255, 0, 0))',
                          filter: 'blur(8px)',
                        }}
                        animate={{
                          opacity: [0.3, 0.8, 0.3],
                        }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />

                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={`packet-right-${i}`}
                          className="absolute top-1/2 -translate-y-1/2"
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            backgroundColor: '#00FF00',
                            boxShadow: '0 0 15px rgba(0, 255, 0, 1), 0 0 30px rgba(0, 255, 0, 0.5)',
                            left: '50%',
                          }}
                          animate={{
                            left: ['50%', '100%'],
                            opacity: [0, 1, 0.5, 0],
                            scale: [0.5, 1.2, 1, 0.8],
                          }}
                          transition={{
                            duration: 1.5,
                            delay: i * 0.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                      ))}
                    </>
                  )}
                </>
              )}
            </AnimatePresence>

            {submitStatus === 'transmitting' && (
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 bottom-0 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="text-xs font-black mb-2 flex items-center gap-2 justify-center" style={{ color: '#FF0000' }}>
                  <motion.span
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  >
                    ◉
                  </motion.span>
                  LINK: {signalStrength}%
                </div>
                <div className="w-40 h-2 rounded-full overflow-hidden" style={{ backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: 'linear-gradient(90deg, #FF0000, #00FF00)',
                    }}
                    animate={{ width: `${signalStrength}%` }}
                  />
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* DESTINATION STATION */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 100 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
            transition={{ duration: 0.8 }}
          >
            <div
              className="relative rounded-3xl p-8 overflow-hidden"
              style={{
                backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.95)',
                border: `2px solid ${submitStatus === 'success' ? '#00FF00' : darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'}`,
                boxShadow: submitStatus === 'success' ? '0 8px 30px rgba(0, 255, 0, 0.4)' : '0 8px 30px rgba(0,0,0,0.1)',
              }}
            >
              {submitStatus === 'success' && (
                <>
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={`particle-${i}`}
                      className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: '#00FF00',
                        boxShadow: '0 0 10px rgba(0, 255, 0, 1)',
                      }}
                      initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                      animate={{
                        opacity: [1, 0],
                        scale: [0, 1],
                        x: Math.cos((i / 20) * Math.PI * 2) * 100,
                        y: Math.sin((i / 20) * Math.PI * 2) * 100,
                      }}
                      transition={{ duration: 1 }}
                    />
                  ))}
                </>
              )}

              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  className="text-3xl relative"
                  animate={{
                    rotate: submitStatus === 'success' ? [0, 360] : 0,
                  }}
                  transition={{ duration: 1.5 }}
                >
                  📡
                  {signalStrength > 50 && (
                    <>
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute inset-0 rounded-full"
                          style={{
                            border: '2px solid #00FF00',
                          }}
                          animate={{
                            scale: [3, 2, 1],
                            opacity: [0, 0.4, 0.8],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.5,
                          }}
                        />
                      ))}
                    </>
                  )}
                </motion.div>
                <div>
                  <div className="text-xs font-bold uppercase" style={{ color: '#FF0000' }}>
                    RECEIVING TERMINAL
                  </div>
                  <div className="text-sm font-semibold" style={{ color: darkMode ? '#999' : '#666' }}>
                    My Inbox
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <AnimatePresence mode="wait">
                  {submitStatus === 'idle' && (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-12"
                    >
                      <motion.div
                        className="text-5xl mb-4"
                        animate={{
                          y: [0, -10, 0],
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        📭
                      </motion.div>
                      <p className="text-sm font-semibold" style={{ color: darkMode ? '#999' : '#666' }}>
                        Awaiting transmission signal...
                      </p>
                    </motion.div>
                  )}

                  {submitStatus === 'transmitting' && (
                    <motion.div
                      key="transmitting"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-12"
                    >
                      <motion.div
                        className="text-5xl mb-4"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        📡
                      </motion.div>
                      <p className="text-base font-black mb-2" style={{ color: '#FF0000' }}>
                        RECEIVING DATA
                      </p>
                      <motion.div
                        className="flex justify-center gap-2"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className="w-2 h-2 rounded-full"
                            style={{
                              backgroundColor: '#FF0000',
                              boxShadow: '0 0 8px rgba(255, 0, 0, 1)',
                            }}
                          />
                        ))}
                      </motion.div>
                    </motion.div>
                  )}

                  {submitStatus === 'success' && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-12"
                    >
                      <motion.div
                        className="text-5xl mb-4"
                        animate={{
                          scale: [1, 1.3, 1],
                          rotate: [0, 360],
                        }}
                        transition={{ duration: 1 }}
                      >
                        ✅
                      </motion.div>
                      <p className="text-xl font-black mb-2" style={{ color: '#00FF00' }}>
                        TRANSMISSION COMPLETE
                      </p>
                      <p className="text-sm font-semibold" style={{ color: darkMode ? '#999' : '#666' }}>
                        Message successfully received!<br/>I'll respond shortly.
                      </p>
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-12"
                    >
                      <motion.div
                        className="text-5xl mb-4"
                        animate={{ rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.5, repeat: 3 }}
                      >
                        ⚠️
                      </motion.div>
                      <p className="text-xl font-black mb-2" style={{ color: '#FF0000' }}>
                        LINK FAILURE
                      </p>
                      <p className="text-sm font-semibold" style={{ color: darkMode ? '#999' : '#666' }}>
                        Connection lost. Please retry transmission.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
