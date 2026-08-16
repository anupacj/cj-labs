/**
 * LiquidGlassFilter
 * Injects a hidden SVG into the DOM with a feDisplacementMap filter.
 * Apply to any element with:  filter: url(#cj-liquid-glass)
 * This creates real lens distortion (not just blur).
 */
export default function LiquidGlassFilter () {
  return (
    <svg
      style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
      aria-hidden="true"
    >
      <defs>
        {/* Pill-shaped liquid glass lens distortion */}
        <filter id="cj-liquid-glass" x="-20%" y="-50%" width="140%" height="200%" colorInterpolationFilters="sRGB">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.018 0.018"
            numOctaves="2"
            seed="5"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="7"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />
          {/* Blend slightly to keep text readable */}
          <feComposite in="displaced" in2="SourceGraphic" operator="over" />
        </filter>

        {/* Stronger version for bigger elements */}
        <filter id="cj-liquid-glass-strong" x="-25%" y="-60%" width="150%" height="220%" colorInterpolationFilters="sRGB">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.015 0.015"
            numOctaves="3"
            seed="8"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="12"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  )
}
