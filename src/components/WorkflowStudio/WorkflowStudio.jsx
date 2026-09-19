import React, { useState } from 'react';
import { Workflow, Play, CheckCircle2, ArrowRight, Sparkles, Sliders, Layers, Download } from 'lucide-react';
import confetti from 'canvas-confetti';

const WORKFLOW_STEPS = [
  { id: 1, name: 'Idea & Topic', tool: 'Hook Generator', desc: 'Analyzes trending topics and extracts viral angle.' },
  { id: 2, name: 'Voiceover Script', tool: 'Audio Studio', desc: 'Synthesizes studio-quality speech audio narration.' },
  { id: 3, name: 'Frame Generation', tool: 'Image Studio', desc: 'Creates photoreal 9:16 scene stills with Flux.1.' },
  { id: 4, name: 'Motion Video', tool: 'Video Studio', desc: 'Animates stills with Wan 2.2 and camera motion.' },
  { id: 5, name: 'Subtitles & Crop', tool: 'Shorts Studio', desc: 'Applies Hormozi style captions and smart face framing.' },
];

export default function WorkflowStudio({ onNavigateToShorts }) {
  const [topic, setTopic] = useState('Why 99% of People Fail at Building AI SaaS in 2026');
  const [isRunning, setIsRunning] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const handleRunWorkflow = () => {
    setIsRunning(true);
    setActiveStep(1);

    const stepInterval = setInterval(() => {
      setActiveStep(prev => {
        if (prev >= 5) {
          clearInterval(stepInterval);
          setIsRunning(false);
          confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
          return 5;
        }
        return prev + 1;
      });
    }, 800);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="glass-panel" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="pulse-dot" style={{ backgroundColor: 'var(--accent-primary)', boxShadow: '0 0 8px var(--accent-primary)' }} />
              <h3 style={{ fontSize: '1.25rem' }}>Automated Shorts Pipeline</h3>
              <span className="badge badge-indigo">End-to-End Orchestration</span>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Connect all studios into an autonomous assembly line: Prompt → Voiceover → Visuals → Motion → 9:16 Viral Short.
            </p>
          </div>
          <span className="badge badge-emerald">Fully Integrated</span>
        </div>
      </div>

      {/* Input Run Bar */}
      <div className="glass-panel" style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>Target Viral Topic or YouTube Hook</span>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            className="input-field"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter topic to orchestrate..."
          />
          <button
            className="btn btn-primary"
            onClick={handleRunWorkflow}
            disabled={isRunning}
            style={{ whiteSpace: 'nowrap' }}
          >
            <Play size={16} /> {isRunning ? `Executing Step ${activeStep}/5...` : 'Run Automated Pipeline'}
          </button>
        </div>
      </div>

      {/* Pipeline Node Diagram */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
          {WORKFLOW_STEPS.map((step) => {
            const isPassed = activeStep > step.id;
            const isCurrent = activeStep === step.id;

            return (
              <div
                key={step.id}
                className="glass-panel"
                style={{
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  border: isCurrent
                    ? '2px solid var(--accent-primary)'
                    : isPassed
                    ? '2px solid var(--accent-emerald)'
                    : '1px solid var(--border-subtle)',
                  backgroundColor: isCurrent
                    ? 'rgba(99, 102, 241, 0.12)'
                    : isPassed
                    ? 'rgba(16, 185, 129, 0.08)'
                    : 'var(--bg-surface-glass)',
                  boxShadow: isCurrent ? '0 0 20px var(--accent-primary-glow)' : 'none',
                  transition: 'all 0.3s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: isPassed ? 'var(--accent-emerald)' : isCurrent ? 'var(--accent-primary)' : 'rgba(255,255,255,0.1)',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: '700',
                    }}
                  >
                    {isPassed ? <CheckCircle2 size={14} /> : step.id}
                  </span>
                  <span className="badge badge-indigo" style={{ fontSize: '0.68rem' }}>
                    {step.tool}
                  </span>
                </div>

                <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{step.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.3 }}>
                  {step.desc}
                </div>
              </div>
            );
          })}
        </div>

        {activeStep === 5 && (
          <div className="glass-panel" style={{ padding: '20px', backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid var(--accent-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h4 style={{ fontSize: '1.05rem', color: '#ffffff' }}>✨ Automated Pipeline Complete!</h4>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                Viral Short generated with voiceover, visual scenes, smart 9:16 crop, and Hormozi captions.
              </p>
            </div>
            <button className="btn btn-emerald" style={{ background: 'var(--accent-emerald)', color: '#000000', fontWeight: '700' }} onClick={onNavigateToShorts}>
              View & Edit in Shorts Studio →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
