// Konfigurasi API yang bisa diubah dengan mudah
export const API_CONFIG = {
  // Prioritas: Environment Variable > Manual Config > Auto-detect
  getBaseUrl: (): string => {
    // 1. Cek environment variable terlebih dahulu
    if (process.env.REACT_APP_API_URL) {
      console.log("🔧 Using environment variable:", process.env.REACT_APP_API_URL)
      return process.env.REACT_APP_API_URL
    }

    // 2. Manual config - UBAH DI SINI UNTUK VERCEL BACKEND
    const MANUAL_API_URL = "https://your-vercel-backend.vercel.app" // Ganti dengan URL Vercel backend Anda

    if (MANUAL_API_URL && MANUAL_API_URL !== "https://your-vercel-backend.vercel.app") {
      console.log("🔧 Using manual config:", MANUAL_API_URL)
      return MANUAL_API_URL
    }

    // 3. Auto-detect berdasarkan environment (hanya untuk development)
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname

      // Jika di localhost, gunakan localhost backend
      if (hostname === "localhost" || hostname === "127.0.0.1") {
        console.log("🔧 Using localhost backend")
        return "http://localhost:3001"
      }

      // Untuk production, JANGAN auto-detect, paksa ke manual config
      console.log("🔧 Production mode - using manual config fallback")
      return "https://your-vercel-backend.vercel.app" // Fallback ke manual config
    }

    return "http://localhost:3001"
  },

  // Endpoints
  endpoints: {
    generateImage: "/api/generate-image",
    providerStatus: "/api/provider-status",
    health: "/api/health",
  },
}

// Helper function untuk membuat full URL
export const createApiUrl = (endpoint: string): string => {
  const baseUrl = API_CONFIG.getBaseUrl()
  return `${baseUrl}${endpoint}`
}

// Export untuk debugging
export const getApiInfo = () => {
  return {
    baseUrl: API_CONFIG.getBaseUrl(),
    envUrl: process.env.REACT_APP_API_URL,
    currentHost: typeof window !== "undefined" ? window.location.hostname : "server",
    isProduction: process.env.NODE_ENV === "production",
  }
}
