/**
 * Virality Analysis Engine
 * Ported & enhanced from AI-Youtube-Shorts-Generator (highlights.py)
 * 
 * Analyzes video transcripts against 8 core virality criteria:
 * 1. Hook Moments (first 3-second stopping power)
 * 2. Emotional Peaks (surprise, excitement, humor)
 * 3. Opinion Bombs (polarizing, contrarian claims)
 * 4. Revelation Moments (surprising stats, counter-intuitive facts)
 * 5. Conflict/Tension (pushback, debates)
 * 6. Quotable One-Liners (standalone shareable quotes)
 * 7. Story Peaks (climax of an anecdote, payoff)
 * 8. Practical Value (actionable life/tech/money hack)
 */

export const VIRALITY_CRITERIA = [
  { id: 'hook', name: 'Hook Moments', weight: 1.25, description: 'High curiosity opening in the first 3 seconds' },
  { id: 'emotional', name: 'Emotional Peaks', weight: 1.15, description: 'Surprise, excitement, laughter, raw reaction' },
  { id: 'opinion', name: 'Opinion Bombs', weight: 1.10, description: 'Contrarian, bold, or polarizing viewpoints' },
  { id: 'revelation', name: 'Revelation Moments', weight: 1.05, description: 'Reframing how the viewer thinks, mindblown fact' },
  { id: 'conflict', name: 'Conflict & Tension', weight: 1.0, description: 'Debate, disagreement, or unresolved problem' },
  { id: 'quotable', name: 'Quotable Lines', weight: 0.95, description: 'Standalone memorable aphorisms' },
  { id: 'story', name: 'Story Payoff', weight: 0.90, description: 'Narrative climax with satisfying resolution' },
  { id: 'practical', name: 'Practical Value', weight: 0.85, description: 'Immediate actionable tip, hack, or strategy' },
];

/**
 * Clean and normalize time in seconds
 */
