import type { StoredImage, GeneratedImage } from "../types/image"

export class StorageService {
  private static readonly STORAGE_KEY = "ai_generator_images"

  static saveImage(image: GeneratedImage): void {
    try {
      // Convert GeneratedImage to StoredImage with proper defaults
      const storedImage: StoredImage = {
        id: image.id,
        url: image.url,
        prompt: image.prompt,
        style: image.style,
        provider: image.provider || "Unknown",
        timestamp: image.timestamp || Date.now(),
        isFavorite: image.isFavorite || false,
      }

      const existingImages = this.getAllImages()
      const updatedImages = [storedImage, ...existingImages.filter((img) => img.id !== storedImage.id)]

      // Keep only last 100 images to prevent storage overflow
      const limitedImages = updatedImages.slice(0, 100)

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(limitedImages))
    } catch (error) {
      console.error("Failed to save image:", error)
    }
  }

  static getAllImages(): StoredImage[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      if (!stored) return []

      const parsed = JSON.parse(stored)

      // Validate and ensure all images have required properties
      return parsed
        .filter(
          (img: any) =>
            img && typeof img.id === "string" && typeof img.url === "string" && typeof img.prompt === "string",
        )
        .map(
          (img: any): StoredImage => ({
            id: img.id,
            url: img.url,
            prompt: img.prompt,
            style: img.style || "Unknown",
            provider: img.provider || "Unknown",
            timestamp: typeof img.timestamp === "number" ? img.timestamp : Date.now(),
            isFavorite: Boolean(img.isFavorite),
          }),
        )
    } catch (error) {
      console.error("Failed to load images:", error)
      return []
    }
  }

  static deleteImage(imageId: string): void {
    try {
      const existingImages = this.getAllImages()
      const filteredImages = existingImages.filter((img) => img.id !== imageId)
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredImages))
    } catch (error) {
      console.error("Failed to delete image:", error)
    }
  }

  static toggleFavorite(imageId: string): void {
    try {
      const existingImages = this.getAllImages()
      const updatedImages = existingImages.map((img) =>
        img.id === imageId ? { ...img, isFavorite: !img.isFavorite } : img,
      )
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedImages))
    } catch (error) {
      console.error("Failed to toggle favorite:", error)
    }
  }

  static getFavorites(): StoredImage[] {
    return this.getAllImages().filter((img) => img.isFavorite)
  }

  static clearAll(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY)
    } catch (error) {
      console.error("Failed to clear storage:", error)
    }
  }

  // Helper method to convert StoredImage back to GeneratedImage for display
  static toGeneratedImage(storedImage: StoredImage): GeneratedImage {
    return {
      ...storedImage,
      // GeneratedImage can have error property, but StoredImage doesn't
    }
  }
}
