import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { slideUpVariants } from '../utils/animations'
import { useEmailSubmit } from '../hooks/useEmailSubmit'
import SpaceBackground from './contact/SpaceBackground'
import TransmissionStation from './contact/TransmissionStation'
import SatelliteCenter from './contact/SatelliteCenter'
import ReceivingStation from './contact/ReceivingStation'

interface ContactProps {
  darkMode?: boolean
}

const Contact = ({ darkMode = false }: ContactProps) => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  
  const {
    formData,
    isSubmitting,
    submitStatus,
    signalStrength,
    handleFormChange,
    handleSubmit
  } = useEmailSubmit()

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
      {/* ✅ OPTIMIZATION 11: Memoized background */}
      <SpaceBackground darkMode={darkMode} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={slideUpVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
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
            <TransmissionStation
              darkMode={darkMode}
              formData={formData}
              isSubmitting={isSubmitting}
              submitStatus={submitStatus}
              onFormChange={handleFormChange}
              onSubmit={handleSubmit}
            />
          </motion.div>

          {/* SATELLITE CENTER */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <SatelliteCenter
              submitStatus={submitStatus}
              signalStrength={signalStrength}
              darkMode={darkMode}
            />
          </motion.div>

          {/* DESTINATION STATION */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 100 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
            transition={{ duration: 0.8 }}
          >
            <ReceivingStation
              submitStatus={submitStatus}
              signalStrength={signalStrength}
              darkMode={darkMode}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
