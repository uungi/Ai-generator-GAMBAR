"use client"

import type React from "react"
import { useState } from "react"
import { IonFab, IonFabButton, IonIcon, IonActionSheet } from "@ionic/react"
import {
  informationCircleOutline,
  personOutline,
  shieldCheckmarkOutline,
  warningOutline,
  closeOutline,
} from "ionicons/icons"
import { useHistory } from "react-router-dom"

export const InfoFAB: React.FC = () => {
  const history = useHistory()
  const [isOpen, setIsOpen] = useState(false)

  const actionSheetButtons = [
    {
      text: "About",
      icon: personOutline,
      handler: () => {
        history.push("/about")
      },
    },
    {
      text: "Privacy Policy",
      icon: shieldCheckmarkOutline,
      handler: () => {
        history.push("/privacy")
      },
    },
    {
      text: "Disclaimer",
      icon: warningOutline,
      handler: () => {
        history.push("/disclaimer")
      },
    },
    {
      text: "Cancel",
      icon: closeOutline,
      role: "cancel",
    },
  ]

  return (
    <>
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton onClick={() => setIsOpen(true)} className="info-fab">
          <IonIcon icon={informationCircleOutline} />
        </IonFabButton>
      </IonFab>

      <IonActionSheet
        isOpen={isOpen}
        onDidDismiss={() => setIsOpen(false)}
        header="App Information"
        subHeader="Learn more about this application"
        buttons={actionSheetButtons}
      />
    </>
  )
}
