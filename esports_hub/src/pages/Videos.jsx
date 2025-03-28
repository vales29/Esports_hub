import { useState } from 'react';
import { Play, Clock, Eye, ChevronDown, ChevronUp, Search } from 'lucide-react';
import './Videos.css';

const Videos = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const videos = [
    {
      id: 1,
      title: 'VALORANT Champions 2023 Grand Finals',
      game: 'Valorant',
      views: '1.2M',
      duration: '32:45',
      videoId: 'Jn-wssoS-9Y', 
      category: 'tournaments'
    },
    {
      id: 2,
      title: 'League of Legends Worlds Highlights',
      game: 'League of Legends',
      views: '856K',
      duration: '12:18',
      videoId: '3E14FQRE8tA',
      category: 'highlights'
    },
    {
      id: 3,
      title: 'CS:GO Major Championship Recap',
      game: 'Counter-Strike',
      views: '723K',
      duration: '24:56',
      videoId: 'xGSK5zMsnrM',
      category: 'recaps'
    },
    {
      id: 4,
      title: 'Dota 2 The International Finals',
      game: 'Dota 2',
      views: '1.5M',
      duration: '45:22',
      videoId: 'VbWl8ZKpZzU',
      category: 'tournaments'
    },
    {
      id: 5,
      title: 'Apex Legends Global Series',
      game: 'Apex Legends',
      views: '642K',
      duration: '28:14',
      videoId: '19y0TgfaojA',
      category: 'tournaments'
    },
    {
      id: 6,
      title: 'Overwatch League Top Plays',
      game: 'Overwatch',
      views: '512K',
      duration: '15:30',
      videoId: 'wUmgwbo5apI',
      category: 'highlights'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Videos' },
    { id: 'tournaments', name: 'Tournaments' },
    { id: 'highlights', name: 'Highlights' },
    { id: 'recaps', name: 'Recaps' },
    { id: 'interviews', name: 'Interviews' }
  ];

  const filteredVideos = activeCategory === 'all' 
    ? videos 
    : videos.filter(video => video.category === activeCategory);

  return (
    <div className="videos-page">
      <div className="videos-header">
        <h1>Esports Videos</h1>
        <p>Watch the latest tournaments, highlights, and more</p>
        
        <div className="videos-controls">
          <div className="search-bar">
            <Search size={18} className="search-icon" />
            <input type="text" placeholder="Search videos..." />
          </div>
          
          <button 
            className="filter-toggle"
            onClick={() => setShowFilters(!showFilters)}
          >
            Filters {showFilters ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
        
        {showFilters && (
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category.id}
                className={activeCategory === category.id ? 'active' : ''}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="videos-grid">
        {filteredVideos.map(video => (
          <div key={video.id} className="video-card">
            <div className="video-thumbnail">
              <iframe
                width="100%"
                height="225"
                src={`https://www.youtube.com/embed/${video.videoId}?autoplay=0&rel=0`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <div className="duration-badge">
                <Clock size={12} />
                <span>{video.duration}</span>
              </div>
            </div>
            
            <div className="video-info">
              <h3>{video.title}</h3>
              <div className="video-meta">
                <span className="game-tag">{video.game}</span>
                <span className="views">
                  <Eye size={14} />
                  {video.views}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Videos;
