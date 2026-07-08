import { Bookmark, ChevronRight, Play, Search, Lock } from 'lucide-react';
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
}

export function isPremiumArticle(id: string, level: Level): boolean {
  if (id.startsWith('ai-')) return true;
  if (['B1', 'B2', 'C1', 'C2'].includes(level)) return true;
  if (id === 'a1-bicycle' || id === 'a2-gimbap') return true;
  return false;
}

export function HomeView({ level, setLevel, openArticle, isPremium, onUpgradeRequired, userDisplayName = 'Mina', articles }: ViewProps) {
  const featured = articles.filter(article => level === 'All' || article.level === level).slice(0, 4);

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
        <p>Tuesday, July 7</p>
        <h1>안녕하세요, {userDisplayName}</h1>
        <span>What would you like to read today?</span>
      </div>
      <button className="round-search" aria-label="Search"><Search/></button>
    </header>
    
    <div className="continue-card" onClick={() => openArticle(articles[0])} role="button" tabIndex={0}>
      <div className="continue-image">
        <img src={`${import.meta.env.BASE_URL}assets/bakery.png`} alt="A small bakery in Seoul"/>
        <button aria-label="Continue reading"><Play fill="currentColor"/></button>
      </div>
      <div>
        <span className="overline">CONTINUE READING</span>
        <h2>서울의 작은 빵집</h2>
        <p>A warm story from a quiet neighborhood alley.</p>
        <div className="continue-progress"><i/><span>68%</span></div>
      </div>
    </div>
    
    <SectionTitle title="Choose your level" action="CEFR guide"/>
    <LevelPicker value={level} onChange={setLevel}/>
    
    <SectionTitle title={level === 'All' ? 'Fresh stories' : `${level} stories`} action="View all"/>
    <div className="story-grid">
      {featured.map(article => (
        <StoryCard 
          key={article.id} 
          article={article} 
          onOpen={handleOpen}
          isLocked={!isPremium && isPremiumArticle(article.id, article.level)}
        />
      ))}
    </div>
  </div>;
}

export function LibraryView({ level, setLevel, openArticle, isPremium, onUpgradeRequired, articles }: ViewProps) {
  const visible = articles.filter(article => level === 'All' || article.level === level);

  const handleOpen = (article: Article) => {
    if (!isPremium && isPremiumArticle(article.id, article.level)) {
      onUpgradeRequired();
    } else {
      openArticle(article);
    }
  };

  return <div className="page library-page">
    <header className="page-heading">
      <div>
        <p>Explore</p>
        <h1>The library</h1>
        <span>{articles.length} stories across six Korean levels.</span>
      </div>
      <button className="round-search" aria-label="Search"><Search/></button>
    </header>
    
    <LevelPicker value={level} onChange={setLevel}/>
    
    <div className="library-list">
      {visible.map(article => (
        <StoryCard 
          key={article.id} 
          article={article} 
          onOpen={handleOpen}
          isLocked={!isPremium && isPremiumArticle(article.id, article.level)}
        />
      ))}
    </div>
  </div>;
}

function LevelPicker({ value, onChange }: { value: LevelFilter; onChange: (level: LevelFilter) => void }) {
  return <div className="level-picker"><button className={value === 'All' ? 'active' : ''} onClick={() => onChange('All')}>All</button>{Object.entries(LEVELS).map(([level,color]) => <button key={level} className={value === level ? 'active' : ''} style={{'--level':color} as React.CSSProperties} onClick={() => onChange(level as Level)}><i/>{level}</button>)}</div>;
}

function SectionTitle({ title, action }: { title: string; action: string }) {
  return <div className="section-title"><h2>{title}</h2><button>{action}<ChevronRight/></button></div>;
}

function StoryCard({ article, onOpen, isLocked }: { article: Article; onOpen: (article: Article) => void; isLocked: boolean }) {
  return <article className={`story-card ${isLocked ? 'story-locked' : ''}`} onClick={() => onOpen(article)}>
    <div className="story-image">
      <img src={article.image} alt=""/>
      <span style={{background:LEVELS[article.level]}}>{article.level}</span>
      {isLocked ? (
        <span className="premium-lock-badge">
          <Lock size={12} fill="currentColor" /> Pro
        </span>
      ) : (
        <button aria-label="Save story" onClick={e => e.stopPropagation()}><Bookmark/></button>
      )}
    </div>
    <div>
      <small>{article.category} · {article.minutes} min</small>
      <h3>{article.title}</h3>
      <p>{article.subtitle}</p>
    </div>
  </article>;
}
