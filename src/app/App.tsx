import { useCallback, useMemo, useState, useEffect } from 'react';
import { ArrowLeft, Bookmark, Search, Sparkles } from 'lucide-react';
import { Sidebar, BottomNavigation, type Screen } from '../components/AppNavigation';
import { SignInScreen } from '../features/auth/SignInScreen';
import { HomeView, LibraryView, type LevelFilter } from '../features/library/LibraryViews';
import { ReaderView } from '../features/reader/ReaderView';
import { ReviewView, SavedWordsView } from '../features/vocabulary/VocabularyViews';
import { WordPanel } from '../features/vocabulary/WordPanel';
import { ProfileView } from '../features/profile/ProfileView';
import { StoryGenerator } from '../features/library/StoryGenerator';
import { CheckoutModal } from '../features/library/CheckoutModal';
import { authService, dbService, type AuthUser, type UserStats } from '../lib/firebase';
import { saveDynamicVocabulary } from '../content/vocabulary';
import { ARTICLES } from '../content/articles';
import type { Article } from '../domain/content';

export function App() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [stats, setStats] = useState<UserStats | null>(null);
  
  const [screen, setScreen] = useState<Screen>('home');
  const [article, setArticle] = useState<Article | null>(null);
  const [level, setLevel] = useState<LevelFilter>('All');
  
  // Per-user saved vocabulary
  const [saved, setSaved] = useState<string[]>(['골목', '여유', '빗소리']);
  
  // Custom generated articles
  const [customArticles, setCustomArticles] = useState<Article[]>([]);
  
  const [selectedLemma, setSelectedLemma] = useState<string | null>(null);
  const [showGenerator, setShowGenerator] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [savedStories, setSavedStories] = useState<string[]>([]);
  const [searchRequest, setSearchRequest] = useState(0);

  // Monitor auth state changes
  useEffect(() => {
    const unsubscribe = authService.onAuthStateChange((authUser) => {
      setUser(authUser);
      setAuthLoading(false);
      if (!authUser) {
        setStats(null);
        setScreen('home');
        setArticle(null);
      }
    });
    return unsubscribe;
  }, []);

  // Load user stats & user-specific saved words and custom articles
  useEffect(() => {
    if (!user) return;
    const currentUser = user;

    async function loadUserData() {
      try {
        const userStats = await dbService.getUserStats(currentUser.uid);
        setStats(userStats);

        // Load saved vocabulary for this user
        const storedSaved = localStorage.getItem(`sori:saved-vocabulary:${currentUser.uid}`);
        if (storedSaved) {
          setSaved(JSON.parse(storedSaved));
        } else {
          // Default initial set
          const initial = ['골목', '여유', '빗소리'];
          setSaved(initial);
          localStorage.setItem(`sori:saved-vocabulary:${currentUser.uid}`, JSON.stringify(initial));
        }

        // Load custom generated articles for this user
        const storedCustom = localStorage.getItem(`sori:custom-articles:${currentUser.uid}`);
        if (storedCustom) {
          const parsed = JSON.parse(storedCustom);
          setCustomArticles(parsed);
          
          // Re-register generated vocabulary in current session
          parsed.forEach((art: any) => {
            if (art.newVocab) {
              saveDynamicVocabulary(art.newVocab);
            }
          });
        }

        const storedStories = localStorage.getItem(`sori:saved-stories:${currentUser.uid}`);
        setSavedStories(storedStories ? JSON.parse(storedStories) : []);
      } catch (err) {
        console.error("Error loading user profile stats:", err);
      }
    }

    loadUserData();
  }, [user]);

  // Combine default static articles and custom generated articles
  const allArticles = useMemo(() => {
    return [...ARTICLES, ...customArticles];
  }, [customArticles]);

  const savedSet = useMemo(() => new Set(saved), [saved]);
  const isSaved = useCallback((lemma: string) => savedSet.has(lemma), [savedSet]);
  
  const isPremium = !!stats?.isPremium;

  useEffect(() => {
    if (screen !== 'saved' || !selectedLemma) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.requestAnimationFrame(() => {
      document.querySelector<HTMLElement>('.saved-definition-drawer button')?.focus();
    });
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedLemma(null);
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [screen, selectedLemma]);

  const toggleSaved = useCallback((lemma: string) => {
    if (!user || !stats) return;
    
    const isCurrentlySaved = saved.includes(lemma);
    if (!isCurrentlySaved) {
      // Paywall save vocab limit at 5 words
      if (!stats.isPremium && saved.length >= 5) {
        setShowPremiumModal(true);
        return;
      }
    }

    setSaved(current => {
      const next = current.includes(lemma) 
        ? current.filter(item => item !== lemma) 
        : [...current, lemma];
      
      localStorage.setItem(`sori:saved-vocabulary:${user.uid}`, JSON.stringify(next));
      return next;
    });
  }, [user, stats, saved]);

  const navigate = useCallback((next: Screen) => { 
    // Paywall block for Flashcard Review
    if (next === 'review' && !stats?.isPremium) {
      setShowPremiumModal(true);
      return;
    }
    setArticle(null); 
    setSelectedLemma(null); 
    setScreen(next); 
  }, [stats]);

  const openArticle = useCallback((next: Article) => { 
    setArticle(next); 
    setSelectedLemma(null); 
  }, []);

  // Handle word lookups (Translated words counter)
  const handleWordLookup = useCallback(async (lemma: string) => {
    if (!user || !stats) return;
    
    const words = stats.wordsTranslated || [];
    if (!words.includes(lemma)) {
      const updatedWords = [...words, lemma];
      setStats(prev => prev ? { ...prev, wordsTranslated: updatedWords } : null);
      
      try {
        await dbService.updateUserStats(user.uid, { wordsTranslated: updatedWords });
      } catch (err) {
        console.error("Failed to update translated words:", err);
      }
    }
  }, [user, stats]);

  // Handle listening time accumulation
  const handleListenTimeIncrement = useCallback(async (seconds: number) => {
    if (!user || !stats) return;

    setStats(prev => {
      if (!prev) return null;
      const nextSeconds = (prev.hoursListened || 0) + seconds;
      
      dbService.updateUserStats(user.uid, { hoursListened: nextSeconds }).catch(e => {
        console.error("Failed to sync listening time:", e);
      });

      return {
        ...prev,
        hoursListened: nextSeconds
      };
    });
  }, [user, stats]);

  // Handle story generation completion
  const handleStoryGenerated = useCallback((newArticle: Article, newVocabList: any[]) => {
    if (!user || !stats) return;

    // Save vocabulary terms to local cache so reader resolves definitions
    saveDynamicVocabulary(newVocabList);

    // Save custom article to state and storage
    setCustomArticles(current => {
      const articleWithVocab = { ...newArticle, newVocab: newVocabList };
      const next = [articleWithVocab, ...current];
      localStorage.setItem(`sori:custom-articles:${user.uid}`, JSON.stringify(next));
      return next;
    });

    // Increment AI generated count
    const nextCount = (stats.aiStoryCount || 0) + 1;
    setStats(prev => prev ? { ...prev, aiStoryCount: nextCount } : null);
    dbService.updateUserStats(user.uid, { aiStoryCount: nextCount }).catch(e => {
      console.error("Failed to update AI story count:", e);
    });

    // Auto-open reader for the generated story
    openArticle(newArticle);
  }, [user, stats, openArticle]);

  const handleOpenGenerator = () => {
    // Paywall block for AI story builder (1 free preview story limit)
    if (!isPremium && (stats?.aiStoryCount || 0) >= 1) {
      setShowPremiumModal(true);
    } else {
      setShowGenerator(true);
    }
  };

  const handlePaymentSuccess = () => {
    setStats(prev => prev ? { ...prev, isPremium: true } : null);
  };

  const toggleSavedStory = useCallback((articleId: string) => {
    if (!user) return;
    setSavedStories(current => {
      const next = current.includes(articleId)
        ? current.filter(id => id !== articleId)
        : [...current, articleId];
      localStorage.setItem(`sori:saved-stories:${user.uid}`, JSON.stringify(next));
      return next;
    });
  }, [user]);

  const handleCompleteArticle = useCallback(async (articleId: string) => {
    if (!user || !stats) return;
    const completedArticles = stats.completedArticles || [];
    if (completedArticles.includes(articleId)) return;
    const next = [...completedArticles, articleId];
    setStats(current => current ? { ...current, completedArticles: next } : current);
    await dbService.updateUserStats(user.uid, { completedArticles: next });
  }, [stats, user]);

  const openMobileSearch = () => {
    setArticle(null);
    setScreen('library');
    setSearchRequest(current => current + 1);
  };

  if (authLoading) {
    return (
      <div className="app-loading-shell">
        <div className="spinner"></div>
        <p className="loading-logo brand">Sori<span>소리</span></p>
      </div>
    );
  }

  if (!user) {
    return <SignInScreen onAuthSuccess={() => {}} />;
  }

  // Display Name & Streak fallback values
  const userDisplayName = stats?.displayName || user.displayName || user.email?.split('@')[0] || 'Learner';
  const userStreak = stats?.streak || 0;

  return <div className="app-shell">
    <Sidebar 
      screen={screen} 
      navigate={navigate} 
      userDisplayName={userDisplayName} 
      userStreak={userStreak} 
    />
    
    <header className="mobile-header">
      <button
        aria-label={article ? 'Back to stories' : 'Search stories'}
        onClick={() => article ? setArticle(null) : openMobileSearch()}
      >
        {article ? <ArrowLeft/> : <Search/>}
      </button>
      <button className="brand brand-button" onClick={() => navigate('home')}>Sori</button>
      <button aria-label="Saved" onClick={() => navigate('saved')}><Bookmark/></button>
    </header>
    
    <section className="workspace">
      {article ? (
        <ReaderView 
          article={article} 
          selectedLemma={selectedLemma} 
          selectLemma={setSelectedLemma} 
          isSaved={isSaved} 
          toggleSaved={toggleSaved}
          onWordLookup={handleWordLookup}
          onListenTimeIncrement={handleListenTimeIncrement}
          onCompleteArticle={handleCompleteArticle}
          isPremium={isPremium}
          onUpgradeRequired={() => setShowPremiumModal(true)}
        />
      ) : screen === 'home' ? (
        <div className="home-wrapper">
          <HomeView 
            level={level} 
            setLevel={setLevel} 
            openArticle={openArticle}
            isPremium={isPremium}
            onUpgradeRequired={() => setShowPremiumModal(true)}
            userDisplayName={userDisplayName}
            articles={allArticles}
            onViewAll={() => navigate('library')}
            savedStoryIds={new Set(savedStories)}
            toggleSavedStory={toggleSavedStory}
          />
          <div className="ai-story-banner-container">
            <div className="ai-story-banner" onClick={handleOpenGenerator}>
              <Sparkles className="icon-coral animate-pulse" />
              <div>
                <h3>Create an AI Graded Story</h3>
                <p>Prompt Gemini to generate a personalized reading passage with audio and translation.</p>
              </div>
              <button className="text-button">Generate</button>
            </div>
          </div>
        </div>
      ) : screen === 'library' ? (
        <div className="library-wrapper">
          <div className="library-header-actions">
            <button className="primary ai-gen-btn" onClick={handleOpenGenerator}>
              <Sparkles size={16} />
              <span>AI Story Builder</span>
            </button>
          </div>
          <LibraryView 
            level={level} 
            setLevel={setLevel} 
            openArticle={openArticle}
            isPremium={isPremium}
            onUpgradeRequired={() => setShowPremiumModal(true)}
            articles={allArticles}
            searchRequest={searchRequest}
            savedStoryIds={new Set(savedStories)}
            toggleSavedStory={toggleSavedStory}
          />
        </div>
      ) : screen === 'saved' ? (
        <>
          <SavedWordsView saved={saved} selectLemma={setSelectedLemma}/>
          {selectedLemma && (
            <div className="word-popup-container" role="dialog" aria-modal="true" aria-label="Saved word definition">
              <button className="definition-backdrop" aria-label="Close definition" onClick={() => setSelectedLemma(null)} />
              <div className="word-popup-card">
                <WordPanel lemma={selectedLemma} onClose={() => setSelectedLemma(null)} isSaved={isSaved} toggleSaved={toggleSaved}/>
              </div>
            </div>
          )}
        </>
      ) : screen === 'review' ? (
        <ReviewView saved={saved}/>
      ) : (
        <ProfileView 
          key={`profile-${isPremium ? 'pro' : 'free'}`}
          uid={user.uid} 
          savedCount={saved.length} 
          onSignOut={() => setUser(null)} 
          onUpgradeClick={() => setShowPremiumModal(true)}
        />
      )}
    </section>

    {!article ? <BottomNavigation screen={screen} navigate={navigate}/> : null}

    {showGenerator && (
      <StoryGenerator 
        onClose={() => setShowGenerator(false)} 
        onStoryGenerated={handleStoryGenerated} 
      />
    )}

    {showPremiumModal && (
      <CheckoutModal 
        uid={user.uid}
        onClose={() => setShowPremiumModal(false)}
        onPaymentSuccess={handlePaymentSuccess}
      />
    )}
  </div>;
}
