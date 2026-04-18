import { useState, useCallback, useRef, useEffect } from 'react'
import Peer from 'peerjs'

export function useP2PReceive() {
  const [state, setState] = useState('idle') // idle | connecting | receiving | success | error
  const [error, setError] = useState(null)
  const [progress, setProgress] = useState(0)
  const [metadata, setMetadata] = useState(null)
  
  const peerRef = useRef(null)
  const connRef = useRef(null)
  const chunksRef = useRef([])
  const receivedSizeRef = useRef(0)

  const cleanup = useCallback(() => {
    if (connRef.current) {
      connRef.current.close()
      connRef.current = null
    }
    if (peerRef.current) {
      peerRef.current.destroy()
      peerRef.current = null
    }
    chunksRef.current = []
    receivedSizeRef.current = 0
  }, [])

  useEffect(() => {
    return cleanup
  }, [cleanup])

  const connect = useCallback((targetPeerId) => {
    cleanup()
    setState('connecting')
    setError(null)
    setProgress(0)
    setMetadata(null)

    try {
      const peer = new Peer()
      peerRef.current = peer

      peer.on('open', () => {
        // We have our own peer id, now connect to target
        const conn = peer.connect(targetPeerId, { reliable: true })
        connRef.current = conn

        conn.on('open', () => {
          // Connected to sender
          setState('connecting') // Still waiting for metadata
        })

        conn.on('data', (data) => {
          if (data.type === 'metadata') {
            setMetadata({
              name: data.name,
              size: data.size,
              fileType: data.fileType
            })
            setState('receiving')
            // Request first chunk
            conn.send({ type: 'request_chunk', offset: 0 })
          } 
          else if (data.type === 'chunk') {
            const { data: chunkData } = data
            chunksRef.current.push(chunkData)
            receivedSizeRef.current += chunkData.byteLength
            
            const currentMetadata = metadata || { size: 1 } // avoid divide by zero
            // update progress
            const newProgress = Math.min(100, Math.round((receivedSizeRef.current / currentMetadata.size) * 100))
            setProgress(newProgress)

            // Request next chunk
            conn.send({ type: 'request_chunk', offset: receivedSizeRef.current })
          }
          else if (data.type === 'done') {
            setState('success')
            setProgress(100)
            
            // Reconstruct file and trigger download
            const blob = new Blob(chunksRef.current, { type: metadata?.fileType || 'application/octet-stream' })
            const url = URL.createObjectURL(blob)
            
            const a = document.createElement('a')
            a.href = url
            a.download = metadata?.name || 'downloaded_file'
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            URL.revokeObjectURL(url)
          }
        })

        conn.on('close', () => {
          if (state !== 'success' && receivedSizeRef.current < (metadata?.size || Infinity)) {
            setError('Sender disconnected.')
            setState('error')
          }
        })
        
        conn.on('error', (err) => {
          setError('Connection error: ' + err.message)
          setState('error')
        })
      })

      peer.on('error', (err) => {
        if (err.type === 'peer-unavailable') {
          setError('Sender is offline or the link is invalid. Remember, the sender must keep their tab open!')
        } else {
          setError('PeerJS error: ' + err.message)
        }
        setState('error')
      })

    } catch (err) {
      setError(err.message ?? 'An error occurred during connection.')
      setState('error')
    }
  }, [cleanup, metadata, state])

  return {
    state,
    progress,
    error,
    metadata,
    connect,
    cleanup
  }
}
