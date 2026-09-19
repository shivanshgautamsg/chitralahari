import React from 'react';

/**
 * Dynamic Subtitle Overlay Component
 * Displays synchronized captions with multiple popular creator styles:
 * - MrBeast (Bold bouncy yellow/white with heavy stroke)
 * - Hormozi (Yellow word-by-word active highlight)
 * - Cyberpunk (Neon cyan/magenta glow)
 * - Minimalist (Clean modern translucent pill)
 * - Karaoke (Smooth active karaoke highlight)
 */
export default function SubtitleOverlay({
  currentText = '',
  currentTime = 0,
  stylePreset = 'hormozi', // 'hormozi' | 'beast' | 'cyberpunk' | 'minimalist' | 'karaoke'
  position = 'bottom', // 'bottom' | 'middle' | 'top'
  fontSize = 24,
  enabled = true,
}) {
  if (!enabled || !currentText) return null;

  const words = currentText.split(' ');
  // Estimate active word based on text length and approximate speed
  const wordIndex = Math.min(words.length - 1, Math.floor(((currentTime * 3) % words.length)));

  const getPositionClass = () => {
    switch (position) {
      case 'top': return { top: '15%', bottom: 'auto' };
      case 'middle': return { top: '50%', transform: 'translate(-50%, -50%)', bottom: 'auto' };
      case 'bottom':
      default:
        return { bottom: '18%', top: 'auto' };
    }
  };

  const getStyleRules = () => {
    switch (stylePreset) {
      case 'beast':
        return {
          fontFamily: "'Outfit', 'Impact', sans-serif",
          textTransform: 'uppercase',
          fontWeight: '900',
          letterSpacing: '0.04em',
          textShadow: '3px 3px 0 #000, -3px -3px 0 #000, 3px -3px 0 #000, -3px 3px 0 #000, 0 6px 12px rgba(0,0,0,0.8)',
          color: '#ffffff',
          activeWordColor: '#facc15', // Neon Yellow
          scalePop: true,
        };
      case 'cyberpunk':
        return {
          fontFamily: "'JetBrains Mono', monospace",
          textTransform: 'uppercase',
          fontWeight: '700',
          letterSpacing: '0.08em',
          textShadow: '0 0 10px #06b6d4, 0 0 20px #06b6d4, 0 0 30px #ec4899',
          color: '#ffffff',
          activeWordColor: '#22d3ee',
          scalePop: false,
        };
      case 'minimalist':
        return {
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: '600',
          background: 'rgba(10, 12, 18, 0.75)',
          backdropFilter: 'blur(8px)',
          borderRadius: '12px',
          padding: '8px 18px',
          border: '1px solid rgba(255,255,255,0.1)',
          color: '#f8fafc',
          activeWordColor: '#818cf8',
          scalePop: false,
        };
      case 'karaoke':
        return {
          fontFamily: "'Outfit', sans-serif",
          fontWeight: '800',
          textShadow: '2px 2px 4px rgba(0,0,0,0.9)',
          color: '#94a3b8',
          activeWordColor: '#10b981',
          scalePop: true,
        };
      case 'hormozi':
      default:
        return {
          fontFamily: "'Outfit', 'Arial Black', sans-serif",
          textTransform: 'uppercase',
          fontWeight: '900',
          letterSpacing: '0.02em',
          textShadow: '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 0 4px 10px rgba(0,0,0,0.75)',
          color: '#ffffff',
          activeWordColor: '#f59e0b', // Amber/Yellow block
          scalePop: true,
        };
    }
  };

  const currentPreset = getStyleRules();
  const positionStyles = getPositionClass();

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        transform: position === 'middle' ? 'translate(-50%, -50%)' : 'translateX(-50%)',
        width: '90%',
        textAlign: 'center',
        pointerEvents: 'none',
        zIndex: 30,
        ...positionStyles,
        ...currentPreset,
        fontSize: `${fontSize}px`,
        lineHeight: 1.3,
        transition: 'all 0.15s ease',
      }}
    >
      <div style={{ display: 'inline-flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px' }}>
        {words.map((word, idx) => {
          const isActive = idx === wordIndex;
          return (
            <span
              key={idx}
              style={{
                display: 'inline-block',
                color: isActive ? currentPreset.activeWordColor : currentPreset.color,
                transform: isActive && currentPreset.scalePop ? 'scale(1.18)' : 'scale(1)',
                transition: 'transform 0.12s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.12s ease',
                backgroundColor: isActive && stylePreset === 'hormozi' ? 'rgba(0,0,0,0.4)' : 'transparent',
                borderRadius: '4px',
                padding: '0 3px',
              }}
            >
              {word}
            </span>
          );
        })}
      </div>
    </div>
  );
}
