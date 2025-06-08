"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { IonCard, IonCardContent } from "@ionic/react"
import AdMobService from "../services/AdMobService"

interface AdBannerProps {
  position?: "top" | "bottom"
  className?: string
}

export const AdBanner: React.FC<AdBannerProps> = ({ position = "bottom", className = "" }) => {
  const [adAvailable, setAdAvailable] = useState(false)
  const [showPlaceholder, setShowPlaceholder] = useState(true)

  useEffect(() => {
    const initAds = async () => {
      const isAvailable = AdMobService.isAdMobAvailable()
      setAdAvailable(isAvailable)

      if (isAvailable) {
        try {
          await AdMobService.initialize()
          await AdMobService.showBanner()
          setShowPlaceholder(false)
        } catch (error) {
          console.error("Failed to initialize ads:", error)
          setShowPlaceholder(true)
        }
      }
    }

    initAds()

    return () => {
      if (adAvailable) {
        AdMobService.hideBanner().catch(console.error)
      }
    }
  }, [adAvailable])

  if (adAvailable && !showPlaceholder) {
    return null
  }

  return (
    <IonCard className={`ad-placeholder ${position} ${className}`}>
      <IonCardContent className="ad-content">
        <div className="ad-text">Advertisement</div>
      </IonCardContent>
    </IonCard>
  )
}
