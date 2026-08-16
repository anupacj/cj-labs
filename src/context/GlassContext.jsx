import React, { createContext, useContext, useState } from 'react'

const GlassContext = createContext()

// User's Ideal Liquid Glass Configuration
export const DEFAULT_GLASS_SETTINGS = {
  blur: 2,          // Crystal clear glass
  displace: 30,     // Deep optical lens refraction
  brightness: 1.0,  // Pure light transmission
  saturation: 2.4,  // High color vibrancy through glass
  redOffset: -3,    // Red dispersion channel
  greenOffset: 5,   // Green dispersion channel
  blueOffset: 12,   // Blue dispersion channel
}

// React Bits Ripple Distortion Settings
export const DEFAULT_RIPPLE_SETTINGS = {
  brushSize: 120,
  rings: 1.25,
  strength: 0.25,
  swirl: 0.5,
  dispersion: 0.08,
  glint: 0.3,
  tintAmount: 0.35,
  tint: '#8b5cf6',
  highlightColor: '#6ee7b7'
}

export const DEFAULT_WALLPAPER = '/assets/images/wallpaper.jpg'

export function GlassProvider ({ children }) {
  const [glassSettings, setGlassSettings]   = useState(DEFAULT_GLASS_SETTINGS)
  const [rippleSettings, setRippleSettings] = useState(DEFAULT_RIPPLE_SETTINGS)
  const [wallpaperUrl, setWallpaperUrl]     = useState(DEFAULT_WALLPAPER)

  const updateGlassSetting = (key, val) => {
    setGlassSettings(prev => ({ ...prev, [key]: val }))
  }

  const updateRippleSetting = (key, val) => {
    setRippleSettings(prev => ({ ...prev, [key]: val }))
  }

  return (
    <GlassContext.Provider
      value={{
        settings: glassSettings,
        updateSetting: updateGlassSetting,
        setSettings: setGlassSettings,
        rippleSettings,
        updateRippleSetting,
        setRippleSettings,
        wallpaperUrl,
        setWallpaperUrl
      }}
    >
      {children}
    </GlassContext.Provider>
  )
}

export function useGlassSettings () {
  return useContext(GlassContext)
}
