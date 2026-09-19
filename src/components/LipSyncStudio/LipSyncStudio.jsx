import React, { useState } from 'react';
import { Mic, Volume2, Sparkles, Upload } from 'lucide-react';
import confetti from 'canvas-confetti';

const AVATAR_PRESETS = [
  { id: 'av-1', name: 'Sophia', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80' },
  { id: 'av-2', name: 'Marcus', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80' },
  { id: 'av-3', name: 'Elena', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80' },
  { id: 'av-4', name: 'David', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80' },
];

export default function LipSyncStudio({ initialAvatarUrl }) {
  const [selectedAvatar, setSelectedAvatar] = useState(initialAvatarUrl || AVATAR_PRESETS[0].url);
  const [speechText, setSpeechText] = useState('Welcome to Chitraleheri. This avatar was animated with voice and lip synchronization.');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [mouthOffset, setMouthOffset] = useState(0);

  const handleSpeak = () => {
    if (isSpeaking) {
      window.speechSynthesis?.cancel();
      setIsSpeaking(false);
      setMouthOffset(0);
      return;
    }

    if (!window.speechSynthesis) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    setIsSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(speechText);
    utterance.rate = 1.0;

    const interval = setInterval(() => {
      setMouthOffset(Math.sin(Date.now() * 0.02) * 5 + 3);
    }, 80);

    utterance.onend = () => {
      clearInterval(interval);
      setIsSpeaking(false);
      setMouthOffset(0);
    };

    utterance.onerror = () => {
      clearInterval(interval);
      setIsSpeaking(false);
      setMouthOffset(0);
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleCustomAvatar = (e) => {
    const file = e.target.files?.[0];
    if (file) setSelectedAvatar(URL.createObjectURL(file));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Talking Character Avatar</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Choose a portrait and type dialogue to animate speech and lip movements.
            </p>
          </div>

          {/* Avatar selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              {AVATAR_PRESETS.map((av) => (
                <div
                  key={av.id}
                  onClick={() => setSelectedAvatar(av.url)}
                  style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: selectedAvatar === av.url ? '2px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                  }}
                >
                  <img src={av.url} alt={av.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>

            <label className="btn btn-secondary btn-sm" style={{ cursor: 'pointer' }}>
              <Upload size={13} /> Upload Photo
              <input type="file" accept="image/*" onChange={handleCustomAvatar} style={{ display: 'none' }} />
            </label>
          </div>

          {/* Dialogue */}
          <textarea
            className="input-field"
            rows={3}
            value={speechText}
            onChange={(e) => setSpeechText(e.target.value)}
            placeholder="Type what this character should say..."
            style={{ fontSize: '0.95rem' }}
          />

          <button
            className={`btn ${isSpeaking ? 'btn-cyan' : 'btn-primary'} btn-lg`}
            style={{ width: '100%', height: '46px' }}
            onClick={handleSpeak}
          >
            <Volume2 size={18} /> {isSpeaking ? 'Stop Speaking' : 'Animate & Speak'}
          </button>
        </div>
      </div>

      {/* Portrait Canvas View */}
      <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
        <div
          style={{
            width: '320px',
            height: '460px',
            borderRadius: '16px',
            overflow: 'hidden',
            backgroundColor: '#000000',
            position: 'relative',
            boxShadow: isSpeaking ? '0 0 30px rgba(99, 102, 241, 0.4)' : '0 20px 40px rgba(0,0,0,0.6)',
          }}
        >
          <img
            src={selectedAvatar}
            alt="Avatar"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: isSpeaking ? `scale(1.02) translateY(${mouthOffset * 0.4}px)` : 'scale(1)',
              transition: 'transform 0.08s ease-out',
            }}
          />

          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              insetInline: '12px',
              backgroundColor: 'rgba(0,0,0,0.7)',
              backdropFilter: 'blur(8px)',
              padding: '8px 12px',
              borderRadius: '8px',
              fontSize: '0.8rem',
              color: '#ffffff',
              textAlign: 'center',
            }}
          >
            "{speechText}"
          </div>
        </div>
      </div>
    </div>
  );
}
