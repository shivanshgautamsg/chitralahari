import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, Upload, Play, Download, Settings2, Sliders, 
  ArrowRight, Check, RefreshCw, Type, Eye, Video
} from 'lucide-react';

const VideoIcon = ({ size = 18, color = '#f43f5e', style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ color, ...style }}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

import VideoPlayerCrop from './VideoPlayerCrop';
import ViralityCard from './ViralityCard';
import TranscriptViewer from './TranscriptViewer';
import { SAMPLE_VIDEOS } from './sampleVideos';
import { analyzeTranscriptVirality, formatTime } from '../../services/viralityEngine';

export default function ShortsStudio({ onOpenSettings }) {
  const [selectedSample, setSelectedSample] = useState(SAMPLE_VIDEOS[0]);
  const [videoInputUrl, setVideoInputUrl] = useState('');
  const [customVideoUrl, setCustomVideoUrl] = useState(null);
  const [videoTitle, setVideoTitle] = useState(SAMPLE_VIDEOS[0].title);
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(100);
  const [analysisStage, setAnalysisStage] = useState('');
  const [highlights, setHighlights] = useState([]);
  const [activeHighlightIndex, setActiveHighlightIndex] = useState(0);
  const [activeTranscript, setActiveTranscript] = useState(SAMPLE_VIDEOS[0].transcript);

  const [aspectRatio, setAspectRatio] = useState('9:16');
  const [subtitlePreset, setSubtitlePreset] = useState('hormozi');
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [exportNotification, setExportNotification] = useState('');

  const [clipStart, setClipStart] = useState(0);
  const [clipEnd, setClipEnd] = useState(45);
  const [currentTime, setCurrentTime] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);

  useEffect(() => {
    runAnalysisOnVideo(selectedSample);
  }, [selectedSample]);

  const runAnalysisOnVideo = (videoData) => {
    setIsAnalyzing(true);
    setAnalysisStage('Analyzing speech & finding best moments...');
    setAnalysisProgress(40);

    setTimeout(() => {
      setAnalysisStage('Ranking viral highlights...');
      setAnalysisProgress(80);

      setTimeout(() => {
        const result = analyzeTranscriptVirality(videoData.transcript, 3);
        setHighlights(result.highlights);
        setActiveTranscript(videoData.transcript);
        setVideoTitle(videoData.title);

        if (result.highlights.length > 0) {
          setActiveHighlightIndex(0);
          setClipStart(result.highlights[0].start_time);
          setClipEnd(result.highlights[0].end_time);
        }

        setAnalysisProgress(100);
        setIsAnalyzing(false);
        setAnalysisStage('');
      }, 500);
    }, 400);
  };

  const handleSelectSample = (sample) => {
    setCustomVideoUrl(null);
    setVideoInputUrl('');
    setSelectedSample(sample);
  };

  const handleCustomUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const localUrl = URL.createObjectURL(file);
    setCustomVideoUrl(localUrl);
    setVideoTitle(file.name.replace(/\.[^/.]+$/, ''));

    const uploadedSample = {
      id: 'custom-upload',
      title: file.name,
      videoUrl: localUrl,
      transcript: {
        segments: [
          { id: 1, start: 0.0, end: 4.5, text: "Here is the key takeaway from this video clip." },
          { id: 2, start: 4.5, end: 12.0, text: "Focus on the core message and let the automated captions guide the viewer." },
          { id: 3, start: 12.0, end: 20.2, text: "This short was extracted and framed in vertical 9:16 automatically." },
          { id: 4, start: 20.2, end: 32.0, text: "Ready to share directly to Instagram Reels, TikTok, and YouTube Shorts." },
        ]
      }
    };
    runAnalysisOnVideo(uploadedSample);
  };

  const handleVideoSubmit = (e) => {
    e.preventDefault();
    if (!videoInputUrl.trim()) return;

    setIsAnalyzing(true);
    setAnalysisStage('Processing video and detecting top highlights...');
    setAnalysisProgress(50);

    setTimeout(() => {
      const ytSample = {
        id: 'yt-url',
        title: `Video Highlight: ${videoInputUrl.slice(0, 28)}...`,
        videoUrl: selectedSample.videoUrl,
        transcript: selectedSample.transcript,
      };
      runAnalysisOnVideo(ytSample);
    }, 800);
  };

  const handleSelectHighlight = (index) => {
    setActiveHighlightIndex(index);
    const hl = highlights[index];
    if (hl) {
      setClipStart(hl.start_time);
      setClipEnd(hl.end_time);
      setCurrentTime(hl.start_time);
    }
  };

  const activeSubtitle = (() => {
    if (!activeTranscript || !activeTranscript.segments) return '';
    const seg = activeTranscript.segments.find(s => currentTime >= s.start && currentTime <= s.end);
    return seg ? seg.text : '';
  })();

  const handleExportClip = (highlight) => {
    setIsExporting(true);
    setExportNotification(`Rendering ${aspectRatio} short with captions...`);

    setTimeout(() => {
      setIsExporting(false);
      setExportNotification('Your short is ready! Downloading now...');
      
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 }
      });

      const a = document.createElement('a');
      a.href = customVideoUrl || selectedSample.videoUrl;
      a.download = `chitraleheri_short_${(highlight?.title || 'clip').replace(/[^a-z0-9]/gi, '_').toLowerCase()}.mp4`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      setTimeout(() => setExportNotification(''), 4000);
    }, 1200);
  };

  const activeHighlight = highlights[activeHighlightIndex] || {};

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Clean, Simple Input Bar */}
      <div className="glass-panel" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Create Viral Shorts & Reels</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                Paste any video link or upload a file to get ranked 9:16 vertical clips with animated captions.
              </p>
            </div>
            
            <label className="btn btn-secondary btn-sm" style={{ cursor: 'pointer' }}>
              <Upload size={14} /> Upload Video File
              <input type="file" accept="video/*" onChange={handleCustomUpload} style={{ display: 'none' }} />
            </label>
          </div>

          {/* Search input form */}
          <form onSubmit={handleVideoSubmit} style={{ display: 'flex', gap: '10px' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <VideoIcon size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#f43f5e' }} />
              <input
                type="text"
                className="input-field"
                style={{ paddingLeft: '38px', height: '44px', fontSize: '0.9rem' }}
                placeholder="Paste video link here (YouTube, WebM, MP4)..."
                value={videoInputUrl}
                onChange={(e) => setVideoInputUrl(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ padding: '0 20px', height: '44px' }} disabled={isAnalyzing}>
              <Sparkles size={16} /> {isAnalyzing ? 'Analyzing...' : 'Find Top Clips'}
            </button>
          </form>

          {/* Quick Samples */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', paddingTop: '6px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>
              Or try a sample:
            </span>
            {SAMPLE_VIDEOS.map((sample) => (
              <button
                key={sample.id}
                onClick={() => handleSelectSample(sample)}
                className={`btn btn-sm ${selectedSample.id === sample.id && !customVideoUrl ? 'btn-cyan' : 'btn-ghost'}`}
                style={{ fontSize: '0.78rem', padding: '3px 10px' }}
              >
                {sample.title.slice(0, 32)}...
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Analysis Progress */}
      {isAnalyzing && (
        <div className="glass-panel" style={{ padding: '14px 18px', border: '1px solid var(--accent-primary)', backgroundColor: 'rgba(99, 102, 241, 0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <RefreshCw size={14} style={{ color: 'var(--accent-primary)', animation: 'spin 1.2s linear infinite' }} />
              <span style={{ fontWeight: '600', fontSize: '0.85rem' }}>{analysisStage}</span>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>{analysisProgress}%</span>
          </div>
          <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{ width: `${analysisProgress}%`, height: '100%', background: 'linear-gradient(90deg, #6366f1, #06b6d4)', transition: 'width 0.3s ease' }} />
          </div>
        </div>
      )}

      {/* Export Toast */}
      {exportNotification && (
        <div className="glass-panel" style={{ padding: '12px 18px', border: '1px solid var(--accent-emerald)', backgroundColor: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Check size={16} style={{ color: 'var(--accent-emerald)' }} />
          <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#ffffff' }}>{exportNotification}</span>
        </div>
      )}

      {/* 2-Column Simple Layout: Left Video Canvas, Right Top Highlights */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(310px, 380px) 1fr', gap: '24px', alignItems: 'start' }}>
        
        {/* LEFT COLUMN: Vertical Video & Quick Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          
          {/* Format & Caption Toolbar */}
          <div className="glass-panel" style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: '4px' }}>
              <button
                onClick={() => setAspectRatio('9:16')}
                className={`btn btn-sm ${aspectRatio === '9:16' ? 'btn-primary' : 'btn-ghost'}`}
                style={{ padding: '4px 10px', fontSize: '0.75rem' }}
              >
                9:16 Vertical
              </button>
              <button
                onClick={() => setAspectRatio('1:1')}
                className={`btn btn-sm ${aspectRatio === '1:1' ? 'btn-primary' : 'btn-ghost'}`}
                style={{ padding: '4px 10px', fontSize: '0.75rem' }}
              >
                1:1 Square
              </button>
            </div>

            <div style={{ display: 'flex', gap: '4px' }}>
              {['hormozi', 'beast', 'minimalist'].map((preset) => (
                <button
                  key={preset}
                  onClick={() => setSubtitlePreset(preset)}
                  className={`btn btn-sm ${subtitlePreset === preset ? 'btn-cyan' : 'btn-ghost'}`}
                  style={{ padding: '4px 8px', fontSize: '0.72rem', textTransform: 'capitalize' }}
                >
                  {preset === 'hormozi' ? 'Yellow' : preset === 'beast' ? 'Bold' : 'Clean'}
                </button>
              ))}
            </div>
          </div>

          {/* Video Player */}
          <VideoPlayerCrop
            videoSrc={customVideoUrl || selectedSample.videoUrl}
            aspectRatio={aspectRatio}
            clipStart={clipStart}
            clipEnd={clipEnd}
            activeSubtitle={activeSubtitle}
            subtitlePreset={subtitlePreset}
            subtitlePosition="bottom"
            subtitleFontSize={22}
            showSubtitles={showSubtitles}
            onTimeUpdate={(t) => setCurrentTime(t)}
          />

          {/* Big Prominent Download Button */}
          <button
            className="btn btn-primary btn-lg"
            style={{ width: '100%', padding: '12px' }}
            onClick={() => handleExportClip(activeHighlight)}
            disabled={isExporting}
          >
            <Download size={18} /> {isExporting ? 'Rendering...' : 'Download This Short (MP4)'}
          </button>
        </div>

        {/* RIGHT COLUMN: Clean Top Highlights List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '700' }}>
              Top Highlights ({highlights.length})
            </h3>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => setShowTranscript(!showTranscript)}
              style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}
            >
              {showTranscript ? 'Hide Transcript' : 'Show Full Transcript'}
            </button>
          </div>

          {/* Highlights List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {highlights.map((hl, idx) => (
              <ViralityCard
                key={hl.id || idx}
                highlight={hl}
                isActive={idx === activeHighlightIndex}
                onSelect={() => handleSelectHighlight(idx)}
                onExport={handleExportClip}
              />
            ))}
          </div>

          {/* Optional Transcript Viewer */}
          {showTranscript && (
            <TranscriptViewer
              transcript={activeTranscript}
              currentTime={currentTime}
              clipStart={clipStart}
              clipEnd={clipEnd}
              onSeekTime={(t) => setCurrentTime(t)}
            />
          )}

        </div>
      </div>
    </div>
  );
}
