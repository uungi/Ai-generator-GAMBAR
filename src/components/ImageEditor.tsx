"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonRange,
  IonItem,
  IonLabel,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
} from "@ionic/react"
import {
  cropOutline,
  refreshOutline,
  contrastOutline,
  sunnyOutline,
  downloadOutline,
  closeOutline,
  checkmarkOutline,
} from "ionicons/icons"

interface ImageEditorProps {
  isOpen: boolean
  onClose: () => void
  imageUrl: string
  onSave: (editedImageUrl: string) => void
}

interface EditSettings {
  brightness: number
  contrast: number
  saturation: number
  rotation: number
}

export const ImageEditor: React.FC<ImageEditorProps> = ({ isOpen, onClose, imageUrl, onSave }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [settings, setSettings] = useState<EditSettings>({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    rotation: 0,
  })
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null)

  useEffect(() => {
    if (isOpen && imageUrl) {
      loadImage()
    }
  }, [isOpen, imageUrl])

  useEffect(() => {
    if (originalImage) {
      applyFilters()
    }
  }, [settings, originalImage])

  const loadImage = () => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      setOriginalImage(img)
    }
    img.src = imageUrl
  }

  const applyFilters = () => {
    if (!originalImage || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = originalImage.width
    canvas.height = originalImage.height

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Apply rotation
    ctx.save()
    ctx.translate(canvas.width / 2, canvas.height / 2)
    ctx.rotate((settings.rotation * Math.PI) / 180)
    ctx.translate(-canvas.width / 2, -canvas.height / 2)

    // Apply filters
    ctx.filter = `
      brightness(${settings.brightness}%) 
      contrast(${settings.contrast}%) 
      saturate(${settings.saturation}%)
    `

    // Draw image
    ctx.drawImage(originalImage, 0, 0)
    ctx.restore()
  }

  const resetSettings = () => {
    setSettings({
      brightness: 100,
      contrast: 100,
      saturation: 100,
      rotation: 0,
    })
  }

  const rotateImage = () => {
    setSettings((prev) => ({
      ...prev,
      rotation: (prev.rotation + 90) % 360,
    }))
  }

  const saveImage = () => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const editedImageUrl = canvas.toDataURL("image/png", 0.9)
    onSave(editedImageUrl)
    onClose()
  }

  const downloadEditedImage = () => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const link = document.createElement("a")
    link.download = "edited-image.png"
    link.href = canvas.toDataURL()
    link.click()
  }

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar color="dark">
          <IonTitle>Image Editor</IonTitle>
          <IonButtons slot="start">
            <IonButton fill="clear" onClick={onClose}>
              <IonIcon icon={closeOutline} />
            </IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton fill="clear" onClick={saveImage}>
              <IonIcon icon={checkmarkOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="editor-content">
        <div style={{ padding: "20px" }}>
          {/* Canvas Preview */}
          <IonCard>
            <IonCardContent style={{ textAlign: "center", padding: "10px" }}>
              <canvas
                ref={canvasRef}
                style={{
                  maxWidth: "100%",
                  maxHeight: "300px",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "8px",
                }}
              />
            </IonCardContent>
          </IonCard>

          {/* Quick Actions */}
          <IonGrid>
            <IonRow>
              <IonCol size="4">
                <IonButton expand="block" fill="outline" onClick={rotateImage}>
                  <IonIcon icon={refreshOutline} slot="start" />
                  Rotate
                </IonButton>
              </IonCol>
              <IonCol size="4">
                <IonButton expand="block" fill="outline" onClick={resetSettings}>
                  <IonIcon icon={cropOutline} slot="start" />
                  Reset
                </IonButton>
              </IonCol>
              <IonCol size="4">
                <IonButton expand="block" fill="outline" onClick={downloadEditedImage}>
                  <IonIcon icon={downloadOutline} slot="start" />
                  Download
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>

          {/* Adjustment Controls */}
          <IonCard>
            <IonCardContent>
              <IonItem>
                <IonIcon icon={sunnyOutline} slot="start" />
                <IonLabel>Brightness</IonLabel>
                <IonRange
                  min={50}
                  max={150}
                  value={settings.brightness}
                  onIonInput={(e) => setSettings((prev) => ({ ...prev, brightness: e.detail.value as number }))}
                  pin={true}
                  snaps={true}
                  step={5}
                />
              </IonItem>

              <IonItem>
                <IonIcon icon={contrastOutline} slot="start" />
                <IonLabel>Contrast</IonLabel>
                <IonRange
                  min={50}
                  max={150}
                  value={settings.contrast}
                  onIonInput={(e) => setSettings((prev) => ({ ...prev, contrast: e.detail.value as number }))}
                  pin={true}
                  snaps={true}
                  step={5}
                />
              </IonItem>

              <IonItem>
                <IonIcon icon={cropOutline} slot="start" />
                <IonLabel>Saturation</IonLabel>
                <IonRange
                  min={0}
                  max={200}
                  value={settings.saturation}
                  onIonInput={(e) => setSettings((prev) => ({ ...prev, saturation: e.detail.value as number }))}
                  pin={true}
                  snaps={true}
                  step={10}
                />
              </IonItem>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonModal>
  )
}
