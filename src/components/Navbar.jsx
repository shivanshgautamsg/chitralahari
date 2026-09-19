import React from 'react';
import { Scissors, Image as ImageIcon, Video, Mic2, Settings, Sparkles } from 'lucide-react';

export const STUDIOS = [
  { id: 'shorts', name: 'Shorts Maker', icon: Scissors },
  { id: 'image', name: 'Image Creator', icon: ImageIcon },
  { id: 'video', name: 'Video Generator', icon: Video },
  { id: 'lipsync', name: 'Talking Avatar', icon: Mic2 },
];

export default function Navbar({ activeTab, onSelectTab, onOpenSettings }) {
  return (
    <header
      className="glass-panel"
      style={{
        position: 'sticky',
        top: '12px',
        zIndex: 50,
        margin: '0 16px 24px 16px',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        backgroundColor: 'rgba(10, 13, 20, 0.85)',
      }}
    >
      {/* Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)',
          }}
        >
          <Sparkles size={20} color="#ffffff" />
        </div>
        <div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: '800', letterSpacing: '-0.02em', background: 'linear-gradient(90deg, #ffffff, #cbd5e1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Chitraleheri
          </h1>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            Simple AI Video & Image Studio
          </p>
        </div>
      </div>

      {/* Simplified Navigation Tabs */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.04)', padding: '4px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
        {STUDIOS.map((studio) => {
          const Icon = studio.icon;
          const isActive = activeTab === studio.id;

          return (
            <button
              key={studio.id}
              onClick={() => onSelectTab(studio.id)}
              className="btn btn-sm"
              style={{
                gap: '8px',
                padding: '8px 16px',
                fontSize: '0.85rem',
                borderRadius: '8px',
                backgroundColor: isActive ? 'var(--accent-primary)' : 'transparent',
                color: isActive ? '#ffffff' : 'var(--text-secondary)',
                fontWeight: isActive ? '600' : '500',
                border: 'none',
                boxShadow: isActive ? '0 2px 10px rgba(99, 102, 241, 0.4)' : 'none',
                transition: 'all 0.2s ease',
              }}
            >
              <Icon size={16} />
              <span>{studio.name}</span>
            </button>
          );
        })}
      </nav>

      {/* Right Toolbar: Settings */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          className="btn btn-secondary btn-sm"
          onClick={onOpenSettings}
          style={{ gap: '6px', fontSize: '0.8rem', padding: '6px 12px' }}
        >
          <Settings size={15} /> Settings
        </button>
      </div>
    </header>
  );
}
