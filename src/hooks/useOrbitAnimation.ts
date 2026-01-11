import { useEffect } from 'react'
import { useMotionValue } from 'framer-motion'

// ✅ OPTIMIZATION 5: Custom hook for optimized rotation
export const useOrbitAnimation = () => {
  const outerRotation = useMotionValue(0)
  const innerRotation = useMotionValue(0)

  useEffect(() => {
    let animationId: number
    let lastTime = performance.now()
    
    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime
      lastTime = currentTime
      
      // ✅ OPTIMIZATION 6: Batch motion value updates
      outerRotation.set((outerRotation.get() + (deltaTime * 0.015)) % 360)
      innerRotation.set((innerRotation.get() - (deltaTime * 0.025)) % 360)
      
      animationId = requestAnimationFrame(animate)
    }
    
    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [outerRotation, innerRotation])

  return { outerRotation, innerRotation }
}
