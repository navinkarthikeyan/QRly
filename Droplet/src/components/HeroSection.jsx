import { motion } from 'framer-motion'
import { Shield } from 'lucide-react'
import { config } from '../config'

export function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center px-4 pt-6 pb-2 overflow-hidden">

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-4"
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
        className="relative z-10 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.08] tracking-tight mb-4 max-w-4xl"
      >
        <span className="gradient-text">
          Turn any file
        </span>
        <br />
        <span className="text-[#f1f5f9]">
          into a secure QR
        </span>
        <br />
        <span className="text-[#f1f5f9]">
          download link.
        </span>
      </h1>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-10 text-base sm:text-lg max-w-xl mb-4 leading-relaxed"
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
