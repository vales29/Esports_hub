import { useState } from 'react';
import { User, Trophy, History, Settings, LogOut, ChevronRight } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [gamesPlayed, setGamesPlayed] = useState(128);
  const [winRate, setWinRate] = useState(72);
  const [currentRank, setCurrentRank] = useState('Diamond III');

  // Sample game history data
  const gameHistory = [
    {
      id: 1,
      game: 'Valorant',
      result: 'Victory',
      date: '2023-12-15',
      duration: '32:45',
      kills: 24,
      deaths: 8,
      assists: 12
    },
    {
      id: 2,
      game: 'League of Legends',
      result: 'Defeat',
      date: '2023-12-14',
      duration: '42:18',
      kills: 8,
      deaths: 5,
      assists: 22
    },
    {
      id: 3,
      game: 'CS:GO',
      result: 'Victory',
      date: '2023-12-13',
      duration: '24:56',
      kills: 32,
      deaths: 12,
      assists: 8
    }
  ];

  // Sample achievements
  const achievements = [
    { id: 1, title: 'First Blood', earned: true },
    { id: 2, title: 'Perfect Game', earned: false },
    { id: 3, title: 'Team Player', earned: true },
    { id: 4, title: 'Win Streak', earned: true }
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-sidebar">
        <div className="sidebar-header">
          <div className="user-avatar">
            <User size={24} />
          </div>
          <h3>ProGamer99</h3>
          <p>Diamond III</p>
        </div>

        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <User size={18} /> Profile
          </button>
          <button 
            className={`nav-item ${activeTab === 'stats' ? 'active' : ''}`}
            onClick={() => setActiveTab('stats')}
          >
            <Trophy size={18} /> Game Stats
          </button>
          <button 
            className={`nav-item ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            <History size={18} /> Match History
          </button>
          <button 
            className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings size={18} /> Settings
          </button>
        </nav>

        <button className="logout-btn">
          <LogOut size={18} /> Log Out
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'profile' && (
          <div className="profile-section">
            <h2>Player Profile</h2>
            <div className="profile-card">
              <div className="profile-header">
                <div className="avatar-large">
                  <User size={48} />
                </div>
                <div className="profile-info">
                  <h3>ProGamer99</h3>
                  <p>Member since: January 2022</p>
                  <div className="rank-badge">Diamond III</div>
                </div>
              </div>

              <div className="stats-grid">
                <div className="stat-card">
                  <h4>Games Played</h4>
                  <p>{gamesPlayed}</p>
                </div>
                <div className="stat-card">
                  <h4>Win Rate</h4>
                  <p>{winRate}%</p>
                </div>
                <div className="stat-card">
                  <h4>Current Rank</h4>
                  <p>{currentRank}</p>
                </div>
                <div className="stat-card">
                  <h4>Favorite Game</h4>
                  <p>Valorant</p>
                </div>
              </div>
            </div>

            <div className="achievements-section">
              <h3>Achievements</h3>
              <div className="achievements-grid">
                {achievements.map(achievement => (
                  <div key={achievement.id} className={`achievement-card ${achievement.earned ? 'earned' : ''}`}>
                    <Trophy size={20} />
                    <span>{achievement.title}</span>
                    {achievement.earned ? (
                      <span className="earned-badge">Earned</span>
                    ) : (
                      <span className="locked-badge">Locked</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="stats-section">
            <h2>Game Statistics</h2>
            <div className="stats-container">
              <div className="main-stat-card">
                <h3>Overall Performance</h3>
                <div className="stat-bars">
                  <div className="stat-bar">
                    <label>Win Rate</label>
                    <div className="bar-container">
                      <div className="bar-fill" style={{ width: `${winRate}%` }}></div>
                      <span>{winRate}%</span>
                    </div>
                  </div>
                  <div className="stat-bar">
                    <label>K/D Ratio</label>
                    <div className="bar-container">
                      <div className="bar-fill" style={{ width: '82%' }}></div>
                      <span>2.4</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="game-stats">
                <h3>Game-Specific Stats</h3>
                <div className="game-tabs">
                  <button className="game-tab active">Valorant</button>
                  <button className="game-tab">League</button>
                  <button className="game-tab">CS:GO</button>
                </div>

                <div className="game-stats-grid">
                  <div className="game-stat-card">
                    <h4>Kills</h4>
                    <p>1,248</p>
                  </div>
                  <div className="game-stat-card">
                    <h4>Deaths</h4>
                    <p>520</p>
                  </div>
                  <div className="game-stat-card">
                    <h4>Assists</h4>
                    <p>892</p>
                  </div>
                  <div className="game-stat-card">
                    <h4>Headshots</h4>
                    <p>743</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="history-section">
            <h2>Match History</h2>
            <div className="history-filters">
              <select>
                <option>All Games</option>
                <option>Valorant</option>
                <option>League of Legends</option>
                <option>CS:GO</option>
              </select>
              <select>
                <option>All Results</option>
                <option>Victories</option>
                <option>Defeats</option>
              </select>
            </div>

            <div className="match-history">
              {gameHistory.map(match => (
                <div key={match.id} className="match-card">
                  <div className="match-game">{match.game}</div>
                  <div className={`match-result ${match.result.toLowerCase()}`}>
                    {match.result}
                  </div>
                  <div className="match-stats">
                    <div className="stat">
                      <span>K/D/A</span>
                      <span>{match.kills}/{match.deaths}/{match.assists}</span>
                    </div>
                    <div className="stat">
                      <span>Duration</span>
                      <span>{match.duration}</span>
                    </div>
                    <div className="stat">
                      <span>Date</span>
                      <span>{new Date(match.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <button className="match-details">
                    Details <ChevronRight size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="settings-section">
            <h2>Account Settings</h2>
            <div className="settings-card">
              <h3>Profile Settings</h3>
              <div className="setting-item">
                <label>Username</label>
                <input type="text" value="ProGamer99" />
              </div>
              <div className="setting-item">
                <label>Email</label>
                <input type="email" value="progamer@example.com" />
              </div>
              <div className="setting-item">
                <label>Password</label>
                <input type="password" value="********" />
              </div>
            </div>

            <div className="settings-card">
              <h3>Notification Preferences</h3>
              <div className="toggle-item">
                <span>Tournament Notifications</span>
                <label className="toggle-switch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="toggle-item">
                <span>Friend Requests</span>
                <label className="toggle-switch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="toggle-item">
                <span>Newsletter</span>
                <label className="toggle-switch">
                  <input type="checkbox" />
                  <span className="slider"></span>
                </label>
              </div>
            </div>

            <button className="save-btn">Save Changes</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;