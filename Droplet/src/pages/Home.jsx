import { useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import { HeroSection } from '../components/HeroSection'
import { UploadCard } from '../components/UploadCard'
import { ResultCard } from '../components/ResultCard'
import { useUpload } from '../hooks/useUpload'

export function Home() {
  const uploadSectionRef = useRef(null)
  const { state, result, error, upload, reset } = useUpload()

  const scrollToUpload = () => {
    uploadSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const isUploading = state === 'uploading'
  const isSuccess = state === 'success'

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between px-6 py-5 max-w-5xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #6366f1)', color: 'white', boxShadow: '0 0 16px rgba(124, 58, 237, 0.4)' }}
          >
            Q
          </div>
          <span className="text-lg font-bold" style={{ color: '#f1f5f9', letterSpacing: '-0.02em' }}>
            QRly
          </span>
        </div>
        <div
          className="text-xs px-3 py-1 rounded-full"
          style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.25)', color: '#10b981' }}
        >
          No sign-up required
        </div>
      </header>

      <HeroSection onCtaClick={scrollToUpload} />

      <main className="flex-1 flex flex-col items-center px-4 pb-24 gap-8">
        <div ref={uploadSectionRef} className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            {isSuccess && result ? (
              <ResultCard key="result" result={result} onReset={reset} />
            ) : (
              <UploadCard
                key="upload"
                onFileSelect={upload}
                isUploading={isUploading}
                error={error}
                onClearError={reset}
              />
            )}
          </AnimatePresence>
        </div>

        {!isSuccess && (
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            {['⚡ Instant upload', '🔐 Private & secure', '⏱ 1-minute expiry', '📱 Mobile friendly', '🆓 Always free'].map((f) => (
              <span
                key={f}
                className="text-sm px-4 py-1.5 rounded-full"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: '#94a3b8' }}
              >
                {f}
              </span>
            ))}
          </div>
        )}
      </main>

      <footer className="py-6 text-center border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <p className="text-sm" style={{ color: '#475569' }}>
          Built with ❤️ · Files expire after 1 min· @navinkarthikeyan
        </p>
      </footer>
    </div>
  )
}
