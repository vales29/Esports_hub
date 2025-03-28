import { useState } from 'react';
import { Calendar, Clock, Trophy, Users, ChevronRight } from 'lucide-react';
import './Events.css';

const Events = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  
  // Sample events data
  const events = {
    upcoming: [
      {
        id: 1,
        title: 'Valorant Champions Tour',
        game: 'Valorant',
        date: '2023-12-15',
        time: '19:00',
        participants: 32,
        prize: '$50,000'
      },
      {
        id: 2,
        title: 'League of Legends World Championship',
        game: 'League of Legends',
        date: '2023-12-20',
        time: '15:00',
        participants: 16,
        prize: '$100,000'
      }
    ],
    ongoing: [
      {
        id: 3,
        title: 'CS:GO Major Tournament',
        game: 'Counter-Strike',
        date: '2023-12-10',
        time: '14:00',
        participants: 24,
        prize: '$75,000',
        live: true
      }
    ],
    past: [
      {
        id: 4,
        title: 'Dota 2 International',
        game: 'Dota 2',
        date: '2023-11-25',
        participants: 18,
        prize: '$250,000',
        winner: 'Team Spirit'
      }
    ]
  };

  return (
    <div className="events-page">
      <div className="events-header">
        <h1><Trophy size={28} className="icon" /> Tournaments & Events</h1>
        <div className="events-tabs">
          <button 
            className={activeTab === 'upcoming' ? 'active' : ''}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming
          </button>
          <button 
            className={activeTab === 'ongoing' ? 'active' : ''}
            onClick={() => setActiveTab('ongoing')}
          >
            Ongoing
          </button>
          <button 
            className={activeTab === 'past' ? 'active' : ''}
            onClick={() => setActiveTab('past')}
          >
            Past Events
          </button>
        </div>
      </div>

      <div className="events-grid">
        {events[activeTab].map(event => (
          <div key={event.id} className="event-card">
            <div className="event-game">{event.game}</div>
            <h3 className="event-title">{event.title}</h3>
            
            <div className="event-details">
              <div className="detail">
                <Calendar size={16} />
                <span>{new Date(event.date).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric',
                  year: 'numeric'
                })}</span>
              </div>
              
              {event.time && (
                <div className="detail">
                  <Clock size={16} />
                  <span>{event.time} UTC</span>
                </div>
              )}
              
              <div className="detail">
                <Users size={16} />
                <span>{event.participants} Teams</span>
              </div>
              
              <div className="detail prize">
                <Trophy size={16} />
                <span>{event.prize}</span>
              </div>
            </div>
            
            {event.live && <div className="live-badge">LIVE NOW</div>}
            {event.winner && (
              <div className="winner">
                Winner: <span>{event.winner}</span>
              </div>
            )}
            
            <button className="event-action">
              {activeTab === 'past' ? 'View Recap' : 'Register Now'}
              <ChevronRight size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;