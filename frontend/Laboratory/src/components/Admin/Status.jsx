import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import API_CONFIG from '../../config/api';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const Status = () => {
  const [stats, setStats] = useState({
    totalBookings: 0,
    completedTests: 0,
    pendingTests: 0,
    reportsUploaded: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [serverTimeout, setServerTimeout] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    fetchStatsWithTimeout();
  }, []);

  const fetchStatsWithTimeout = async () => {
    try {
      setLoading(true);
      setError(null);
      setServerTimeout(false);
      
      // Clear any existing timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // Set a 60-second timeout
      const timeout = setTimeout(() => {
        setServerTimeout(true);
        setLoading(false);
        setError('Server is taking longer than usual to respond. Please try refreshing.');
      }, 60000); // 60 seconds

      setTimeoutId(timeout);

      const response = await axios.get(API_CONFIG.getUrl(API_CONFIG.endpoints.getAllBookings));
      
      // Clear the timeout since we got a response
      clearTimeout(timeout);
      setTimeoutId(null);
      
      if (response.data.success) {
        const bookings = response.data.data;
        const total = bookings.length;
        const uploaded = bookings.filter(booking => booking.reportPath).length;
        const pending = total - uploaded;

        setStats({
          totalBookings: total,
          completedTests: uploaded,
          pendingTests: pending,
          reportsUploaded: uploaded
        });
        setError(null);
        setServerTimeout(false);
      }
    } catch (error) {
      // Clear the timeout since we got an error
      if (timeoutId) {
        clearTimeout(timeoutId);
        setTimeoutId(null);
      }
      
      console.error('Error fetching statistics:', error);
      setError(
        error.response?.data?.message ||
          error.message ||
          'Failed to fetch statistics. Please try again later.'
      );
      setServerTimeout(false);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchStatsWithTimeout();
  };

  const pieData = {
    labels: ['Completed', 'Pending'],
    datasets: [
      {
        data: [stats.completedTests, stats.pendingTests],
        backgroundColor: ['#00C49F', '#FF8042'],
        hoverBackgroundColor: ['#00C49F', '#FF8042']
      }
    ]
  };

  const barData = {
    labels: ['Total Bookings', 'Reports Uploaded', 'Pending Tests'],
    datasets: [
      {
        data: [stats.totalBookings, stats.reportsUploaded, stats.pendingTests],
        backgroundColor: '#8884d8'
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false
  };

  return (
    <div style={{ padding: '20px', paddingBottom: '80px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Laboratory Status Dashboard</h2>
        <button
          onClick={handleRefresh}
          disabled={loading}
          style={{
            padding: '10px 15px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? 'Loading...' : '🔄 Refresh'}
        </button>
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p>Loading statistics...</p>
        </div>
      )}

      {error && (
        <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>
          <p>Error: {error}</p>
        </div>
      )}

      {!loading && !error && (
        <>
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>Test Status Distribution</h3>
            <div style={{ height: '300px' }}>
              <Pie data={pieData} options={options} />
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>Booking Statistics</h3>
            <div style={{ height: '300px' }}>
              <Bar data={barData} options={options} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Status;

