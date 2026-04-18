import { useState, useCallback, useRef, useEffect } from 'react'
import { validateFile } from '../utils/fileValidation'
import Peer from 'peerjs'

const CHUNK_SIZE = 1024 * 1024 // 1MB chunks

export function useP2PUpload() {
  const [state, setState] = useState('idle') // idle | preparing | waiting | sending | success | error
  const [error, setError] = useState(null)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState(null) // { url: 'https...', name, size }
  
  const peerRef = useRef(null)
  const connRef = useRef(null)
  const fileRef = useRef(null)

  const cleanup = useCallback(() => {
    if (connRef.current) {
      connRef.current.close()
      connRef.current = null
    }
    if (peerRef.current) {
      peerRef.current.destroy()
      peerRef.current = null
    }
  }, [])

  useEffect(() => {
    return cleanup
  }, [cleanup])

  const upload = useCallback(async (file) => {
    cleanup() // clear any existing connections

    const validation = validateFile(file)
    if (!validation.valid) {
      setError(validation.error ?? 'Invalid file.')
      setState('error')
      return
    }

    fileRef.current = file
    setState('preparing')
    setError(null)
    setProgress(0)

    try {
      const peer = new Peer()
      peerRef.current = peer

      peer.on('open', (id) => {
        const downloadUrl = `${window.location.origin}/?peer=${id}`
        setResult({
          url: downloadUrl,
          name: file.name,
          size: file.size,
          id
        })
        setState('waiting')
      })

      peer.on('connection', (conn) => {
        // A receiver connected
        connRef.current = conn

        conn.on('open', () => {
          setState('sending')
          // Send metadata first
          conn.send({
            type: 'metadata',
            name: file.name,
            size: file.size,
            fileType: file.type
          })
        })

        conn.on('data', async (data) => {
          if (data.type === 'request_chunk') {
            const { offset } = data
            if (offset >= file.size) {
              // done
              conn.send({ type: 'done' })
              setState('success')
              setProgress(100)
              return
            }

            // Send chunk
            const chunk = file.slice(offset, offset + CHUNK_SIZE)
            const arrayBuffer = await chunk.arrayBuffer()
            
            conn.send({
              type: 'chunk',
              offset,
              data: arrayBuffer
            })

            // Update progress
            const newProgress = Math.min(100, Math.round(((offset + CHUNK_SIZE) / file.size) * 100))
            setProgress(newProgress)
          }
        })

        conn.on('close', () => {
          // If connection drops before success
          if (progress < 100) {
            setError('Receiver disconnected.')
            setState('error')
          }
        })
        
        conn.on('error', (err) => {
          setError('Connection error: ' + err.message)
          setState('error')
        })
      })

      peer.on('error', (err) => {
        setError('PeerJS error: ' + err.message)
        setState('error')
      })

    } catch (err) {
      setError(err.message ?? 'An error occurred during preparation.')
      setState('error')
    }
  }, [cleanup, progress])

  const reset = useCallback(() => {
    cleanup()
    setState('idle')
    setError(null)
    setResult(null)
    setProgress(0)
    fileRef.current = null
  }, [cleanup])

  return {
    state,
    progress,
    result,
    error,
    upload,
    reset,
  }
}
