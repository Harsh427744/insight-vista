import React, { useState, useEffect } from 'react';
import { fetchData } from '../services/api';
import Header from '../components/Header';
import Filters from '../components/Filters';
import StatsCards from '../components/StatsCards';
import Charts from '../components/Charts';
import Loader from '../components/Loader';
import './Dashboard.css';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});

  // Fetch data on mount and when filters change
  useEffect(() => {
    loadData();
  }, [filters]);

  const loadData = async () => {
    setLoading(true);
    try {
      const result = await fetchData(filters);
      setData(result);
      setFilteredData(result);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
  };

  return (
    <div className="dashboard">
      <Header />
      
      <Filters 
        onFilterChange={handleFilterChange} 
        clearFilters={clearFilters}
        currentFilters={filters}
      />

      {loading ? (
        <Loader />
      ) : (
        <>
          <StatsCards data={filteredData} />
          <Charts data={filteredData} />
        </>
      )}
    </div>
  );
};

export default Dashboard;
