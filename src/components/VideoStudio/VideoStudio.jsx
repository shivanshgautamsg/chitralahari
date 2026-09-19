import React, { useState } from 'react';
import { Film, Sparkles, Download, Play, Upload, Camera, Compass } from 'lucide-react';
import confetti from 'canvas-confetti';

const HIGGSFIELD_MODELS = [
  { id: 'soul-cinema', name: 'Soul Cinema Pro', badge: 'Hollywood 4K', desc: 'Physically accurate lighting, dynamic camera tracking, and deep actor expressions.' },
  { id: 'wan-2-2', name: 'Wan 2.2 Director', badge: 'State of Art', desc: 'Cutting-edge open-weight diffusion transformer with flawless fluid motion.' },
  { id: 'kling-3', name: 'Kling 3 Motion Turbo', badge: 'Ultra Dynamic', desc: 'High velocity physics, fast action scenes, and seamless particle effects.' },
  { id: 'minimax-h3', name: 'Minimax Hailuo H3', badge: 'Photoreal', desc: 'Cinematic character consistency, eye-line continuity, and film grain.' },
];

const PRO_CAMERA_MOVES = [
  { id: 'dolly-zoom', label: 'Dolly Zoom (Vertigo) 🎬', tag: 'dolly zoom vertigo effect, background compression, subject stays in frame' },
  { id: 'fpv-drone', label: 'FPV Drone Flythrough 🚀', tag: 'first person view high-speed fpv drone dive, aerodynamic motion blur' },
  { id: 'orbit-360', label: '360° Character Orbit 🔄', tag: 'smooth 360 degree circular camera orbit around central subject' },
  { id: 'crane-drop', label: 'Crane Drop Down ⬇️', tag: 'cinematic high-angle jib crane descending rapidly down to eye level' },
  { id: 'handheld', label: 'Handheld Organic 📹', tag: 'realistic cinema documentary handheld camera sway, natural subtle motion' },
  { id: 'whip-pan', label: 'Fast Whip Pan ⚡', tag: 'rapid whip pan transition with motion blur, energetic camera movement' },
];

