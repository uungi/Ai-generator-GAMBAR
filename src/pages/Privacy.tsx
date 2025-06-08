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
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/react"
import { arrowBackOutline, shieldCheckmarkOutline, lockClosedOutline, eyeOffOutline } from "ionicons/icons"
import { useHistory } from "react-router-dom"

const Privacy: React.FC = () => {
  const history = useHistory()

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="dark">
          <IonButtons slot="start">
            <IonButton fill="clear" onClick={() => history.goBack()}>
              <IonIcon icon={arrowBackOutline} />
            </IonButton>
          </IonButtons>
          <IonTitle>Privacy Policy</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="privacy-content">
        {/* Header */}
        <IonCard className="privacy-header">
          <IonCardContent className="privacy-hero">
            <div className="privacy-icon">
              <IonIcon icon={shieldCheckmarkOutline} />
            </div>
            <h1>Privacy Policy</h1>
            <p className="privacy-subtitle">Your privacy is our priority</p>
            <p className="last-updated">Last updated: December 8, 2024</p>
          </IonCardContent>
        </IonCard>

        {/* Introduction */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Introduction</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>
              AI Image Generator ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your information when you use our AI image
              generation application.
            </p>
          </IonCardContent>
        </IonCard>

        {/* Information We Collect */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={eyeOffOutline} className="section-icon" />
              Information We Collect
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <h3>Information You Provide:</h3>
            <IonList>
              <IonItem>
                <IonLabel>
                  <h4>Text Prompts</h4>
                  <p>Descriptions you enter to generate images</p>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>
                  <h4>Voice Input</h4>
                  <p>Speech data when using voice-to-text feature (processed locally)</p>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>
                  <h4>Generated Images</h4>
                  <p>Images created through our AI services</p>
                </IonLabel>
              </IonItem>
            </IonList>

            <h3>Automatically Collected Information:</h3>
            <IonList>
              <IonItem>
                <IonLabel>
                  <h4>Usage Data</h4>
                  <p>App usage patterns and feature interactions</p>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>
                  <h4>Device Information</h4>
                  <p>Browser type, operating system, and device identifiers</p>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>
                  <h4>Performance Data</h4>
                  <p>Error logs and performance metrics</p>
                </IonLabel>
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>

        {/* How We Use Information */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>How We Use Your Information</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              <IonItem>
                <IonLabel>
                  <h4>Service Provision</h4>
                  <p>To generate images based on your prompts using AI services</p>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>
                  <h4>App Improvement</h4>
                  <p>To enhance features and user experience</p>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>
                  <h4>Technical Support</h4>
                  <p>To provide customer support and troubleshooting</p>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>
                  <h4>Security</h4>
                  <p>To protect against fraud and ensure app security</p>
                </IonLabel>
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>

        {/* Data Storage */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={lockClosedOutline} className="section-icon" />
              Data Storage & Security
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <h3>Local Storage:</h3>
            <p>
              Your generated images and preferences are stored locally on your device using browser localStorage. This
              data remains on your device and is not transmitted to our servers.
            </p>

            <h3>Third-Party Services:</h3>
            <p>
              We use OpenAI and Stability AI services for image generation. Your prompts are sent to these services
              according to their respective privacy policies.
            </p>

            <h3>Security Measures:</h3>
            <IonList>
              <IonItem>
                <IonLabel>HTTPS encryption for all data transmission</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>No permanent storage of personal data on our servers</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>Regular security audits and updates</IonLabel>
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>

        {/* Your Rights */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Your Privacy Rights</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              <IonItem>
                <IonLabel>
                  <h4>Access</h4>
                  <p>Request access to your personal data</p>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>
                  <h4>Deletion</h4>
                  <p>Request deletion of your data from our systems</p>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>
                  <h4>Correction</h4>
                  <p>Request correction of inaccurate data</p>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>
                  <h4>Portability</h4>
                  <p>Request transfer of your data to another service</p>
                </IonLabel>
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>

        {/* Contact */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Contact Us</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>If you have any questions about this Privacy Policy or our data practices, please contact us at:</p>
            <br />
            <p>
              <strong>Email:</strong> privacy@aiimageapp.com
              <br />
              <strong>Address:</strong> AI Image Generator Team
              <br />
              <strong>Response Time:</strong> Within 48 hours
            </p>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  )
}

export default Privacy
