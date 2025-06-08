"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { IonButton, IonIcon } from "@ionic/react"
import { moonOutline, sunnyOutline, phonePortraitOutline } from "ionicons/icons"
import { ThemeService, type ThemeMode } from "../services/themeService"

export const ThemeToggle: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<ThemeMode>("dark")

  useEffect(() => {
    const savedTheme = ThemeService.getTheme()
    setCurrentTheme(savedTheme)
  }, [])

  const toggleTheme = () => {
    const themes: ThemeMode[] = ["light", "dark", "auto"]
    const currentIndex = themes.indexOf(currentTheme)
    const nextTheme = themes[(currentIndex + 1) % themes.length]

    setCurrentTheme(nextTheme)
    ThemeService.setTheme(nextTheme)
  }

  const getThemeIcon = () => {
    switch (currentTheme) {
      case "light":
        return sunnyOutline
      case "dark":
        return moonOutline
      case "auto":
        return phonePortraitOutline
      default:
        return moonOutline
    }
  }

  const getThemeLabel = () => {
    switch (currentTheme) {
      case "light":
        return "Light"
      case "dark":
        return "Dark"
      case "auto":
        return "Auto"
      default:
        return "Dark"
    }
  }

  return (
    <IonButton fill="clear" onClick={toggleTheme} title={`Current theme: ${getThemeLabel()}`}>
      <IonIcon icon={getThemeIcon()} />
    </IonButton>
  )
}
