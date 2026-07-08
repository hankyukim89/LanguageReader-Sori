import { useEffect, useMemo, useState } from 'react';
import { Clock3, Headphones, Languages, Pause, Play, Sparkles, Volume2 } from 'lucide-react';
import { LEVELS, type Article } from '../../domain/content';
import { speakKorean, stopSpeaking } from '../../lib/speech';
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
}

export function ReaderView({ 
  article, 
  selectedLemma, 
  selectLemma, 
  isSaved, 
  toggleSaved,
  onWordLookup,
  onListenTimeIncrement,
  onCompleteArticle
}: Props) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(18);
  const [showTranslation, setShowTranslation] = useState(false);
  const [completed, setCompleted] = useState(false);
  const plainText = useMemo(() => article.paragraphs.flatMap(paragraph => paragraph.segments).map(segment => segment.value).join(' '), [article]);

  useEffect(() => () => stopSpeaking(), []);
  
  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setProgress(current => current >= 98 ? 18 : current + 1);
      if (onListenTimeIncrement) {
        onListenTimeIncrement(1); // Accumulate 1 second played
      }
    }, 1000);
    return () => window.clearInterval(timer);
  }, [playing, onListenTimeIncrement]);

  const togglePlayback = () => {
    if (playing) {
      stopSpeaking();
    } else {
      speakKorean(plainText);
    }
    setPlaying(current => !current);
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

  return <div className={`reader-layout ${selectedLemma ? 'word-open' : ''}`}><main className="reader">
    <img className="reader-hero" src={article.image} alt=""/>
    <div className="article-meta"><span style={{background:LEVELS[article.level]}}>{article.level}</span><span><Clock3/> {article.minutes} min</span><span><Headphones/> Listen</span><span className="word-count">{article.wordCount} words</span></div>
    <h1>{article.title}</h1><p className="deck">{article.subtitle}</p><AudioPlayer playing={playing} progress={progress} toggle={togglePlayback}/>
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
  </main><WordPanel lemma={selectedLemma} onClose={() => selectLemma(null)} isSaved={isSaved} toggleSaved={toggleSaved}/></div>;
}

function AudioPlayer({ playing, progress, toggle }: { playing: boolean; progress: number; toggle: () => void }) {
  return <div className="audio-player"><button className="play" onClick={toggle}>{playing ? <Pause fill="currentColor"/> : <Play fill="currentColor"/>}</button><button className="rewind">10<span>↶</span></button><span className="time">00:{String(Math.floor(progress*.48)).padStart(2,'0')}</span><div className="track"><i style={{width:`${progress}%`}}><b/></i></div><span className="duration">04:32</span><button className="speed">1.0x</button><Volume2/></div>;
}
