import { useState, type FormEvent } from 'react';
import { LockKeyhole, Mail } from 'lucide-react';

export function SignInScreen({ onSignIn }: { onSignIn: () => void }) {
  const [email, setEmail] = useState('demo@sori.app');
  const submit = (event: FormEvent) => { event.preventDefault(); onSignIn(); };

  return <main className="signin-shell">
    <section className="signin-story">
      <div className="brand light">Sori<span>소리</span></div>
      <div className="signin-copy"><h1>Read Korean.<br/>Hear it come alive.</h1><p>Short, beautiful stories that grow with your Korean.</p></div>
      <div className="story-preview"><span>오늘의 이야기</span><strong>서울의 작은 빵집</strong><p>골목 끝에서 만난 따뜻한 이야기</p></div>
    </section>
    <section className="signin-form"><form onSubmit={submit}>
      <div className="mobile-logo brand">Sori<span>소리</span></div>
      <h2>Welcome to Sori</h2><p>Sign in to continue your reading journey.</p>
      <label htmlFor="email">Email</label><div className="input-wrap"><Mail size={18}/><input id="email" value={email} onChange={e => setEmail(e.target.value)} type="email" /></div>
      <label htmlFor="password">Password</label><div className="input-wrap"><LockKeyhole size={18}/><input id="password" value="koreanreader" readOnly type="password" /></div>
      <div className="form-row"><label className="check"><input type="checkbox" defaultChecked/> Remember me</label><button type="button" className="text-button">Forgot password?</button></div>
      <button className="primary full" type="submit">Sign in</button>
      <button className="google full" type="button" onClick={onSignIn}><span>G</span> Continue with Google</button>
      <p className="fine">Demo only — any email and password will work.</p>
    </form></section>
  </main>;
}
