import { Users, MessageSquare, Award, Calendar, Clock, Search } from 'lucide-react';
import './Community.css';

const Community = () => {
  // Sample data - replace with your actual data
  const activeMembers = [
    { id: 1, name: 'ProGamer99', avatar: 'PG', online: true },
    { id: 2, name: 'StreamQueen', avatar: 'SQ', online: true },
    { id: 3, name: 'NoScopeKing', avatar: 'NK', online: false },
    { id: 4, name: 'HeadshotHero', avatar: 'HH', online: true },
  ];

  const upcomingEvents = [
    { id: 1, title: 'Weekly Tournament', date: '2025-04-15', game: 'Valorant' },
    { id: 2, title: 'Community Stream', date: '2025-04-18', game: 'League of Legends' },
    { id: 3, title: 'New Game Launch', date: '2025-04-22', game: 'Apex Legends' },
  ];

  const recentDiscussions = [
    { id: 1, title: 'Best settings for FPS games?', author: 'ProGamer99', replies: 24 },
    { id: 2, title: 'Looking for teammates for ranked', author: 'StreamQueen', replies: 8 },
    { id: 3, title: 'Patch 5.2 meta discussion', author: 'NoScopeKing', replies: 42 },
  ];

  return (
    <div className="community-container">
      {/* Header */}
      <header className="community-header">
        <h1><Users className="icon" /> Community Hub</h1>
        <p>Connect with fellow gamers, join discussions, and participate in events</p>
      </header>

      {/* Search Bar */}
      <div className="community-search">
        <Search className="search-icon" />
        <input type="text" placeholder="Search community members, discussions..." />
      </div>

      {/* Main Content */}
      <div className="community-content">
        {/* Left Column */}
        <div className="community-column">
          {/* Active Members */}
          <section className="community-section">
            <h2>Active Members</h2>
            <div className="members-grid">
              {activeMembers.map(member => (
                <div key={member.id} className="member-card">
                  <div className={`member-avatar ${member.online ? 'online' : ''}`}>
                    {member.avatar}
                  </div>
                  <span>{member.name}</span>
                  {member.online && <div className="online-dot"></div>}
                </div>
              ))}
            </div>
          </section>

          {/* Upcoming Events */}
          <section className="community-section">
            <h2><Calendar className="icon" /> Upcoming Events</h2>
            <div className="events-list">
              {upcomingEvents.map(event => (
                <div key={event.id} className="event-card">
                  <div className="event-date">
                    <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                    <span>{new Date(event.date).getDate()}</span>
                  </div>
                  <div className="event-info">
                    <h3>{event.title}</h3>
                    <p>{event.game}</p>
                  </div>
                  <button className="join-button">Join</button>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="community-column">
          {/* Recent Discussions */}
          <section className="community-section">
            <h2><MessageSquare className="icon" /> Recent Discussions</h2>
            <div className="discussions-list">
              {recentDiscussions.map(discussion => (
                <div key={discussion.id} className="discussion-card">
                  <h3>{discussion.title}</h3>
                  <div className="discussion-meta">
                    <span>By {discussion.author}</span>
                    <span>{discussion.replies} replies</span>
                  </div>
                  <button className="view-button">View Thread</button>
                </div>
              ))}
            </div>
          </section>

          {/* Leaderboard */}
          <section className="community-section">
            <h2><Award className="icon" /> Top Players</h2>
            <div className="leaderboard">
              {[1, 2, 3, 4, 5].map(position => (
                <div key={position} className="leaderboard-row">
                  <span className="rank">{position}</span>
                  <span className="player">Player_{position}</span>
                  <span className="points">{1500 - position * 100} pts</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Community;