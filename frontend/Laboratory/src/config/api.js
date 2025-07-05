// API Configuration
const API_CONFIG = {
  // Get environment from environment variable
  ENVIRONMENT: import.meta.env.VITE_API_ENVIRONMENT || 'production',
  
  // API URLs for different environments
  BASE_URLS: {
    local: 'http://localhost:5000',
    production: import.meta.env.VITE_API_BASE_URL || 'https://sri-lab.onrender.com'
  },
  
  // Get the current base URL
  getBaseUrl() {
    return this.BASE_URLS[this.ENVIRONMENT];
  },
  
  // API endpoints
  endpoints: {
    // Bookings
    addBooking: '/api/bookings/add',
    getAllBookings: '/api/bookings/all',
    getUserBookings: '/api/bookings/user',
    getReport: (id) => `/api/bookings/${id}/report`,
    deleteBooking: (id) => `/api/bookings/${id}`,
    uploadReport: (id) => `/api/bookings/${id}/upload`,
    
    // Chat
    chat: '/api/chat'
  },
  
  // Get full URL for an endpoint
  getUrl(endpoint) {
    return `${this.getBaseUrl()}${endpoint}`;
  }
};

export default API_CONFIG; 