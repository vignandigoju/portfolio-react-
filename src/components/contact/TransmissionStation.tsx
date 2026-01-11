import { memo } from 'react'
import { motion } from 'framer-motion'

interface TransmissionStationProps {
  darkMode: boolean
  formData: {
    name: string
    email: string
    message: string
  }
  isSubmitting: boolean
  submitStatus: 'idle' | 'transmitting' | 'success' | 'error'
  onFormChange: (field: string, value: string) => void
  onSubmit: (e: React.FormEvent) => void
}

// ✅ OPTIMIZATION 1: Memoized transmission station
const TransmissionStation = memo(({
  darkMode,
  formData,
  isSubmitting,
  submitStatus,
  onFormChange,
  onSubmit
}: TransmissionStationProps) => {
  return (
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

      <form onSubmit={onSubmit} className="space-y-4">
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
            onChange={(e) => onFormChange('name', e.target.value)}
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
            onChange={(e) => onFormChange('email', e.target.value)}
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
            onChange={(e) => onFormChange('message', e.target.value)}
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
  )
})

TransmissionStation.displayName = 'TransmissionStation'

export default TransmissionStation