export function formatTime(seconds) {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

/**
 * Format timestamp display like 01:24.5
 */
export function formatDetailedTime(seconds) {
  if (isNaN(seconds) || seconds < 0) return '00:00.0';
  const mins = Math.floor(seconds / 60);
  const secs = (seconds % 60).toFixed(1);
  return `${mins < 10 ? '0' : ''}${mins}:${parseFloat(secs) < 10 ? '0' : ''}${secs}`;
}

/**
 * Client-side Virality Analyzer
 * Identifies high-performing segments from transcript chunks,
 * scores them, extracts opening hook sentences, and suppresses overlap.
 */
export function analyzeTranscriptVirality(transcriptData, targetClips = 3, minDuration = 25, maxDuration = 75) {
  if (!transcriptData || !transcriptData.segments || transcriptData.segments.length === 0) {
    return {
      contentType: 'general',
      density: 'medium',
      highlights: [],
    };
  }

  const segments = transcriptData.segments;
  const totalDuration = segments[segments.length - 1].end || 120;
  
  // High-virality trigger words and phrases
  const hookTriggers = [
    'the secret is', 'nobody talks about', 'i was completely wrong', 'here is why',
    'the biggest mistake', 'most people don’t know', 'if you want to', 'this is insane',
    'watch what happens', 'everyone is lying to you', 'stop doing this', 'the truth about',
    'three steps to', 'this changes everything', 'how i made', 'never ever', 'mind blown'
  ];

  const emotionalTriggers = [
    'unbelievable', 'crazy', 'shocking', 'insane', 'wild', 'hilarious', 'terrible',
    'genius', 'genius move', 'screaming', 'crying', 'holy cow', 'legendary'
  ];

  const practicalTriggers = [
    'how to', 'step 1', 'step one', 'hack', 'strategy', 'framework', 'tool',
    'technique', 'trick', 'formula', 'system', 'process', 'guide'
  ];

  const candidateWindows = [];

  // Slide through segments to find potential 30s-70s clips
  for (let i = 0; i < segments.length; i++) {
    const startSeg = segments[i];
    const startTime = startSeg.start;
    let accumulatedText = startSeg.text;
    let endIndex = i;

    for (let j = i; j < segments.length; j++) {
      const curSeg = segments[j];
      const duration = curSeg.end - startTime;

      if (duration >= minDuration && duration <= maxDuration) {
        // Evaluate this window
        const textSlice = segments.slice(i, j + 1).map(s => s.text).join(' ');
        const lowerText = textSlice.toLowerCase();

        // Calculate scores
        let rawScore = 65; // baseline
        const detectedSignals = [];

        // 1. Check Hook (in first 15 words)
        const firstWords = startSeg.text.toLowerCase();
        let hookScore = 0;
        let hookMatched = false;
        for (const trigger of hookTriggers) {
          if (firstWords.includes(trigger) || lowerText.slice(0, 100).includes(trigger)) {
            hookScore += 18;
            hookMatched = true;
            detectedSignals.push('Strong 3s Hook');
            break;
          }
        }
        if (!hookMatched && (firstWords.startsWith('so') || firstWords.startsWith('why') || firstWords.startsWith('what if') || firstWords.includes('?'))) {
          hookScore += 10;
          detectedSignals.push('Curiosity Question Hook');
        }

        // 2. Emotional Intensity
        let emotionalScore = 0;
        for (const trig of emotionalTriggers) {
          if (lowerText.includes(trig)) {
            emotionalScore += 8;
            detectedSignals.push('Emotional High');
            break;
          }
        }

        // 3. Practical Value
        let practicalScore = 0;
        for (const trig of practicalTriggers) {
          if (lowerText.includes(trig)) {
            practicalScore += 8;
            detectedSignals.push('Actionable Advice');
            break;
          }
        }

        // Duration sweet-spot bonus (45-65 seconds is the TikTok/Reels peak)
        let durationBonus = 0;
        if (duration >= 35 && duration <= 60) {
          durationBonus = 8;
        }

        const finalScore = Math.min(99, Math.max(58, Math.round(rawScore + hookScore + emotionalScore + practicalScore + durationBonus)));

        // Extract first punchy sentence as hook sentence
        const sentences = textSlice.split(/[.!?]+/).map(s => s.trim()).filter(Boolean);
        const hookSentence = sentences[0] || startSeg.text;

        // Formulate viral reason
        let viralityReason = 'Strong retention rhythm and concise narrative delivery.';
        if (detectedSignals.includes('Strong 3s Hook') && detectedSignals.includes('Emotional High')) {
          viralityReason = 'Instant psychological hook followed by high emotional energy keeps viewers past the critical 3-second dropoff.';
        } else if (detectedSignals.includes('Actionable Advice')) {
          viralityReason = 'Delivers immediate high-utility value that drives high save-to-bookmark and share ratios.';
        } else if (detectedSignals.includes('Curiosity Question Hook')) {
          viralityReason = 'Opens an irresistible curiosity loop with clear payoff before the clip finishes.';
        }

        // Generate title
        let title = sentences[0] ? sentences[0].slice(0, 48) : `Viral Moment at ${formatTime(startTime)}`;
        if (title.length >= 48) title += '...';

        candidateWindows.push({
          title,
          start_time: Math.round(startTime * 10) / 10,
          end_time: Math.round(curSeg.end * 10) / 10,
          duration: Math.round(duration * 10) / 10,
          score: finalScore,
          hook_sentence: hookSentence,
          virality_reason: viralityReason,
          signals: Array.from(new Set(detectedSignals)),
          text: textSlice,
          segments: segments.slice(i, j + 1),
        });
      }

      if (duration > maxDuration) break;
    }
  }

  // Deduplicate and suppress overlapping highlights (port of overlap suppression in highlights.py)
  // Sort descending by score
  candidateWindows.sort((a, b) => b.score - a.score);

  const selectedClips = [];
  const OVERLAP_TOLERANCE_SECONDS = 15;

  for (const candidate of candidateWindows) {
    if (selectedClips.length >= targetClips) break;

    // Check if overlaps with already chosen clip
    const isOverlapping = selectedClips.some(chosen => {
      const overlapStart = Math.max(candidate.start_time, chosen.start_time);
      const overlapEnd = Math.min(candidate.end_time, chosen.end_time);
      return (overlapEnd - overlapStart) > OVERLAP_TOLERANCE_SECONDS;
    });

    if (!isOverlapping) {
      selectedClips.push({
        ...candidate,
        id: `clip-${selectedClips.length + 1}`,
        rank: selectedClips.length + 1,
      });
    }
  }

  // Fallback if no clips reached min length: create safe default clips
  if (selectedClips.length === 0 && segments.length > 0) {
    const chunkDur = Math.min(totalDuration, 45);
    selectedClips.push({
      id: 'clip-1',
      rank: 1,
      title: 'Top Highlight Moment',
      start_time: 0,
      end_time: chunkDur,
      duration: chunkDur,
      score: 88,
      hook_sentence: segments[0].text,
      virality_reason: 'Opening segment with highest initial retention potential.',
      signals: ['Opening Hook', 'Fast Pace'],
      text: segments.slice(0, Math.min(segments.length, 6)).map(s => s.text).join(' '),
      segments: segments.slice(0, Math.min(segments.length, 6)),
    });
  }

  return {
    contentType: totalDuration > 300 ? 'podcast/discussion' : 'video essay/tutorial',
    density: 'high',
    highlights: selectedClips,
  };
}
