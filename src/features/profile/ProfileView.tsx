import { useState, useEffect } from 'react';
import { Bookmark, Flame, Headphones, Languages, LogOut, Mail, Calendar, User, Check, Edit2, Sparkles } from 'lucide-react';
import { authService, dbService, type UserStats } from '../../lib/firebase';

interface ProfileViewProps {
  uid: string;
  savedCount: number;
  onSignOut: () => void;
  onUpgradeClick?: () => void;
}

export function ProfileView({ uid, savedCount, onSignOut, onUpgradeClick }: ProfileViewProps) {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState('');
  const [savingName, setSavingName] = useState(false);

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await dbService.getUserStats(uid);
        setStats(data);
        setNewName(data.displayName || data.email.split('@')[0]);
      } catch (error) {
        console.error("Error loading user profile stats:", error);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, [uid]);

  const handleLanguageChange = async (lang: string) => {
    if (!stats) return;
    try {
      const updated = { ...stats, primaryLanguage: lang };
      setStats(updated);
      await dbService.updateUserStats(uid, { primaryLanguage: lang });
    } catch (error) {
      console.error("Error updating primary language:", error);
    }
  };

  const handleSaveName = async () => {
    if (!stats || !newName.trim()) return;
    setSavingName(true);
    try {
      const updated = { ...stats, displayName: newName.trim() };
      setStats(updated);
      await dbService.updateUserStats(uid, { displayName: newName.trim() });
      setEditingName(false);
    } catch (error) {
      console.error("Error updating profile display name:", error);
    } finally {
      setSavingName(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await authService.signOut();
      onSignOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (loading) {
    return (
      <div className="page profile-page loading-center">
        <div className="spinner"></div>
        <p>Loading your profile dashboard...</p>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="page profile-page error-center">
        <p>Failed to load profile. Please try signing in again.</p>
        <button className="primary" onClick={handleSignOut}>Sign out</button>
      </div>
    );
  }

  // Format listening hours: e.g. "18 mins" or "1.4 hours"
  const totalSeconds = stats.hoursListened || 0;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const listeningDisplay = totalMinutes < 60 
    ? `${totalMinutes} min${totalMinutes !== 1 ? 's' : ''}` 
    : `${(totalSeconds / 3600).toFixed(1)} hrs`;

  return <div className="page profile-page">
    <header className="page-heading">
      <div>
        <p>Your dashboard</p>
        <h1>Profile</h1>
        <span>Manage your settings and review progress.</span>
      </div>
      <button className="signout-button" onClick={handleSignOut} aria-label="Sign out">
        <LogOut size={18}/>
        <span>Sign out</span>
      </button>
    </header>

    <div className="profile-dashboard-layout">
      {/* Profile Info Card */}
      <section className="profile-info-card">
        <div className="avatar large">{stats.displayName.charAt(0).toUpperCase()}</div>
        <div className="name-edit-wrap">
          {editingName ? (
            <div className="name-input-group">
              <input 
                type="text" 
                value={newName} 
                onChange={e => setNewName(e.target.value)} 
                maxLength={20}
                disabled={savingName}
              />
              <button onClick={handleSaveName} disabled={savingName} aria-label="Save name">
                <Check size={18} />
              </button>
            </div>
          ) : (
            <div className="name-display-group">
              <h2>{stats.displayName}</h2>
              <button onClick={() => setEditingName(true)} aria-label="Edit name">
                <Edit2 size={14} />
              </button>
            </div>
          )}
          <span className="user-email">{stats.email}</span>
          
          <div className="profile-sub-tier-row">
            <div className={`subscription-badge ${stats.isPremium ? 'premium' : 'free'}`}>
              {stats.isPremium ? (
                <><Sparkles size={11} fill="currentColor" /> Sori Pro</>
              ) : (
                'Sori Free'
              )}
            </div>
            {!stats.isPremium && onUpgradeClick && (
              <button className="upgrade-inline-btn" onClick={onUpgradeClick}>
                Upgrade to Pro
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="stats-dashboard-grid">
        <div className="stat-item-card streak">
          <div className="stat-header">
            <Flame size={20} className="icon-orange" />
            <span>Reading Streak</span>
          </div>
          <strong className="stat-value">{stats.streak}</strong>
          <span className="stat-desc">days active</span>
        </div>

        <div className="stat-item-card translated">
          <div className="stat-header">
            <Languages size={20} className="icon-blue" />
            <span>Words Translated</span>
          </div>
          <strong className="stat-value">{stats.wordsTranslated?.length || 0}</strong>
          <span className="stat-desc">unique terms clicked</span>
        </div>

        <div className="stat-item-card saved">
          <div className="stat-header">
            <Bookmark size={20} className="icon-red" />
            <span>Words Saved</span>
          </div>
          <strong className="stat-value">{savedCount}</strong>
          <span className="stat-desc">in review collection</span>
        </div>

        <div className="stat-item-card listened">
          <div className="stat-header">
            <Headphones size={20} className="icon-green" />
            <span>Audio Listened</span>
          </div>
          <strong className="stat-value">{listeningDisplay}</strong>
          <span className="stat-desc">active playback time</span>
        </div>
      </section>

      {/* Details & Settings Form */}
      <section className="settings-container">
        <div className="settings-block">
          <h3>Preferences</h3>
          <div className="setting-row">
            <div>
              <label htmlFor="primary-lang">Primary Language</label>
              <p className="setting-hint">Used for vocabulary translations and grading tips.</p>
            </div>
            <select 
              id="primary-lang"
              value={stats.primaryLanguage || 'English'} 
              onChange={e => handleLanguageChange(e.target.value)}
              className="premium-select"
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish (Español)</option>
              <option value="French">French (Français)</option>
              <option value="German">German (Deutsch)</option>
              <option value="Japanese">Japanese (日本語)</option>
              <option value="Chinese">Chinese (中文)</option>
            </select>
          </div>
        </div>

        <div className="settings-block">
          <h3>Account Details</h3>
          <div className="details-list">
            <div className="detail-item">
              <Mail size={16} />
              <span>Email: <strong>{stats.email}</strong></span>
            </div>
            <div className="detail-item">
              <Calendar size={16} />
              <span>Account Created: <strong>{stats.createdAt}</strong></span>
            </div>
            <div className="detail-item">
              <User size={16} />
              <span>Authentication: <strong>{authService.isReal ? 'Firebase Auth' : 'Sandbox Account'}</strong></span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>;
}
