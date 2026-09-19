import React, { useState } from 'react';
import { Clapperboard, Sparkles, Film, Camera, Compass, Download, Play } from 'lucide-react';
import confetti from 'canvas-confetti';

const SAMPLE_STORYBOARDS = [
  {
    title: 'Echoes of Neo-Kyoto',
    genre: 'Cinematic Sci-Fi',
    premise: 'A cybernetic artisan discovers an ancient analog signal hidden beneath the holographic towers.',
    scenes: [
      {
        sceneNum: 1,
        title: 'The Skyline Approach (Hook)',
        duration: '4s',
        lens: '16mm Ultra-Wide',
        camera: 'FPV Drone Dive',
        lighting: 'Cyberpunk Neon & Mist',
        aperture: 'f/2.8 Deep Perspective',
        prompt: 'Futuristic solar glider soaring through rainy neon illuminated skyscrapers of Neo-Kyoto at twilight, anamorphic lens flares',
        imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
        voiceover: 'Beneath thirty levels of synthetic light, an analog pulse started beating.',
      },
      {
        sceneNum: 2,
        title: 'The Underground Discovery (Tension)',
        duration: '5s',
        lens: '35mm Anamorphic',
        camera: 'Dolly Zoom (Vertigo)',
        lighting: 'Volumetric Golden Haze',
        aperture: 'f/1.4 Cinematic Isolation',
        prompt: 'Robotic investigator inspecting a glowing biological glass cylinder covered in moss inside a subterranean cyber temple',
        imageUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
        voiceover: 'It was not code. It was a recorded human voice from before the great silence.',
      },
      {
        sceneNum: 3,
        title: 'The Revelation (Climax)',
        duration: '5s',
        lens: '85mm Portrait Prime',
        camera: '360° Slow Orbit',
        lighting: 'Warm Directional Sun Flare',
        aperture: 'f/1.2 Ultra Shallow Bokeh',
        prompt: 'Close up cinematic portrait of the android opening its optical visor as a real ray of natural sunlight reflects in glass iris',
        imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
        voiceover: 'The city was never dead. It was simply waiting to be remembered.',
      },
    ]
  }
];

export default function CinemaStudio({ onSendToVideo }) {
  const [premise, setPremise] = useState('An interstellar botanist awakens a slumbering sentient forest on an obsidian moon.');
  const [storyboard, setStoryboard] = useState(SAMPLE_STORYBOARDS[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeScene, setActiveScene] = useState(0);

  const handleGenerateStory = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      confetti({ particleCount: 50, spread: 60 });
    }, 1200);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header & Premise Input */}
      <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Cinema Director & Storyboard</h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Multi-scene cinematic storytelling with Hollywood camera choreography, lens focal lengths, and lighting rigs.
            </p>
          </div>
          <span className="badge badge-gold">Director Shot List</span>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            className="input-field"
            value={premise}
            onChange={(e) => setPremise(e.target.value)}
            placeholder="Type any film premise or story idea..."
            style={{ fontSize: '0.95rem' }}
          />
          <button
            className="btn btn-primary"
            onClick={handleGenerateStory}
            disabled={isGenerating}
            style={{ whiteSpace: 'nowrap', padding: '0 20px' }}
          >
            <Sparkles size={16} /> {isGenerating ? 'Directing...' : 'Generate 3-Scene Film'}
          </button>
        </div>
      </div>

      {/* Storyboard 3-Scene Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '18px' }}>
        {storyboard.scenes.map((scene, idx) => (
          <div
            key={scene.sceneNum}
            className="glass-panel"
            style={{
              padding: '18px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              border: activeScene === idx ? '2px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
              backgroundColor: activeScene === idx ? 'rgba(99, 102, 241, 0.08)' : 'var(--bg-surface-glass)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onClick={() => setActiveScene(idx)}
          >
            {/* Scene Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="badge badge-rose">Scene {scene.sceneNum} • {scene.duration}</span>
              <span className="badge badge-indigo">{scene.lens}</span>
            </div>

            <h4 style={{ fontSize: '1rem', fontWeight: '700' }}>{scene.title}</h4>

            {/* Visual Still */}
            <div
              style={{
                width: '100%',
                height: '180px',
                borderRadius: '12px',
                overflow: 'hidden',
                backgroundColor: '#000000',
                position: 'relative',
              }}
            >
              <img
                src={scene.imageUrl}
                alt={scene.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '8px',
                  left: '8px',
                  backgroundColor: 'rgba(0,0,0,0.75)',
                  backdropFilter: 'blur(6px)',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  fontSize: '0.7rem',
                  color: '#ffffff',
                }}
              >
                {scene.camera}
              </div>
            </div>

            {/* Camera & Optics Details */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              <div><strong>Lighting:</strong> {scene.lighting}</div>
              <div><strong>Aperture:</strong> {scene.aperture}</div>
            </div>

            {/* Voiceover Script */}
            <div
              style={{
                backgroundColor: 'rgba(0,0,0,0.35)',
                padding: '8px 12px',
                borderRadius: '8px',
                borderLeft: '3px solid var(--accent-gold)',
                fontSize: '0.8rem',
                fontStyle: 'italic',
                color: '#ffffff',
              }}
            >
              "{scene.voiceover}"
            </div>

            <button
              className="btn btn-secondary btn-sm"
              style={{ width: '100%', marginTop: '4px' }}
              onClick={(e) => {
                e.stopPropagation();
                if (onSendToVideo) {
                  onSendToVideo(scene.imageUrl);
                } else {
                  confetti({ particleCount: 30, spread: 40 });
                  alert(`Scene ${scene.sceneNum} camera setup sent to Video Generator!`);
                }
              }}
            >
              <Film size={13} /> Render This Scene Shot →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
