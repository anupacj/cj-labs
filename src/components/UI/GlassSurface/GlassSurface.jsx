import React, { useEffect, useRef, useId } from 'react'
import { useGlassSettings } from '../../../context/GlassContext'
import './GlassSurface.css'

export default function GlassSurface ({
  children,
  width = 'auto',
  height = 'auto',
  borderRadius = 999,
  borderWidth = 0.08,
  blur: propBlur,
  displace: propDisplace,
  brightness: propBrightness,
  saturation: propSaturation,
  redOffset: propRedOffset,
  greenOffset: propGreenOffset,
  blueOffset: propBlueOffset,
  className = '',
  style = {},
  onClick
}) {
  const { settings } = useGlassSettings() || {}

  // Fallback to global tuner settings if props are not explicitly overridden
  const blur        = propBlur       ?? settings?.blur       ?? 4
  const displace    = propDisplace   ?? settings?.displace   ?? 18
  const brightness  = propBrightness ?? settings?.brightness ?? 1.35
  const saturation  = propSaturation ?? settings?.saturation ?? 2.0
  const redOffset   = propRedOffset  ?? settings?.redOffset  ?? -3
  const greenOffset = propGreenOffset?? settings?.greenOffset?? 5
  const blueOffset  = propBlueOffset ?? settings?.blueOffset ?? 12

  const id = useId()
  const filterId = `glass-filter-${id.replace(/:/g, '')}`
  const containerRef = useRef(null)
  const feImageRef = useRef(null)

  const generateDisplacementMap = () => {
    const rect = containerRef.current?.getBoundingClientRect()
    const actualWidth = rect?.width || 200
    const actualHeight = rect?.height || 60
    const edgeSize = Math.min(actualWidth, actualHeight) * (borderWidth * 0.5)

    const svgContent = `
      <svg viewBox="0 0 ${actualWidth} ${actualHeight}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ffffff" stop-opacity="1"/>
            <stop offset="50%" stop-color="#808080" stop-opacity="0.5"/>
            <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
          </linearGradient>
        </defs>
        <rect width="${actualWidth}" height="${actualHeight}" rx="${borderRadius}" fill="#808080"/>
        <rect x="${edgeSize}" y="${edgeSize}" width="${actualWidth - edgeSize * 2}" height="${actualHeight - edgeSize * 2}" rx="${Math.max(0, borderRadius - edgeSize)}" fill="#ffffff"/>
      </svg>
    `
    const encoded = `data:image/svg+xml;utf8,${encodeURIComponent(svgContent)}`
    if (feImageRef.current) {
      feImageRef.current.setAttribute('href', encoded)
    }
  }

  useEffect(() => {
    generateDisplacementMap()
    const handleResize = () => generateDisplacementMap()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [borderWidth, borderRadius])

  return (
    <div
      ref={containerRef}
      className={`glass-surface ${className}`}
      style={{
        width,
        height,
        borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
        ...style
      }}
      onClick={onClick}
    >
      {/* SVG Chromatic Aberration & Lens Refraction Filter */}
      <svg className="glass-surface__svg-defs" aria-hidden="true">
        <defs>
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
            <feImage ref={feImageRef} result="map" preserveAspectRatio="none" />

            <feDisplacementMap
              in="SourceGraphic"
              in2="map"
              scale={displace}
              xChannelSelector="R"
              yChannelSelector="G"
              result="displacedRed"
            />
            <feOffset in="displacedRed" dx={redOffset} dy="0" result="red" />

            <feDisplacementMap
              in="SourceGraphic"
              in2="map"
              scale={displace}
              xChannelSelector="G"
              yChannelSelector="B"
              result="displacedGreen"
            />
            <feOffset in="displacedGreen" dx={greenOffset} dy="0" result="green" />

            <feDisplacementMap
              in="SourceGraphic"
              in2="map"
              scale={displace}
              xChannelSelector="B"
              yChannelSelector="R"
              result="displacedBlue"
            />
            <feOffset in="displacedBlue" dx={blueOffset} dy="0" result="blue" />

            <feBlend in="red" in2="green" mode="screen" result="rg" />
            <feBlend in="rg" in2="blue" mode="screen" result="chromatic" />

            <feGaussianBlur in="chromatic" stdDeviation={blur * 0.2} result="blurred" />

            <feComponentTransfer in="blurred">
              <feFuncR type="linear" slope={brightness} />
              <feFuncG type="linear" slope={brightness} />
              <feFuncB type="linear" slope={brightness} />
            </feComponentTransfer>
          </filter>
        </defs>
      </svg>

      {/* Surface Glass Layer */}
      <div
        className="glass-surface__backdrop"
        style={{
          backdropFilter: `url(#${filterId}) blur(${blur}px) brightness(${brightness}) saturate(${saturation})`,
          WebkitBackdropFilter: `url(#${filterId}) blur(${blur}px) brightness(${brightness}) saturate(${saturation})`
        }}
      />

      {/* Glass Gloss & Specular Rim */}
      <div className="glass-surface__rim" />

      {/* Content Container */}
      <div className="glass-surface__content">
        {children}
      </div>
    </div>
  )
}
