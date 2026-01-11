import { memo, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ReceivingStationProps {
  submitStatus: 'idle' | 'transmitting' | 'success' | 'error'
  signalStrength: number
  darkMode: boolean
}

// ✅ OPTIMIZATION 4: Memoized receiving station
const ReceivingStation = memo(({ submitStatus, signalStrength, darkMode }: ReceivingStationProps) => {
  // ✅ OPTIMIZATION 5: Memoize particle array
  const successParticles = useMemo(() => Array.from({ length: 20 }, (_, i) => i), [])

  return (
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
          {successParticles.map((i) => (
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
  )
})

ReceivingStation.displayName = 'ReceivingStation'

export default ReceivingStation
