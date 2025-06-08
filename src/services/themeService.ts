export type ThemeMode = "light" | "dark" | "auto"

export class ThemeService {
  private static readonly THEME_KEY = "ai_generator_theme"

  static getTheme(): ThemeMode {
    try {
      const saved = localStorage.getItem(this.THEME_KEY)
      return (saved as ThemeMode) || "dark"
    } catch {
      return "dark"
    }
  }

  static setTheme(theme: ThemeMode) {
    try {
      localStorage.setItem(this.THEME_KEY, theme)
      this.applyTheme(theme)
    } catch (error) {
      console.error("Failed to save theme:", error)
    }
  }

  static applyTheme(theme: ThemeMode) {
    const body = document.body

    // Remove existing theme classes
    body.classList.remove("light-theme", "dark-theme")

    if (theme === "auto") {
      // Use system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      body.classList.add(prefersDark ? "dark-theme" : "light-theme")
    } else {
      body.classList.add(`${theme}-theme`)
    }
  }

  static initTheme() {
    const savedTheme = this.getTheme()
    this.applyTheme(savedTheme)

    // Listen for system theme changes
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
      if (this.getTheme() === "auto") {
        this.applyTheme("auto")
      }
    })
  }
}
