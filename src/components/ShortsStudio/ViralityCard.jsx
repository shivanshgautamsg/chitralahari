import React from 'react';
import { Flame, Play, Clock, Sparkles, CheckCircle2, Share2, Download } from 'lucide-react';
import { formatTime } from '../../services/viralityEngine';

export default function ViralityCard({
  highlight,
  isActive,
  onSelect,
  onExport,
}) {
  const { rank, title, start_time, end_time, duration, score, hook_sentence, virality_reason, signals = [] } = highlight;

  // Determine score color badge
  const getScoreBadge = () => {
    if (score >= 90) {
      return {
        className: 'badge badge-gold',
        label: 'Viral Gold',
        icon: <Flame size={13} fill="#fbbf24" />,
      };
    } else if (score >= 80) {
      return {
        className: 'badge badge-indigo',
        label: 'High Heat',
        icon: <Sparkles size={13} />,
      };
    } else {
      return {
        className: 'badge badge-cyan',
        label: 'Solid Clip',
        icon: <CheckCircle2 size={13} />,
      };
    }
  };

  const badgeInfo = getScoreBadge();

  return (
    <div
      onClick={onSelect}
      className={`glass-panel`}
      style={{
        padding: '16px',
        cursor: 'pointer',
        border: isActive ? '2px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
        backgroundColor: isActive ? 'rgba(99, 102, 241, 0.08)' : 'var(--bg-surface-glass)',
        boxShadow: isActive ? '0 0 20px rgba(99, 102, 241, 0.25)' : 'none',
        transition: 'all 0.2s ease',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      {/* Header: Rank, Title, Score */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '8px',
              backgroundColor: isActive ? 'var(--accent-primary)' : 'rgba(255, 255, 255, 0.08)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '700',
              fontSize: '0.875rem',
            }}
          >
            #{rank}
          </div>
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: '600', color: isActive ? '#ffffff' : 'var(--text-primary)' }}>
              {title}
            </h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                {formatTime(start_time)} → {formatTime(end_time)} ({duration}s)
              </span>
            </div>
          </div>
        </div>

        {/* Score pill */}
        <div style={{ textAlign: 'right' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: '800', fontFamily: 'var(--font-heading)', color: score >= 90 ? '#fbbf24' : '#818cf8' }}>
              {score}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>/100</span>
          </div>
          <span className={badgeInfo.className} style={{ marginTop: '2px' }}>
            {badgeInfo.icon} {badgeInfo.label}
          </span>
        </div>
      </div>

      {/* Opening Hook Quote Card */}
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          borderLeft: '3px solid #f59e0b',
          borderRadius: '0 8px 8px 0',
          padding: '8px 12px',
        }}
      >
        <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#f59e0b', fontWeight: '700', display: 'block', marginBottom: '2px' }}>
          Opening Hook (0–3s Retention)
        </span>
        <p style={{ fontSize: '0.85rem', fontStyle: 'italic', color: '#f8fafc', lineHeight: 1.4 }}>
          "{hook_sentence}"
        </p>
      </div>

      {/* Why This Is Viral */}
      <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
        <strong style={{ color: 'var(--text-primary)' }}>Why it works: </strong>
        {virality_reason}
      </div>

      {/* Signal Tags & Action Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {signals.map((sig, i) => (
            <span key={i} className="badge badge-indigo" style={{ fontSize: '0.7rem', padding: '2px 7px' }}>
              {sig}
            </span>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className={`btn btn-sm ${isActive ? 'btn-primary' : 'btn-secondary'}`}
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
          >
            <Play size={13} fill={isActive ? '#ffffff' : 'none'} /> {isActive ? 'Selected' : 'Preview'}
          </button>
          <button
            className="btn btn-sm btn-cyan"
            onClick={(e) => {
              e.stopPropagation();
              onExport(highlight);
            }}
            title="Download this viral short"
          >
            <Download size={13} /> Export
          </button>
        </div>
      </div>
    </div>
  );
}
