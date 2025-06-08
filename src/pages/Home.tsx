"use client"

import type React from "react"
import { useState, useEffect, useMemo } from "react"
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonInput,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonIcon,
  IonLoading,
  IonToast,
  IonFab,
  IonFabButton,
  IonBadge,
  IonChip,
  IonItem,
  IonLabel,
  IonModal,
  IonButtons,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react"
import {
  micOutline,
  imageOutline,
  downloadOutline,
  sparklesOutline,
  cloudOutline,
  checkmarkCircleOutline,
  informationCircleOutline,
  libraryOutline,
  heartOutline,
  heart,
  trashOutline,
  copyOutline,
  timeOutline,
  colorPaletteOutline,
  createOutline,
  stopOutline,
} from "ionicons/icons"
import { createApiUrl, getApiInfo } from "../config/api"
import { StorageService } from "../services/storage"
import { SpeechService } from "../services/speechService"
import { ThemeService } from "../services/themeService"
import { PresetTemplates } from "../components/PresetTemplates"
import { ImageEditor } from "../components/ImageEditor"
import { ThemeToggle } from "../components/ThemeToggle"
import { InfoFAB } from "../components/InfoFAB"
import { AdBanner } from "../components/AdBanner"
import AdMobService from "../services/AdMobService"
import type { GeneratedImage, StoredImage, ProviderInfo } from "../types/image"
import "./Home.css"

