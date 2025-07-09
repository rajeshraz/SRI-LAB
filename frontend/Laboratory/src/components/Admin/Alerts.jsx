import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_CONFIG from '../../config/api';
import { useNavigate } from 'react-router-dom';
import './adminstylings/alerts.css';
import { toast, ToastContainer } from 'react-toastify';  // Import ToastContainer

function Alerts() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploadingReport, setUploadingReport] = useState(null);
  const [deletingBooking, setDeletingBooking] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [serverTimeout, setServerTimeout] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookingsWithTimeout();
  }, []);

  const fetchBookingsWithTimeout = async () => {
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

      const response = await axios.get(API_CONFIG.getUrl(API_CONFIG.endpoints.getAllBookings), {
        withCredentials: true, 
      });
      
      // Clear the timeout since we got a response
      clearTimeout(timeout);
      setTimeoutId(null);
      
      if (response.data.success) {
        setBookings(response.data.data);
        setError(null);
        setServerTimeout(false);
      } else {
        throw new Error(response.data.message || 'Failed to fetch bookings');
      }
    } catch (error) {
      // Clear the timeout since we got an error
      if (timeoutId) {
        clearTimeout(timeoutId);
        setTimeoutId(null);
      }
      
      console.error("Error fetching bookings:", error);
      setError(
        error.response?.data?.message ||
          error.message ||
          'Failed to fetch bookings. Please try again later.'
      );
      setServerTimeout(false);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchBookingsWithTimeout();
  };

  const initiateDelete = (id) => {
    setSelectedBookingId(id);
    setShowConfirmDialog(true);
  };

  const handleDelete = async () => {
    if (!selectedBookingId) return;

    try {
      setDeletingBooking(selectedBookingId);
      const response = await axios.delete(API_CONFIG.getUrl(API_CONFIG.endpoints.deleteBooking(selectedBookingId)));
      if (response.data && response.data.success) {
        setBookings((prevBookings) =>
          prevBookings.filter((booking) => booking._id !== selectedBookingId)
        );
        setShowConfirmDialog(false);
        setSelectedBookingId(null);
        toast.success('Booking deleted successfully!');
      } else {
        throw new Error(response.data.message || 'Failed to delete booking');
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
      toast.error('Failed to delete booking. Please try again.');
    } finally {
      setDeletingBooking(null);
    }
  };

  const handleUpload = async (id, file) => {
    if (!file) return;
  
    try {
      setUploadingReport(id);
      const formData = new FormData();
      formData.append('report', file);
  
      const response = await axios.post(
        API_CONFIG.getUrl(API_CONFIG.endpoints.uploadReport(id)),
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
  
      if (response.data && response.data.success) {
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking._id === id
              ? { ...booking, reportPath: response.data.reportPath || URL.createObjectURL(file) }
              : booking
          )
        );
        toast.success('Report uploaded successfully!', {
          position: 'bottom-right',
          autoClose: 3000,
        });
      } else {
        throw new Error(response.data.message || 'Failed to upload report');
      }
    } catch (error) {
      console.error('Error uploading report:', error);
      toast.error('Failed to upload report. Please try again.', {
        position: 'bottom-right',
        autoClose: 3000,
      });
    } finally {
      setUploadingReport(null);
    }
  };
  


  if (loading) return (
    <div className="alerts-container">
      <div className="back-arrow" onClick={() => navigate("/")}>←</div>
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <p>Loading bookings...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="alerts-container">
      <div className="back-arrow" onClick={() => navigate("/")}>←</div>
      <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>
        <p>Error: {error}</p>
        <button
          onClick={handleRefresh}
          style={{
            marginTop: '10px',
            padding: '10px 15px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          🔄 Refresh
        </button>
      </div>
    </div>
  );

  return (
    <div className="alerts-container">
      {/* Back arrow */}
      <div className="back-arrow" onClick={() => navigate("/")}>
        ←
      </div>

      {showConfirmDialog && (
        <div className="confirm-dialog">
          <div className="dialog-box">
            <h3>SRI CLINICAL LABORATORY</h3>
            <p>
              Are you sure you want to delete this booking? This will permanently remove it and its
              associated report from the system.
            </p>
            <div className="dialog-actions">
              <button className="dialog-delete-btn" onClick={handleDelete}>
                Delete
              </button>
              <button
                className="dialog-cancel-btn"
                onClick={() => {
                  setShowConfirmDialog(false);
                  setSelectedBookingId(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 className="bookings-title" style={{ margin: 0 }}>Bookings</h2>
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
      {bookings.length === 0 ? (
        <p>No bookings available.</p>
      ) : (
        <ul className="bookings-list">
          {bookings.map((booking) => (
            <li key={booking._id} className="booking-item">
              <h3>{booking.name}</h3>
              <p>Gender: {booking.gender}</p>
              <p>Age: {booking.age}</p>
              <p>Symptoms: {booking.symptoms}</p>
              <p>Mobile: {booking.mobileNumber}</p>
              <p>Address: {booking.address}</p>
              <div className="actions">
                <button
                  className="delete-btn"
                  onClick={() => initiateDelete(booking._id)}
                  disabled={deletingBooking === booking._id}
                >
                  {deletingBooking === booking._id ? 'Deleting...' : 'Delete'}
                </button>
                <label htmlFor={`file-${booking._id}`} className={`upload-btn ${uploadingReport === booking._id ? 'uploading' : ''} ${booking.reportPath ? 'uploaded' : ''}`}>
                  {uploadingReport === booking._id ? 'Uploading...' : booking.reportPath ? '✓ Uploaded' : 'Upload Report'}
                  <input
                    type="file"
                    id={`file-${booking._id}`}
                    style={{ display: 'none' }}
                    onChange={(e) => handleUpload(booking._id, e.target.files[0])}
                    disabled={uploadingReport === booking._id}
                  />
                </label>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* ToastContainer to render toasts */}
      <ToastContainer />
    </div>
  );
}

export default Alerts;
