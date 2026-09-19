import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SettingsModal from './components/SettingsModal';
import ShortsStudio from './components/ShortsStudio/ShortsStudio';
import ImageStudio from './components/ImageStudio/ImageStudio';
import VideoStudio from './components/VideoStudio/VideoStudio';
import CinemaStudio from './components/CinemaStudio/CinemaStudio';
import LipSyncStudio from './components/LipSyncStudio/LipSyncStudio';

export default function App() {
  const [activeTab, setActiveTab] = useState('shorts');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [userApiKeys, setUserApiKeys] = useState({});
  const [passedImageUrl, setPassedImageUrl] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('chitraleheri_api_keys');
      if (stored) {
        setUserApiKeys(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleSaveKeys = (keys) => {
    setUserApiKeys(keys);
    localStorage.setItem('chitraleheri_api_keys', JSON.stringify(keys));
  };

  const handleSendToVideo = (imageUrl) => {
    setPassedImageUrl(imageUrl);
    setActiveTab('video');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Background Atmosphere */}
      <div className="app-bg-glow" />

      {/* Top Header */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Studio Area */}
      <main style={{ flex: 1, padding: '0 20px 40px 20px', maxWidth: '1280px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 10 }}>
        {activeTab === 'shorts' && (
          <ShortsStudio onOpenSettings={() => setIsSettingsOpen(true)} />
        )}

        {activeTab === 'image' && (
          <ImageStudio onSendToVideo={handleSendToVideo} />
        )}

        {activeTab === 'video' && (
          <VideoStudio incomingImageUrl={passedImageUrl} />
        )}

        {activeTab === 'cinema' && (
          <CinemaStudio onSendToVideo={handleSendToVideo} />
        )}

        {activeTab === 'lipsync' && (
          <LipSyncStudio initialAvatarUrl={passedImageUrl} />
        )}
      </main>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSaveKeys={handleSaveKeys}
        currentKeys={userApiKeys}
      />

      {/* Simple Footer without repo mentions */}
      <footer
        style={{
          borderTop: '1px solid var(--border-subtle)',
          padding: '20px',
          textAlign: 'center',
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
          backgroundColor: 'rgba(7, 9, 14, 0.95)',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <p>
          <strong>Chitraleheri</strong> — Simple, Fast AI Video & Creative Studio
        </p>
      </footer>
    </div>
  );
}
