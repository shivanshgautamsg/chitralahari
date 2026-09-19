import React, { useState } from 'react';
import { Clapperboard, Sparkles, Film, ArrowRight, Play, Download, Wand2, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

const SAMPLE_STORYBOARDS = [
  {
    title: 'The Cybernetic Heist',
    genre: 'Sci-Fi Thriller',
    premise: 'A rogue AI specialist attempts to extract human memory data from an orbital fortress.',
    scenes: [
      {
        sceneNum: 1,
        title: 'The Approach (Hook)',
        duration: '4s',
        camera: 'Drone Wide Tracking',
        prompt: 'Stealth spacecraft flying through the misty neon ring of Saturn towards a glowing orbital fortress, cinematic anamorphic 35mm film',
        imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
        voiceover: 'They said human memories were safe in orbit. They lied.',
      },
      {
        sceneNum: 2,
        title: 'The Infiltration (Tension)',
        duration: '5s',
        camera: 'Slow Medium Push',
        prompt: 'Futuristic agent in obsidian stealth suit hacking a glass holographic terminal with digital light reflection in visor',
        imageUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
        voiceover: 'Three seconds to bypass the neural firewall before security shuts down life support.',
      },
      {
        sceneNum: 3,
        title: 'The Extraction (Climax)',
        duration: '5s',
        camera: 'Dynamic Low-Angle Whip Pan',
        prompt: 'Glowing data orb illuminating the dark corridor as alarms pulse crimson, dust particles floating in zero gravity',
        imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
        voiceover: 'Downloaded. Now the only question is whether the ship survives re-entry.',
      },
    ]
  }
];

export default function CinemaStudio() {
  const [premise, setPremise] = useState('A rogue synthetic detective discovers a forgotten biological city beneath New York in 2099.');
  const [storyboard, setStoryboard] = useState(SAMPLE_STORYBOARDS[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeScene, setActiveScene] = useState(0);

  const handleGenerateStory = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      confetti({ particleCount: 50, spread: 60 });
    }, 1400);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="glass-panel" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="pulse-dot" style={{ backgroundColor: '#f43f5e', boxShadow: '0 0 8px #f43f5e' }} />
              <h3 style={{ fontSize: '1.25rem' }}>Cinema & Storyboard Studio</h3>
              <span className="badge badge-rose">Infinite Budget Workflow</span>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Generate cohesive multi-scene short films from a single premise — shot lists, visual prompts, and voiceover scripts.
            </p>
          </div>
          <span className="badge badge-gold">Hollywood Quality</span>
        </div>
      </div>

      {/* Premise Input Bar */}
      <div className="glass-panel" style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>Story Premise / Film Concept</span>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            className="input-field"
            value={premise}
            onChange={(e) => setPremise(e.target.value)}
            placeholder="e.g. Ancient explorer discovers a lost underwater cyber city..."
          />
          <button
            className="btn btn-primary"
            onClick={handleGenerateStory}
            disabled={isGenerating}
            style={{ whiteSpace: 'nowrap' }}
          >
            <Sparkles size={16} /> {isGenerating ? 'Writing Storyboard...' : 'Generate 3-Scene Film'}
          </button>
        </div>
      </div>

      {/* Storyboard Scenes Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {storyboard.scenes.map((scene, idx) => (
          <div
            key={scene.sceneNum}
            className="glass-panel"
            style={{
              padding: '18px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              border: activeScene === idx ? '2px solid #f43f5e' : '1px solid var(--border-subtle)',
              backgroundColor: activeScene === idx ? 'rgba(244, 63, 94, 0.05)' : 'var(--bg-surface-glass)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onClick={() => setActiveScene(idx)}
          >
            {/* Scene Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="badge badge-rose">Scene #{scene.sceneNum} ({scene.duration})</span>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                {scene.camera}
              </span>
            </div>

            <h4 style={{ fontSize: '1rem' }}>{scene.title}</h4>

            {/* Visual Thumbnail */}
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
                  right: '8px',
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  backdropFilter: 'blur(4px)',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  fontSize: '0.7rem',
                  color: '#ffffff',
                }}
              >
                {scene.camera}
              </div>
            </div>

            {/* Visual Prompt Description */}
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              <strong style={{ color: 'var(--text-primary)' }}>Visual Prompt: </strong>
              "{scene.prompt}"
            </div>

            {/* Voiceover Card */}
            <div
              style={{
                backgroundColor: 'rgba(0,0,0,0.35)',
                padding: '8px 12px',
                borderRadius: '8px',
                borderLeft: '3px solid #f43f5e',
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
                confetti({ particleCount: 30, spread: 40 });
                alert(`Scene ${scene.sceneNum} visual sent to Video Studio!`);
              }}
            >
              <Film size={13} /> Render Scene Video
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
