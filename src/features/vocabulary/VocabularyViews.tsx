import { useState } from 'react';
import { Bookmark, ChevronLeft, ChevronRight } from 'lucide-react';
import { getVocabulary } from '../../content/vocabulary';
import { LEVELS } from '../../domain/content';

interface SavedProps { saved: string[]; toggleSaved: (lemma: string) => void; selectLemma: (lemma: string) => void }

export function SavedWordsView({ saved, toggleSaved, selectLemma }: SavedProps) {
  return <div className="page saved-page"><header className="page-heading"><div><p>Your collection</p><h1>Saved words</h1><span>{saved.length} words ready to review.</span></div></header>
    {saved.length ? <div className="saved-list">{saved.map(lemma => { const entry = getVocabulary(lemma); if (!entry) return null; return <button key={lemma} onClick={() => selectLemma(lemma)}><i style={{background:LEVELS[entry.level]}}/><div><strong>{entry.lemma}</strong><span>{entry.pronunciation} · {entry.partOfSpeech}</span></div><p>{entry.meaning}</p><Bookmark fill="currentColor" onClick={event => { event.stopPropagation(); toggleSaved(lemma); }}/></button>; })}</div> : <div className="empty-state"><Bookmark/><h2>No saved words yet</h2><p>Tap a highlighted open-class word while reading, then save it here.</p></div>}
  </div>;
}

export function ReviewView({ saved }: { saved: string[] }) {
  const cards = saved.length ? saved : ['골목'];
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const lemma = cards[index % cards.length];
  const entry = getVocabulary(lemma)!;
  const move = (direction: number) => { setIndex(current => (current + direction + cards.length) % cards.length); setFlipped(false); };

  return <div className="page review-page"><header className="page-heading"><div><p>Daily practice</p><h1>Review</h1><span>A few minutes now goes a long way.</span></div></header><div className="review-count">Card {index+1} of {cards.length}</div>
    <button className={`flashcard ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped(current => !current)}><span className="card-level" style={{color:LEVELS[entry.level]}}>{entry.level} · {entry.partOfSpeech}</span>{flipped ? <><small>MEANING</small><strong className="meaning">{entry.meaning}</strong><p>{entry.example}</p><em>Tap to flip back</em></> : <><small>KOREAN</small><strong>{entry.lemma}</strong><span>{entry.pronunciation}</span><em>Tap to reveal</em></>}</button>
    <div className="review-actions"><button onClick={() => move(-1)}><ChevronLeft/>Again</button><button className="primary" onClick={() => move(1)}>Got it<ChevronRight/></button></div>
  </div>;
}
