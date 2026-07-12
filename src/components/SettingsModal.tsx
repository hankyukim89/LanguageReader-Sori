import { useState, useEffect } from 'react';
import { X, Settings, RotateCcw, Check, Sparkles } from 'lucide-react';
import { getStoryPreprompt, getPicturePreprompt } from '../lib/gemini';

interface SettingsModalProps {
  onClose: () => void;
  isAdmin: boolean;
  primaryLanguage: string;
  onLanguageChange: (lang: string) => void;
}

export function SettingsModal({ onClose, isAdmin, primaryLanguage, onLanguageChange }: SettingsModalProps) {
  const [storyPrompt, setStoryPrompt] = useState('');
  const [picturePrompt, setPicturePrompt] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setStoryPrompt(getStoryPreprompt());
    setPicturePrompt(getPicturePreprompt());
  }, []);

  const handleSave = () => {
    localStorage.setItem('sori:settings:preprompt:story', storyPrompt);
    localStorage.setItem('sori:settings:preprompt:picture', picturePrompt);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  const handleResetStory = () => {
    localStorage.removeItem('sori:settings:preprompt:story');
    setStoryPrompt(getStoryPreprompt());
  };

  const handleResetPicture = () => {
    localStorage.removeItem('sori:settings:preprompt:picture');
    setPicturePrompt(getPicturePreprompt());
  };

  return (
    <div className="modal-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-content settings-modal-content" role="dialog" aria-modal="true" aria-labelledby="settings-title" style={{ width: 'min(680px, 90vw)' }}>
        <header className="modal-header">
          <div className="modal-title">
            <Settings className="animate-spin icon-coral" style={{ animationDuration: '8s' }} size={22} />
            <h2 id="settings-title">Preferences & Settings</h2>
          </div>
          <button className="close-button" onClick={onClose} aria-label="Close settings">
            <X size={20} />
          </button>
        </header>

        <div className="modal-body settings-modal-body" style={{ maxHeight: '80vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px' }}>
          {/* General settings */}
          <div className="settings-section-block">
            <h3 style={{ fontSize: '16px', borderBottom: '1px solid var(--line)', paddingBottom: '8px', marginBottom: '12px' }}>General Preferences</h3>
            <div className="setting-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
              <div>
                <label htmlFor="settings-primary-lang" style={{ fontWeight: '600', fontSize: '14px' }}>Primary Language</label>
                <p style={{ fontSize: '12px', color: 'var(--muted)', margin: '4px 0 0' }}>Used for translations and vocabulary exercises.</p>
              </div>
              <select 
                id="settings-primary-lang"
                value={primaryLanguage} 
                onChange={e => onLanguageChange(e.target.value)}
                style={{ height: '38px', padding: '0 12px', borderRadius: '8px', border: '1px solid var(--line)', background: '#fff' }}
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish (Español)</option>
                <option value="French">French (Français)</option>
                <option value="German">German (Deutsch)</option>
                <option value="Japanese">Japanese (日本語)</option>
                <option value="Chinese">Chinese (中文)</option>
              </select>
            </div>
          </div>

          {/* Admin prompt settings */}
          {isAdmin && (
            <div className="settings-section-block admin-settings-block" style={{ marginTop: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <Sparkles size={16} className="icon-coral" />
                <h3 style={{ fontSize: '16px', margin: 0 }}>Admin AI Prompts</h3>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '16px' }}>Configure preprompts sent to Gemini when generating graded stories and custom illustrations.</p>

              <div className="form-group" style={{ marginBottom: '18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label htmlFor="settings-story-prompt" style={{ fontWeight: '600', fontSize: '13px' }}>Story Generation Preprompt</label>
                  <button className="text-button" onClick={handleResetStory} style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <RotateCcw size={11} /> Reset Default
                  </button>
                </div>
                <textarea 
                  id="settings-story-prompt"
                  value={storyPrompt}
                  onChange={e => setStoryPrompt(e.target.value)}
                  rows={8}
                  style={{ width: '100%', fontFamily: 'monospace', fontSize: '11px', padding: '10px', borderRadius: '8px', border: '1px solid var(--line)', resize: 'vertical' }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: '18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label htmlFor="settings-picture-prompt" style={{ fontWeight: '600', fontSize: '13px' }}>Picture Generation Preprompt</label>
                  <button className="text-button" onClick={handleResetPicture} style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <RotateCcw size={11} /> Reset Default
                  </button>
                </div>
                <textarea 
                  id="settings-picture-prompt"
                  value={picturePrompt}
                  onChange={e => setPicturePrompt(e.target.value)}
                  rows={4}
                  style={{ width: '100%', fontFamily: 'monospace', fontSize: '11px', padding: '10px', borderRadius: '8px', border: '1px solid var(--line)', resize: 'vertical' }}
                />
              </div>

              <button 
                className="primary full" 
                onClick={handleSave} 
                style={{ marginTop: '12px' }}
              >
                {saved ? (
                  <>
                    <Check size={16} />
                    <span>Prompts Saved!</span>
                  </>
                ) : (
                  <span>Save AI Config</span>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
