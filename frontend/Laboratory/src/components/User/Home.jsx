

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BottomNavbar from '../BottomNavbar';
import './stylings/Home.css';

const Home = () => {
  const [greeting, setGreeting] = useState('');
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewingReport, setViewingReport] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) setGreeting('Good Morning');
    else if (hours < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');

    fetchBookings();
    const interval = setInterval(fetchBookings, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const filtered = bookings.filter((booking) =>
      booking.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBookings(filtered);
  }, [searchTerm, bookings]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://sri-lab-backend.vercel.app/api/bookings/user');
    
      if (response.data.success) {
        setBookings(prevBookings => {
          const newBookings = response.data.data || [];
          const updatedBookings = prevBookings.map(prevBooking => {
            const newBooking = newBookings.find(b => b._id === prevBooking._id);
            if (newBooking && newBooking.reportPath && !prevBooking.reportPath) {
              return newBooking;
            }
            return prevBooking;
          });

          const existingIds = updatedBookings.map(b => b._id);
          const brandNewBookings = newBookings.filter(b => !existingIds.includes(b._id));

          return [...updatedBookings, ...brandNewBookings];
        });
        setError(null);
      } else {
        throw new Error(response.data.message || 'Failed to fetch bookings');
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setError(
        error.response?.data?.message ||
          error.message ||
          'Failed to fetch bookings. Please try again later.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleViewReport = async (id) => {
    try {
      setViewingReport(true);
      const response = await axios.get(`https://sri-lab-backend.vercel.app/api/bookings/${id}/report`, {
        responseType: 'blob',
      });

      const file = new Blob([response.data], {
        type: response.headers['content-type'] || 'application/pdf',
      });
      const fileURL = URL.createObjectURL(file);

      const newWindow = window.open(fileURL, '_blank');
      if (!newWindow) {
        alert('Please allow popups to view the report');
      }

      setTimeout(() => {
        URL.revokeObjectURL(fileURL);
      }, 100);
    } catch (error) {
      console.error('Error fetching report:', error);
      alert(
        error.response?.status === 404
          ? 'Report not available yet. Please try again later.'
          : 'Error viewing report. Please try again.'
      );
    } finally {
      setViewingReport(false);
    }
  };

  const handleDownloadReport = async (id) => {
    try {
      const response = await axios.get(`https://sri-lab-backend.vercel.app/api/bookings/${id}/report`, {
        responseType: 'blob',
      });

      // Check if the response is successful
      if (response.status === 200) {
        const file = new Blob([response.data], {
          type: response.headers['content-type'] || 'application/pdf',
        });
        const fileURL = URL.createObjectURL(file);

        const link = document.createElement('a');
        link.href = fileURL;
        // Get the original file extension from content-type
        const fileExt = response.headers['content-type']?.split('/')[1] || 'pdf';
        link.download = `report-${new Date().toISOString()}.${fileExt}`; 
        document.body.appendChild(link);
        link.click();

        // Cleanup
        document.body.removeChild(link);
        URL.revokeObjectURL(fileURL);
      } else {
        throw new Error('Failed to fetch the report');
      }
    } catch (error) {
      console.error('Error downloading the report:', error);
      alert('Failed to download the report. Please try again later.');
    }
  };
  

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="homecss">
      <div className="header">
        <span className="back-arrow" onClick={() => navigate("/")}>
          ←
        </span>
        <h1 className="greeting-text">{greeting}</h1>
      </div>
      <div className="content">
        <p>Welcome to the Laboratory</p>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <img
            src="/lab-image.jpg"
            alt="Lab"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
 <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <button onClick={() => navigate('/user/book')} style={{ marginRight: '20px' }}>
            Book
          </button>
          <button onClick={() => window.location.href = 'tel:9908841335'}>Call</button>
        </div>
  
        <h2>Your Bookings</h2>
        <div className="bookings-container">
          <div style={{ position: 'relative', marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="Search bookings by name"
              value={searchTerm}
              onChange={handleSearch}
              style={{
                width: '60%',
                padding: '10px 10px 10px 35px',
                marginLeft: '30px',
                border: '3px solid #ddd',
                borderRadius: '4px',
              }}
            />
            <span
              style={{
                position: 'absolute',
                left: '40px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#666',
              }}
            >
              🔍
            </span>
          </div>
          {loading && <p>Loading bookings...</p>}
          {error && <p style={{ color: 'red' }}>Error: {error}</p>}
          {!loading && !error && filteredBookings.length === 0 && (
            <p>
              {searchTerm
                ? 'No bookings found matching your search.'
                : 'No bookings found.'}
            </p>
          )}
          {!loading && !error && filteredBookings.length > 0 && (
            <ul>
              {filteredBookings.map((booking) => (
                <li key={booking._id} className="booking-item">
                  <p>Name: {booking.name}</p>
                  <p>Date: {new Date(booking.createdAt).toLocaleDateString()}</p>
                  <div className="button-container">
                    <button
                      onClick={() => handleViewReport(booking._id)}
                      disabled={viewingReport || !booking.reportPath}
                      className={booking.reportPath ? 'active-button' : 'disabled-button'}
                    >
                      {viewingReport ? 'Loading...' : 'View Report'}
                    </button>
                    {booking.reportPath && (
                      <button
                        onClick={() => handleDownloadReport(booking._id)}
                        className="active-button"
                      >
                        Download Report
                      </button>
                    )}
                  </div>
                  {!booking.reportPath && (
                    <p className="no-report-text">Report not available yet</p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <BottomNavbar className="bottom-navbar" />
    </div>
  );
};

export default Home;

