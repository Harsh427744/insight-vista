import React from 'react';
import './StatsCards.css';

const StatsCards = ({ data }) => {
  const totalRecords = data.length;
  
  const avgIntensity = data.length > 0 
    ? (data.reduce((sum, item) => sum + (item.intensity || 0), 0) / data.length).toFixed(1)
    : 0;

  const avgRelevance = data.length > 0
    ? (data.reduce((sum, item) => sum + (item.relevance || 0), 0) / data.length).toFixed(1)
    : 0;

  const uniqueCountries = new Set(data.map(item => item.country).filter(Boolean)).size;

  const uniqueSectors = new Set(data.map(item => item.sector).filter(Boolean)).size;

  const uniqueTopics = new Set(data.map(item => item.topic).filter(Boolean)).size;

  const stats = [
    { label: 'Total Records', value: totalRecords, icon: '📊', color: '#667eea' },
    { label: 'Avg Intensity', value: avgIntensity, icon: '⚡', color: '#f093fb' },
    { label: 'Avg Relevance', value: avgRelevance, icon: '🎯', color: '#4facfe' },
    { label: 'Countries', value: uniqueCountries, icon: '🌍', color: '#43e97b' },
    { label: 'Sectors', value: uniqueSectors, icon: '🏢', color: '#fa709a' },
    { label: 'Topics', value: uniqueTopics, icon: '💡', color: '#fee140' },
  ];

  return (
    <div className="stats-container">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className="stat-card glass-card"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="stat-icon" style={{ background: stat.color }}>
            {stat.icon}
          </div>
          <div className="stat-content">
            <h3 className="stat-value">{stat.value}</h3>
            <p className="stat-label">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
