"use client"

import React from "react"
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonBadge,
} from "@ionic/react"
import {
  personOutline,
  leafOutline,
  gameControllerOutline,
  rocketOutline,
  heartOutline,
  brushOutline,
  cameraOutline,
  planetOutline,
} from "ionicons/icons"

interface PresetTemplate {
  id: string
  title: string
  prompt: string
  category: string
  icon: string
  color: string
}

interface PresetTemplatesProps {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (prompt: string) => void
}

const templates: PresetTemplate[] = [
  // Anime & Characters
  {
    id: "anime_girl",
    title: "Anime Girl",
    prompt: "beautiful anime girl with long flowing hair, kawaii style, pastel colors, detailed eyes",
    category: "Anime",
    icon: personOutline,
    color: "pink",
  },
  {
    id: "anime_boy",
    title: "Anime Boy",
    prompt: "handsome anime boy with spiky hair, cool expression, modern clothing, anime art style",
    category: "Anime",
    icon: personOutline,
    color: "blue",
  },
  {
    id: "chibi_character",
    title: "Chibi Character",
    prompt: "cute chibi character with big eyes, small body, adorable expression, kawaii style",
    category: "Anime",
    icon: heartOutline,
    color: "pink",
  },

  // Landscapes & Nature
  {
    id: "fantasy_forest",
    title: "Fantasy Forest",
    prompt: "magical fantasy forest with glowing mushrooms, fairy lights, mystical atmosphere, enchanted trees",
    category: "Landscape",
    icon: leafOutline,
    color: "green",
  },
  {
    id: "mountain_sunset",
    title: "Mountain Sunset",
    prompt: "beautiful mountain landscape at sunset, golden hour lighting, dramatic clouds, peaceful scenery",
    category: "Landscape",
    icon: leafOutline,
    color: "orange",
  },
  {
    id: "ocean_waves",
    title: "Ocean Waves",
    prompt: "crystal clear ocean waves, tropical beach, turquoise water, white sand, paradise view",
    category: "Landscape",
    icon: leafOutline,
    color: "cyan",
  },

  // Sci-Fi & Fantasy
  {
    id: "space_station",
    title: "Space Station",
    prompt: "futuristic space station orbiting Earth, sci-fi architecture, stars and galaxies background",
    category: "Sci-Fi",
    icon: rocketOutline,
    color: "purple",
  },
  {
    id: "cyberpunk_city",
    title: "Cyberpunk City",
    prompt: "neon-lit cyberpunk city at night, flying cars, holographic advertisements, futuristic buildings",
    category: "Sci-Fi",
    icon: planetOutline,
    color: "purple",
  },
  {
    id: "dragon_fantasy",
    title: "Fantasy Dragon",
    prompt: "majestic dragon with detailed scales, breathing fire, fantasy landscape background, epic scene",
    category: "Fantasy",
    icon: gameControllerOutline,
    color: "red",
  },

  // Art Styles
  {
    id: "oil_painting",
    title: "Oil Painting",
    prompt: "beautiful oil painting style artwork, classical art technique, rich colors, textured brushstrokes",
    category: "Art",
    icon: brushOutline,
    color: "brown",
  },
  {
    id: "watercolor",
    title: "Watercolor",
    prompt: "soft watercolor painting style, flowing colors, artistic brush effects, dreamy atmosphere",
    category: "Art",
    icon: brushOutline,
    color: "blue",
  },
  {
    id: "pixel_art",
    title: "Pixel Art",
    prompt: "retro pixel art style, 8-bit graphics, nostalgic gaming aesthetic, colorful pixels",
    category: "Art",
    icon: gameControllerOutline,
    color: "green",
  },

  // Photography
  {
    id: "portrait_photo",
    title: "Portrait Photo",
    prompt: "professional portrait photography, studio lighting, sharp focus, bokeh background, high quality",
    category: "Photo",
    icon: cameraOutline,
    color: "gray",
  },
  {
    id: "street_photo",
    title: "Street Photography",
    prompt: "candid street photography, urban environment, natural lighting, documentary style, authentic moment",
    category: "Photo",
    icon: cameraOutline,
    color: "dark",
  },
]

const categories = ["All", "Anime", "Landscape", "Sci-Fi", "Fantasy", "Art", "Photo"]

export const PresetTemplates: React.FC<PresetTemplatesProps> = ({ isOpen, onClose, onSelectTemplate }) => {
  const [selectedCategory, setSelectedCategory] = React.useState("All")

  const filteredTemplates = templates.filter(
    (template) => selectedCategory === "All" || template.category === selectedCategory,
  )

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar color="dark">
          <IonTitle>Preset Templates</IonTitle>
          <IonButtons slot="end">
            <IonButton fill="clear" onClick={onClose}>
              Close
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="preset-content">
        {/* Category Filter */}
        <div className="category-filter">
          {categories.map((category) => (
            <IonButton
              key={category}
              fill={selectedCategory === category ? "solid" : "outline"}
              size="small"
              className="category-button"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </IonButton>
          ))}
        </div>

        {/* Templates Grid */}
        <IonGrid className="templates-grid">
          <IonRow>
            {filteredTemplates.map((template) => (
              <IonCol size="12" sizeMd="6" key={template.id}>
                <IonCard className="template-card" onClick={() => onSelectTemplate(template.prompt)}>
                  <IonCardContent className="template-content">
                    <div className="template-header">
                      <IonIcon icon={template.icon} className="template-icon" color={template.color} />
                      <div className="template-info">
                        <h3 className="template-title">{template.title}</h3>
                        <IonBadge color={template.color} className="template-category">
                          {template.category}
                        </IonBadge>
                      </div>
                    </div>
                    <p className="template-prompt">{template.prompt}</p>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonModal>
  )
}
