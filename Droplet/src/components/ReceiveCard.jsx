import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, AlertCircle, CheckCircle2, Loader2, ArrowDownToLine } from 'lucide-react'
import { useP2PReceive } from '../hooks/useP2PReceive'
import { formatFileSize } from '../utils/fileHelpers'

export function ReceiveCard({ peerId }) {
  const { state, progress, error, metadata, connect, cleanup } = useP2PReceive()
  const [downloadStarted, setDownloadStarted] = useState(false)

  useEffect(() => {
    if (peerId) {
      connect(peerId)
    }
    return () => cleanup()
  }, [peerId, connect, cleanup])

  const isConnecting = state === 'idle' || state === 'connecting'
  const isReceiving = state === 'receiving'
  const isSuccess = state === 'success'

  // If success, we show a button to manually download just in case auto-download failed or they want to save again
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="glass-card p-8">
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.25)' }}
          >
            <Download size={18} style={{ color: '#10b981' }} />
          </div>
          <div>
            <h2 className="text-lg font-semibold" style={{ color: '#f1f5f9' }}>
              Receive File
            </h2>
            <p className="text-sm" style={{ color: '#64748b' }}>
              Directly from the sender's device
            </p>
          </div>
        </div>

        <div
          className="drop-zone flex flex-col items-center justify-center"
          style={{ minHeight: '220px', padding: '2rem', cursor: 'default' }}
        >
          <AnimatePresence mode="wait">
            {isConnecting && (
              <motion.div
                key="connecting"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="spinner w-12 h-12" style={{ borderTopColor: '#10b981' }} />
                <p className="text-base font-medium" style={{ color: '#10b981' }}>
                  Connecting to sender...
                </p>
                <p className="text-sm" style={{ color: '#64748b' }}>
                  Establishing secure P2P connection
                </p>
              </motion.div>
            )}

            {isReceiving && (
              <motion.div
                key="receiving"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center gap-4 w-full"
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
                  <ArrowDownToLine size={28} style={{ color: '#a78bfa' }} className="animate-bounce" />
                </div>
                <div className="text-center mb-2">
                  <p className="text-base font-semibold mb-1" style={{ color: '#f1f5f9' }}>
                    Receiving: {metadata?.name}
                  </p>
                  <p className="text-sm" style={{ color: '#94a3b8' }}>
                    {formatFileSize(metadata?.size)}
                  </p>
                </div>

                <div className="w-full max-w-md bg-slate-800 rounded-full h-2.5 mb-1 overflow-hidden relative">
                  <motion.div
                    className="h-2.5 rounded-full"
                    style={{ background: 'linear-gradient(90deg, #8b5cf6, #10b981)' }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: "linear", duration: 0.2 }}
                  />
                </div>
                <p className="text-sm font-medium" style={{ color: '#10b981' }}>
                  {progress}% Completed
                </p>
              </motion.div>
            )}

            {isSuccess && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4 text-center"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'rgba(16, 185, 129, 0.15)' }}>
                  <CheckCircle2 size={32} style={{ color: '#10b981' }} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: '#f1f5f9' }}>
                    Transfer Complete!
                  </h3>
                  <p style={{ color: '#94a3b8' }}>
                    {metadata?.name} ({formatFileSize(metadata?.size)})
                  </p>
                </div>
                <p className="text-sm mt-2" style={{ color: '#64748b' }}>
                  Your download should have started automatically.
                </p>
              </motion.div>
            )}

            {error && (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4 text-center"
              >
                <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: 'rgba(239, 68, 68, 0.12)' }}>
                  <AlertCircle size={24} style={{ color: '#ef4444' }} />
                </div>
                <div className="text-center">
                  <p className="text-base font-medium mb-1" style={{ color: '#ef4444' }}>
                    Transfer Failed
                  </p>
                  <p className="text-sm max-w-sm" style={{ color: '#94a3b8' }}>{error}</p>
                </div>
                <button
                  onClick={() => connect(peerId)}
                  className="mt-4 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  style={{ background: 'rgba(255,255,255,0.05)', color: '#f1f5f9', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  Try Again
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}
