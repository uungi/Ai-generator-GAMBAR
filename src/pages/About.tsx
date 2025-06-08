"use client"

import type React from "react"
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonList,
  IonBadge,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react"
import {
  arrowBackOutline,
  sparklesOutline,
  codeSlashOutline,
  colorPaletteOutline,
  cloudOutline,
  micOutline,
  brushOutline,
  libraryOutline,
  heartOutline,
  logoGithub,
  mailOutline,
  globeOutline,
} from "ionicons/icons"
import { useHistory } from "react-router-dom"

const About: React.FC = () => {
  const history = useHistory()

  const features = [
    {
      icon: sparklesOutline,
      title: "AI Image Generation",
      description: "Generate stunning images from text prompts using OpenAI DALL-E and Stability AI",
      color: "primary",
    },
    {
      icon: cloudOutline,
      title: "Dual Provider System",
      description: "Automatic fallback between OpenAI and Stability AI for maximum reliability",
      color: "secondary",
    },
    {
      icon: colorPaletteOutline,
      title: "Preset Templates",
      description: "15+ ready-to-use templates across Anime, Landscape, Sci-Fi, Art categories",
      color: "tertiary",
    },
    {
      icon: micOutline,
      title: "Voice-to-Text",
      description: "Speak your prompts directly using advanced speech recognition",
      color: "success",
    },
    {
      icon: brushOutline,
      title: "Image Editor",
      description: "Basic editing tools: brightness, contrast, saturation, and rotation",
      color: "warning",
    },
    {
      icon: libraryOutline,
      title: "Gallery & History",
      description: "Save, organize, and manage your generated images with favorites",
      color: "danger",
    },
  ]

  const techStack = [
    { name: "Frontend", tech: "Ionic React + TypeScript", color: "primary" },
    { name: "Backend", tech: "Next.js API Routes", color: "secondary" },
    { name: "AI Providers", tech: "OpenAI + Stability AI", color: "tertiary" },
    { name: "Storage", tech: "LocalStorage", color: "success" },
    { name: "UI Framework", tech: "Ionic Components", color: "warning" },
    { name: "Styling", tech: "CSS Variables + Themes", color: "danger" },
  ]

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="dark">
          <IonButtons slot="start">
            <IonButton fill="clear" onClick={() => history.goBack()}>
              <IonIcon icon={arrowBackOutline} />
            </IonButton>
          </IonButtons>
          <IonTitle>About</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="about-content">
        {/* Hero Section */}
        <IonCard className="hero-card">
          <IonCardContent className="hero-content">
            <div className="hero-icon">
              <IonIcon icon={sparklesOutline} />
            </div>
            <h1>AI Image Generator</h1>
            <p className="hero-subtitle">Transform your imagination into stunning visual art</p>
            <IonBadge color="primary">Version 1.0.0</IonBadge>
          </IonCardContent>
        </IonCard>

        {/* Description */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={codeSlashOutline} className="section-icon" />
              About This App
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>
              AI Image Generator adalah aplikasi modern yang memungkinkan Anda membuat gambar menakjubkan hanya dengan
              deskripsi teks. Menggunakan teknologi AI terdepan dari OpenAI dan Stability AI, aplikasi ini
              mentransformasi ide kreatif Anda menjadi karya seni visual yang memukau.
            </p>
            <br />
            <p>
              Dibangun dengan teknologi web terbaru, aplikasi ini menawarkan pengalaman yang responsif, intuitif, dan
              powerful untuk semua kebutuhan generasi gambar AI Anda.
            </p>
          </IonCardContent>
        </IonCard>

        {/* Features */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={heartOutline} className="section-icon" />
              Key Features
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                {features.map((feature, index) => (
                  <IonCol size="12" sizeMd="6" key={index}>
                    <div className="feature-item">
                      <div className="feature-header">
                        <IonIcon icon={feature.icon} color={feature.color} className="feature-icon" />
                        <h3>{feature.title}</h3>
                      </div>
                      <p>{feature.description}</p>
                    </div>
                  </IonCol>
                ))}
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        {/* Tech Stack */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={codeSlashOutline} className="section-icon" />
              Technology Stack
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              {techStack.map((item, index) => (
                <IonItem key={index}>
                  <IonLabel>
                    <h3>{item.name}</h3>
                    <p>{item.tech}</p>
                  </IonLabel>
                  <IonBadge color={item.color} slot="end">
                    Latest
                  </IonBadge>
                </IonItem>
              ))}
            </IonList>
          </IonCardContent>
        </IonCard>

        {/* Contact */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={mailOutline} className="section-icon" />
              Contact & Support
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              <IonItem button>
                <IonIcon icon={logoGithub} slot="start" />
                <IonLabel>
                  <h3>GitHub Repository</h3>
                  <p>View source code and contribute</p>
                </IonLabel>
              </IonItem>
              <IonItem button>
                <IonIcon icon={mailOutline} slot="start" />
                <IonLabel>
                  <h3>Email Support</h3>
                  <p>support@aiimageapp.com</p>
                </IonLabel>
              </IonItem>
              <IonItem button>
                <IonIcon icon={globeOutline} slot="start" />
                <IonLabel>
                  <h3>Website</h3>
                  <p>www.aiimageapp.com</p>
                </IonLabel>
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>

        {/* Credits */}
        <IonCard>
          <IonCardContent className="credits-content">
            <p className="credits-text">
              Made with ❤️ by AI Image Generator Team
              <br />
              Powered by OpenAI & Stability AI
              <br />
              Built with Ionic React & Next.js
            </p>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  )
}

export default About
