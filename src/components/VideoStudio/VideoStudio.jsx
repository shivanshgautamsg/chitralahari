import React, { useState } from 'react';
import { Film, Sparkles, Download, Play } from 'lucide-react';
import confetti from 'canvas-confetti';

const CAMERA_MOTIONS = [
  { id: 'zoom-in', label: 'Zoom In 🔍' },
  { id: 'pan-left', label: 'Pan Left ⬅️' },
  { id: 'orbit-360', label: '360° Orbit 🔄' },
  { id: 'static', label: 'Steady 📹' },
];

export default function VideoStudio({ incomingImageUrl }) {
  const [prompt, setPrompt] = useState('An astronaut walking across a crystal lake under dual moons, cinematic slow motion, 4k');
  const [selectedCamera, setSelectedCamera] = useState('zoom-in');
  const [aspectRatio, setAspectRatio] = useState('9:16');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeVideoUrl, setActiveVideoUrl] = useState('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4');

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setActiveVideoUrl('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4');
      confetti({ particleCount: 50, spread: 60 });
    }, 1200);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Video Generator Form */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>AI Video Generator</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Transform text prompts and still photos into fluid, high-resolution videos.
            </p>
          </div>

          <textarea
            className="input-field"
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe what happens in the video..."
            style={{ fontSize: '0.95rem' }}
          />

          {/* Camera Motion & Size */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Camera:</span>
              {CAMERA_MOTIONS.map((cam) => (
                <button
                  key={cam.id}
                  onClick={() => setSelectedCamera(cam.id)}
                  className={`btn btn-sm ${selectedCamera === cam.id ? 'btn-cyan' : 'btn-secondary'}`}
                  style={{ padding: '4px 10px', fontSize: '0.78rem' }}
                >
                  {cam.label}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Format:</span>
              {['9:16', '16:9'].map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setAspectRatio(fmt)}
                  className={`btn btn-sm ${aspectRatio === fmt ? 'btn-primary' : 'btn-ghost'}`}
                  style={{ padding: '4px 10px', fontSize: '0.78rem' }}
                >
                  {fmt === '9:16' ? '9:16 Short' : '16:9 Wide'}
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
            <Film size={18} /> {isGenerating ? 'Rendering Video...' : 'Generate Video'}
          </button>
        </div>
      </div>

      {/* Video Viewport */}
      <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <span className="badge badge-indigo">{aspectRatio} Format</span>
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
