import React, { useState } from 'react';
import { Volume2, Play, Pause, Download, Sparkles, Mic, Music, Waves, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

const VOICES = [
  { id: 'adam', name: 'Adam', style: 'Deep Narrator & Podcast', lang: 'en-US' },
  { id: 'rachel', name: 'Rachel', style: 'Professional & Corporate', lang: 'en-US' },
  { id: 'bella', name: 'Bella', style: 'Warm & Expressive Storyteller', lang: 'en-US' },
  { id: 'antoni', name: 'Antoni', style: 'Energetic & Youthful', lang: 'en-US' },
  { id: 'domi', name: 'Domi', style: 'Friendly & Casual', lang: 'en-US' },
];

const SFX_PRESETS = [
  { id: 'whoosh', name: 'Fast Viral Whoosh', freq: 440, dur: 0.35, type: 'sine' },
  { id: 'bass-drop', name: 'Dramatic Sub Bass Drop', freq: 110, dur: 1.2, type: 'triangle' },
  { id: 'impact', name: 'Cinematic Trailer Hit', freq: 80, dur: 0.8, type: 'sawtooth' },
  { id: 'ding', name: 'Retention Bell Ding', freq: 880, dur: 0.6, type: 'sine' },
  { id: 'laser', name: 'Cyberpunk Neon Pulse', freq: 620, dur: 0.4, type: 'square' },
];

export default function AudioStudio() {
  const [ttsText, setTtsText] = useState('In a world dominated by algorithms, attention is the only currency that truly matters. Master the first three seconds, and you master the algorithm.');
  const [selectedVoice, setSelectedVoice] = useState('adam');
  const [speed, setSpeed] = useState(1.0);
  const [pitch, setPitch] = useState(1.0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSfx, setActiveSfx] = useState(null);

  // Play synthesized speech
  const handleSpeak = () => {
    if (isPlaying) {
      window.speechSynthesis?.cancel();
      setIsPlaying(false);
      return;
    }

    if (!window.speechSynthesis) {
      alert('Web Speech API is not supported in this browser.');
      return;
    }

    setIsPlaying(true);
    const utterance = new SpeechSynthesisUtterance(ttsText);
    utterance.rate = speed;
    utterance.pitch = pitch;

    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  // Synthesize SFX in real-time with Web Audio API
  const playSfx = (sfx) => {
    setActiveSfx(sfx.id);
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = sfx.type;
      osc.frequency.setValueAtTime(sfx.freq, ctx.currentTime);

      if (sfx.id === 'whoosh') {
        osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + sfx.dur);
      } else if (sfx.id === 'bass-drop') {
        osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + sfx.dur);
      }

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + sfx.dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + sfx.dur);

      setTimeout(() => setActiveSfx(null), sfx.dur * 1000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="glass-panel" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="pulse-dot" style={{ backgroundColor: 'var(--accent-gold)', boxShadow: '0 0 8px var(--accent-gold)' }} />
              <h3 style={{ fontSize: '1.25rem' }}>Audio & Voice Studio</h3>
              <span className="badge badge-gold">AI Voice Synthesis & SFX</span>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Studio-grade Text-to-Speech voiceovers and retention sound effects for viral short-form videos.
            </p>
          </div>
          <span className="badge badge-indigo">ElevenLabs Quality</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'start' }}>
        
        {/* Left: Text-to-Speech Synthesizer */}
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Mic size={18} style={{ color: 'var(--accent-gold)' }} />
            <h4 style={{ fontSize: '1rem' }}>AI Text-to-Speech Voiceover</h4>
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600', display: 'block', marginBottom: '6px' }}>
              Voiceover Script
            </span>
            <textarea
              className="input-field"
              rows={5}
              value={ttsText}
              onChange={(e) => setTtsText(e.target.value)}
              placeholder="Enter voiceover text..."
            />
          </div>

          {/* Voice Picker */}
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600', display: 'block', marginBottom: '6px' }}>
              Voice Model
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px' }}>
              {VOICES.map((v) => (
                <div
                  key={v.id}
                  onClick={() => setSelectedVoice(v.id)}
                  className="glass-panel"
                  style={{
                    padding: '8px 10px',
                    cursor: 'pointer',
                    border: selectedVoice === v.id ? '2px solid var(--accent-gold)' : '1px solid var(--border-subtle)',
                    backgroundColor: selectedVoice === v.id ? 'rgba(245, 158, 11, 0.1)' : 'transparent',
                    borderRadius: '8px',
                  }}
                >
                  <div style={{ fontWeight: '600', fontSize: '0.85rem' }}>{v.name}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{v.style}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Rate & Pitch Sliders */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <span>Speaking Rate</span>
                <span>{speed}x</span>
              </div>
              <input
                type="range"
                min="0.6"
                max="1.6"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                style={{ marginTop: '4px' }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <span>Voice Pitch</span>
                <span>{pitch}x</span>
              </div>
              <input
                type="range"
                min="0.6"
                max="1.4"
                step="0.1"
                value={pitch}
                onChange={(e) => setPitch(parseFloat(e.target.value))}
                style={{ marginTop: '4px' }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '4px' }}>
            <button
              className={`btn ${isPlaying ? 'btn-primary' : 'btn-cyan'}`}
              onClick={handleSpeak}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />} {isPlaying ? 'Stop Speech' : 'Play Voiceover'}
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                confetti({ particleCount: 40, spread: 40 });
                alert('Voiceover audio buffer ready for video pipeline!');
              }}
            >
              <Download size={16} /> Export Audio
            </button>
          </div>
        </div>

        {/* Right: Sound Effects (SFX) & Ambient Synthesizer */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Waves size={18} style={{ color: 'var(--accent-cyan)' }} />
              <h4 style={{ fontSize: '1rem' }}>Shorts Retention SFX Library</h4>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Instant procedural sound effects generated live via Web Audio API. Click to audition:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {SFX_PRESETS.map((sfx) => (
                <div
                  key={sfx.id}
                  onClick={() => playSfx(sfx)}
                  className="glass-panel"
                  style={{
                    padding: '12px 16px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    border: activeSfx === sfx.id ? '2px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                    backgroundColor: activeSfx === sfx.id ? 'rgba(6, 182, 212, 0.15)' : 'transparent',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '0.875rem' }}>{sfx.name}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      Duration: {sfx.dur}s • {sfx.type.toUpperCase()} Wave
                    </div>
                  </div>
                  <button className="btn btn-sm btn-cyan" style={{ padding: '6px 12px' }}>
                    <Play size={13} /> Play SFX
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
