import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword as fbSignIn, 
  createUserWithEmailAndPassword as fbSignUp, 
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithPopup,
  signOut as fbSignOut, 
  onAuthStateChanged as fbOnAuthChange, 
  type User as FirebaseUser 
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc,
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  getDocs
} from 'firebase/firestore';
import type { Article } from '../domain/content';

export interface UserStats {
  uid: string;
  email: string;
  displayName: string;
  createdAt: string;
  primaryLanguage: string;
  streak: number;
  lastActiveDate: string;
  wordsTranslated: string[]; // List of unique lemmas clicked
  hoursListened: number;     // Listened time in seconds
  isPremium: boolean;
  aiStoryCount: number;      // Tracks count of generated stories
  completedArticles?: string[];
}

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const isRealFirebase = !!import.meta.env.VITE_FIREBASE_API_KEY;

let app;
let auth: any = null;
let db: any = null;

if (isRealFirebase) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    db = getFirestore(app);
  } catch (error) {
    console.error("Failed to initialize real Firebase:", error);
  }
}

// Default initial mock stats for new users
const createDefaultStats = (uid: string, email: string): UserStats => ({
  uid,
  email,
  displayName: email.split('@')[0],
  createdAt: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
  primaryLanguage: 'English',
  streak: 12, // Default streak to match UI concept initially
  lastActiveDate: new Date().toISOString().split('T')[0],
  wordsTranslated: ['골목', '여유', '빗소리'],
  hoursListened: 1080, // 18 minutes in seconds
  isPremium: false,
  aiStoryCount: 0,
  completedArticles: []
});

// Mock Local Storage State
const getMockUsers = () => JSON.parse(localStorage.getItem('sori:mock-users') || '{}');
const setMockUsers = (users: any) => localStorage.setItem('sori:mock-users', JSON.stringify(users));

const getMockStats = (uid: string): UserStats | null => {
  const stats = localStorage.getItem(`sori:mock-stats:${uid}`);
  if (!stats) return null;
  const parsed = JSON.parse(stats) as UserStats;
  if (parsed.isPremium === undefined) parsed.isPremium = false;
  if (parsed.aiStoryCount === undefined) parsed.aiStoryCount = 0;
  return parsed;
};
const setMockStats = (uid: string, stats: UserStats) => {
  localStorage.setItem(`sori:mock-stats:${uid}`, JSON.stringify(stats));
};

let currentMockUser: AuthUser | null = null;
const mockAuthCallbacks = new Set<(user: AuthUser | null) => void>();

