import { Bookmark, Home, Library, RotateCcw, User, Settings, ShieldAlert } from 'lucide-react';
import { LEVELS } from '../domain/content';

export type Screen = 'home' | 'library' | 'saved' | 'review' | 'profile' | 'admin';

interface Props { 
  screen: Screen; 
  navigate: (screen: Screen) => void;
  userDisplayName?: string;
  userStreak?: number;
  isAdmin?: boolean;
  onOpenSettings?: () => void;
}

export function Sidebar({ 
  screen, 
  navigate, 
  userDisplayName = 'Mina', 
  userStreak = 12, 
  isAdmin = false, 
  onOpenSettings 
}: Props) {
  return <aside className="sidebar">
    <div className="sidebar-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0 12px 40px' }}>
      <button className="brand brand-button" onClick={() => navigate('home')} style={{ margin: 0, cursor: 'pointer' }}>
        Sori<span>소리</span>
      </button>
      {onOpenSettings && (
        <button 
          className="settings-cog-btn" 
          onClick={onOpenSettings} 
          aria-label="Open Settings"
          style={{ border: 0, background: 'none', cursor: 'pointer', padding: '6px', color: 'var(--muted)', display: 'grid', placeItems: 'center' }}
        >
          <Settings size={18} />
        </button>
      )}
    </div>
    
    <nav style={{ display: 'grid', gap: '6px' }}>
      <button 
        className={screen === 'home' ? 'active' : ''} 
        onClick={() => navigate('home')}
      >
        <Home size={20}/>
        <span>Home</span>
      </button>
      
      <button 
        className={screen === 'library' ? 'active' : ''} 
        onClick={() => navigate('library')}
      >
        <Library size={20}/>
        <span>Library</span>
      </button>
      
      <button 
        className={screen === 'saved' ? 'active' : ''} 
        onClick={() => navigate('saved')}
      >
        <Bookmark size={20}/>
        <span>Saved words</span>
      </button>
      
      <button 
        className={screen === 'review' ? 'active' : ''} 
        onClick={() => navigate('review')}
      >
        <RotateCcw size={20}/>
        <span>Review</span>
      </button>
      
      {isAdmin && (
        <button 
          className={screen === 'admin' ? 'active' : ''} 
          onClick={() => navigate('admin')}
          style={{ color: 'var(--coral)', fontWeight: screen === 'admin' ? '700' : 'normal' }}
        >
          <ShieldAlert size={20}/>
          <span>Admin Panel</span>
        </button>
      )}

      <button 
        className={screen === 'profile' ? 'active' : ''} 
        onClick={() => navigate('profile')}
      >
        <User size={20}/>
        <span>Profile</span>
      </button>
    </nav>

    <div className="level-legend">
      <strong>CEFR levels</strong>
      {Object.entries(LEVELS).map(([level, color]) => (
        <div key={level}>
          <i style={{ background: color }}/>
          {level}
          <small>
            {({ A1: 'Beginner', A2: 'Elementary', B1: 'Intermediate', B2: 'Upper int.', C1: 'Advanced', C2: 'Mastery' })[level as keyof typeof LEVELS]}
          </small>
        </div>
      ))}
    </div>
    
    <button
      className={`profile-trigger profile ${screen === 'profile' ? 'active-profile' : ''}`} 
      onClick={() => navigate('profile')} 
      aria-label={`Open profile for ${userDisplayName}`}
    >
      <div className="avatar">{userDisplayName.charAt(0).toUpperCase()}</div>
      <div>
        <strong>{userDisplayName}</strong>
        <small>{userStreak} day streak</small>
      </div>
    </button>
  </aside>;
}

export function BottomNavigation({ screen, navigate, isAdmin = false }: Props) {
  return <nav className="bottom-nav">
    <button className={screen === 'home' ? 'active' : ''} onClick={() => navigate('home')}>
      <Home size={22}/>
      <span>Home</span>
    </button>
    
    <button className={screen === 'library' ? 'active' : ''} onClick={() => navigate('library')}>
      <Library size={22}/>
      <span>Library</span>
    </button>
    
    <button className={screen === 'saved' ? 'active' : ''} onClick={() => navigate('saved')}>
      <Bookmark size={22}/>
      <span>Saved</span>
    </button>
    
    <button className={screen === 'review' ? 'active' : ''} onClick={() => navigate('review')}>
      <RotateCcw size={22}/>
      <span>Review</span>
    </button>
    
    {isAdmin ? (
      <button className={screen === 'admin' ? 'active' : ''} onClick={() => navigate('admin')}>
        <ShieldAlert size={22}/>
        <span>Admin</span>
      </button>
    ) : (
      <button className={screen === 'profile' ? 'active' : ''} onClick={() => navigate('profile')}>
        <User size={22}/>
        <span>Profile</span>
      </button>
    )}
  </nav>;
}
