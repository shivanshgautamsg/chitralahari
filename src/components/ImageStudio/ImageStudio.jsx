import React, { useState } from 'react';
import { Sparkles, Wand2, Download, Copy, Check, Layers } from 'lucide-react';
import confetti from 'canvas-confetti';
import { STYLE_PRESETS, INITIAL_GALLERY } from './modelsData';

export default function ImageStudio({ onSendToVideo }) {
  const [prompt, setPrompt] = useState('Cinematic vertical portrait of an adventurer looking over a glowing cyberpunk city at sunset');
  const [selectedAspect, setSelectedAspect] = useState('9:16');
  const [selectedStyle, setSelectedStyle] = useState('cinematic');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [gallery, setGallery] = useState(INITIAL_GALLERY);
  const [activeImage, setActiveImage] = useState(INITIAL_GALLERY[0]);
  const [copiedId, setCopiedId] = useState(null);

  const handleEnhancePrompt = () => {
    if (!prompt.trim()) return;
    const extra = ', 35mm film photograph, masterwork, volumetric natural lighting, sharp focus, 8k cinematic masterpiece';
    setPrompt(prev => prev.trim() + extra);
  };

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);

    setTimeout(() => {
      const newArtwork = {
        id: `gen-${Date.now()}`,
        prompt: prompt,
        aspectRatio: selectedAspect,
        url: selectedAspect === '9:16'
          ? 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80'
          : selectedAspect === '16:9'
          ? 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80'
          : 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
        createdAt: 'Just now',
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
      
      {/* Simple Creation Form */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>AI Image Creator</h2>
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
            <span className="badge badge-indigo">{activeImage.aspectRatio}</span>
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
