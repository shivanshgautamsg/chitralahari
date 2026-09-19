import React, { useState } from 'react';
import { Sparkles, Wand2, Download, Copy, Check, Camera, Sun, Sliders } from 'lucide-react';
import confetti from 'canvas-confetti';
import { STYLE_PRESETS, INITIAL_GALLERY } from './modelsData';

const CINEMA_LENSES = [
  { id: '35mm', label: '35mm Anamorphic', tag: ', shot on 35mm anamorphic lens, cinema aspect, oval bokeh, rich optical flares' },
  { id: '85mm', label: '85mm f/1.4 Portrait', tag: ', 85mm f/1.4 lens, shallow depth of field, creamy background blur, tack sharp eye focus' },
  { id: '16mm', label: '16mm Ultra-Wide', tag: ', 16mm ultra wide angle lens, dramatic perspective, sweeping spatial depth' },
  { id: '50mm', label: '50mm Prime Natural', tag: ', 50mm f/1.8 prime lens, natural human eye perspective, true-to-life proportions' },
];

const LIGHTING_PRESETS = [
  { id: 'golden-hour', label: 'Golden Hour 🌅', tag: ', warm golden hour sunlight, soft directional rim lighting, sun flare' },
  { id: 'volumetric', label: 'Volumetric Moody 🌫️', tag: ', volumetric atmosphere, misty light beams, cinematic haze, chiaroscuro contrast' },
  { id: 'neon', label: 'Cyberpunk Neon ⚡', tag: ', vivid neon edge lights, cyan and magenta reflection, wet pavement specular highlights' },
  { id: 'studio', label: 'Studio Softbox 💡', tag: ', professional studio three-point lighting, diffused softbox glow, catchlights' },
];

