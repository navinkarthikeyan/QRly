import { useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { validateFile } from '../utils/fileValidation'
import { generateUniqueFileName } from '../utils/fileHelpers'
import { config } from '../config'

const BUCKET = 'documents'

export function useUpload() {
  const [state, setState] = useState('idle') // 'idle' | 'uploading' | 'success' | 'error'
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const upload = useCallback(async (file) => {
    const validation = validateFile(file)
    if (!validation.valid) {
      setError(validation.error ?? 'Invalid file.')
      setState('error')
      return
    }

    setState('uploading')
    setError(null)
    setResult(null)

    try {
      const uniqueName = generateUniqueFileName(file)

      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(uniqueName, file, {
          cacheControl: '3600',
          upsert: false,
          contentType: file.type,
        })

      if (uploadError) throw new Error(uploadError.message)

      const { data: signedData, error: signedError } = await supabase.storage
        .from(BUCKET)
        .createSignedUrl(uniqueName, config.expirySeconds)

      if (signedError || !signedData?.signedUrl) {
        throw new Error(signedError?.message ?? 'Failed to generate signed URL.')
      }

      setResult({
        signedUrl: signedData.signedUrl,
        fileInfo: {
          name: file.name,
          type: file.type,
          size: file.size,
          path: uniqueName,
        },
        expiresAt: Date.now() + config.expirySeconds * 1000,
      })

      setState('success')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed. Please try again.')
      setState('error')
    }
  }, [])

  const reset = useCallback(() => {
    setState('idle')
    setResult(null)
    setError(null)
  }, [])

  return { state, result, error, upload, reset }
}
