export class SpeechService {
  private recognition: SpeechRecognition | null = null
  private isSupported = false

  constructor() {
    // Check if browser supports Speech Recognition with proper typing
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition

    if (SpeechRecognitionAPI) {
      try {
        this.recognition = new SpeechRecognitionAPI()
        this.isSupported = true
        this.setupRecognition()
      } catch (error) {
        console.warn("Speech Recognition initialization failed:", error)
        this.isSupported = false
      }
    } else {
      console.warn("Speech Recognition not supported in this browser")
    }
  }

  private setupRecognition(): void {
    if (!this.recognition) return

    this.recognition.continuous = false
    this.recognition.interimResults = false
    this.recognition.lang = "en-US" // You can change to 'id-ID' for Indonesian
    this.recognition.maxAlternatives = 1
  }

  isAvailable(): boolean {
    return this.isSupported && this.recognition !== null
  }

  startListening(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.recognition) {
        reject(new Error("Speech recognition not supported"))
        return
      }

      // Set up event handlers with proper typing
      this.recognition.onresult = (event: SpeechRecognitionEvent) => {
        try {
          const transcript = event.results[0][0].transcript
          resolve(transcript)
        } catch (error) {
          reject(new Error("Failed to process speech result"))
        }
      }

      this.recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        reject(new Error(`Speech recognition error: ${event.error} - ${event.message}`))
      }

      this.recognition.onend = () => {
        // Recognition ended - cleanup if needed
      }

      try {
        this.recognition.start()
      } catch (error) {
        reject(new Error(`Failed to start speech recognition: ${error}`))
      }
    })
  }

  stopListening(): void {
    if (this.recognition) {
      try {
        this.recognition.stop()
      } catch (error) {
        console.warn("Error stopping speech recognition:", error)
      }
    }
  }

  // Additional method to check specific browser support
  getBrowserSupport(): { supported: boolean; vendor: string } {
    if (window.SpeechRecognition) {
      return { supported: true, vendor: "standard" }
    } else if (window.webkitSpeechRecognition) {
      return { supported: true, vendor: "webkit" }
    } else {
      return { supported: false, vendor: "none" }
    }
  }
}
