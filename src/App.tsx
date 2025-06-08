"use client"

import type React from "react"
import { useEffect } from "react"
import { Redirect, Route } from "react-router-dom"
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react"
import { IonReactRouter } from "@ionic/react-router"
import Home from "./pages/Home"
import About from "./pages/About"
import Privacy from "./pages/Privacy"
import Disclaimer from "./pages/Disclaimer"
import AdMobService from "./services/AdMobService"

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css"

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css"
import "@ionic/react/css/structure.css"
import "@ionic/react/css/typography.css"

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css"
import "@ionic/react/css/float-elements.css"
import "@ionic/react/css/text-alignment.css"
import "@ionic/react/css/text-transformation.css"
import "@ionic/react/css/flex-utils.css"
import "@ionic/react/css/display.css"

/* Theme variables */
import "./theme/variables.css"

/* Page styles */
import "./pages/About.css"
import "./pages/Privacy.css"
import "./pages/Disclaimer.css"
import "./components/InfoFAB.css"
import "./components/AdBanner.css"

setupIonicReact()

const App: React.FC = () => {
  useEffect(() => {
    // Initialize AdMob when app starts
    const initAdMob = async () => {
      try {
        await AdMobService.initialize()
        console.log("AdMob initialized in App component")
      } catch (error) {
        console.error("Failed to initialize AdMob:", error)
      }
    }

    initAdMob()
  }, [])

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/privacy">
            <Privacy />
          </Route>
          <Route exact path="/disclaimer">
            <Disclaimer />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  )
}

export default App