const Home: React.FC = () => {
  const [prompt, setPrompt] = useState("")
  const [images, setImages] = useState<GeneratedImage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [providerInfo, setProviderInfo] = useState<ProviderInfo | null>(null)
  const [providerStatus, setProviderStatus] = useState<any>(null)
  const [showApiInfo, setShowApiInfo] = useState(false)
  // Remove this line completely:
  // const [adCount, setAdCount] = useState(0)

  // Gallery/History States
  const [showGallery, setShowGallery] = useState(false)
  const [galleryImages, setGalleryImages] = useState<StoredImage[]>([])
  const [gallerySegment, setGallerySegment] = useState<string>("recent")

  // Preset Templates State
  const [showPresets, setShowPresets] = useState(false)

  // Voice Recognition States
  const [isListening, setIsListening] = useState(false)
  // Add useCallback for speechService to make it stable
  const speechService = useMemo(() => new SpeechService(), [])

  // Image Editor States
  const [showImageEditor, setShowImageEditor] = useState(false)
  const [editingImage, setEditingImage] = useState<GeneratedImage | null>(null)

  // Initialize theme on component mount
  // Update the useEffect to include speechService properly
  useEffect(() => {
    ThemeService.initTheme()
    checkProviderStatus()
    loadGalleryImages()
    console.log("🔧 API Configuration:", getApiInfo())
    console.log("🎤 Speech Support:", speechService.getBrowserSupport())
  }, [speechService])

  const checkProviderStatus = async () => {
    try {
      const url = createApiUrl("/api/provider-status")
      console.log("🔍 Checking provider status at:", url)

      const response = await fetch(url)
      if (response.ok) {
        const status = await response.json()
        setProviderStatus(status)
        console.log("✅ Provider status loaded:", status)
      }
    } catch (error) {
      console.error("❌ Failed to check provider status:", error)
    }
  }

  const loadGalleryImages = () => {
    const savedImages = StorageService.getAllImages()
    setGalleryImages(savedImages)
  }

  const saveImagesToGallery = (newImages: GeneratedImage[]) => {
    // Convert GeneratedImages to proper format with required fields
    const imagesWithDefaults: GeneratedImage[] = newImages.map((img) => ({
      ...img,
      timestamp: img.timestamp || Date.now(),
      isFavorite: img.isFavorite || false,
    }))

    imagesWithDefaults.forEach((img) => {
      StorageService.saveImage(img)
    })

    loadGalleryImages()
  }

  const toggleFavorite = (imageId: string) => {
    StorageService.toggleFavorite(imageId)
    loadGalleryImages()
    setToastMessage("Favorit diperbarui!")
    setShowToast(true)
  }

  const deleteImage = (imageId: string) => {
    StorageService.deleteImage(imageId)
    loadGalleryImages()
    setToastMessage("Gambar dihapus!")
    setShowToast(true)
  }

  const copyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt)
    setToastMessage("Prompt disalin!")
    setShowToast(true)
  }

  const useTemplate = (templatePrompt: string) => {
    setPrompt(templatePrompt)
    setShowPresets(false)
    setToastMessage("Template dipilih!")
    setShowToast(true)
  }

  // Voice Recognition Functions
  const startVoiceRecognition = async () => {
    if (!speechService.isAvailable()) {
      const support = speechService.getBrowserSupport()
      setToastMessage(`Voice recognition tidak didukung. Browser: ${support.vendor}`)
      setShowToast(true)
      return
    }

    setIsListening(true)
    try {
      const transcript = await speechService.startListening()
      setPrompt(transcript)
      setToastMessage(`Voice input: "${transcript}"`)
      setShowToast(true)
    } catch (error) {
      console.error("Voice recognition error:", error)
      const errorMessage = error instanceof Error ? error.message : "Voice recognition failed"
      setToastMessage(`Voice error: ${errorMessage}`)
      setShowToast(true)
    } finally {
      setIsListening(false)
    }
  }

  const stopVoiceRecognition = () => {
    speechService.stopListening()
    setIsListening(false)
  }

  // Image Editor Functions
  const openImageEditor = (image: GeneratedImage | StoredImage) => {
    // Convert StoredImage to GeneratedImage if needed
    const generatedImage: GeneratedImage = "error" in image ? image : StorageService.toGeneratedImage(image)
    setEditingImage(generatedImage)
    setShowImageEditor(true)
  }

  const saveEditedImage = (editedImageUrl: string) => {
    if (!editingImage) return

    const editedImage: GeneratedImage = {
      ...editingImage,
      id: `edited_${Date.now()}`,
      url: editedImageUrl,
      timestamp: Date.now(),
      isFavorite: false,
    }

    // Save to gallery
    StorageService.saveImage(editedImage)
    loadGalleryImages()

    // Add to current images
    setImages((prev) => [editedImage, ...prev])

    setToastMessage("Gambar berhasil diedit dan disimpan!")
    setShowToast(true)
  }

  // Update the generateImages function to remove adCount logic
  const generateImages = async () => {
    if (!prompt.trim()) {
      setToastMessage("Silakan masukkan deskripsi gambar")
      setShowToast(true)
      return
    }

    setIsLoading(true)
    try {
      const url = createApiUrl("/api/generate-image")
      console.log("🎨 Generating images at:", url)

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (!data.images || data.images.length === 0) {
        // Fallback to mock data with proper typing
        const mockImages: GeneratedImage[] = [
          {
            id: `mock_${Date.now()}_1`,
            url: "/placeholder.svg?height=200&width=200&text=Demo%20Image%201",
            prompt: prompt,
            style: "Cartoon",
            provider: "Demo",
            timestamp: Date.now(),
            isFavorite: false,
          },
          {
            id: `mock_${Date.now()}_2`,
            url: "/placeholder.svg?height=200&width=200&text=Demo%20Image%202",
            prompt: prompt,
            style: "Anime",
            provider: "Demo",
            timestamp: Date.now(),
            isFavorite: false,
          },
          {
            id: `mock_${Date.now()}_3`,
            url: "/placeholder.svg?height=200&width=200&text=Demo%20Image%203",
            prompt: prompt,
            style: "3D",
            provider: "Demo",
            timestamp: Date.now(),
            isFavorite: false,
          },
          {
            id: `mock_${Date.now()}_4`,
            url: "/placeholder.svg?height=200&width=200&text=Demo%20Image%204",
            prompt: prompt,
            style: "Minimalist",
            provider: "Demo",
            timestamp: Date.now(),
            isFavorite: false,
          },
        ]
        setImages(mockImages)
        saveImagesToGallery(mockImages)
        setToastMessage("Demo gambar berhasil dibuat! (Mode Demo)")
      } else {
        // Ensure proper typing for API response
        const apiImages: GeneratedImage[] = data.images.map((img: any) => ({
          id: img.id,
          url: img.url,
          prompt: img.prompt,
          style: img.style,
          provider: img.provider,
          timestamp: Date.now(),
          isFavorite: false,
          error: img.error,
        }))

        setImages(apiImages)
        saveImagesToGallery(apiImages)
        setProviderInfo(data.provider_info)

        const successCount = data.provider_info?.successful || 0
        const failedCount = data.provider_info?.failed || 0

        if (failedCount > 0) {
          setToastMessage(
            `${successCount} gambar berhasil, ${failedCount} gagal. Provider: ${data.provider_info?.primary_provider}`,
          )
        } else {
          setToastMessage(`${successCount} gambar berhasil dibuat! Provider: ${data.provider_info?.primary_provider}`)
        }
      }

      // Show interstitial ad occasionally (every few generations)
      if (Math.random() < 0.3) {
        // 30% chance to show ad
        showInterstitialAd()
      }

      setShowToast(true)
    } catch (error) {
      console.error("❌ Generation error:", error)
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
      setToastMessage(`Gagal membuat gambar: ${errorMessage}`)
      setShowToast(true)
    } finally {
      setIsLoading(false)
    }
  }

  const showInterstitialAd = async () => {
    try {
      await AdMobService.showInterstitial()
    } catch (error) {
      console.error("Failed to show interstitial ad:", error)
    }
  }

  const downloadImage = async (imageUrl: string, filename: string) => {
    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `${filename}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)

      setToastMessage("Gambar berhasil diunduh!")
      setShowToast(true)
    } catch (error) {
      console.error("Download error:", error)
      const errorMessage = error instanceof Error ? error.message : "Download failed"
      setToastMessage(`Gagal mengunduh gambar: ${errorMessage}`)
      setShowToast(true)
    }
  }

  const getFilteredGalleryImages = (): StoredImage[] => {
    switch (gallerySegment) {
      case "favorites":
        return galleryImages.filter((img) => img.isFavorite)
      case "recent":
      default:
        return galleryImages.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))
    }
  }

  const apiInfo = getApiInfo()

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="dark">
          <IonTitle className="title-center">
            <IonIcon icon={sparklesOutline} className="title-icon" />
            AI Gambar Generator
          </IonTitle>
          <IonButtons slot="start">
            <IonButton fill="clear" onClick={() => setShowGallery(true)}>
              <IonIcon icon={libraryOutline} />
            </IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <ThemeToggle />
            <IonButton fill="clear" onClick={() => setShowApiInfo(!showApiInfo)}>
              <IonIcon icon={informationCircleOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="main-content">
        <div className="container">
          {/* Top Banner Ad */}
          <AdBanner position="top" />

          {/* API Info Debug Panel */}
          {showApiInfo && (
            <IonCard className="api-info-card">
              <IonCardContent>
                <h3>🔧 API Configuration</h3>
                <IonItem>
                  <IonLabel>
                    <h4>Current API URL:</h4>
                    <p>{apiInfo.baseUrl}</p>
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    <h4>Gallery Images:</h4>
                    <p>{galleryImages.length} saved</p>
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    <h4>Voice Support:</h4>
                    <p>{speechService.isAvailable() ? "✅ Available" : "❌ Not supported"}</p>
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    <h4>AdMob Support:</h4>
                    <p>{AdMobService.isAdMobAvailable() ? "✅ Available" : "❌ Not supported"}</p>
                  </IonLabel>
                </IonItem>
              </IonCardContent>
            </IonCard>
          )}

          {/* Provider Status */}
          {providerStatus && (
            <div className="provider-status">
              <IonChip color={providerStatus.openai.available ? "success" : "medium"}>
                <IonIcon icon={providerStatus.openai.available ? checkmarkCircleOutline : cloudOutline} />
                OpenAI {providerStatus.openai.available ? "✓" : "✗"}
              </IonChip>
              <IonChip color={providerStatus.stability.available ? "success" : "medium"}>
                <IonIcon icon={providerStatus.stability.available ? checkmarkCircleOutline : cloudOutline} />
                Stability AI {providerStatus.stability.available ? "✓" : "✗"}
              </IonChip>
            </div>
          )}

          {/* Preset Templates Button */}
          <div className="preset-section">
            <IonButton expand="block" fill="outline" className="preset-button" onClick={() => setShowPresets(true)}>
              <IonIcon icon={colorPaletteOutline} slot="start" />
              Pilih Template
            </IonButton>
          </div>

          {/* Input Section */}
          <div className="input-section">
            <div className="input-container">
              <IonInput
                value={prompt}
                placeholder="An astronaut cat on the moon"
                onIonInput={(e) => setPrompt(e.detail.value!)}
                className="prompt-input"
                fill="outline"
              />
              <div className="input-icons">
                <div
                  className={`icon-button ${isListening ? "listening" : ""}`}
                  onClick={isListening ? stopVoiceRecognition : startVoiceRecognition}
                >
                  <IonIcon icon={isListening ? stopOutline : micOutline} />
                </div>
                <div className="icon-button">
                  <IonIcon icon={imageOutline} />
                </div>
              </div>
            </div>

            <IonButton expand="block" className="generate-button" onClick={generateImages} disabled={isLoading}>
              {isLoading ? "Generating..." : "Generate"}
            </IonButton>
          </div>

          {/* Provider Info */}
          {providerInfo && (
            <div className="provider-info">
              <IonBadge color="primary">Provider: {providerInfo.primary_provider}</IonBadge>
              <IonBadge color="success">Success: {providerInfo.successful}</IonBadge>
              {providerInfo.failed > 0 && <IonBadge color="danger">Failed: {providerInfo.failed}</IonBadge>}
            </div>
          )}

          {/* Images Grid */}
          {images.length > 0 && (
            <IonGrid className="images-grid">
              <IonRow>
                {images.map((image, index) => (
                  <IonCol size="6" key={image.id}>
                    <IonCard className={`image-card ${image.error ? "error-card" : ""}`}>
                      <IonCardContent className="image-content">
                        <img
                          src={image.url || "/placeholder.svg"}
                          alt={`Generated: ${image.prompt}`}
                          className="generated-image"
                          onClick={() => !image.error && openImageEditor(image)}
                        />

                        {/* Provider Badge */}
                        {image.provider && (
                          <IonBadge className="provider-badge" color={image.error ? "danger" : "secondary"}>
                            {image.provider}
                          </IonBadge>
                        )}

                        {/* Action Buttons */}
                        {!image.error && (
                          <>
                            <IonFab vertical="bottom" horizontal="end" slot="fixed">
                              <IonFabButton
                                size="small"
                                className="download-fab"
                                onClick={() => downloadImage(image.url, `ai-image-${index + 1}`)}
                              >
                                <IonIcon icon={downloadOutline} />
                              </IonFabButton>
                            </IonFab>
                            <IonFab vertical="bottom" horizontal="start" slot="fixed">
                              <IonFabButton size="small" className="edit-fab" onClick={() => openImageEditor(image)}>
                                <IonIcon icon={createOutline} />
                              </IonFabButton>
                            </IonFab>
                          </>
                        )}
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                ))}
              </IonRow>
            </IonGrid>
          )}

          {/* Bottom Banner Ad */}
          <AdBanner position="bottom" />
        </div>

        {/* Gallery Modal */}
        <IonModal isOpen={showGallery} onDidDismiss={() => setShowGallery(false)}>
          <IonHeader>
            <IonToolbar color="dark">
              <IonTitle>Gallery</IonTitle>
              <IonButtons slot="end">
                <IonButton fill="clear" onClick={() => setShowGallery(false)}>
                  Close
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="gallery-content">
            <IonSegment value={gallerySegment} onIonChange={(e) => setGallerySegment(e.detail.value as string)}>
              <IonSegmentButton value="recent">
                <IonIcon icon={timeOutline} />
                <IonLabel>Recent</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="favorites">
                <IonIcon icon={heartOutline} />
                <IonLabel>Favorites</IonLabel>
              </IonSegmentButton>
            </IonSegment>

            {getFilteredGalleryImages().length === 0 ? (
              <div className="empty-gallery">
                <IonIcon icon={libraryOutline} className="empty-icon" />
                <p>Belum ada gambar tersimpan</p>
              </div>
            ) : (
              <IonGrid className="gallery-grid">
                <IonRow>
                  {getFilteredGalleryImages().map((image) => (
                    <IonCol size="6" key={image.id}>
                      <IonCard className="gallery-card">
                        <IonCardContent className="gallery-card-content">
                          <img
                            src={image.url || "/placeholder.svg"}
                            alt={image.prompt}
                            className="gallery-image"
                            onClick={() => openImageEditor(image)}
                          />

                          <div className="gallery-actions">
                            <IonButton
                              fill="clear"
                              size="small"
                              onClick={() => toggleFavorite(image.id)}
                              className="action-button"
                            >
                              <IonIcon icon={image.isFavorite ? heart : heartOutline} color="danger" />
                            </IonButton>

                            <IonButton
                              fill="clear"
                              size="small"
                              onClick={() => copyPrompt(image.prompt)}
                              className="action-button"
                            >
                              <IonIcon icon={copyOutline} />
                            </IonButton>

                            <IonButton
                              fill="clear"
                              size="small"
                              onClick={() => openImageEditor(image)}
                              className="action-button"
                            >
                              <IonIcon icon={createOutline} />
                            </IonButton>

                            <IonButton
                              fill="clear"
                              size="small"
                              onClick={() => downloadImage(image.url, `gallery-${image.id}`)}
                              className="action-button"
                            >
                              <IonIcon icon={downloadOutline} />
                            </IonButton>

                            <IonButton
                              fill="clear"
                              size="small"
                              onClick={() => deleteImage(image.id)}
                              className="action-button"
                            >
                              <IonIcon icon={trashOutline} color="danger" />
                            </IonButton>
                          </div>

                          <div className="gallery-info">
                            <p className="gallery-prompt">{image.prompt}</p>
                            <IonBadge color="secondary">{image.provider}</IonBadge>
                          </div>
                        </IonCardContent>
                      </IonCard>
                    </IonCol>
                  ))}
                </IonRow>
              </IonGrid>
            )}

            {/* Banner Ad in Gallery */}
            <AdBanner position="bottom" className="gallery-ad" />
          </IonContent>
        </IonModal>

        {/* Preset Templates Modal */}
        <PresetTemplates isOpen={showPresets} onClose={() => setShowPresets(false)} onSelectTemplate={useTemplate} />

        {/* Image Editor Modal */}
        {editingImage && (
          <ImageEditor
            isOpen={showImageEditor}
            onClose={() => setShowImageEditor(false)}
            imageUrl={editingImage.url}
            onSave={saveEditedImage}
          />
        )}

        <IonLoading isOpen={isLoading} message="Sedang memproses..." spinner="crescent" />

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={3000}
          position="bottom"
        />

        {/* Info FAB */}
        <InfoFAB />
      </IonContent>
    </IonPage>
  )
}

export default Home
