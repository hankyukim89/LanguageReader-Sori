import { useEffect, useRef, useState } from 'react';
import { Bookmark, ChevronRight, Play, Search, Lock, X } from 'lucide-react';
import { LEVELS, type Article, type Level } from '../../domain/content';

export type LevelFilter = Level | 'All';

interface ViewProps { 
  level: LevelFilter; 
  setLevel: (level: LevelFilter) => void; 
  openArticle: (article: Article) => void;
  isPremium: boolean;
  onUpgradeRequired: () => void;
  userDisplayName?: string;
  articles: Article[];
  onViewAll?: () => void;
  searchRequest?: number;
  savedStoryIds?: Set<string>;
  toggleSavedStory?: (articleId: string) => void;
}

const EMPTY_STORY_IDS = new Set<string>();

function matchesQuery(article: Article, query: string) {
  const normalized = query.trim().toLocaleLowerCase();
  if (!normalized) return true;
  return `${article.title} ${article.subtitle} ${article.category} ${article.level}`.toLocaleLowerCase().includes(normalized);
}

export function isPremiumArticle(id: string, level: Level): boolean {
  if (id.startsWith('ai-')) return true;
  if (['B1', 'B2', 'C1', 'C2'].includes(level)) return true;
  if (id === 'a1-bicycle' || id === 'a2-gimbap') return true;
  return false;
}

export function HomeView({ level, setLevel, openArticle, isPremium, onUpgradeRequired, userDisplayName = 'Mina', articles, onViewAll, savedStoryIds = EMPTY_STORY_IDS, toggleSavedStory }: ViewProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [showGuide, setShowGuide] = useState(false);
  const featured = articles
    .filter(article => (level === 'All' || article.level === level) && matchesQuery(article, query))
    .slice(0, 4);
  const dateLabel = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date());

  const handleOpen = (article: Article) => {
    if (!isPremium && isPremiumArticle(article.id, article.level)) {
      onUpgradeRequired();
    } else {
      openArticle(article);
    }
  };

  return <div className="page home-page">
    <header className="page-heading">
      <div>
        <p>{dateLabel}</p>
        <h1>안녕하세요, {userDisplayName}</h1>
        <span>What would you like to read today?</span>
      </div>
      <button className="round-search" aria-label="Search stories" onClick={() => setSearchOpen(current => !current)}><Search/></button>
    </header>

    {searchOpen && <SearchField value={query} onChange={setQuery} onClose={() => { setQuery(''); setSearchOpen(false); }} />}
    
    <button className="continue-card" onClick={() => openArticle(articles[0])}>
      <div className="continue-image">
        <img src={`${import.meta.env.BASE_URL}assets/bakery.png`} alt="A small bakery in Seoul"/>
        <span className="continue-play" aria-hidden="true"><Play fill="currentColor"/></span>
      </div>
      <div>
        <span className="overline">CONTINUE READING</span>
        <h2>서울의 작은 빵집</h2>
        <p>A warm story from a quiet neighborhood alley.</p>
        <div className="continue-progress"><i/><span>68%</span></div>
      </div>
    </button>
    
    <SectionTitle title="Choose your level" action="CEFR guide" onAction={() => setShowGuide(current => !current)}/>
    {showGuide && <div className="cefr-guide" role="note">A levels cover everyday basics, B levels add independent reading, and C levels focus on nuanced advanced Korean.</div>}
    <LevelPicker value={level} onChange={setLevel}/>
    
    <SectionTitle title={level === 'All' ? 'Fresh stories' : `${level} stories`} action="View all" onAction={onViewAll}/>
    <div className="story-grid">
      {featured.map(article => (
        <StoryCard 
          key={article.id} 
          article={article} 
          onOpen={handleOpen}
          isLocked={!isPremium && isPremiumArticle(article.id, article.level)}
          isSaved={savedStoryIds.has(article.id)}
          onToggleSaved={() => toggleSavedStory?.(article.id)}
        />
      ))}
      {!featured.length && <div className="empty-state compact"><h2>No matching stories</h2><p>Try another title, topic, or level.</p></div>}
    </div>
  </div>;
}

