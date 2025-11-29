import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const fetchData = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    
    // Add filters to query params
    if (filters.end_year) params.append('end_year', filters.end_year);
    if (filters.topic) params.append('topic', filters.topic);
    if (filters.sector) params.append('sector', filters.sector);
    if (filters.region) params.append('region', filters.region);
    if (filters.pestle) params.append('pestle', filters.pestle);
    if (filters.source) params.append('source', filters.source);
    if (filters.country) params.append('country', filters.country);

    const response = await axios.get(`${API_BASE_URL}/data?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
