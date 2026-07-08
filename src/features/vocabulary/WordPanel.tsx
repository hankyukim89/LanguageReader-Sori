import { Bookmark, BookOpen, Volume2, X } from 'lucide-react';
import { getVocabulary } from '../../content/vocabulary';
import { speakKorean } from '../../lib/speech';

interface Props { lemma: string | null; onClose: () => void; isSaved: (lemma: string) => boolean; toggleSaved: (lemma: string) => void }

export function WordPanel({ lemma, onClose, isSaved, toggleSaved }: Props) {
  if (!lemma) return <aside className="word-panel empty"><div><BookOpen/><h3>Tap a highlighted word</h3><p>Its meaning, pronunciation, and example will appear here.</p></div></aside>;
  const entry = getVocabulary(lemma);
  if (!entry) return null;
  const saved = isSaved(lemma);
  return <aside className="word-panel"><div className="sheet-handle"/><header><span>Word</span><button onClick={onClose} aria-label="Close definition"><X/></button></header>
    <div className="word-title"><div><h2>{entry.lemma}</h2><p>{entry.pronunciation}</p></div><button className={saved ? 'is-saved' : ''} onClick={() => toggleSaved(lemma)} aria-label={saved ? 'Remove saved word' : 'Save word'}><Bookmark fill={saved ? 'currentColor' : 'none'}/></button></div>
    <button className="pronounce" onClick={() => speakKorean(entry.lemma)}><Volume2/> Hear pronunciation</button>
    <div className="definition"><small>MEANING · {entry.level} · {entry.partOfSpeech}</small><p>{entry.meaning}</p></div>
    <div className="example"><small>EXAMPLE</small><p>{entry.example}</p></div>
    <button className={`primary full ${saved ? 'saved' : ''}`} onClick={() => toggleSaved(lemma)}><Bookmark fill="currentColor"/>{saved ? 'Remove from vocabulary' : 'Save word'}</button><p className="tip">You’ll see saved words again in Review.</p>
  </aside>;
}