export function LibraryView({ level, setLevel, openArticle, isPremium, onUpgradeRequired, articles, searchRequest = 0, savedStoryIds = EMPTY_STORY_IDS, toggleSavedStory }: ViewProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const visible = articles.filter(article => (level === 'All' || article.level === level) && matchesQuery(article, query));

  useEffect(() => {
    if (!searchRequest) return;
    setSearchOpen(true);
    window.requestAnimationFrame(() => searchRef.current?.focus());
  }, [searchRequest]);

  const handleOpen = (article: Article) => {
    if (!isPremium && isPremiumArticle(article.id, article.level)) {
      onUpgradeRequired();
    } else {
      openArticle(article);
    }
  };

  // Group visible articles by category
  const categoriesMap = visible.reduce((acc, article) => {
    const cat = article.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(article);
    return acc;
  }, {} as Record<string, Article[]>);

  return <div className="page library-page">
    <header className="page-heading">
      <div>
        <p>Explore</p>
        <h1>The library</h1>
        <span>{articles.length} stories across six Korean levels.</span>
      </div>
      <button className="round-search" aria-label="Search stories" onClick={() => setSearchOpen(current => !current)}><Search/></button>
    </header>
    {searchOpen && <SearchField ref={searchRef} value={query} onChange={setQuery} onClose={() => { setQuery(''); setSearchOpen(false); }} />}
    
    <LevelPicker value={level} onChange={setLevel}/>
    
    <div className="library-categories" style={{ display: 'grid', gap: '38px', marginTop: '24px' }}>
      {Object.entries(categoriesMap).map(([categoryName, catArticles]) => (
        <div key={categoryName} className="category-section">
          <h2 className="category-title" style={{ fontFamily: 'Georgia, serif', fontSize: '22px', margin: '0 0 16px', borderBottom: '1px solid var(--line)', paddingBottom: '8px' }}>
            {categoryName}
          </h2>
          <div className="library-list">
            {catArticles.map(article => (
              <StoryCard 
                key={article.id} 
                article={article} 
                onOpen={handleOpen}
                isLocked={!isPremium && isPremiumArticle(article.id, article.level)}
                isSaved={savedStoryIds.has(article.id)}
                onToggleSaved={() => toggleSavedStory?.(article.id)}
              />
            ))}
          </div>
        </div>
      ))}
      {!visible.length && <div className="empty-state compact"><h2>No matching stories</h2><p>Try another title, topic, or level.</p></div>}
    </div>
  </div>;
}

function LevelPicker({ value, onChange }: { value: LevelFilter; onChange: (level: LevelFilter) => void }) {
  return <div className="level-picker"><button className={value === 'All' ? 'active' : ''} onClick={() => onChange('All')}>All</button>{Object.entries(LEVELS).map(([level,color]) => <button key={level} className={value === level ? 'active' : ''} style={{'--level':color} as React.CSSProperties} onClick={() => onChange(level as Level)}><i/>{level}</button>)}</div>;
}

function SectionTitle({ title, action, onAction }: { title: string; action: string; onAction?: () => void }) {
  return <div className="section-title"><h2>{title}</h2><button onClick={onAction}>{action}<ChevronRight/></button></div>;
}

function StoryCard({ article, onOpen, isLocked, isSaved, onToggleSaved }: { article: Article; onOpen: (article: Article) => void; isLocked: boolean; isSaved: boolean; onToggleSaved: () => void }) {
  return <article className={`story-card ${isLocked ? 'story-locked' : ''}`}>
    <button className="story-main" onClick={() => onOpen(article)} aria-label={`${isLocked ? 'Unlock' : 'Read'} ${article.title}`}>
      <div className="story-image">
        <img src={article.image} alt="" loading="lazy" decoding="async"/>
        <span style={{background:LEVELS[article.level]}}>{article.level}</span>
        {isLocked && <span className="premium-lock-badge"><Lock size={12} fill="currentColor" /> Pro</span>}
      </div>
      <div className="story-copy">
        <small>{article.category} · {article.minutes} min</small>
        <h3>{article.title}</h3>
        <p>{article.subtitle}</p>
      </div>
    </button>
    {!isLocked && <button className="story-save" aria-label={isSaved ? `Remove ${article.title} from saved stories` : `Save ${article.title}`} aria-pressed={isSaved} onClick={onToggleSaved}><Bookmark fill={isSaved ? 'currentColor' : 'none'}/></button>}
  </article>;
}

const SearchField = ({ value, onChange, onClose, ref }: { value: string; onChange: (value: string) => void; onClose: () => void; ref?: React.Ref<HTMLInputElement> }) => (
  <div className="story-search" role="search">
    <Search aria-hidden="true" />
    <input ref={ref} value={value} onChange={event => onChange(event.target.value)} placeholder="Search by title, topic, or level" aria-label="Search stories" />
    <button onClick={onClose} aria-label="Close search"><X /></button>
  </div>
);
