import { useCallback, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, FileUp, AlertCircle, Loader2, FolderOpen } from 'lucide-react'
import { ALLOWED_TYPES_LABEL, MAX_FILE_SIZE } from '../utils/fileValidation'
import { formatFileSize } from '../utils/fileHelpers'

export function UploadCard({ onFileSelect, isUploading, error, onClearError }) {
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef(null)

  const handleFiles = useCallback((files) => {
    if (!files || files.length === 0) return
    onFileSelect(files[0])
  }, [onFileSelect])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setIsDragging(false)
    handleFiles(e.dataTransfer.files)
  }, [handleFiles])

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e) => {
    e.preventDefault()
    if (e.currentTarget.contains(e.relatedTarget)) return
    setIsDragging(false)
  }, [])

  const handleClick = () => {
    if (isUploading) return
    onClearError()
    inputRef.current?.click()
  }

  const dropZoneClass = [
    'drop-zone',
    isDragging ? 'drop-zone-active' : '',
    error ? 'drop-zone-error' : '',
  ].filter(Boolean).join(' ')

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="w-full max-w-2xl mx-auto"
      id="upload-section"
    >
      <div className="glass-card p-8">
        {/* Card header */}
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(139, 92, 246, 0.15)', border: '1px solid rgba(139, 92, 246, 0.25)' }}
          >
            <Upload size={18} style={{ color: '#a78bfa' }} />
          </div>
          <div>
            <h2 className="text-lg font-semibold" style={{ color: '#f1f5f9' }}>
              Upload Document
            </h2>
            <p className="text-sm" style={{ color: '#64748b' }}>
              One file at a time · Max {formatFileSize(MAX_FILE_SIZE)}
            </p>
          </div>
        </div>

        {/* Drop zone */}
        <div
          className={dropZoneClass}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={handleClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleClick()}
          style={{
            minHeight: '220px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            position: 'relative',
            outline: 'none',
          }}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.jpg,.jpeg,.png"
            style={{ display: 'none' }}
            onChange={(e) => handleFiles(e.target.files)}
          />

          <AnimatePresence mode="wait">
            {isUploading ? (
              <motion.div
                key="uploading"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="spinner w-12 h-12" />
                <p className="text-base font-medium" style={{ color: '#a78bfa' }}>
                  Uploading your file…
                </p>
                <p className="text-sm" style={{ color: '#64748b' }}>
                  Generating your secure link
                </p>
              </motion.div>
            ) : error ? (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center gap-4"
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(239, 68, 68, 0.12)' }}
                >
                  <AlertCircle size={24} style={{ color: '#ef4444' }} />
                </div>
                <div className="text-center">
                  <p className="text-base font-medium mb-1" style={{ color: '#ef4444' }}>
                    Upload Failed
                  </p>
                  <p className="text-sm" style={{ color: '#94a3b8' }}>{error}</p>
                  <p className="text-sm mt-3" style={{ color: '#64748b' }}>
                    Click or drag to try again
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center gap-4"
              >
                <motion.div
                  animate={isDragging ? { scale: 1.1 } : { scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{
                    background: isDragging ? 'rgba(139, 92, 246, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    border: `1px solid ${isDragging ? 'rgba(139, 92, 246, 0.5)' : 'rgba(255, 255, 255, 0.08)'}`,
                    transition: 'all 0.25s ease',
                  }}
                >
                  {isDragging
                    ? <FileUp size={28} style={{ color: '#a78bfa' }} />
                    : <FolderOpen size={28} style={{ color: '#64748b' }} />
                  }
                </motion.div>

                <div className="text-center">
                  <p className="text-base font-semibold mb-1" style={{ color: isDragging ? '#a78bfa' : '#f1f5f9' }}>
                    {isDragging ? 'Drop your file here' : 'Drag & drop your file'}
                  </p>
                  <p className="text-sm" style={{ color: '#64748b' }}>
                    or{' '}
                    <span style={{ color: '#a78bfa', textDecoration: 'underline', cursor: 'pointer' }}>
                      browse to upload
                    </span>
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Supported types */}
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1">
          <div className="flex items-center gap-1.5">
            <Loader2 size={12} style={{ color: '#475569' }} />
            <span className="text-xs" style={{ color: '#475569' }}>
              Supported: {ALLOWED_TYPES_LABEL}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
