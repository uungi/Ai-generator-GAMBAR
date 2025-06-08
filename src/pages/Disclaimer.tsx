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
  IonBadge,
} from "@ionic/react"
import { arrowBackOutline, warningOutline, informationCircleOutline, alertCircleOutline } from "ionicons/icons"
import { useHistory } from "react-router-dom"

const Disclaimer: React.FC = () => {
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
          <IonTitle>Disclaimer</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="disclaimer-content">
        {/* Header */}
        <IonCard className="disclaimer-header">
          <IonCardContent className="disclaimer-hero">
            <div className="disclaimer-icon">
              <IonIcon icon={warningOutline} />
            </div>
            <h1>Disclaimer</h1>
            <p className="disclaimer-subtitle">Important information about using this service</p>
            <IonBadge color="warning">Please Read Carefully</IonBadge>
          </IonCardContent>
        </IonCard>

        {/* General Disclaimer */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={informationCircleOutline} className="section-icon" />
              General Disclaimer
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>
              The AI Image Generator application is provided "as is" without any representations or warranties, express
              or implied. We make no representations or warranties in relation to this application or the information
              and materials provided through it.
            </p>
            <br />
            <p>
              By using this application, you acknowledge that you have read, understood, and agree to be bound by this
              disclaimer.
            </p>
          </IonCardContent>
        </IonCard>

        {/* AI Content Disclaimer */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={alertCircleOutline} className="section-icon" />
              AI-Generated Content
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              <IonItem>
                <IonLabel>
                  <h4>Content Accuracy</h4>
                  <p>AI-generated images may not always accurately represent real objects, people, or places</p>
                </IonLabel>
                <IonBadge color="warning" slot="end">
                  Important
                </IonBadge>
              </IonItem>
              <IonItem>
                <IonLabel>
                  <h4>Unpredictable Results</h4>
                  <p>AI models may produce unexpected or unintended content despite careful prompting</p>
                </IonLabel>
                <IonBadge color="warning" slot="end">
                  Note
                </IonBadge>
              </IonItem>
              <IonItem>
                <IonLabel>
                  <h4>No Guarantee</h4>
                  <p>We do not guarantee the quality, accuracy, or appropriateness of generated content</p>
                </IonLabel>
                <IonBadge color="danger" slot="end">
                  Critical
                </IonBadge>
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>

        {/* Usage Limitations */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Usage Limitations & Restrictions</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <h3>Prohibited Content:</h3>
            <IonList>
              <IonItem>
                <IonLabel>Illegal, harmful, or offensive content</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>Content that violates intellectual property rights</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>Adult or explicit content</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>Content promoting violence or discrimination</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>Misleading or deceptive content</IonLabel>
              </IonItem>
            </IonList>

            <h3>Commercial Use:</h3>
            <p>
              Commercial use of generated images may be subject to additional terms and conditions from AI service
              providers (OpenAI, Stability AI). Please review their respective terms of service.
            </p>
          </IonCardContent>
        </IonCard>

        {/* Third-Party Services */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Third-Party Services</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>This application integrates with third-party AI services:</p>
            <br />
            <IonList>
              <IonItem>
                <IonLabel>
                  <h4>OpenAI DALL-E</h4>
                  <p>Subject to OpenAI's terms of service and usage policies</p>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>
                  <h4>Stability AI</h4>
                  <p>Subject to Stability AI's terms of service and usage policies</p>
                </IonLabel>
              </IonItem>
            </IonList>
            <br />
            <p>
              We are not responsible for the availability, content, or policies of these third-party services. Users are
              encouraged to review the terms and policies of these services directly.
            </p>
          </IonCardContent>
        </IonCard>

        {/* Limitation of Liability */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Limitation of Liability</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>
              To the fullest extent permitted by law, we exclude all liability for any loss or damage arising from your
              use of this application, including but not limited to:
            </p>
            <br />
            <IonList>
              <IonItem>
                <IonLabel>Direct, indirect, or consequential damages</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>Loss of data or generated content</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>Service interruptions or downtime</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>Inappropriate or offensive generated content</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>Third-party service failures or limitations</IonLabel>
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>

        {/* Updates */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Updates to This Disclaimer</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>
              We may update this disclaimer from time to time. Any changes will be posted on this page with an updated
              revision date. Your continued use of the application after any changes constitutes acceptance of the new
              disclaimer.
            </p>
            <br />
            <p>
              <strong>Last Updated:</strong> December 8, 2024
              <br />
              <strong>Version:</strong> 1.0.0
            </p>
          </IonCardContent>
        </IonCard>

        {/* Contact */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Questions or Concerns</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>
              If you have any questions about this disclaimer or need clarification on any points, please contact us at:
            </p>
            <br />
            <p>
              <strong>Email:</strong> legal@aiimageapp.com
              <br />
              <strong>Subject:</strong> Disclaimer Inquiry
              <br />
              <strong>Response Time:</strong> Within 72 hours
            </p>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  )
}

export default Disclaimer
