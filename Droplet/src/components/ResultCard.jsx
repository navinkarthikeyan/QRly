import { useState } from 'react'
import { motion } from 'framer-motion'
import { QRCodeCanvas } from 'qrcode.react'
import { Copy, Download, RotateCcw, Check, FileText, HardDrive, Tag } from 'lucide-react'
import { toast } from 'sonner'
import { CountdownTimer } from './CountdownTimer'
import { copyToClipboard, formatFileSize, getFileTypeLabel } from '../utils/fileHelpers'
import { downloadQRAsPNG } from '../utils/qrHelpers'

const QR_CANVAS_ID = 'qrly-qr-canvas'

export function ResultCard({ result, onReset }) {
  const [copied, setCopied] = useState(false)
  const { signedUrl, fileInfo, expiresAt } = result

  const handleCopy = async () => {
    const ok = await copyToClipboard(signedUrl)
    if (ok) {
      setCopied(true)
      toast.success('Link copied to clipboard!')
      setTimeout(() => setCopied(false), 2500)
    } else {
      toast.error('Failed to copy. Please copy manually.')
    }
  }

  const handleDownloadQR = () => {
    const safeName = fileInfo.name.replace(/[^a-z0-9]/gi, '-').toLowerCase()
    const ok = downloadQRAsPNG(QR_CANVAS_ID, `qrly-${safeName}.png`)
    if (ok) {
      toast.success('QR code downloaded!')
    } else {
      toast.error('Failed to download QR. Please try again.')
    }
  }

  const fileTypeLabel = getFileTypeLabel({ name: fileInfo.name })

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="glass-card-glow p-8 pulse-glow">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-bold mb-1" style={{ color: '#f1f5f9' }}>
              Your QR Code is Ready
            </h2>
            <CountdownTimer expiresAt={expiresAt} />
          </div>
          <button onClick={onReset} className="btn-secondary flex items-center gap-2 text-sm py-2 px-3">
            <RotateCcw size={14} />
            New Upload
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-shrink-0 mx-auto md:mx-0">
            <div
              className="rounded-2xl p-5"
              style={{ background: '#ffffff', boxShadow: '0 0 0 1px rgba(139, 92, 246, 0.3), 0 20px 40px rgba(0,0,0,0.4)' }}
            >
              <QRCodeCanvas
                id={QR_CANVAS_ID}
                value={signedUrl}
                size={180}
                bgColor="#ffffff"
                fgColor="#0f0f1a"
                level="M"
                marginSize={1}
              />
            </div>
            <p className="text-center text-xs mt-3" style={{ color: '#64748b' }}>
              Scan to open &amp; download
            </p>
          </div>

          <div className="flex-1 w-full min-w-0">
            <div
              className="rounded-xl p-4 mb-5 space-y-3"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <MetaRow icon={<FileText size={14} style={{ color: '#8b5cf6' }} />} label="File name" value={fileInfo.name} truncate />
              <div className="h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
              <MetaRow icon={<Tag size={14} style={{ color: '#8b5cf6' }} />} label="File type" value={fileTypeLabel} />
              <div className="h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
              <MetaRow icon={<HardDrive size={14} style={{ color: '#8b5cf6' }} />} label="File size" value={formatFileSize(fileInfo.size)} />
            </div>

            <div
              className="rounded-xl p-3 mb-5 overflow-hidden"
              style={{ background: 'rgba(139, 92, 246, 0.07)', border: '1px solid rgba(139, 92, 246, 0.2)' }}
            >
              <span className="text-xs font-mono truncate block" style={{ color: '#94a3b8' }}>
                {signedUrl}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={handleCopy} className="btn-primary flex items-center justify-center gap-2 text-sm flex-1">
                {copied ? <><Check size={15} /> Copied!</> : <><Copy size={15} /> Copy Link</>}
              </button>
              <button onClick={handleDownloadQR} className="btn-secondary flex items-center justify-center gap-2 text-sm flex-1">
                <Download size={15} /> Download QR
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function MetaRow({ icon, label, value, truncate }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">{icon}</div>
      <span className="text-xs w-16 flex-shrink-0" style={{ color: '#64748b' }}>{label}</span>
      <span
        className={`text-sm font-medium flex-1 ${truncate ? 'truncate' : ''}`}
        style={{ color: '#e2e8f0' }}
        title={truncate ? value : undefined}
      >
        {value}
      </span>
    </div>
  )
}
