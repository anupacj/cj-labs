import React, { createContext, useContext, useState } from 'react'

const GlassContext = createContext()

// User's Ideal Liquid Glass Configuration
export const DEFAULT_GLASS_SETTINGS = {
  blur: 1,          // 1px
  displace: 43,     // Refraction 43
  brightness: 0.65, // 0.65x
  saturation: 3.4,  // 3.40x
  redOffset: -3,    // -3px
  greenOffset: 5,   // 5px
  blueOffset: 12,   // 12px
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