export default function ImageStudio({ onSendToVideo }) {
  const [prompt, setPrompt] = useState('Cinematic vertical portrait of an adventurer looking over a glowing cyberpunk city at sunset');
  const [selectedAspect, setSelectedAspect] = useState('9:16');
  const [selectedStyle, setSelectedStyle] = useState('cinematic');
  const [selectedLens, setSelectedLens] = useState('35mm');
  const [selectedLighting, setSelectedLighting] = useState('golden-hour');
  const [showCinemaControls, setShowCinemaControls] = useState(true);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [gallery, setGallery] = useState(INITIAL_GALLERY);
  const [activeImage, setActiveImage] = useState(INITIAL_GALLERY[0]);

  const handleEnhancePrompt = () => {
    if (!prompt.trim()) return;
    const extra = ', masterwork 35mm film photograph, natural volumetric depth, lifelike textures, award-winning cinematography, 8k';
    setPrompt(prev => prev.trim() + extra);
  };

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);

    const lensObj = CINEMA_LENSES.find(l => l.id === selectedLens);
    const lightObj = LIGHTING_PRESETS.find(li => li.id === selectedLighting);
    const enrichedPrompt = prompt + (lensObj ? lensObj.tag : '') + (lightObj ? lightObj.tag : '');

    setTimeout(() => {
      const newArtwork = {
        id: `gen-${Date.now()}`,
        prompt: enrichedPrompt,
        aspectRatio: selectedAspect,
        url: selectedAspect === '9:16'
          ? 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80'
          : selectedAspect === '16:9'
          ? 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80'
          : 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
        createdAt: 'Just now',
        lens: lensObj?.label,
        lighting: lightObj?.label,
      };

      setGallery(prev => [newArtwork, ...prev]);
      setActiveImage(newArtwork);
      setIsGenerating(false);

      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.6 }
      });
    }, 1000);
  };

  const handleDownload = (img) => {
    const a = document.createElement('a');
    a.href = img.url;
    a.download = `chitraleheri_${img.id}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Creation Form with Cinema Optics */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>AI Image Creator</h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Photorealistic image generation with pro optical lens & cinematic lighting controls.
              </p>
            </div>
            <button
              className="btn btn-ghost btn-sm"
              onClick={handleEnhancePrompt}
              style={{ color: 'var(--accent-cyan)', gap: '4px' }}
            >
              <Wand2 size={14} /> Enhance Prompt
            </button>
          </div>

          {/* Prompt input */}
          <textarea
            className="input-field"
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe what image you want to create..."
            style={{ fontSize: '0.95rem', resize: 'vertical' }}
          />

          {/* Style & Aspect Quick Selectors */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Style:</span>
              {[
                { id: 'cinematic', label: 'Cinematic' },
                { id: 'hyperreal', label: 'Realistic' },
                { id: 'anime', label: 'Anime' },
                { id: 'pixar', label: '3D Render' },
              ].map((st) => (
                <button
                  key={st.id}
                  onClick={() => setSelectedStyle(st.id)}
                  className={`btn btn-sm ${selectedStyle === st.id ? 'btn-cyan' : 'btn-secondary'}`}
                  style={{ padding: '4px 12px', fontSize: '0.8rem' }}
                >
                  {st.label}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Size:</span>
              {[
                { id: '9:16', label: '9:16 Story' },
                { id: '1:1', label: '1:1 Square' },
                { id: '16:9', label: '16:9 Wide' },
              ].map((ar) => (
                <button
                  key={ar.id}
                  onClick={() => setSelectedAspect(ar.id)}
                  className={`btn btn-sm ${selectedAspect === ar.id ? 'btn-primary' : 'btn-ghost'}`}
                  style={{ padding: '4px 10px', fontSize: '0.8rem' }}
                >
                  {ar.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cinema Optics Toolbar (Higgsfield Style) */}
          <div
            style={{
              padding: '12px 14px',
              borderRadius: '10px',
              backgroundColor: 'rgba(0, 0, 0, 0.35)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Camera size={13} /> Cinema Optics & Camera Rig
              </span>
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => setShowCinemaControls(!showCinemaControls)}
                style={{ fontSize: '0.72rem', padding: '2px 6px' }}
              >
                {showCinemaControls ? 'Collapse' : 'Expand Optics'}
              </button>
            </div>

            {showCinemaControls && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                {/* Lens Picker */}
                <div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                    Optical Lens Focal Length
                  </span>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
                    {CINEMA_LENSES.map((lens) => (
                      <button
                        key={lens.id}
                        onClick={() => setSelectedLens(lens.id)}
                        className={`btn btn-sm ${selectedLens === lens.id ? 'btn-primary' : 'btn-secondary'}`}
                        style={{ padding: '4px 6px', fontSize: '0.72rem' }}
                      >
                        {lens.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Lighting Picker */}
                <div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                    Cinematic Lighting Setup
                  </span>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
                    {LIGHTING_PRESETS.map((light) => (
                      <button
                        key={light.id}
                        onClick={() => setSelectedLighting(light.id)}
                        className={`btn btn-sm ${selectedLighting === light.id ? 'btn-cyan' : 'btn-secondary'}`}
                        style={{ padding: '4px 6px', fontSize: '0.72rem' }}
                      >
                        {light.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            className="btn btn-primary btn-lg"
            style={{ width: '100%', height: '46px', marginTop: '4px' }}
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            <Sparkles size={18} /> {isGenerating ? 'Creating Artwork...' : 'Create Image'}
          </button>
        </div>
      </div>

      {/* Result Display */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 300px', gap: '20px', alignItems: 'start' }}>
        
        {/* Main Artwork */}
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              <span className="badge badge-indigo">{activeImage.aspectRatio}</span>
              {activeImage.lens && <span className="badge badge-gold">{activeImage.lens}</span>}
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="btn btn-secondary btn-sm" onClick={() => handleDownload(activeImage)}>
                <Download size={14} /> Download
              </button>
              {onSendToVideo && (
                <button className="btn btn-cyan btn-sm" onClick={() => onSendToVideo(activeImage.url)}>
                  Turn to Video →
                </button>
              )}
            </div>
          </div>

          <div
            style={{
              borderRadius: '14px',
              overflow: 'hidden',
              backgroundColor: '#000000',
              maxHeight: '520px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src={activeImage.url}
              alt={activeImage.prompt}
              style={{ width: '100%', maxHeight: '520px', objectFit: 'contain' }}
            />
          </div>

          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
            "{activeImage.prompt}"
          </p>
        </div>

        {/* Gallery Sidebar */}
        <div className="glass-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: '600' }}>Recent Creations</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {gallery.map((img) => (
              <div
                key={img.id}
                onClick={() => setActiveImage(img)}
                style={{
                  borderRadius: '8px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  aspectRatio: '1 / 1',
                  border: activeImage.id === img.id ? '2px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                }}
              >
                <img src={img.url} alt="thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
