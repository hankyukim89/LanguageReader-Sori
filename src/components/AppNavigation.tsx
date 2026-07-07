import { Bookmark, Home, Library, RotateCcw } from 'lucide-react';
import { LEVELS } from '../domain/content';

export type Screen = 'home' | 'library' | 'saved' | 'review';
const links = [
  ['home', Home, 'Home'], ['library', Library, 'Library'],
  ['saved', Bookmark, 'Saved words'], ['review', RotateCcw, 'Review'],
] as const;

interface Props { screen: Screen; navigate: (screen: Screen) => void }

export function Sidebar({ screen, navigate }: Props) {
  return <aside className="sidebar"><div className="brand">Sori<span>소리</span></div>
    <nav>{links.map(([id, Icon, label]) => <button key={id} className={screen === id ? 'active' : ''} onClick={() => navigate(id)}><Icon size={20}/><span>{label}</span></button>)}</nav>
    <div className="level-legend"><strong>CEFR levels</strong>{Object.entries(LEVELS).map(([level,color]) => <div key={level}><i style={{background:color}}/>{level}<small>{({A1:'Beginner',A2:'Elementary',B1:'Intermediate',B2:'Upper int.',C1:'Advanced',C2:'Mastery'})[level]}</small></div>)}</div>
    <div className="profile"><div className="avatar">M</div><div><strong>Mina</strong><small>12 day streak</small></div></div>
  </aside>;
}

export function BottomNavigation({ screen, navigate }: Props) {
  return <nav className="bottom-nav">{links.map(([id, Icon, label]) => <button key={id} className={screen === id ? 'active' : ''} onClick={() => navigate(id)}><Icon/><span>{label.replace(' words','')}</span></button>)}</nav>;
}
