import React, { useState, useEffect } from 'react';
import { X, Key, Shield, Check } from 'lucide-react';

export default function SettingsModal({ isOpen, onClose, onSaveKeys, currentKeys }) {
  const [keys, setKeys] = useState(currentKeys || {});
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setKeys(currentKeys || {});
  }, [currentKeys]);

  if (!isOpen) return null;

  const handleChange = (provider, val) => {
    setKeys(prev => ({ ...prev, [provider]: val }));
  };

  const handleSave = () => {
    onSaveKeys(keys);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 600);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '480px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
          backgroundColor: 'rgba(14, 17, 26, 0.95)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Key size={18} style={{ color: 'var(--accent-primary)' }} />
            <h3 style={{ fontSize: '1.15rem' }}>API Key Settings</h3>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          Chitraleheri works locally out of the box. You can optionally add your own cloud provider keys below:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              OpenAI API Key (Optional)
            </label>
            <input
              type="password"
              className="input-field"
              value={keys.openai || ''}
              onChange={(e) => handleChange('openai', e.target.value)}
              placeholder="sk-..."
            />
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              Google Gemini API Key (Optional)
            </label>
            <input
              type="password"
              className="input-field"
              value={keys.gemini || ''}
              onChange={(e) => handleChange('gemini', e.target.value)}
              placeholder="AIza..."
            />
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              ElevenLabs API Key (Optional)
            </label>
            <input
              type="password"
              className="input-field"
              value={keys.elevenlabs || ''}
              onChange={(e) => handleChange('elevenlabs', e.target.value)}
              placeholder="xi-api-..."
            />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <Shield size={14} style={{ color: 'var(--accent-emerald)' }} />
          <span>Keys are stored strictly in your local browser and never uploaded.</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
          <button className="btn btn-secondary btn-sm" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary btn-sm" onClick={handleSave}>
            {savedSuccess ? <Check size={14} /> : null}
            {savedSuccess ? 'Saved!' : 'Save Settings'}
          </button>
        </div>
      </div>
    </div>
  );
}
