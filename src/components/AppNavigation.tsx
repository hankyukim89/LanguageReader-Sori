import { Bookmark, Home, Library, RotateCcw, User } from 'lucide-react';
import { LEVELS } from '../domain/content';

export type Screen = 'home' | 'library' | 'saved' | 'review' | 'profile';

const links = [
  ['home', Home, 'Home'], 
  ['library', Library, 'Library'],
  ['saved', Bookmark, 'Saved words'], 
  ['review', RotateCcw, 'Review'],
  ['profile', User, 'Profile']
] as const;

interface Props { 
  screen: Screen; 
  navigate: (screen: Screen) => void;
  userDisplayName?: string;
  userStreak?: number;
}

export function Sidebar({ screen, navigate, userDisplayName = 'Mina', userStreak = 12 }: Props) {
  return <aside className="sidebar">
    <button className="brand brand-button sidebar-brand" onClick={() => navigate('home')}>Sori<span>소리</span></button>
    <nav>
      {links.map(([id, Icon, label]) => (
        <button 
          key={id} 
          className={screen === id ? 'active' : ''} 
          onClick={() => navigate(id)}
        >
          <Icon size={20}/>
          <span>{label}</span>
        </button>
      ))}
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

export function BottomNavigation({ screen, navigate }: Props) {
  return <nav className="bottom-nav">
    {links.map(([id, Icon, label]) => (
      <button 
        key={id} 
        className={screen === id ? 'active' : ''} 
        onClick={() => navigate(id)}
      >
        <Icon size={22}/>
        <span>{label.replace(' words', '')}</span>
      </button>
    ))}
  </nav>;
}
