import path from 'path'

const MIME_TYPE: Record<string, string> = {
    '.txt': 'text/plain'
}

export function getMimeType(filePath: string): string {
    return MIME_TYPE[path.extname(filePath).toLowerCase()] ?? 'application/octet-stream'
}