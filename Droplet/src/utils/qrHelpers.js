export function downloadQRAsPNG(canvasId, fileName) {
  const canvas = document.getElementById(canvasId)
  if (!canvas) {
    console.error(`Canvas element with id "${canvasId}" not found.`)
    return false
  }

  try {
    const dataUrl = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.download = fileName
    link.href = dataUrl
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    return true
  } catch (err) {
    console.error('Failed to download QR code:', err)
    return false
  }
}
