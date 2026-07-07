import { useCallback, useMemo, useState } from 'react';
import { ArrowLeft, Bookmark, Search } from 'lucide-react';
import { Sidebar, BottomNavigation, type Screen } from '../components/AppNavigation';
import { SignInScreen } from '../features/auth/SignInScreen';
import { HomeView, LibraryView, type LevelFilter } from '../features/library/LibraryViews';
import { ReaderView } from '../features/reader/ReaderView';
import { ReviewView, SavedWordsView } from '../features/vocabulary/VocabularyViews';
import { usePersistentState } from '../hooks/usePersistentState';
import type { Article } from '../domain/content';

export function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [screen, setScreen] = useState<Screen>('home');
  const [article, setArticle] = useState<Article | null>(null);
  const [level, setLevel] = useState<LevelFilter>('All');
  const [saved, setSaved] = usePersistentState<string[]>('sori:saved-vocabulary', ['골목','여유','빗소리']);
  const [selectedLemma, setSelectedLemma] = useState<string | null>(null);

  const savedSet = useMemo(() => new Set(saved), [saved]);
  const isSaved = useCallback((lemma: string) => savedSet.has(lemma), [savedSet]);
  const toggleSaved = useCallback((lemma: string) => setSaved(current => current.includes(lemma) ? current.filter(item => item !== lemma) : [...current,lemma]), [setSaved]);
  const navigate = useCallback((next: Screen) => { setArticle(null); setSelectedLemma(null); setScreen(next); }, []);
  const openArticle = useCallback((next: Article) => { setArticle(next); setSelectedLemma(null); }, []);

  if (!signedIn) return <SignInScreen onSignIn={() => setSignedIn(true)}/>;

  return <div className="app-shell"><Sidebar screen={screen} navigate={navigate}/>
    <header className="mobile-header"><button aria-label="Back" onClick={() => article ? setArticle(null) : undefined}>{article ? <ArrowLeft/> : <Search/>}</button><div className="brand">Sori</div><button aria-label="Saved" onClick={() => navigate('saved')}><Bookmark/></button></header>
    <section className="workspace">{article
      ? <ReaderView article={article} selectedLemma={selectedLemma} selectLemma={setSelectedLemma} isSaved={isSaved} toggleSaved={toggleSaved}/>
      : screen === 'home' ? <HomeView level={level} setLevel={setLevel} openArticle={openArticle}/>
      : screen === 'library' ? <LibraryView level={level} setLevel={setLevel} openArticle={openArticle}/>
      : screen === 'saved' ? <SavedWordsView saved={saved} toggleSaved={toggleSaved} selectLemma={setSelectedLemma}/>
      : <ReviewView saved={saved}/>}</section>
    {!article ? <BottomNavigation screen={screen} navigate={navigate}/> : null}
  </div>;
}
