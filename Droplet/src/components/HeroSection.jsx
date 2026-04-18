import { motion } from 'framer-motion'
import { Shield } from 'lucide-react'
import { config } from '../config'
import { FlipText } from './ui/flip-text'

export function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center px-4 pt-24 pb-16 min-h-[600px] overflow-hidden">

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-8"
        style={{
          background: 'rgba(139, 92, 246, 0.12)',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          color: '#a78bfa',
        }}
      >
        <Shield size={14} />
        Secure · No sign-up · {config.expiryText} links
      </motion.div>

      {/* Headline */}
      <h1
        className="relative z-10 text-5xl sm:text-6xl md:text-7xl font-extrabold leading-[1.08] tracking-tight mb-6 max-w-4xl"
      >
        <FlipText 
          className="gradient-text"
          duration={8.0}
          delay={0}
        >
          Turn any file
        </FlipText>
        <br />
        <FlipText 
          className="text-[#f1f5f9]"
          duration={8.0}
          delay={2.0}
        >
          into a secure QR
        </FlipText>
        <br />
        <FlipText 
          className="text-[#f1f5f9]"
          duration={8.0}
          delay={4.0}
        >
          download link.
        </FlipText>
      </h1>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-10 text-lg sm:text-xl max-w-xl mb-10 leading-relaxed"
        style={{ color: '#94a3b8' }}
      >
        Upload document. Get a scannable QR code instantly. Share it, and the link expires
        automatically after{' '}
        <span style={{ color: '#a78bfa', fontWeight: 600 }}>{config.expiryText}</span>. No account needed.
      </motion.p>

      {/* CTA removed */}
    </section>
  )
}
