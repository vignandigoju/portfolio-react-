import { memo, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface SatelliteCenterProps {
  submitStatus: 'idle' | 'transmitting' | 'success' | 'error'
  signalStrength: number
  darkMode: boolean
}

// ✅ OPTIMIZATION 2: Memoized satellite center
const SatelliteCenter = memo(({ submitStatus, signalStrength, darkMode }: SatelliteCenterProps) => {
  // ✅ OPTIMIZATION 3: Memoize packet arrays
  const leftPackets = useMemo(() => Array.from({ length: 8 }, (_, i) => i), [])
  const rightPackets = useMemo(() => Array.from({ length: 8 }, (_, i) => i), [])

  return (
    <div className="relative" style={{ height: '500px' }}>
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
            {/* Left Beam */}
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

            {/* Left Packets */}
            {leftPackets.map((i) => (
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
                  willChange: 'transform, opacity',
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
                {/* Right Beam */}
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

                {/* Right Packets */}
                {rightPackets.map((i) => (
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
                      willChange: 'transform, opacity',
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
    </div>
  )
})

SatelliteCenter.displayName = 'SatelliteCenter'

export default SatelliteCenter
