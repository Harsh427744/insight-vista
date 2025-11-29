import React, { useState, useEffect } from 'react';
import './Filters.css';

const Filters = ({ onFilterChange, clearFilters, currentFilters }) => {
  const [filters, setFilters] = useState({
    end_year: '',
    topic: '',
    sector: '',
    region: '',
    pestle: '',
    source: '',
    country: ''
  });

  const [showFilters, setShowFilters] = useState(false);

  // Filter options (you can fetch these dynamically from API later)
  const filterOptions = {
    end_year: ['2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'],
    sector: ['Energy', 'Environment', 'Government', 'Aerospace & defence', 'Manufacturing', 'Retail', 'Financial services', 'Support services', 'Information Technology', 'Healthcare', 'Food and agriculture', 'Automotive', 'Tourism & hospitality', 'Security', 'Media & entertainment', 'Construction', 'Water', 'Transport'],
    region: ['Northern America', 'Central America', 'South America', 'Western Europe', 'Eastern Europe', 'Middle East', 'Central Africa', 'Western Africa', 'Eastern Africa', 'Southern Africa', 'Northern Africa', 'Central Asia', 'Eastern Asia', 'Southern Asia', 'South-Eastern Asia', 'Oceania', 'World'],
    pestle: ['Political', 'Economic', 'Social', 'Technological', 'Environmental', 'Legal', 'Industries', 'Healthcare', 'Organization'],
    country: ['United States of America', 'India', 'China', 'Russia', 'Brazil', 'Mexico', 'Saudi Arabia', 'United Kingdom', 'Germany', 'Japan', 'South Africa', 'Australia', 'Canada', 'France', 'Indonesia', 'Egypt', 'Nigeria', 'Iran', 'Turkey', 'Argentina']
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    // Remove empty filters
    const cleanedFilters = Object.fromEntries(
      Object.entries(newFilters).filter(([_, v]) => v !== '')
    );
    onFilterChange(cleanedFilters);
  };

  const handleClearAll = () => {
    setFilters({
      end_year: '',
      topic: '',
      sector: '',
      region: '',
      pestle: '',
      source: '',
      country: ''
    });
    clearFilters();
  };

  const activeFilterCount = Object.values(filters).filter(v => v !== '').length;

  return (
    <div className="filters-container">
      <div className="filters-header">
        <button 
          className="toggle-filters-btn"
          onClick={() => setShowFilters(!showFilters)}
        >
          <span>🔍 Filters</span>
          {activeFilterCount > 0 && (
            <span className="filter-count">{activeFilterCount}</span>
          )}
        </button>
        {activeFilterCount > 0 && (
          <button className="clear-btn" onClick={handleClearAll}>
            Clear All
          </button>
        )}
      </div>

      {showFilters && (
        <div className="filters-grid">
          <div className="filter-item">
            <label>End Year</label>
            <select
              value={filters.end_year}
              onChange={(e) => handleFilterChange('end_year', e.target.value)}
            >
              <option value="">All Years</option>
              {filterOptions.end_year.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div className="filter-item">
            <label>Topic</label>
            <input
              type="text"
              placeholder="Enter topic..."
              value={filters.topic}
              onChange={(e) => handleFilterChange('topic', e.target.value)}
            />
          </div>

          <div className="filter-item">
            <label>Sector</label>
            <select
              value={filters.sector}
              onChange={(e) => handleFilterChange('sector', e.target.value)}
            >
              <option value="">All Sectors</option>
              {filterOptions.sector.map(sector => (
                <option key={sector} value={sector}>{sector}</option>
              ))}
            </select>
          </div>

          <div className="filter-item">
            <label>Region</label>
            <select
              value={filters.region}
              onChange={(e) => handleFilterChange('region', e.target.value)}
            >
              <option value="">All Regions</option>
              {filterOptions.region.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>

          <div className="filter-item">
            <label>PESTLE</label>
            <select
              value={filters.pestle}
              onChange={(e) => handleFilterChange('pestle', e.target.value)}
            >
              <option value="">All Categories</option>
              {filterOptions.pestle.map(pestle => (
                <option key={pestle} value={pestle}>{pestle}</option>
              ))}
            </select>
          </div>

          <div className="filter-item">
            <label>Country</label>
            <select
              value={filters.country}
              onChange={(e) => handleFilterChange('country', e.target.value)}
            >
              <option value="">All Countries</option>
              {filterOptions.country.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>

          <div className="filter-item">
            <label>Source</label>
            <input
              type="text"
              placeholder="Enter source..."
              value={filters.source}
              onChange={(e) => handleFilterChange('source', e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Filters;
