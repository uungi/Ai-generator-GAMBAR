// Unified image interface to prevent type mismatches
export interface BaseImage {
  id: string
  url: string
  prompt: string
  style: string
  provider?: string
  timestamp: number
  isFavorite: boolean
}

// For generated images (extends BaseImage)
export interface GeneratedImage extends BaseImage {
  error?: string
}

// For stored images (same as BaseImage)
export interface StoredImage extends BaseImage {
  // No additional properties needed
}

// Provider info interface
export interface ProviderInfo {
  primary_provider: string
  total_generated: number
  successful: number
  failed: number
}