export const authService = {
  isReal: isRealFirebase,

  onAuthStateChange(callback: (user: AuthUser | null) => void) {
    if (isRealFirebase && auth) {
      return fbOnAuthChange(auth, (fbUser) => {
        if (fbUser) {
          callback({
            uid: fbUser.uid,
            email: fbUser.email,
            displayName: fbUser.displayName || fbUser.email?.split('@')[0] || 'User'
          });
        } else {
          callback(null);
        }
      });
    } else {
      mockAuthCallbacks.add(callback);
      setTimeout(() => callback(currentMockUser), 0);
      return () => {
        mockAuthCallbacks.delete(callback);
      };
    }
  },

  async signUp(email: string, password: string): Promise<AuthUser> {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    // Map short 'a' / 'a' to valid Firebase email and password format
    const targetEmail = cleanEmail === 'a' ? 'admin@sori.app' : cleanEmail;
    const targetPassword = cleanEmail === 'a' && cleanPassword === 'a' ? 'admin_password_123' : cleanPassword;

    if (isRealFirebase && auth) {
      try {
        const cred = await fbSignUp(auth, targetEmail, targetPassword);
        if (db) {
          try {
            const statsRef = doc(db, 'users', cred.user.uid);
            const initialStats = createDefaultStats(cred.user.uid, targetEmail);
            if (cleanEmail === 'a') {
              initialStats.isPremium = true; // Admin is always premium
            }
            await setDoc(statsRef, initialStats);
          } catch (dbErr) {
            console.error("Failed to write user stats to Firestore:", dbErr);
          }
        }
        return {
          uid: cred.user.uid,
          email: cred.user.email,
          displayName: cred.user.displayName || cred.user.email?.split('@')[0] || 'User'
        };
      } catch (err: any) {
        console.warn("Real Firebase sign-up failed (possibly auth method disabled). Falling back to mock mode:", err);
        return this.signUpMock(cleanEmail, cleanPassword);
      }
    } else {
      return this.signUpMock(cleanEmail, cleanPassword);
    }
  },

  async signUpMock(cleanEmail: string, cleanPassword: string): Promise<AuthUser> {
    const users = getMockUsers();
    if (users[cleanEmail]) {
      throw new Error('auth/email-already-in-use');
    }
    const uid = 'mock_' + Math.random().toString(36).substring(2, 11);
    users[cleanEmail] = { uid, password: cleanPassword };
    setMockUsers(users);

    const newUser: AuthUser = { uid, email: cleanEmail, displayName: cleanEmail.split('@')[0] };
    currentMockUser = newUser;
    
    setMockStats(uid, createDefaultStats(uid, cleanEmail));
    mockAuthCallbacks.forEach(cb => cb(currentMockUser));
    return newUser;
  },

  async signIn(email: string, password: string): Promise<AuthUser> {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    // Map short 'a' / 'a' to valid Firebase email and password format
    const targetEmail = cleanEmail === 'a' ? 'admin@sori.app' : cleanEmail;
    const targetPassword = cleanEmail === 'a' && cleanPassword === 'a' ? 'admin_password_123' : cleanPassword;

    if (isRealFirebase && auth) {
      try {
        const cred = await fbSignIn(auth, targetEmail, targetPassword);
        return {
          uid: cred.user.uid,
          email: cred.user.email,
          displayName: cred.user.displayName || cred.user.email?.split('@')[0] || 'User'
        };
      } catch (err: any) {
        console.warn("Real Firebase sign-in failed, trying auto-registration or mock fallback:", err);
        
        // Auto sign up if it's the admin user 'a' on a fresh firebase project where account doesn't exist
        if (cleanEmail === 'a' && (err.code === 'auth/user-not-found' || err.message?.includes('invalid-credential') || err.message?.includes('user-not-found'))) {
          try {
            return await this.signUp(cleanEmail, cleanPassword);
          } catch (signUpErr) {
            console.warn("Auto registration failed, falling back to mock mode:", signUpErr);
          }
        }
        
        // Fall back to local mock authentication on any other errors (such as disabled auth provider)
        return this.signInMock(cleanEmail, cleanPassword);
      }
    } else {
      return this.signInMock(cleanEmail, cleanPassword);
    }
  },

  async signInMock(cleanEmail: string, cleanPassword: string): Promise<AuthUser> {
    // Auto-create/initialize mock admin if using username 'a' and password 'a' in mock mode
    if (cleanEmail === 'a' && cleanPassword === 'a') {
      const users = getMockUsers();
      if (!users['a']) {
        users['a'] = { uid: 'mock_admin', password: 'a' };
        setMockUsers(users);
        setMockStats('mock_admin', {
          uid: 'mock_admin',
          email: 'admin@sori.app',
          displayName: 'Admin Learner',
          createdAt: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          primaryLanguage: 'English',
          streak: 99,
          lastActiveDate: new Date().toISOString().split('T')[0],
          wordsTranslated: ['골목', '여유', '빗소리'],
          hoursListened: 3600,
          isPremium: true,
          aiStoryCount: 5,
          completedArticles: []
        });
      }
    }

    const users = getMockUsers();
    const stored = users[cleanEmail];
    if (!stored || stored.password !== cleanPassword) {
      throw new Error('auth/invalid-credential');
    }
    const existingUser: AuthUser = { uid: stored.uid, email: cleanEmail, displayName: cleanEmail.split('@')[0] };
    currentMockUser = existingUser;

    const stats = getMockStats(stored.uid);
    if (stats) {
      const todayStr = new Date().toISOString().split('T')[0];
      const yesterdayStr = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      
      if (stats.lastActiveDate === yesterdayStr) {
        stats.streak += 1;
        stats.lastActiveDate = todayStr;
        setMockStats(stored.uid, stats);
      } else if (stats.lastActiveDate !== todayStr) {
        stats.streak = 1;
        stats.lastActiveDate = todayStr;
        setMockStats(stored.uid, stats);
      }
    } else {
      setMockStats(stored.uid, createDefaultStats(stored.uid, cleanEmail));
    }

    mockAuthCallbacks.forEach(cb => cb(currentMockUser));
    return existingUser;
  },

  async signInWithGoogle(): Promise<AuthUser> {
    if (isRealFirebase && auth) {
      const credential = await signInWithPopup(auth, new GoogleAuthProvider());
      const fbUser = credential.user;
      if (db) {
        const statsRef = doc(db, 'users', fbUser.uid);
        const snap = await getDoc(statsRef);
        if (!snap.exists()) await setDoc(statsRef, createDefaultStats(fbUser.uid, fbUser.email || 'user@sori.app'));
      }
      return { uid: fbUser.uid, email: fbUser.email, displayName: fbUser.displayName };
    }

    const email = 'preview-google-user@sori.app';
    const users = getMockUsers();
    if (!users[email]) {
      const uid = 'mock_google';
      users[email] = { uid, password: 'local-preview-only' };
      setMockUsers(users);
      setMockStats(uid, createDefaultStats(uid, email));
    }
    const current = users[email];
    currentMockUser = { uid: current.uid, email, displayName: 'Preview learner' };
    mockAuthCallbacks.forEach(cb => cb(currentMockUser));
    return currentMockUser;
  },

  async sendPasswordReset(email: string): Promise<void> {
    if (isRealFirebase && auth) {
      await sendPasswordResetEmail(auth, email);
    }
  },

  async signOut(): Promise<void> {
    if (isRealFirebase && auth) {
      await fbSignOut(auth);
    } else {
      currentMockUser = null;
      mockAuthCallbacks.forEach(cb => cb(null));
    }
  }
};

