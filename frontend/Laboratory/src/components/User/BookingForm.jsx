import React, { useState } from "react";
import axios from "axios";
import './stylings/Bookingform.css';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    age: "",
    symptoms: "",
    mobileNumber: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      await axios.post("http://localhost:5000/api/bookings/add", formData);
      setStatus({
        type: 'success',
        message: 'Booking confirmed! Admin has been notified.'
      });
      setFormData({ name: "", gender: "", age: "", symptoms: "", mobileNumber: "", address: "" });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.response?.data?.message || 'Error submitting booking. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div className="bookingformcss">
      <div className="headerr">
        <div className="back-arroww" onClick={() => window.history.back()}>
          &#8592;
        </div>
        <h2>Book an Appointment</h2>
      </div>
      {status.message && (
        <div className={`status-message ${status.type}`}>
          {status.message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="input-style"
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
          className="input-style"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          required
          className="input-style"
        />
        <textarea
          name="symptoms"
          placeholder="Symptoms"
          value={formData.symptoms}
          onChange={handleChange}
          required
          className="input-style"
        />
        <input
          type="tel"
          name="mobileNumber"
          placeholder="Mobile Number"
          value={formData.mobileNumber}
          onChange={handleChange}
          required
          className="input-style"
        />
        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
          className="input-style"
        />
        <button 
          type="submit" 
          disabled={loading}
          className="submit-button"
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;

