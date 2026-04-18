import { motion } from 'framer-motion'
import { Shield, ArrowDown } from 'lucide-react'

export function HeroSection({ onCtaClick }) {
  return (
    <section className="relative flex flex-col items-center justify-center text-center px-4 pt-24 pb-16 overflow-hidden">
      {/* Glow orbs */}
      <div
        className="glow-orb glow-orb-primary"
        style={{ top: '-120px', left: '50%', transform: 'translateX(-50%)' }}
      />
      <div className="glow-orb glow-orb-secondary" style={{ top: '60px', left: '20%' }} />
      <div className="glow-orb glow-orb-secondary" style={{ top: '80px', right: '20%' }} />

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
        Secure · No sign-up · 1-hour links
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative z-10 text-5xl sm:text-6xl md:text-7xl font-extrabold leading-[1.08] tracking-tight mb-6 max-w-4xl"
      >
        <span className="gradient-text">Turn any file</span>
        <br />
        <span style={{ color: '#f1f5f9' }}>into a secure QR</span>
        <br />
        <span style={{ color: '#f1f5f9' }}>download link.</span>
      </motion.h1>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-10 text-lg sm:text-xl max-w-xl mb-10 leading-relaxed"
        style={{ color: '#94a3b8' }}
      >
        Upload any document. Get a scannable QR code instantly. Share it, and the link expires
        automatically after{' '}
        <span style={{ color: '#a78bfa', fontWeight: 600 }}>1 minute</span>. No account needed.
      </motion.p>

      {/* CTA */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        onClick={onCtaClick}
        className="relative z-10 btn-primary flex items-center gap-2 text-base"
      >
        <span>Get Started — It&apos;s Free</span>
        <ArrowDown size={16} />
      </motion.button>

      {/* Decorative grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)',
        }}
      />
    </section>
  )
}
