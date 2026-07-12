import { useState, useEffect } from 'react';
import { Sparkles, Loader2, Plus, Check, Trash2, Edit2, Play, BookOpen, Image as ImageIcon, AlertTriangle, Search, RefreshCw, Filter } from 'lucide-react';
import { generateStory, generatePicturePrompt } from '../../lib/gemini';
import { dbService } from '../../lib/firebase';
import { LEVELS, type Level, type Article, type ArticleParagraph, type ArticleSegment } from '../../domain/content';
import { segmentKoreanText } from '../../content/articles';

interface AdminConsoleProps {
  onStoryPublished: () => void;
  onNavigateToHome: () => void;
}

interface DraftStory {
  tempId: string;
  level: Level;
  topic: string;
  category: string;
  title: string;
  subtitle: string;
  imagePrompt: string;
  imageUrl: string;
  paragraphs: { text: string; english: string }[];
  newVocab: Array<{
    lemma: string;
    pronunciation: string;
    meaning: string;
    level: Level;
    partOfSpeech: string;
    example: string;
  }>;
  status?: 'generating' | 'ready' | 'failed';
  errorMessage?: string;
  createdAt?: number;
}

export function AdminConsole({ onStoryPublished, onNavigateToHome }: AdminConsoleProps) {
  // Navigation / Tabs state
  const [activeTab, setActiveTab] = useState<'single' | 'bulk'>('single');

  // Single Story Generation inputs
  const [topic, setTopic] = useState('');
  const [level, setLevel] = useState<Level>('A2');
  const [category, setCategory] = useState('Daily Life');
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mass Generator inputs
  const [bulkTopics, setBulkTopics] = useState('');
  const [selectedLevels, setSelectedLevels] = useState<Level[]>(['A2']);
  const [bulkCategory, setBulkCategory] = useState('Daily Life');

  // Drafts & selection
  const [drafts, setDrafts] = useState<DraftStory[]>([]);
  const [selectedDraftId, setSelectedDraftId] = useState<string | null>(null);

  // Filter & Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLevel, setFilterLevel] = useState<string>('ALL');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  // Checked drafts for bulk action
  const [checkedDraftIds, setCheckedDraftIds] = useState<Set<string>>(new Set());

  // Bulk publishing progress state
  const [publishingBulk, setPublishingBulk] = useState(false);
  const [bulkPublishProgress, setBulkPublishProgress] = useState({ current: 0, total: 0 });

  // Load drafts and migrate status if needed
  useEffect(() => {
    const stored = localStorage.getItem('sori:admin-drafts');
    if (stored) {
      try {
        const loadedDrafts = JSON.parse(stored) as DraftStory[];
        const migrated = loadedDrafts.map(d => {
          let status = d.status || 'ready';
          let errorMessage = d.errorMessage;
          if (status === 'generating') {
            status = 'failed';
            errorMessage = 'Generation interrupted.';
          }
          return {
            ...d,
            status,
            errorMessage,
            createdAt: d.createdAt || Date.now()
          };
        });
        setDrafts(migrated);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const saveDrafts = (newDrafts: DraftStory[]) => {
    setDrafts(newDrafts);
    localStorage.setItem('sori:admin-drafts', JSON.stringify(newDrafts));
  };

  const generateIndividualDraft = async (draft: DraftStory) => {
    try {
      // 1. Generate text story
      const generatedText = await generateStory(draft.level, draft.topic);
      
      // 2. Generate picture prompt
      const imagePrompt = await generatePicturePrompt(draft.level, draft.topic);
      const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(imagePrompt)}?nologo=true&width=800&height=450`;

      // 3. Update drafts
      setDrafts(prev => {
        const next = prev.map(d => {
          if (d.tempId === draft.tempId) {
            return {
              ...d,
              category: generatedText.category || d.category,
              title: generatedText.title,
              subtitle: generatedText.subtitle,
              imagePrompt,
              imageUrl,
              paragraphs: (generatedText.paragraphs || []).map(p => ({
                text: p.segments.map(s => s.value).join(''),
                english: p.english
              })),
              newVocab: generatedText.newVocab || [],
              status: 'ready' as const
            };
          }
          return d;
        });
        localStorage.setItem('sori:admin-drafts', JSON.stringify(next));
        return next;
      });
    } catch (err: any) {
      console.error(`Generation failed for draft ${draft.tempId}:`, err);
      setDrafts(prev => {
        const next = prev.map(d => {
          if (d.tempId === draft.tempId) {
            return {
              ...d,
              status: 'failed' as const,
              errorMessage: err.message || 'Story generation failed. Please try a different prompt.'
            };
          }
          return d;
        });
        localStorage.setItem('sori:admin-drafts', JSON.stringify(next));
        return next;
      });
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      setError('Please enter a topic.');
      return;
    }

    setGenerating(true);
    setError(null);

    const tempId = `draft-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    const newDraft: DraftStory = {
      tempId,
      level,
      topic: topic.trim(),
      category: category.trim() || 'Daily Life',
      title: `Generating: ${topic.trim()}`,
      subtitle: `Under construction...`,
      imagePrompt: '',
      imageUrl: '',
      paragraphs: [],
      newVocab: [],
      status: 'generating',
      createdAt: Date.now()
    };

    const updatedDrafts = [newDraft, ...drafts];
    saveDrafts(updatedDrafts);
    setSelectedDraftId(tempId);
    setTopic(''); // Reset topic input

    generateIndividualDraft(newDraft).finally(() => {
      setGenerating(false);
    });
  };

  const handleBulkGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    const topics = bulkTopics
      .split('\n')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    if (topics.length === 0) {
      alert('Please enter at least one topic.');
      return;
    }
    if (selectedLevels.length === 0) {
      alert('Please select at least one CEFR level.');
      return;
    }

    const newDrafts: DraftStory[] = [];
    const now = Date.now();

    topics.forEach((topicText, topicIdx) => {
      selectedLevels.forEach((lvl, lvlIdx) => {
        const tempId = `draft-${now}-${topicIdx}-${lvlIdx}-${Math.random().toString(36).substr(2, 5)}`;
        newDrafts.push({
          tempId,
          level: lvl,
          topic: topicText,
          category: bulkCategory.trim() || 'Daily Life',
          title: `Generating: ${topicText}`,
          subtitle: `Level ${lvl} - Under construction...`,
          imagePrompt: '',
          imageUrl: '',
          paragraphs: [],
          newVocab: [],
          status: 'generating',
          createdAt: now
        });
      });
    });

    const updatedDrafts = [...newDrafts, ...drafts];
    saveDrafts(updatedDrafts);
    
    if (newDrafts.length > 0) {
      setSelectedDraftId(newDrafts[0].tempId);
    }

    setBulkTopics('');

    newDrafts.forEach(draft => {
      generateIndividualDraft(draft);
    });
  };

  const handleRetry = (tempId: string) => {
    const draft = drafts.find(d => d.tempId === tempId);
    if (!draft) return;

    const updated = drafts.map(d => {
      if (d.tempId === tempId) {
        return {
          ...d,
          status: 'generating' as const,
          errorMessage: undefined
        };
      }
      return d;
    });
    saveDrafts(updated);

    generateIndividualDraft({
      ...draft,
      status: 'generating',
      errorMessage: undefined
    });
  };

  // Selected draft details helper
  const selectedDraft = drafts.find(d => d.tempId === selectedDraftId);

  const handleUpdateDraftField = (field: keyof DraftStory, value: any) => {
    if (!selectedDraftId) return;
    const updated = drafts.map(d => {
      if (d.tempId === selectedDraftId) {
        return { ...d, [field]: value };
      }
      return d;
    });
    saveDrafts(updated);
  };

  const handleUpdateParagraph = (index: number, key: 'text' | 'english', value: string) => {
    if (!selectedDraft) return;
    const updatedParagraphs = [...selectedDraft.paragraphs];
    updatedParagraphs[index] = { ...updatedParagraphs[index], [key]: value };
    handleUpdateDraftField('paragraphs', updatedParagraphs);
  };

  const handleUpdateVocab = (index: number, key: string, value: string) => {
    if (!selectedDraft) return;
    const updatedVocab = [...selectedDraft.newVocab];
    updatedVocab[index] = { ...updatedVocab[index], [key]: value };
    handleUpdateDraftField('newVocab', updatedVocab);
  };

  const handleRemoveVocab = (index: number) => {
    if (!selectedDraft) return;
    const updatedVocab = selectedDraft.newVocab.filter((_, i) => i !== index);
    handleUpdateDraftField('newVocab', updatedVocab);
  };

  const handleAddVocab = () => {
    if (!selectedDraft) return;
    const newEntry = {
      lemma: '',
      pronunciation: '[]',
      meaning: '',
      level: selectedDraft.level,
      partOfSpeech: 'noun',
      example: ''
    };
    handleUpdateDraftField('newVocab', [...selectedDraft.newVocab, newEntry]);
  };

  const handleDeleteDraft = (id: string) => {
    const updated = drafts.filter(d => d.tempId !== id);
    saveDrafts(updated);
    
    if (checkedDraftIds.has(id)) {
      setCheckedDraftIds(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }

    if (selectedDraftId === id) {
      setSelectedDraftId(updated[0]?.tempId || null);
    }
  };

  const handlePublish = async () => {
    if (!selectedDraft) return;
    
    const segmentedParagraphs: ArticleParagraph[] = selectedDraft.paragraphs.map(p => ({
      segments: segmentKoreanText(p.text),
      english: p.english
    }));

    const publishedArticle: Article = {
      id: `pub-${Date.now()}`,
      level: selectedDraft.level,
      title: selectedDraft.title,
      subtitle: selectedDraft.subtitle,
      image: selectedDraft.imageUrl,
      minutes: Math.max(1, Math.floor(selectedDraft.paragraphs.map(p => p.text).join(' ').length / 100)),
      wordCount: selectedDraft.paragraphs.map(p => p.text.split(/\s+/).length).reduce((a, b) => a + b, 0),
      category: selectedDraft.category.trim() || 'Daily Life',
      paragraphs: segmentedParagraphs
    };

    try {
      await dbService.publishArticle(publishedArticle);
      
      if (selectedDraft.newVocab && selectedDraft.newVocab.length > 0) {
        await dbService.saveDynamicVocabulary(selectedDraft.newVocab);
      }

      handleDeleteDraft(selectedDraft.tempId);
      onStoryPublished();
      alert(`Story "${publishedArticle.title}" published successfully!`);
    } catch (e) {
      console.error(e);
      alert('Failed to publish story.');
    }
  };

  const handlePublishSelected = async () => {
    const idsToPublish = Array.from(checkedDraftIds);
    const draftsToPublish = drafts.filter(d => idsToPublish.includes(d.tempId) && d.status === 'ready');
    if (draftsToPublish.length === 0) return;

    setPublishingBulk(true);
    setBulkPublishProgress({ current: 0, total: draftsToPublish.length });

    let successCount = 0;
    for (let i = 0; i < draftsToPublish.length; i++) {
      const draft = draftsToPublish[i];
      setBulkPublishProgress({ current: i + 1, total: draftsToPublish.length });
      try {
        const segmentedParagraphs: ArticleParagraph[] = draft.paragraphs.map(p => ({
          segments: segmentKoreanText(p.text),
          english: p.english
        }));

        const publishedArticle: Article = {
          id: `pub-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
          level: draft.level,
          title: draft.title,
          subtitle: draft.subtitle,
          image: draft.imageUrl,
          minutes: Math.max(1, Math.floor(draft.paragraphs.map(p => p.text).join(' ').length / 100)),
          wordCount: draft.paragraphs.map(p => p.text.split(/\s+/).length).reduce((a, b) => a + b, 0),
          category: draft.category.trim() || 'Daily Life',
          paragraphs: segmentedParagraphs
        };

        await dbService.publishArticle(publishedArticle);
        
        if (draft.newVocab && draft.newVocab.length > 0) {
          await dbService.saveDynamicVocabulary(draft.newVocab);
        }
        successCount++;
      } catch (e) {
        console.error(`Failed to publish draft ${draft.title}:`, e);
      }
    }

    const remainingDrafts = drafts.filter(d => !idsToPublish.includes(d.tempId) || d.status !== 'ready');
    saveDrafts(remainingDrafts);
    setCheckedDraftIds(new Set());
    setPublishingBulk(false);
    
    onStoryPublished();
    alert(`Successfully published ${successCount} of ${draftsToPublish.length} stories!`);
  };

  const handleDeleteSelected = () => {
    if (confirm(`Are you sure you want to delete ${checkedDraftIds.size} selected drafts?`)) {
      const remaining = drafts.filter(d => !checkedDraftIds.has(d.tempId));
      saveDrafts(remaining);
      setCheckedDraftIds(new Set());
      if (selectedDraftId && checkedDraftIds.has(selectedDraftId)) {
        setSelectedDraftId(remaining[0]?.tempId || null);
      }
    }
  };

  const regenerateImage = () => {
    if (!selectedDraft) return;
    const prompt = selectedDraft.imagePrompt;
    const newUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?nologo=true&width=800&height=450&random=${Math.floor(Math.random() * 1000)}`;
    handleUpdateDraftField('imageUrl', newUrl);
  };

  const getFilteredDrafts = () => {
    return drafts.filter(d => {
      const titleText = d.title || '';
      const topicText = d.topic || '';
      const subtitleText = d.subtitle || '';
      const matchesSearch = 
        titleText.toLowerCase().includes(searchQuery.toLowerCase()) || 
        topicText.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subtitleText.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLevel = filterLevel === 'ALL' || d.level === filterLevel;
      const matchesStatus = filterStatus === 'ALL' || d.status === filterStatus;
      return matchesSearch && matchesLevel && matchesStatus;
    });
  };

  return (
    <div className="page admin-console-page">
      {publishingBulk && (
        <div className="bulk-progress-overlay">
          <div className="bulk-progress-card">
            <Loader2 className="animate-spin icon-coral" size={32} />
            <h3>Publishing Stories...</h3>
            <p>Processing story {bulkPublishProgress.current} of {bulkPublishProgress.total}</p>
            <div className="progress-bar-bg">
              <div 
                className="progress-bar-fg" 
                style={{ width: `${(bulkPublishProgress.current / bulkPublishProgress.total) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}

      <header className="page-heading">
        <div>
          <p>Admin Dashboard</p>
          <h1>Upload & Generate Stories</h1>
          <span>Compose Korean graded readers and generate custom AI illustrations.</span>
        </div>
        <button className="primary" onClick={onNavigateToHome}>
          View Library
        </button>
      </header>

      <div className="admin-grid-layout">
        {/* Left Column: Generator & Draft Queue */}
        <div className="admin-left-col">
          <section className="admin-panel-card generator-section">
            <div className="generator-tabs">
              <button 
                className={`tab-btn ${activeTab === 'single' ? 'active' : ''}`}
                onClick={() => setActiveTab('single')}
              >
                Single Story
              </button>
              <button 
                className={`tab-btn ${activeTab === 'bulk' ? 'active' : ''}`}
                onClick={() => setActiveTab('bulk')}
              >
                Mass Generator
              </button>
            </div>

            {activeTab === 'single' ? (
              <form onSubmit={handleGenerate} className="admin-form" style={{ marginTop: '16px' }}>
                {error && <div className="form-error">{error}</div>}

                <div className="form-group">
                  <label htmlFor="admin-story-topic">Story Topic</label>
                  <input 
                    id="admin-story-topic"
                    type="text" 
                    value={topic} 
                    onChange={e => setTopic(e.target.value)} 
                    placeholder="e.g. Traditional tea house in Insadong, Rain in Gangnam"
                    disabled={generating}
                    required
                  />
                </div>

                <div className="form-row-group">
                  <div className="form-group">
                    <label htmlFor="admin-level">CEFR Level</label>
                    <select id="admin-level" value={level} onChange={e => setLevel(e.target.value as Level)} disabled={generating}>
                      {Object.keys(LEVELS).map(lvl => (
                        <option key={lvl} value={lvl}>{lvl}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="admin-category">Default Category</label>
                    <input 
                      id="admin-category"
                      type="text" 
                      value={category} 
                      onChange={e => setCategory(e.target.value)} 
                      placeholder="Daily Life"
                      disabled={generating}
                    />
                  </div>
                </div>

                <button className="primary full" type="submit" disabled={generating}>
                  {generating ? (
                    <>
                      <Loader2 className="animate-spin" size={16} />
                      <span>Generating drafts...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={16} />
                      <span>Generate Story Draft</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={handleBulkGenerate} className="admin-form" style={{ marginTop: '16px' }}>
                <div className="form-group">
                  <label htmlFor="bulk-story-topics">Topics (one per line)</label>
                  <textarea 
                    id="bulk-story-topics"
                    value={bulkTopics} 
                    onChange={e => setBulkTopics(e.target.value)} 
                    placeholder="e.g.&#10;Traditional tea house in Insadong&#10;Rainy afternoon in Gangnam&#10;Street food stalls in Myeongdong"
                    rows={4}
                    required
                  />
                </div>

                <div className="form-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <label>Select Target Levels</label>
                    <button 
                      type="button" 
                      className="text-button" 
                      style={{ fontSize: '11px' }}
                      onClick={() => {
                        if (selectedLevels.length === Object.keys(LEVELS).length) {
                          setSelectedLevels([]);
                        } else {
                          setSelectedLevels(Object.keys(LEVELS) as Level[]);
                        }
                      }}
                    >
                      {selectedLevels.length === Object.keys(LEVELS).length ? 'Clear All' : 'Select All'}
                    </button>
                  </div>
                  <div className="levels-checkbox-grid">
                    {Object.keys(LEVELS).map(lvl => {
                      const isChecked = selectedLevels.includes(lvl as Level);
                      return (
                        <label 
                          key={lvl} 
                          className={`level-checkbox-btn ${isChecked ? 'checked' : ''}`}
                          style={{ '--lvl-color': LEVELS[lvl as Level] } as React.CSSProperties}
                        >
                          <input 
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {
                              if (isChecked) {
                                setSelectedLevels(selectedLevels.filter(l => l !== lvl));
                              } else {
                                setSelectedLevels([...selectedLevels, lvl as Level]);
                              }
                            }}
                          />
                          <span>{lvl}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="bulk-category">Default Category</label>
                  <input 
                    id="bulk-category"
                    type="text" 
                    value={bulkCategory} 
                    onChange={e => setBulkCategory(e.target.value)} 
                    placeholder="Daily Life"
                  />
                </div>

                <button className="primary full" type="submit">
                  <Sparkles size={16} />
                  <span>Generate Batch ({topicsCount(bulkTopics) * selectedLevels.length} Stories)</span>
                </button>
              </form>
            )}
          </section>

          <section className="admin-panel-card drafts-section">
            <div className="drafts-header-container">
              <div className="drafts-header">
                <h3>Draft Queue ({drafts.length})</h3>
              </div>
              
              {/* Search & Filters */}
              <div className="drafts-search-filters">
                <div className="search-wrap">
                  <Search size={14} className="search-icon" />
                  <input 
                    type="text" 
                    placeholder="Search drafts..." 
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="filter-wrap">
                  <select value={filterLevel} onChange={e => setFilterLevel(e.target.value)}>
                    <option value="ALL">All Levels</option>
                    {Object.keys(LEVELS).map(lvl => (
                      <option key={lvl} value={lvl}>{lvl}</option>
                    ))}
                  </select>
                  
                  <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                    <option value="ALL">All Statuses</option>
                    <option value="ready">Ready</option>
                    <option value="generating">Generating</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
              </div>

              {/* Bulk action selection bar */}
              {drafts.length > 0 && (
                <div className="drafts-selection-bar">
                  <label className="select-all-label">
                    <input 
                      type="checkbox"
                      checked={
                        drafts.filter(d => d.status !== 'generating').length > 0 &&
                        drafts.filter(d => d.status !== 'generating').every(d => checkedDraftIds.has(d.tempId))
                      }
                      onChange={() => {
                        const selectable = drafts.filter(d => d.status !== 'generating');
                        const allChecked = selectable.every(d => checkedDraftIds.has(d.tempId));
                        if (allChecked) {
                          setCheckedDraftIds(new Set());
                        } else {
                          setCheckedDraftIds(new Set(selectable.map(d => d.tempId)));
                        }
                      }}
                    />
                    <span>Select All Visible</span>
                  </label>

                  {checkedDraftIds.size > 0 && (
                    <div className="bulk-buttons">
                      <button 
                        className="bulk-action-btn publish" 
                        onClick={handlePublishSelected}
                        disabled={drafts.filter(d => checkedDraftIds.has(d.tempId) && d.status === 'ready').length === 0}
                        title="Publish selected stories"
                      >
                        <Check size={12} /> Publish ({drafts.filter(d => checkedDraftIds.has(d.tempId) && d.status === 'ready').length})
                      </button>
                      <button 
                        className="bulk-action-btn delete" 
                        onClick={handleDeleteSelected}
                        title="Delete selected drafts"
                      >
                        <Trash2 size={12} /> Delete ({checkedDraftIds.size})
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {getFilteredDrafts().length === 0 ? (
              <div className="empty-drafts">
                <BookOpen size={24} />
                <p>No matching drafts. Try adjusting your search/filters or generate new stories.</p>
              </div>
            ) : (
              <div className="drafts-list">
                {getFilteredDrafts().map(d => {
                  const isSelected = selectedDraftId === d.tempId;
                  const isGenerating = d.status === 'generating';
                  const isFailed = d.status === 'failed';

                  return (
                    <div key={d.tempId} className={`draft-item-container ${isFailed ? 'failed' : ''} ${isGenerating ? 'generating' : ''}`}>
                      <div className={`draft-item ${isSelected ? 'selected' : ''}`}>
                        {d.status !== 'generating' ? (
                          <input 
                            type="checkbox"
                            className="draft-select-chk"
                            checked={checkedDraftIds.has(d.tempId)}
                            onChange={() => {
                              setCheckedDraftIds(prev => {
                                const next = new Set(prev);
                                if (next.has(d.tempId)) {
                                  next.delete(d.tempId);
                                } else {
                                  next.add(d.tempId);
                                }
                                return next;
                              });
                            }}
                          />
                        ) : (
                          <div style={{ width: '16px' }} />
                        )}

                        <button 
                          className="draft-btn" 
                          onClick={() => d.status === 'ready' && setSelectedDraftId(d.tempId)}
                          disabled={d.status !== 'ready'}
                        >
                          <span className="draft-level" style={{ background: LEVELS[d.level] }}>{d.level}</span>
                          <div className="draft-info">
                            <strong>{d.title || d.topic}</strong>
                            <span>Category: {d.category}</span>
                          </div>
                        </button>

                        <div className="draft-item-actions">
                          {isFailed && (
                            <button 
                              className="draft-retry-icon-btn" 
                              onClick={() => handleRetry(d.tempId)} 
                              title="Retry generation"
                            >
                              <RefreshCw size={14} />
                            </button>
                          )}
                          
                          <button 
                            className="draft-delete-btn" 
                            onClick={() => handleDeleteDraft(d.tempId)} 
                            aria-label="Delete draft"
                            disabled={publishingBulk}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      
                      {isGenerating && (
                        <div className="draft-status-indicator progress">
                          <Loader2 className="animate-spin" size={12} />
                          <span>Generating story content & custom illustration...</span>
                        </div>
                      )}

                      {isFailed && (
                        <div className="draft-status-indicator error">
                          <AlertTriangle size={12} />
                          <span>Generation failed. {d.errorMessage || 'Please retry.'}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>

        {/* Right Column: Editor & Preview */}
        <div className="admin-right-col">
          {selectedDraft ? (
            <section className="admin-panel-card editor-section">
              <header className="editor-header">
                <div>
                  <span className="badge" style={{ background: LEVELS[selectedDraft.level] }}>{selectedDraft.level}</span>
                  <h3>Draft Editor</h3>
                </div>
                <button className="primary publish-btn" onClick={handlePublish}>
                  <Check size={16} />
                  <span>Publish Story</span>
                </button>
              </header>

              <div className="editor-body">
                {/* Meta details */}
                <div className="form-group">
                  <label>Story Image Preview</label>
                  <div className="image-preview-box">
                    <img src={selectedDraft.imageUrl} alt="Story illustration preview" className="story-hero" />
                    <div className="image-action-overlay">
                      <button className="action-btn" onClick={regenerateImage} title="Regenerate picture with current prompt">
                        <Plus size={16} />
                        <span>Regenerate Image</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="image-prompt">Image Generation Prompt</label>
                  <textarea 
                    id="image-prompt"
                    value={selectedDraft.imagePrompt}
                    onChange={e => handleUpdateDraftField('imagePrompt', e.target.value)}
                    rows={2}
                    placeholder="Illustration description prompt..."
                  />
                </div>

                <div className="form-row-group">
                  <div className="form-group">
                    <label htmlFor="edit-title">Title (Korean)</label>
                    <input 
                      id="edit-title"
                      type="text" 
                      value={selectedDraft.title} 
                      onChange={e => handleUpdateDraftField('title', e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="edit-category">Category</label>
                    <input 
                      id="edit-category"
                      type="text" 
                      value={selectedDraft.category} 
                      onChange={e => handleUpdateDraftField('category', e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="edit-subtitle">Subtitle (Korean Description)</label>
                  <input 
                    id="edit-subtitle"
                    type="text" 
                    value={selectedDraft.subtitle} 
                    onChange={e => handleUpdateDraftField('subtitle', e.target.value)}
                  />
                </div>

                {/* Paragraphs */}
                <div className="paragraphs-editor-section">
                  <h4>Paragraphs ({selectedDraft.paragraphs.length})</h4>
                  {selectedDraft.paragraphs.map((p, idx) => (
                    <div key={idx} className="paragraph-editor-item">
                      <span className="p-number">Paragraph {idx + 1}</span>
                      <div className="form-group">
                        <label htmlFor={`p-ko-${idx}`}>Korean text</label>
                        <textarea 
                          id={`p-ko-${idx}`}
                          value={p.text}
                          onChange={e => handleUpdateParagraph(idx, 'text', e.target.value)}
                          rows={3}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor={`p-en-${idx}`}>English translation</label>
                        <textarea 
                          id={`p-en-${idx}`}
                          value={p.english}
                          onChange={e => handleUpdateParagraph(idx, 'english', e.target.value)}
                          rows={3}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Vocabulary */}
                <div className="vocab-editor-section">
                  <div className="vocab-editor-header">
                    <h4>Highlight Vocabulary ({selectedDraft.newVocab.length})</h4>
                    <button className="text-button" onClick={handleAddVocab}>
                      <Plus size={16} /> Add Word
                    </button>
                  </div>
                  {selectedDraft.newVocab.map((v, idx) => (
                    <div key={idx} className="vocab-editor-item">
                      <div className="vocab-row-group">
                        <div className="form-group">
                          <label>Lemma (Base form)</label>
                          <input 
                            type="text" 
                            value={v.lemma} 
                            onChange={e => handleUpdateVocab(idx, 'lemma', e.target.value)}
                            placeholder="e.g. 꽃"
                          />
                        </div>
                        <div className="form-group">
                          <label>Pronunciation</label>
                          <input 
                            type="text" 
                            value={v.pronunciation} 
                            onChange={e => handleUpdateVocab(idx, 'pronunciation', e.target.value)}
                            placeholder="e.g. [꼳]"
                          />
                        </div>
                      </div>
                      <div className="vocab-row-group">
                        <div className="form-group">
                          <label>Part of Speech</label>
                          <select 
                            value={v.partOfSpeech} 
                            onChange={e => handleUpdateVocab(idx, 'partOfSpeech', e.target.value)}
                          >
                            <option value="noun">Noun</option>
                            <option value="verb">Verb</option>
                            <option value="adjective">Adjective</option>
                            <option value="adverb">Adverb</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label>English Meaning</label>
                          <input 
                            type="text" 
                            value={v.meaning} 
                            onChange={e => handleUpdateVocab(idx, 'meaning', e.target.value)}
                            placeholder="e.g. flower"
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Korean Example Sentence</label>
                        <textarea 
                          value={v.example} 
                          onChange={e => handleUpdateVocab(idx, 'example', e.target.value)}
                          rows={2}
                          placeholder="Example sentence using the word..."
                        />
                      </div>
                      <button className="vocab-delete-btn" onClick={() => handleRemoveVocab(idx)}>
                        <Trash2 size={14} /> Remove Word
                      </button>
                    </div>
                  ))}
                </div>

              </div>
            </section>
          ) : (
            <div className="editor-empty-state">
              <BookOpen size={48} />
              <h3>No Draft Selected</h3>
              <p>Choose a draft from the queue on the left to review, edit details, and publish it into Sori's library.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper utilities for counting topics and filtering
function topicsCount(text: string): number {
  return text
    .split('\n')
    .map(t => t.trim())
    .filter(t => t.length > 0)
    .length;
}
