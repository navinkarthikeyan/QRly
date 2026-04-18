const ALLOWED_EXTENSIONS = [
  'pdf', 'doc', 'docx', 'ppt', 'pptx',
  'xls', 'xlsx', 'jpg', 'jpeg', 'png',
]

const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'image/jpeg',
  'image/png',
]

export const MAX_FILE_SIZE = 20 * 1024 * 1024 // 20 MB

export const ALLOWED_TYPES_LABEL = ALLOWED_EXTENSIONS.map(e => `.${e}`).join(', ')

export function validateFile(file) {
  const ext = file.name.split('.').pop()?.toLowerCase() ?? ''

  if (!ALLOWED_EXTENSIONS.includes(ext) && !ALLOWED_MIME_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `Unsupported file type. Allowed: ${ALLOWED_EXTENSIONS.join(', ')}`,
    }
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: 'File too large. Maximum size is 20 MB.',
    }
  }

  if (file.size === 0) {
    return { valid: false, error: 'File is empty.' }
  }

  return { valid: true }
}
