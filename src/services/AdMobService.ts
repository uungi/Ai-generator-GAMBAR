import {
  AdMob,
  type BannerAdOptions,
  BannerAdPosition,
  BannerAdSize,
  InterstitialAdPluginEvents,
} from "@capacitor-community/admob"

export class AdMobService {
  private static instance: AdMobService
  private isInitialized = false
  private interstitialLoaded = false

  // Test Ad Units - Replace with your actual ad units in production
  private readonly bannerAdId = {
    android: "ca-app-pub-7712832662169426/7599378679", // Test Banner Ad ID
    ios: "ca-app-pub-3940256099942544/2934735716", // Test Banner Ad ID
  }

  private readonly interstitialAdId = {
    android: "ca-app-pub-7712832662169426/6355128503", // Test Interstitial Ad ID
    ios: "ca-app-pub-3940256099942544/4411468910", // Test Interstitial Ad ID
  }

  private constructor() {}

  public static getInstance(): AdMobService {
    if (!AdMobService.instance) {
      AdMobService.instance = new AdMobService()
    }
    return AdMobService.instance
  }

  public async initialize(): Promise<void> {
    try {
      if (this.isInitialized) return

      // Initialize AdMob
      await AdMob.initialize({
        testingDevices: ["EMULATOR"],
        initializeForTesting: false, // Set to false in production
      })

      this.isInitialized = true
      console.log("✅ AdMob initialized successfully")

      // Preload interstitial ad
      this.prepareInterstitial()
    } catch (error) {
      console.error("❌ Error initializing AdMob:", error)
    }
  }

  public async showBanner(): Promise<void> {
    try {
      if (!this.isInitialized) await this.initialize()

      const options: BannerAdOptions = {
        adId: this.getPlatformAdId(this.bannerAdId),
        adSize: BannerAdSize.ADAPTIVE_BANNER,
        position: BannerAdPosition.BOTTOM_CENTER,
        margin: 0,
        isTesting: false, // Set to false in production
      }

      await AdMob.showBanner(options)
      console.log("✅ Banner ad shown successfully")
    } catch (error) {
      console.error("❌ Error showing banner ad:", error)
    }
  }

  public async hideBanner(): Promise<void> {
    try {
      await AdMob.hideBanner()
      console.log("✅ Banner ad hidden successfully")
    } catch (error) {
      console.error("❌ Error hiding banner ad:", error)
    }
  }

  public async prepareInterstitial(): Promise<void> {
    try {
      if (!this.isInitialized) await this.initialize()

      // Set up event listeners
      AdMob.addListener(InterstitialAdPluginEvents.Loaded, () => {
        this.interstitialLoaded = true
        console.log("✅ Interstitial ad loaded successfully")
      })

      AdMob.addListener(InterstitialAdPluginEvents.FailedToLoad, (error) => {
        this.interstitialLoaded = false
        console.error("❌ Interstitial ad failed to load:", error)
      })

      AdMob.addListener(InterstitialAdPluginEvents.Dismissed, () => {
        this.interstitialLoaded = false
        console.log("ℹ️ Interstitial ad dismissed")
        // Prepare the next interstitial ad
        this.prepareInterstitial()
      })

      // Load interstitial ad
      await AdMob.prepareInterstitial({
        adId: this.getPlatformAdId(this.interstitialAdId),
        isTesting: true, // Set to false in production
      })
    } catch (error) {
      console.error("❌ Error preparing interstitial ad:", error)
    }
  }

  public async showInterstitial(): Promise<boolean> {
    try {
      if (!this.interstitialLoaded) {
        console.log("ℹ️ Interstitial ad not loaded yet")
        return false
      }

      await AdMob.showInterstitial()
      this.interstitialLoaded = false
      console.log("✅ Interstitial ad shown successfully")
      return true
    } catch (error) {
      console.error("❌ Error showing interstitial ad:", error)
      return false
    }
  }

  private getPlatformAdId(adIds: { android: string; ios: string }): string {
    const platform = this.getPlatform()
    return platform === "ios" ? adIds.ios : adIds.android
  }

  private getPlatform(): string {
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera
    if (/android/i.test(userAgent)) {
      return "android"
    }
    if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
      return "ios"
    }
    return "android" // Default to Android for web
  }

  public isAdMobAvailable(): boolean {
    // Check if running on a mobile device or emulator
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera
    return /android|iPad|iPhone|iPod/i.test(userAgent)
  }
}

export default AdMobService.getInstance()
