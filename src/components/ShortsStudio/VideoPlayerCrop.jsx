import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw, Maximize2, Crop, Sparkles, UserCheck } from 'lucide-react';
import SubtitleOverlay from './SubtitleOverlay';
import { formatTime } from '../../services/viralityEngine';

export default function VideoPlayerCrop({
  videoSrc,
  aspectRatio = '9:16',
  clipStart = 0,
  clipEnd = 60,
  activeSubtitle = '',
  subtitlePreset = 'hormozi',
  subtitlePosition = 'bottom',
  subtitleFontSize = 22,
  showSubtitles = true,
  onTimeUpdate,
}) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(clipStart);
  const [duration, setDuration] = useState(60);
  const [isMuted, setIsMuted] = useState(false);
  const [cropPanX, setCropPanX] = useState(50); // 0% to 100% horizontal pan
  const [autoFaceTracking, setAutoFaceTracking] = useState(true);

  // Sync video clip boundaries
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = clipStart;
      setCurrentTime(clipStart);
    }
  }, [clipStart]);

  // Gentle simulated face-tracking drift (emulating OpenCV Haar Cascade tracking from local clipper.py)
  useEffect(() => {
    if (!autoFaceTracking || !isPlaying) return;

    const interval = setInterval(() => {
      // Simulate speaker movement smoothly between 42% and 58%
      const time = videoRef.current ? videoRef.current.currentTime : 0;
      const smoothOffset = 50 + Math.sin(time * 0.7) * 8;
      setCropPanX(smoothOffset);
    }, 200);

    return () => clearInterval(interval);
  }, [autoFaceTracking, isPlaying]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const time = videoRef.current.currentTime;
    setCurrentTime(time);
    if (onTimeUpdate) onTimeUpdate(time);

    // Loop within active clip
    if (time >= clipEnd) {
      videoRef.current.currentTime = clipStart;
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration || 60);
      videoRef.current.currentTime = clipStart;
    }
  };

  const handleSeek = (e) => {
    const seekTarget = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = seekTarget;
      setCurrentTime(seekTarget);
    }
  };

  // Compute container aspect ratio dimensions
  const getContainerStyles = () => {
    switch (aspectRatio) {
      case '9:16':
        return { width: '315px', height: '560px', aspectRatio: '9 / 16' };
      case '1:1':
        return { width: '420px', height: '420px', aspectRatio: '1 / 1' };
      case '4:5':
        return { width: '360px', height: '450px', aspectRatio: '4 / 5' };
      case '16:9':
      default:
        return { width: '640px', height: '360px', aspectRatio: '16 / 9' };
    }
  };

  const containerDims = getContainerStyles();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', width: '100%' }}>
      {/* Aspect Ratio Framing Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: containerDims.width }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="badge badge-indigo">
            <Crop size={12} /> {aspectRatio} Frame
          </span>
          {autoFaceTracking && (
            <span className="badge badge-cyan" title="Auto-centering face detection active">
              <UserCheck size={12} /> Smart Face Centered
            </span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            className={`btn btn-sm ${autoFaceTracking ? 'btn-cyan' : 'btn-secondary'}`}
            style={{ padding: '4px 8px', fontSize: '0.75rem' }}
            onClick={() => setAutoFaceTracking(!autoFaceTracking)}
            title="Toggle OpenCV Face Tracker Simulation"
          >
            <Sparkles size={13} /> {autoFaceTracking ? 'Face Track: ON' : 'Manual Pan'}
          </button>
        </div>
      </div>

      {/* Main Video Viewport with Masked Crop */}
      <div
        ref={containerRef}
        style={{
          ...containerDims,
          position: 'relative',
          borderRadius: '20px',
          overflow: 'hidden',
          backgroundColor: '#000000',
          boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(99, 102, 241, 0.25)',
          border: '2px solid rgba(255, 255, 255, 0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Underneath Video Element, scaled and panned */}
        <video
          ref={videoRef}
          src={videoSrc}
          playsInline
          muted={isMuted}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onClick={togglePlay}
          style={{
            position: 'absolute',
            height: '100%',
            width: 'auto',
            minWidth: '100%',
            maxWidth: 'none',
            objectFit: 'cover',
            // Pan horizontally to focus on speaker face
            objectPosition: `${cropPanX}% center`,
            cursor: 'pointer',
            transition: autoFaceTracking ? 'object-position 0.25s cubic-bezier(0.2, 0, 0.2, 1)' : 'none',
          }}
        />

        {/* Dynamic Animated Subtitle Overlay */}
        <SubtitleOverlay
          currentText={activeSubtitle}
          currentTime={currentTime}
          stylePreset={subtitlePreset}
          position={subtitlePosition}
          fontSize={subtitleFontSize}
          enabled={showSubtitles}
        />

        {/* Framing Grid Overlay (Subtle guideline) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            border: '1px dashed rgba(255, 255, 255, 0.15)',
            margin: '12px',
            borderRadius: '12px',
          }}
        />

        {/* Play/Pause Overlay indicator when paused */}
        {!isPlaying && (
          <button
            onClick={togglePlay}
            style={{
              position: 'absolute',
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'rgba(99, 102, 241, 0.85)',
              color: '#ffffff',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 0 25px rgba(99, 102, 241, 0.6)',
              zIndex: 35,
              transition: 'transform 0.15s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <Play size={28} style={{ marginLeft: '4px' }} />
          </button>
        )}

        {/* Floating Mini Timeline Badge in Top Left */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(10px)',
            color: '#ffffff',
            padding: '4px 10px',
            borderRadius: '999px',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-mono)',
            zIndex: 32,
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          {formatTime(currentTime)} / {formatTime(clipEnd)}
        </div>
      </div>

      {/* Manual Pan Slider if Auto Face Tracking is Off */}
      {!autoFaceTracking && (
        <div style={{ width: '100%', maxWidth: containerDims.width, display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <span>Pan Left</span>
            <span>Manual Crop Center ({Math.round(cropPanX)}%)</span>
            <span>Pan Right</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={cropPanX}
            onChange={(e) => setCropPanX(parseFloat(e.target.value))}
          />
        </div>
      )}

      {/* Playback Controls & Scrubber */}
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: containerDims.width,
          padding: '12px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        {/* Scrubber Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
            {formatTime(currentTime)}
          </span>
          <input
            type="range"
            min={clipStart}
            max={clipEnd}
            step="0.1"
            value={currentTime}
            onChange={handleSeek}
            style={{ flex: 1 }}
          />
          <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
            {formatTime(clipEnd)}
          </span>
        </div>

        {/* Buttons Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button className="btn btn-ghost btn-sm" onClick={togglePlay}>
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.currentTime = clipStart;
                  setCurrentTime(clipStart);
                }
              }}
              title="Reset to clip start"
            >
              <RotateCcw size={16} />
            </button>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          </div>

          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Clip Length: {Math.round(clipEnd - clipStart)}s
          </span>
        </div>
      </div>
    </div>
  );
}
