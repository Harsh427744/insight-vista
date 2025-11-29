import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import './Charts.css';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Charts = ({ data }) => {
  // Chart options with custom styling
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#fff',
          font: {
            size: 12,
            weight: '500'
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(255, 255, 255, 0.3)',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
      }
    },
    scales: {
      x: {
        ticks: { color: 'rgba(255, 255, 255, 0.8)' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' }
      },
      y: {
        ticks: { color: 'rgba(255, 255, 255, 0.8)' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' }
      }
    }
  };

  // Intensity by Region
  const intensityByRegion = useMemo(() => {
    const regionData = {};
    data.forEach(item => {
      if (item.region && item.intensity) {
        if (!regionData[item.region]) {
          regionData[item.region] = { total: 0, count: 0 };
        }
        regionData[item.region].total += item.intensity;
        regionData[item.region].count += 1;
      }
    });

    const regions = Object.keys(regionData).slice(0, 10);
    const avgIntensities = regions.map(region => 
      (regionData[region].total / regionData[region].count).toFixed(1)
    );

    return {
      labels: regions,
      datasets: [{
        label: 'Avg Intensity',
        data: avgIntensities,
        backgroundColor: 'rgba(102, 126, 234, 0.8)',
        borderColor: 'rgba(102, 126, 234, 1)',
        borderWidth: 2,
      }]
    };
  }, [data]);

  // Relevance by Sector
  const relevanceBySector = useMemo(() => {
    const sectorData = {};
    data.forEach(item => {
      if (item.sector && item.relevance) {
        if (!sectorData[item.sector]) {
          sectorData[item.sector] = { total: 0, count: 0 };
        }
        sectorData[item.sector].total += item.relevance;
        sectorData[item.sector].count += 1;
      }
    });

    const sectors = Object.keys(sectorData).slice(0, 8);
    const avgRelevance = sectors.map(sector => 
      (sectorData[sector].total / sectorData[sector].count).toFixed(1)
    );

    return {
      labels: sectors,
      datasets: [{
        label: 'Avg Relevance',
        data: avgRelevance,
        backgroundColor: [
          'rgba(102, 126, 234, 0.8)',
          'rgba(240, 147, 251, 0.8)',
          'rgba(79, 172, 254, 0.8)',
          'rgba(67, 233, 123, 0.8)',
          'rgba(250, 112, 154, 0.8)',
          'rgba(254, 225, 64, 0.8)',
          'rgba(168, 237, 234, 0.8)',
          'rgba(255, 159, 64, 0.8)',
        ],
        borderColor: [
          'rgba(102, 126, 234, 1)',
          'rgba(240, 147, 251, 1)',
          'rgba(79, 172, 254, 1)',
          'rgba(67, 233, 123, 1)',
          'rgba(250, 112, 154, 1)',
          'rgba(254, 225, 64, 1)',
          'rgba(168, 237, 234, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 2,
      }]
    };
  }, [data]);

  // Likelihood Distribution
  const likelihoodDistribution = useMemo(() => {
    const likelihoodData = { 1: 0, 2: 0, 3: 0, 4: 0 };
    data.forEach(item => {
      if (item.likelihood && item.likelihood >= 1 && item.likelihood <= 4) {
        likelihoodData[item.likelihood]++;
      }
    });

    return {
      labels: ['Low (1)', 'Medium (2)', 'High (3)', 'Very High (4)'],
      datasets: [{
        label: 'Count',
        data: Object.values(likelihoodData),
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(54, 162, 235, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 2,
      }]
    };
  }, [data]);

  // Top Topics
  const topTopics = useMemo(() => {
    const topicCount = {};
    data.forEach(item => {
      if (item.topic) {
        topicCount[item.topic] = (topicCount[item.topic] || 0) + 1;
      }
    });

    const sortedTopics = Object.entries(topicCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    return {
      labels: sortedTopics.map(([topic]) => topic),
      datasets: [{
        label: 'Frequency',
        data: sortedTopics.map(([, count]) => count),
        backgroundColor: 'rgba(240, 147, 251, 0.8)',
        borderColor: 'rgba(240, 147, 251, 1)',
        borderWidth: 2,
      }]
    };
  }, [data]);

  // Year-wise Intensity Trend
  const yearTrend = useMemo(() => {
    const yearData = {};
    data.forEach(item => {
      const year = item.end_year || item.start_year;
      if (year && item.intensity) {
        if (!yearData[year]) {
          yearData[year] = { total: 0, count: 0 };
        }
        yearData[year].total += item.intensity;
        yearData[year].count += 1;
      }
    });

    const years = Object.keys(yearData).sort().slice(0, 15);
    const avgIntensities = years.map(year => 
      (yearData[year].total / yearData[year].count).toFixed(1)
    );

    return {
      labels: years,
      datasets: [{
        label: 'Avg Intensity Over Time',
        data: avgIntensities,
        backgroundColor: 'rgba(79, 172, 254, 0.2)',
        borderColor: 'rgba(79, 172, 254, 1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: 'rgba(79, 172, 254, 1)',
      }]
    };
  }, [data]);

  if (!data || data.length === 0) {
    return (
      <div className="no-data">
        <p>📊 No data available for the selected filters</p>
      </div>
    );
  }

  return (
    <div className="charts-container">
      <div className="chart-card glass-card">
        <h3 className="chart-title">📈 Intensity by Region</h3>
        <div className="chart-wrapper">
          <Bar data={intensityByRegion} options={chartOptions} />
        </div>
      </div>

      <div className="chart-card glass-card">
        <h3 className="chart-title">🎯 Relevance by Sector</h3>
        <div className="chart-wrapper">
          <Doughnut data={relevanceBySector} options={{
            ...chartOptions,
            scales: undefined
          }} />
        </div>
      </div>

      <div className="chart-card glass-card">
        <h3 className="chart-title">⚡ Likelihood Distribution</h3>
        <div className="chart-wrapper">
          <Bar data={likelihoodDistribution} options={chartOptions} />
        </div>
      </div>

      <div className="chart-card glass-card">
        <h3 className="chart-title">💡 Top 10 Topics</h3>
        <div className="chart-wrapper">
          <Bar data={topTopics} options={{
            ...chartOptions,
            indexAxis: 'y',
          }} />
        </div>
      </div>

      <div className="chart-card glass-card large">
        <h3 className="chart-title">📊 Intensity Trend Over Years</h3>
        <div className="chart-wrapper">
          <Line data={yearTrend} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Charts;
