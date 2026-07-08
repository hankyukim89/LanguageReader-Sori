import { useState, type FormEvent } from 'react';
import { LockKeyhole, Mail, Loader2, AlertCircle } from 'lucide-react';
import { authService } from '../../lib/firebase';

interface SignInScreenProps {
  onAuthSuccess: () => void;
}

export function SignInScreen({ onAuthSuccess }: SignInScreenProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    setError(null);
    setNotice(null);

    try {
      if (isSignUp) {
        await authService.signUp(email, password);
      } else {
        await authService.signIn(email, password);
      }
      onAuthSuccess();
    } catch (err: any) {
      console.error("Auth error:", err);
      if (err.message?.includes('email-already-in-use')) {
        setError('This email is already registered.');
      } else if (err.message?.includes('invalid-credential') || err.message?.includes('wrong-password') || err.message?.includes('user-not-found')) {
        setError('Incorrect email or password.');
      } else if (err.message?.includes('invalid-email')) {
        setError('Please enter a valid email address.');
      } else {
        setError(err.message || 'An error occurred during authentication.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      await authService.signInWithGoogle();
      onAuthSuccess();
    } catch (err: any) {
      console.error("Google Sign-In Error:", err);
      setError('Google sign in failed. Please use email credentials.');
    } finally {
      setLoading(false);
    }
  };


  const handleForgotPassword = async () => {
    if (!email) {
      setError('Enter your email address first.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await authService.sendPasswordReset(email);
      setNotice(authService.isReal
        ? 'Password reset email sent.'
        : 'Password reset is available when Firebase authentication is connected.');
    } catch {
      setError('Could not send the reset email. Check the address and try again.');
    } finally {
      setLoading(false);
    }
  };

  return <main className="signin-shell">
    <section className="signin-story">
      <div className="brand light">Sori<span>소리</span></div>
      <div className="signin-copy">
        <h1>Read Korean.<br/>Hear it come alive.</h1>
        <p>Short, beautiful stories that grow with your Korean.</p>
      </div>
      <div className="story-preview">
        <span>오늘의 이야기</span>
        <strong>서울의 작은 빵집</strong>
        <p>골목 끝에서 만난 따뜻한 이야기</p>
      </div>
    </section>

    <section className="signin-form">
      <form onSubmit={handleSubmit}>
        <div className="mobile-logo brand">Sori<span>소리</span></div>
        <h2>{isSignUp ? 'Create account' : 'Welcome to Sori'}</h2>
        <p>{isSignUp ? 'Sign up to start your language learning journey.' : 'Sign in to continue your reading journey.'}</p>

        {error && (
          <div className="auth-error-alert">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}
        {notice && <div className="auth-notice" role="status">{notice}</div>}

        <label htmlFor="email">Email address</label>
        <div className="input-wrap">
          <Mail size={18}/>
          <input 
            id="email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            type="email" 
            autoComplete="email"
            placeholder="yourname@domain.com"
            disabled={loading}
          />
        </div>

        <label htmlFor="password">Password</label>
        <div className="input-wrap">
          <LockKeyhole size={18}/>
          <input 
            id="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            type="password" 
            autoComplete={isSignUp ? 'new-password' : 'current-password'}
            placeholder="••••••••"
            disabled={loading}
          />
        </div>

        {!isSignUp && (
          <div className="form-row">
            <label className="check">
              <input type="checkbox" defaultChecked disabled={loading}/> Remember me
            </label>
            <button type="button" className="text-button" onClick={handleForgotPassword} disabled={loading}>Forgot password?</button>
          </div>
        )}

        <button className="primary full" type="submit" disabled={loading} style={{ marginTop: isSignUp ? '24px' : '0' }}>
          {loading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            isSignUp ? 'Create account' : 'Sign in'
          )}
        </button>

        <button className="google full" type="button" onClick={handleGoogleSignIn} disabled={loading}>
          <span>G</span> Continue with Google
        </button>

        <p className="auth-toggle-text">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button 
            type="button" 
            className="text-button inline-toggle" 
            onClick={() => { setIsSignUp(!isSignUp); setError(null); }}
            disabled={loading}
          >
            {isSignUp ? 'Sign in instead' : 'Register now'}
          </button>
        </p>

        <p className="fine">
          Secure sign-in keeps your reading progress synced across sessions.
        </p>
      </form>
    </section>
  </main>;
}
