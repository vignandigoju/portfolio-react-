import { useState, useCallback, useEffect } from 'react'
import emailjs from '@emailjs/browser'

export const useEmailSubmit = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'transmitting' | 'success' | 'error'>('idle')
  const [signalStrength, setSignalStrength] = useState(0)

  // ✅ OPTIMIZATION 8: Initialize EmailJS once
  useEffect(() => {
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    if (publicKey) {
      emailjs.init(publicKey)
      console.log('✅ EmailJS initialized')
    } else {
      console.error('❌ EmailJS public key not found')
    }
  }, [])

  // ✅ OPTIMIZATION 9: Memoize form change handler
  const handleFormChange = useCallback((field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }, [])

  // ✅ OPTIMIZATION 10: Memoize submit handler
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
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
  }, [formData])

  return {
    formData,
    isSubmitting,
    submitStatus,
    signalStrength,
    handleFormChange,
    handleSubmit
  }
}
