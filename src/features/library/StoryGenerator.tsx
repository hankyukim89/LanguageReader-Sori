import { useState } from 'react';
import { X, Sparkles, Loader2, ArrowRight } from 'lucide-react';
import { generateStory } from '../../lib/gemini';
import { LEVELS, type Level, type Article } from '../../domain/content';
import { useDialog } from '../../hooks/useDialog';

interface StoryGeneratorProps {
  onClose: () => void;
  onStoryGenerated: (article: Article, newVocab: any[]) => void;
}

export function StoryGenerator({ onClose, onStoryGenerated }: StoryGeneratorProps) {
  const [topic, setTopic] = useState('');
  const [level, setLevel] = useState<Level>('A2');
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dialogRef = useDialog<HTMLDivElement>(onClose, !generating);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      setError('Please provide a topic for your story.');
      return;
    }

    setGenerating(true);
    setError(null);

    try {
      const generated = await generateStory(level, topic.trim());
      
      const newArticle: Article = {
        id: `ai-${Date.now()}`,
        level: level,
        title: generated.title,
        subtitle: generated.subtitle,
        image: `${import.meta.env.BASE_URL}assets/${level === 'A1' || level === 'A2' ? 'bakery' : level === 'B1' || level === 'B2' ? 'river' : 'bookstore'}.png`,
        minutes: generated.minutes || Math.max(1, Math.floor(generated.wordCount / 50)),
        wordCount: generated.wordCount || 150,
        category: generated.category || 'AI Generation',
        paragraphs: generated.paragraphs
      };

      onStoryGenerated(newArticle, generated.newVocab || []);
      onClose();
    } catch (err: any) {
      console.error(err);
      setError('Generation failed. Please try a different topic or try again later.');
    } finally {
      setGenerating(false);
    }
  };

  return <div className="modal-backdrop" onMouseDown={event => { if (event.target === event.currentTarget && !generating) onClose(); }}>
    <div className="modal-content story-generator-modal" ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="generator-title">
      <header className="modal-header">
        <div className="modal-title">
          <Sparkles className="icon-coral animate-pulse" size={22} />
          <h2 id="generator-title">AI Story Generator</h2>
        </div>
        <button className="close-button" onClick={onClose} disabled={generating} aria-label="Close generator">
          <X size={20} />
        </button>
      </header>

      {generating ? (
        <div className="modal-body generating-state">
          <Loader2 className="animate-spin icon-coral" size={48} />
          <h3>Composing your story...</h3>
          <p>Gemini is writing a custom graded reader paragraph for Level {level} about "{topic}".</p>
          <div className="generation-progress-bar">
            <div className="progress-fill"></div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleGenerate} className="modal-body story-generator-form">
          <p className="form-intro">
            Create a custom reading passage tailored to your language level. Gemini will write, translate, and highlight vocabulary for you.
          </p>

          {error && (
            <div className="form-error" role="alert">
              <span>{error}</span>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="story-topic">What should the story be about?</label>
            <input 
              id="story-topic"
              type="text" 
              value={topic} 
              onChange={e => setTopic(e.target.value)} 
              placeholder="e.g. Hiking in Bukhansan, Ordering street food in Seoul"
              maxLength={100}
              required
            />
          </div>

          <div className="form-group">
            <label>Select CEFR Difficulty Level</label>
            <div className="level-grid-selector" role="group" aria-label="CEFR difficulty level">
              {Object.entries(LEVELS).map(([lvl, color]) => (
                <button 
                  key={lvl}
                  type="button"
                  className={`level-btn ${level === lvl ? 'active' : ''}`}
                  style={{ '--level-color': color } as React.CSSProperties}
                  onClick={() => setLevel(lvl as Level)}
                  aria-pressed={level === lvl}
                >
                  <strong>{lvl}</strong>
                  <span>
                    {({ A1: 'Beginner', A2: 'Elementary', B1: 'Intermediate', B2: 'Upper Int.', C1: 'Advanced', C2: 'Mastery' })[lvl as Level]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <button className="primary full submit-generator-btn" type="submit">
            <span>Generate Graded Story</span>
            <ArrowRight size={18} />
          </button>
        </form>
      )}
    </div>
  </div>;
}
