import { useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import { HeroSection } from '../components/HeroSection'
import { UploadCard } from '../components/UploadCard'
import { ResultCard } from '../components/ResultCard'
import { useP2PUpload } from '../hooks/useP2PUpload'
import { ReceiveCard } from '../components/ReceiveCard'
import { config } from '../config'
import { LiquidOcean } from '../components/ui/liquid-ocean'
import { LogoSlider } from '../components/ui/logo-slider'

export function Home() {
  const uploadSectionRef = useRef(null)
  const { state, result, error, upload, reset, progress } = useP2PUpload()

  const urlParams = new URLSearchParams(window.location.search)
  const peerId = urlParams.get('peer')
  const isReceiver = !!peerId

  const scrollToUpload = () => {
    uploadSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const isUploading = state === 'preparing'
  const isSuccess = state === 'waiting' || state === 'sending' || state === 'success'

  return (
    <div className="min-h-screen flex flex-col relative bg-transparent">
      {/* Full Page Animated Ocean Background */}
      <div className="fixed inset-0 z-0">
        <LiquidOcean
          backgroundColor={0x070b14}
          accentColor={0x7c3aed}
          showBoats={false}
          waveSpeed={0.05}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="flex items-center justify-between px-6 py-3 max-w-5xl mx-auto w-full">
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

      {isReceiver ? (
        <main className="flex-1 flex flex-col justify-center items-center px-4 pb-6 gap-6 w-full">
          <ReceiveCard peerId={peerId} />
        </main>
      ) : (
        <>
          <HeroSection onCtaClick={scrollToUpload} />

          <main className="flex-1 flex flex-col justify-center items-center px-4 pb-6 gap-6">
            <div ref={uploadSectionRef} className="w-full max-w-2xl">
              <AnimatePresence mode="wait">
                {isSuccess && result ? (
                  <ResultCard key="result" result={result} onReset={reset} state={state} progress={progress} />
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
          <div className="w-full max-w-5xl mt-4">
            <LogoSlider
              logos={[...Array(2)].flatMap(() =>
                ['⚡ Instant upload', '🔐 Private & secure', `⏱ ${config.expiryText} expiry`, '📱 Mobile friendly', '🆓 Always free'].map((f, i) => (
                  <span
                    key={`${f}-${i}`}
                    className="text-sm px-4 py-1.5 rounded-full whitespace-nowrap"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: '#94a3b8' }}
                  >
                    {f}
                  </span>
                ))
              )}
              speed={40}
              direction="left"
              pauseOnHover={true}
              blurLayers={8}
              blurIntensity={1}
            />
          </div>
        )}
          </main>
        </>
      )}

        <footer className="py-4 flex justify-center border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <div className="text-xs sm:text-sm px-4 py-2 rounded-full" style={{ backgroundColor: '#1e0a2d', border: '1px solid rgba(139, 92, 246, 0.2)', color: '#c4b5fd' }}>
            Built with ❤️ · Files expire after {config.expiryShortText} · @navinkarthikeyan
          </div>
        </footer>
      </div>
    </div>
  )
}