export default function VideoStudio({ incomingImageUrl }) {
  const [prompt, setPrompt] = useState('An astronaut walking across a bioluminescent crystal lake on Mars under dual twilight moons, cinematic anamorphic 60fps');
  const [selectedModel, setSelectedModel] = useState(HIGGSFIELD_MODELS[0].id);
  const [selectedCamera, setSelectedCamera] = useState('dolly-zoom');
  const [aspectRatio, setAspectRatio] = useState('9:16');
  const [duration, setDuration] = useState('5s');
  
  // Media frame inputs (Higgsfield role-based inputs)
  const [startFrame, setStartFrame] = useState(incomingImageUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80');
  const [endFrame, setEndFrame] = useState(null);
  const [useEndFrame, setUseEndFrame] = useState(false);

  const [isGenerating, setIsGenerating] = useState(false);
  const [activeVideoUrl, setActiveVideoUrl] = useState('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4');

  const handleStartFrameUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) setStartFrame(URL.createObjectURL(file));
  };

  const handleEndFrameUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) setEndFrame(URL.createObjectURL(file));
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setActiveVideoUrl('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4');
      confetti({ particleCount: 50, spread: 60 });
    }, 1200);
  };

  const currentCam = PRO_CAMERA_MOVES.find(c => c.id === selectedCamera);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Video Director Form */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Cinema Video Generator</h2>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Directed video synthesis powered by Higgsfield-style camera trajectories and multi-frame inputs.
              </p>
            </div>
            <span className="badge badge-gold">Pro Director Mode</span>
          </div>

          {/* Model Selector */}
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600', display: 'block', marginBottom: '6px' }}>
              Generation Engine
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
              {HIGGSFIELD_MODELS.map((m) => (
                <div
                  key={m.id}
                  onClick={() => setSelectedModel(m.id)}
                  className="glass-panel"
                  style={{
                    padding: '8px 12px',
                    cursor: 'pointer',
                    borderRadius: '8px',
                    border: selectedModel === m.id ? '2px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                    backgroundColor: selectedModel === m.id ? 'rgba(99, 102, 241, 0.12)' : 'transparent',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: '600', fontSize: '0.85rem' }}>{m.name}</span>
                    <span className="badge badge-indigo" style={{ fontSize: '0.65rem' }}>{m.badge}</span>
                  </div>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>{m.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Prompt input */}
          <textarea
            className="input-field"
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the action, scene dynamics, and subject movements..."
            style={{ fontSize: '0.95rem' }}
          />

          {/* Pro Camera Moves (Higgsfield Style) */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <Compass size={14} style={{ color: 'var(--accent-cyan)' }} />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>
                Camera Choreography & Flight Path
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '6px' }}>
              {PRO_CAMERA_MOVES.map((cam) => (
                <button
                  key={cam.id}
                  onClick={() => setSelectedCamera(cam.id)}
                  className={`btn btn-sm ${selectedCamera === cam.id ? 'btn-cyan' : 'btn-secondary'}`}
                  style={{ padding: '6px 8px', fontSize: '0.78rem', justifyContent: 'flex-start' }}
                >
                  {cam.label}
                </button>
              ))}
            </div>
          </div>

          {/* Media Frames: Start Frame & End Frame */}
          <div
            style={{
              padding: '12px 14px',
              borderRadius: '10px',
              backgroundColor: 'rgba(0,0,0,0.3)',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
                Frame Inputs (Image-to-Video & Morphing)
              </span>
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => setUseEndFrame(!useEndFrame)}
                style={{ fontSize: '0.72rem', color: 'var(--accent-cyan)' }}
              >
                {useEndFrame ? '− Disable End Frame' : '+ Add End Frame (Morph)'}
              </button>
            </div>

            <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
              {/* Start frame */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img
                  src={startFrame}
                  alt="Start Frame"
                  style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover', border: '1px solid var(--border-subtle)' }}
                />
                <label className="btn btn-secondary btn-sm" style={{ cursor: 'pointer', fontSize: '0.75rem' }}>
                  <Upload size={12} /> Start Frame
                  <input type="file" accept="image/*" onChange={handleStartFrameUpload} style={{ display: 'none' }} />
                </label>
              </div>

              {/* End frame if enabled */}
              {useEndFrame && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {endFrame ? (
                    <img
                      src={endFrame}
                      alt="End Frame"
                      style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover', border: '1px solid var(--accent-cyan)' }}
                    />
                  ) : (
                    <div style={{ width: '50px', height: '50px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      End
                    </div>
                  )}
                  <label className="btn btn-secondary btn-sm" style={{ cursor: 'pointer', fontSize: '0.75rem' }}>
                    <Upload size={12} /> End Frame
                    <input type="file" accept="image/*" onChange={handleEndFrameUpload} style={{ display: 'none' }} />
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Size & Duration bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Aspect:</span>
              {['9:16', '16:9'].map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setAspectRatio(fmt)}
                  className={`btn btn-sm ${aspectRatio === fmt ? 'btn-primary' : 'btn-ghost'}`}
                  style={{ padding: '4px 10px', fontSize: '0.78rem' }}
                >
                  {fmt === '9:16' ? '9:16 Vertical' : '16:9 Widescreen'}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Duration:</span>
              {['5s', '10s'].map((dur) => (
                <button
                  key={dur}
                  onClick={() => setDuration(dur)}
                  className={`btn btn-sm ${duration === dur ? 'btn-cyan' : 'btn-ghost'}`}
                  style={{ padding: '4px 10px', fontSize: '0.78rem' }}
                >
                  {dur}
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
            <Film size={18} /> {isGenerating ? 'Synthesizing Neural Camera Shot...' : 'Render Cinema Video'}
          </button>
        </div>
      </div>

      {/* Video Viewport */}
      <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            <span className="badge badge-indigo">{HIGGSFIELD_MODELS.find(m => m.id === selectedModel)?.name}</span>
            <span className="badge badge-cyan">{currentCam?.label}</span>
            <span className="badge badge-gold">{aspectRatio}</span>
          </div>
          <a href={activeVideoUrl} download="chitraleheri_video.mp4" className="btn btn-secondary btn-sm">
            <Download size={14} /> Download MP4
          </a>
        </div>

        <div
          style={{
            maxWidth: aspectRatio === '9:16' ? '320px' : '640px',
            width: '100%',
            borderRadius: '16px',
            overflow: 'hidden',
            backgroundColor: '#000000',
            boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
          }}
        >
          <video
            src={activeVideoUrl}
            autoPlay
            loop
            muted
            controls
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>
      </div>
    </div>
  );
}
