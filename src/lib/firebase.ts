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
  // Migration support for existing storage entries
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
      // Trigger initial callback asynchronously
      setTimeout(() => callback(currentMockUser), 0);
      return () => {
        mockAuthCallbacks.delete(callback);
      };
    }
  },

  async signUp(email: string, password: string): Promise<AuthUser> {
    if (isRealFirebase && auth) {
      const cred = await fbSignUp(auth, email, password);
      // Initialize firestore doc
      if (db) {
        const statsRef = doc(db, 'users', cred.user.uid);
        const initialStats = createDefaultStats(cred.user.uid, email);
        await setDoc(statsRef, initialStats);
      }
      return {
        uid: cred.user.uid,
        email: cred.user.email,
        displayName: cred.user.email?.split('@')[0] || 'User'
      };
    } else {
      const users = getMockUsers();
      if (users[email]) {
        throw new Error('auth/email-already-in-use');
      }
      const uid = 'mock_' + Math.random().toString(36).substring(2, 11);
      users[email] = { uid, password };
      setMockUsers(users);

      const newUser: AuthUser = { uid, email, displayName: email.split('@')[0] };
      currentMockUser = newUser;
      
      // Initialize mock statistics
      setMockStats(uid, createDefaultStats(uid, email));

      mockAuthCallbacks.forEach(cb => cb(currentMockUser));
      return newUser;
    }
  },

  async signIn(email: string, password: string): Promise<AuthUser> {
    if (isRealFirebase && auth) {
      const cred = await fbSignIn(auth, email, password);
      return {
        uid: cred.user.uid,
        email: cred.user.email,
        displayName: cred.user.displayName || cred.user.email?.split('@')[0] || 'User'
      };
    } else {
      const users = getMockUsers();
      const stored = users[email];
      if (!stored || stored.password !== password) {
        throw new Error('auth/invalid-credential');
      }
      const existingUser: AuthUser = { uid: stored.uid, email, displayName: email.split('@')[0] };
      currentMockUser = existingUser;

      // Update streak on login
      const stats = getMockStats(stored.uid);
      if (stats) {
        const todayStr = new Date().toISOString().split('T')[0];
        const yesterdayStr = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        
        if (stats.lastActiveDate === yesterdayStr) {
          stats.streak += 1;
          stats.lastActiveDate = todayStr;
          setMockStats(stored.uid, stats);
        } else if (stats.lastActiveDate !== todayStr) {
          stats.streak = 1; // reset streak if missed a day
          stats.lastActiveDate = todayStr;
          setMockStats(stored.uid, stats);
        }
      } else {
        // Safe check to create stats if missing
        setMockStats(stored.uid, createDefaultStats(stored.uid, email));
      }

      mockAuthCallbacks.forEach(cb => cb(currentMockUser));
      return existingUser;
    }
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
      
      // Query subscription status directly from the Stripe subcollection
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
        // Create if it doesn't exist
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
  }
};
