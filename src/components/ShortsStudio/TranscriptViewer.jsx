import React, { useState } from 'react';
import { Search, FileText, CheckCircle, Clock } from 'lucide-react';
import { formatTime } from '../../services/viralityEngine';

export default function TranscriptViewer({
  transcript = { segments: [] },
  currentTime = 0,
  clipStart = 0,
  clipEnd = 60,
  onSeekTime,
}) {
  const [searchTerm, setSearchTerm] = useState('');

  const segments = transcript.segments || [];

  const filteredSegments = segments.filter(s =>
    s.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="glass-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '420px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FileText size={16} className="text-accent-primary" style={{ color: 'var(--accent-primary)' }} />
          <h4 style={{ fontSize: '0.9rem', fontWeight: '600' }}>Whisper Audio Transcript</h4>
          <span className="badge badge-indigo">{segments.length} segments</span>
        </div>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          Click any timestamp to jump
        </span>
      </div>

      {/* Search Bar */}
      <div style={{ position: 'relative' }}>
        <Search
          size={14}
          style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
        />
        <input
          type="text"
          className="input-field"
          style={{ paddingLeft: '34px', fontSize: '0.8125rem' }}
          placeholder="Search keywords in transcript..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Scrollable Segments List */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          overflowY: 'auto',
          maxHeight: '300px',
          paddingRight: '6px',
        }}
      >
        {filteredSegments.map((seg) => {
          const isInsideActiveClip = seg.start >= clipStart && seg.end <= clipEnd;
          const isCurrentlyPlaying = currentTime >= seg.start && currentTime <= seg.end;

          return (
            <div
              key={seg.id}
              onClick={() => onSeekTime(seg.start)}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                padding: '8px 10px',
                borderRadius: '8px',
                cursor: 'pointer',
                backgroundColor: isCurrentlyPlaying
                  ? 'rgba(99, 102, 241, 0.2)'
                  : isInsideActiveClip
                  ? 'rgba(255, 255, 255, 0.04)'
                  : 'transparent',
                borderLeft: isCurrentlyPlaying
                  ? '3px solid var(--accent-primary)'
                  : isInsideActiveClip
                  ? '3px solid #10b981'
                  : '3px solid transparent',
                transition: 'background-color 0.15s ease',
              }}
            >
              <span
                style={{
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  color: isCurrentlyPlaying ? 'var(--accent-primary)' : 'var(--text-muted)',
                  whiteSpace: 'nowrap',
                  paddingTop: '2px',
                }}
              >
                {formatTime(seg.start)}
              </span>
              <p
                style={{
                  fontSize: '0.8125rem',
                  lineHeight: 1.4,
                  color: isCurrentlyPlaying ? '#ffffff' : isInsideActiveClip ? '#e2e8f0' : 'var(--text-secondary)',
                  fontWeight: isCurrentlyPlaying ? '600' : '400',
                }}
              >
                {seg.text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
