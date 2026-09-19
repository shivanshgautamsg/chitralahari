import React, { useState } from 'react';
import { Activity, Play, Pause, Sparkles, Upload, Download, Sliders } from 'lucide-react';
import confetti from 'canvas-confetti';

const MOTION_EFFECTS = [
  { id: 'parallax', name: '3D Parallax Drift', desc: 'Simulates depth and layered camera movement across planes.' },
  { id: 'pulse', name: 'Heartbeat Pulse', desc: 'Rhythmic zoom expansion aligned with bass beats.' },
  { id: 'slow-zoom', name: 'Slow Cinematic Push', desc: 'Gradual dramatic zoom towards the focal center.' },
  { id: 'pan-scan', name: 'Dynamic Pan & Scan', desc: 'Horizontal tracking across widescreen panoramic details.' },
  { id: 'shiver', name: 'Subtle Life Breath', desc: 'Organic, natural micro-movements simulating lifelike breath.' },
];

export default function MotionStudio() {
  const [selectedImage, setSelectedImage] = useState('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80');
  const [selectedEffect, setSelectedEffect] = useState('parallax');
  const [intensity, setIntensity] = useState(5);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  const handleCustomUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) setSelectedImage(URL.createObjectURL(file));
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    }, 1200);
  };

  // Compute CSS keyframe or transform simulation
  const getMotionTransform = () => {
    if (!isPlaying) return 'scale(1)';
    const scaleFactor = 1 + (intensity * 0.015);
    switch (selectedEffect) {
      case 'parallax':
        return `scale(${scaleFactor}) translate(-10px, -6px)`;
      case 'pulse':
        return `scale(${scaleFactor * 1.05})`;
      case 'slow-zoom':
        return `scale(${scaleFactor * 1.08})`;
      case 'pan-scan':
        return `scale(${scaleFactor}) translateX(15px)`;
      case 'shiver':
      default:
        return `scale(${scaleFactor}) translateY(-4px)`;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="glass-panel" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="pulse-dot" style={{ backgroundColor: 'var(--accent-emerald)', boxShadow: '0 0 8px var(--accent-emerald)' }} />
              <h3 style={{ fontSize: '1.25rem' }}>Motion Control & Vibe Motion</h3>
              <span className="badge badge-emerald">Kinetic Photo Animation</span>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Bring still images to life with 3D parallax depth, organic camera drift, and rhythmic motion loops.
            </p>
          </div>
          <span className="badge badge-indigo">Instant Preview</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(340px, 460px) 1fr', gap: '24px', alignItems: 'start' }}>
        
        {/* Left Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div className="glass-panel" style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            
            {/* Image Selection */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>Source Image</span>
                <label className="btn btn-ghost btn-sm" style={{ padding: '2px 8px', fontSize: '0.75rem', cursor: 'pointer', color: 'var(--accent-cyan)' }}>
                  <Upload size={13} /> Upload Image
                  <input type="file" accept="image/*" onChange={handleCustomUpload} style={{ display: 'none' }} />
                </label>
              </div>
              <img
                src={selectedImage}
                alt="Source"
                style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}
              />
            </div>

            {/* Motion Presets */}
            <div>
              <span style={{ fontSize: '0.875rem', fontWeight: '600', display: 'block', marginBottom: '8px' }}>
                Motion Algorithm Preset
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {MOTION_EFFECTS.map((eff) => (
                  <div
                    key={eff.id}
                    onClick={() => setSelectedEffect(eff.id)}
                    className="glass-panel"
                    style={{
                      padding: '10px 14px',
                      cursor: 'pointer',
                      border: selectedEffect === eff.id ? '2px solid var(--accent-emerald)' : '1px solid var(--border-subtle)',
                      backgroundColor: selectedEffect === eff.id ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <div style={{ fontWeight: '600', fontSize: '0.85rem', color: selectedEffect === eff.id ? '#34d399' : 'var(--text-primary)' }}>
                      {eff.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {eff.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Intensity Slider */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <span>Motion Amplitude / Depth</span>
                <span>{intensity}/10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={intensity}
                onChange={(e) => setIntensity(parseInt(e.target.value))}
                style={{ marginTop: '4px' }}
              />
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <button
                className={`btn ${isPlaying ? 'btn-cyan' : 'btn-secondary'}`}
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />} {isPlaying ? 'Pause Motion' : 'Play Motion'}
              </button>
              <button
                className="btn btn-primary"
                onClick={handleExport}
                disabled={isExporting}
              >
                <Download size={16} /> {isExporting ? 'Exporting...' : 'Export Loop'}
              </button>
            </div>
          </div>
        </div>

        {/* Right Preview */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <span className="badge badge-emerald">
                {MOTION_EFFECTS.find(e => e.id === selectedEffect)?.name}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Continuous 60FPS Render
              </span>
            </div>

            <div
              style={{
                width: '100%',
                maxHeight: '480px',
                borderRadius: '16px',
                overflow: 'hidden',
                backgroundColor: '#000000',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                position: 'relative',
              }}
            >
              <img
                src={selectedImage}
                alt="Living Motion"
                style={{
                  width: '100%',
                  height: '100%',
                  maxHeight: '480px',
                  objectFit: 'cover',
                  transform: getMotionTransform(),
                  transition: 'transform 2.5s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
