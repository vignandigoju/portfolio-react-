import { memo } from 'react'
import { motion, useTransform, MotionValue } from 'framer-motion'

interface SkillOrbitProps {
  skill: {
    name: string
    icon: string
    color: string
  }
  index: number
  total: number
  rotation: MotionValue<number>
  radiusX: number
  radiusY: number
  darkMode: boolean
  isInView: boolean
}

const SkillOrbit = memo(({ 
  skill, 
  index, 
  total, 
  rotation, 
  radiusX, 
  radiusY, 
  darkMode, 
  isInView 
}: SkillOrbitProps) => {
  const position = useTransform(rotation, (r: number) => {
    const angle = (index / total) * Math.PI * 2 + r * (Math.PI / 180)
    const cosAngle = Math.cos(angle)
    const sinAngle = Math.sin(angle)
    return {
      x: cosAngle * radiusX,
      y: sinAngle * radiusY,
      z: sinAngle * 60,
    }
  })

  const x = useTransform(position, (p: any) => p.x)
  const y = useTransform(position, (p: any) => p.y)
  const z = useTransform(position, (p: any) => p.z)
  
  const scale = useTransform(z, (val: number) => Math.max(0.7, (val + 100) / 160))
  const opacity = useTransform(z, (val: number) => val > -30 ? 1 : 0.5)

  return (
    <motion.div
      className="absolute will-change-transform"
      style={{
        left: '50%',
        top: '50%',
        x: useTransform(x, (val) => val - 35),
        y: useTransform(y, (val) => val - 35),
        scale: isInView ? scale : 0,
        opacity: isInView ? opacity : 0,
        zIndex: useTransform(z, (val) => Math.round(val + 200)),
      }}
    >
      <motion.div
        className="relative rounded-xl flex flex-col items-center justify-center group"
        style={{
          width: 70,
          height: 70,
          backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.9)',
          border: `2px solid ${darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'}`,
          boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
          backdropFilter: 'blur(10px)',
          willChange: 'transform',
        }}
        whileHover={{
          scale: 1.15,
          y: -8,
          borderColor: skill.color,
          backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.9)' : '#FFFFFF',
          boxShadow: `0 12px 30px ${skill.color}40, 0 0 25px ${skill.color}30`,
          transition: { duration: 0.2 },
        }}
      >
        <motion.div
          className="text-xl font-black"
          style={{ 
            color: skill.color,
            filter: `drop-shadow(0 0 6px ${skill.color}40)`,
          }}
          whileHover={{ rotate: [0, 10, -10, 0], scale: 1.1 }}
          transition={{ duration: 0.4 }}
        >
          {skill.icon}
        </motion.div>
        
        <div
          className="text-xs font-bold text-center mt-1"
          style={{ color: darkMode ? '#E5E5E5' : '#2D2D2D', fontSize: '9px' }}
        >
          {skill.name.split(' ')[0].slice(0, 6)}
        </div>

        <motion.div
          className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100"
          style={{
            backgroundColor: skill.color,
            color: '#FFFFFF',
            boxShadow: `0 6px 16px ${skill.color}60, 0 0 16px ${skill.color}40`,
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
            boxShadow: `0 0 6px ${skill.color}`,
          }}
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </motion.div>
  )
})

SkillOrbit.displayName = 'SkillOrbit'

export default SkillOrbit