export const dbService = {
  async checkActiveSubscription(uid: string): Promise<boolean> {
    if (isRealFirebase && db) {
      try {
        const subsRef = collection(db, 'users', uid, 'subscriptions');
        const q = query(subsRef, where('status', 'in', ['active', 'trialing']));
        const snap = await getDocs(q);
        return !snap.empty;
      } catch (err) {
        console.error("Error checking user subscription from Stripe:", err);
        return false;
      }
    }
    return false;
  },

  async createCheckoutSession(uid: string, priceId: string): Promise<string> {
    if (isRealFirebase && db) {
      const sessionsRef = collection(db, 'users', uid, 'checkout_sessions');
      const docRef = await addDoc(sessionsRef, {
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });

      return new Promise((resolve, reject) => {
        const unsubscribe = onSnapshot(docRef, (snap) => {
          const data = snap.data();
          if (data?.error) {
            unsubscribe();
            reject(new Error(data.error.message));
          }
          if (data?.url) {
            unsubscribe();
            resolve(data.url);
          }
        }, (err) => {
          unsubscribe();
          reject(err);
        });
      });
    }
    throw new Error("Stripe checkout is not available in offline preview mode");
  },

  async getUserStats(uid: string): Promise<UserStats> {
    if (isRealFirebase && db) {
      const statsRef = doc(db, 'users', uid);
      const snap = await getDoc(statsRef);
      
      const isPremiumStripe = await dbService.checkActiveSubscription(uid);

      if (snap.exists()) {
        const data = snap.data() as UserStats;
        const isPremium = isPremiumStripe || data.isPremium || false;

        if (data.isPremium === undefined || data.aiStoryCount === undefined || data.isPremium !== isPremium) {
          const migrated = {
            ...data,
            isPremium,
            aiStoryCount: data.aiStoryCount !== undefined ? data.aiStoryCount : 0
          };
          await setDoc(statsRef, migrated, { merge: true });
          return migrated;
        }
        return data;
      } else {
        const defaultStats = createDefaultStats(uid, 'user@sori.app');
        defaultStats.isPremium = isPremiumStripe;
        await setDoc(statsRef, defaultStats);
        return defaultStats;
      }
    } else {
      let stats = getMockStats(uid);
      if (!stats) {
        stats = createDefaultStats(uid, 'demo@sori.app');
        setMockStats(uid, stats);
      }
      return stats;
    }
  },

  async updateUserStats(uid: string, updates: Partial<UserStats>): Promise<void> {
    if (isRealFirebase && db) {
      const statsRef = doc(db, 'users', uid);
      await updateDoc(statsRef, updates as any);
    } else {
      const current = getMockStats(uid);
      if (current) {
        const updated = { ...current, ...updates };
        setMockStats(uid, updated);
      }
    }
  },

  // Real database support for stories & vocabulary
  async getPublishedArticles(): Promise<Article[]> {
    if (isRealFirebase && db) {
      try {
        const storiesRef = collection(db, 'stories');
        const snap = await getDocs(storiesRef);
        return snap.docs.map(doc => doc.data() as Article);
      } catch (error) {
        console.error("Error getting published articles from Firestore:", error);
        return [];
      }
    } else {
      const raw = localStorage.getItem('sori:published-articles');
      return raw ? JSON.parse(raw) : [];
    }
  },

  async publishArticle(article: Article): Promise<void> {
    if (isRealFirebase && db) {
      const articleRef = doc(db, 'stories', article.id);
      await setDoc(articleRef, article);
    } else {
      const publishedRaw = localStorage.getItem('sori:published-articles');
      const publishedList: Article[] = publishedRaw ? JSON.parse(publishedRaw) : [];
      const updatedList = [article, ...publishedList];
      localStorage.setItem('sori:published-articles', JSON.stringify(updatedList));
    }
  },

  async getPublishedVocabulary(): Promise<Record<string, any>> {
    const vocabMap: Record<string, any> = {};
    if (isRealFirebase && db) {
      try {
        const vocabRef = collection(db, 'vocabulary');
        const snap = await getDocs(vocabRef);
        snap.docs.forEach(doc => {
          vocabMap[doc.id] = doc.data();
        });
      } catch (error) {
        console.error("Error loading vocab from Firestore:", error);
      }
    } else {
      try {
        const raw = localStorage.getItem('sori:dynamic-vocabulary');
        if (raw) {
          return JSON.parse(raw);
        }
      } catch (e) {
        console.error(e);
      }
    }
    return vocabMap;
  },

  async saveDynamicVocabulary(newVocab: any[]): Promise<void> {
    if (isRealFirebase && db) {
      try {
        for (const entry of newVocab) {
          if (entry.lemma.trim()) {
            const vocabRef = doc(db, 'vocabulary', entry.lemma.trim());
            await setDoc(vocabRef, entry);
          }
        }
      } catch (error) {
        console.error("Error saving dynamic vocab to Firestore:", error);
      }
    } else {
      const storedVocab = localStorage.getItem('sori:dynamic-vocabulary');
      const dynamicMap = storedVocab ? JSON.parse(storedVocab) : {};
      newVocab.forEach(entry => {
        if (entry.lemma.trim()) {
          dynamicMap[entry.lemma.trim()] = entry;
        }
      });
      localStorage.setItem('sori:dynamic-vocabulary', JSON.stringify(dynamicMap));
    }
  }
};
