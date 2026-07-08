import { useEffect, useMemo, useState } from 'react';
import { Clock3, Headphones, Languages, Pause, Play, Sparkles, Volume2, Lock } from 'lucide-react';
import { LEVELS, type Article } from '../../domain/content';
import { pauseSpeaking, resumeSpeaking, speakKorean, stopSpeaking } from '../../lib/speech';
import { WordPanel } from '../vocabulary/WordPanel';

interface Props { 
  article: Article; 
  selectedLemma: string | null; 
  selectLemma: (lemma: string | null) => void; 
  isSaved: (lemma: string) => boolean; 
  toggleSaved: (lemma: string) => void;
  onWordLookup?: (lemma: string) => void;
  onListenTimeIncrement?: (seconds: number) => void;
  onCompleteArticle?: (articleId: string) => void;
  isPremium?: boolean;
  onUpgradeRequired?: () => void;
}

export function ReaderView({ 
  article, 
  selectedLemma, 
  selectLemma, 
  isSaved, 
  toggleSaved,
  onWordLookup,
  onListenTimeIncrement,
  onCompleteArticle,
  isPremium = false,
  onUpgradeRequired
}: Props) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [completed, setCompleted] = useState(false);
  const plainText = useMemo(() => article.paragraphs.flatMap(paragraph => paragraph.segments).map(segment => segment.value).join(' '), [article]);
  const durationSeconds = Math.max(60, article.minutes * 60);

  useEffect(() => () => stopSpeaking(), []);
  
  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setProgress(current => Math.min(100, current + (100 / durationSeconds)));
      if (onListenTimeIncrement) {
        onListenTimeIncrement(1); // Accumulate 1 second played
      }
    }, 1000);
    return () => window.clearInterval(timer);
  }, [durationSeconds, playing, onListenTimeIncrement]);

  const togglePlayback = () => {
    if (playing) {
      pauseSpeaking();
      setPlaying(false);
      return;
    }
    if (window.speechSynthesis?.paused) {
      resumeSpeaking();
      setPlaying(true);
    } else {
      setProgress(0);
      const started = speakKorean(plainText, () => {
        setPlaying(false);
        setProgress(100);
      });
      setPlaying(started);
    }
  };

  const handleSelectLemma = (lemma: string) => {
    selectLemma(lemma);
    if (onWordLookup) {
      onWordLookup(lemma);
    }
  };

  const handleMarkComplete = () => {
    setCompleted(true);
    if (onCompleteArticle) {
      onCompleteArticle(article.id);
    }
  };

  useEffect(() => {
    if (!selectedLemma) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        selectLemma(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedLemma, selectLemma]);

  return <div className="reader-layout">
    <main className="reader">
      <img className="reader-hero" src={article.image} alt=""/>
      <div className="article-meta"><span style={{background:LEVELS[article.level]}}>{article.level}</span><span><Clock3/> {article.minutes} min</span><span><Headphones/> Listen</span><span className="word-count">{article.wordCount} words</span></div>
      <h1>{article.title}</h1><p className="deck">{article.subtitle}</p>
      
      <div className="voice-tier-header">
        {isPremium ? (
          <span className="voice-status-badge premium"><Sparkles size={11} fill="currentColor" /> Studio quality audio active</span>
        ) : (
          <button className="voice-status-badge free" onClick={onUpgradeRequired}>
            <span>Browser Text-to-Speech active.</span>
            <strong>Upgrade for ultra-realistic Studio Voice <Lock size={10} fill="currentColor" /></strong>
          </button>
        )}
      </div>
      
      <AudioPlayer playing={playing} progress={progress} durationSeconds={durationSeconds} toggle={togglePlayback}/>
      <button className={`translation-toggle ${showTranslation ? 'active' : ''}`} onClick={() => setShowTranslation(current => !current)} aria-pressed={showTranslation}><Languages/>{showTranslation ? 'Hide English' : 'Show English translation'}</button>
      <div className="article-body">{article.paragraphs.map((paragraph,index) => <div className="article-paragraph" key={index}><p>{paragraph.segments.map((segment,segmentIndex) => segment.type === 'text' ? segment.value : <button key={segmentIndex} className="vocab-word" style={{'--word-color':LEVELS[article.level]} as React.CSSProperties} onClick={() => handleSelectLemma(segment.lemma)}>{segment.value}</button>)}</p>{showTranslation ? <p className="english-translation" lang="en">{paragraph.english}</p> : null}</div>)}</div>
      
      <div className="reader-finish">
        <Sparkles/>
        <div>
          {completed ? (
            <>
              <strong>Story Completed!</strong>
              <span>Progress updated in your dashboard.</span>
            </>
          ) : (
            <>
              <strong>Nice reading!</strong>
              <span>You completed a {article.level} story.</span>
            </>
          )}
        </div>
        {!completed && <button onClick={handleMarkComplete}>Mark complete</button>}
      </div>
    </main>
    
    {selectedLemma && (
      <div className="word-popup-container" role="dialog" aria-modal="true" aria-label="Word definition">
        <button className="definition-backdrop" aria-label="Close definition" onClick={() => selectLemma(null)} />
        <div className="word-popup-card">
          <WordPanel lemma={selectedLemma} onClose={() => selectLemma(null)} isSaved={isSaved} toggleSaved={toggleSaved}/>
        </div>
      </div>
    )}
  </div>;
}

function AudioPlayer({ playing, progress, durationSeconds, toggle }: { playing: boolean; progress: number; durationSeconds: number; toggle: () => void }) {
  const elapsed = Math.floor(durationSeconds * progress / 100);
  const formatTime = (seconds: number) => `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
  return <div className="audio-player">
    <button className="play" onClick={toggle} aria-label={playing ? 'Pause Korean audio' : 'Play Korean audio'}>{playing ? <Pause fill="currentColor"/> : <Play fill="currentColor"/>}</button>
    <span className="time">{formatTime(elapsed)}</span>
    <div className="track" role="progressbar" aria-label="Audio progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)}><i style={{width:`${progress}%`}}><b/></i></div>
    <span className="duration">{formatTime(durationSeconds)}</span>
    <Volume2 aria-hidden="true"/>
  </div>;
}
