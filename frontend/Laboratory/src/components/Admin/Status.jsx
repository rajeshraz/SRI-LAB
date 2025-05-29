import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const Status = () => {
  const [stats, setStats] = useState({
    totalBookings: 0,
    completedTests: 0,
    pendingTests: 0,
    reportsUploaded: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get('https://sri-lab-backend.vercel.app/api/bookings/all');
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
      }
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
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
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Laboratory Status Dashboard</h2>
      
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
    </div>
  );
};

export default Status;

