// API Configuration
const API_CONFIG = {
  // Set this to 'local' for development, 'production' for deployed version
  ENVIRONMENT: 'local',
  
  // API URLs for different environments
  BASE_URLS: {
    local: 'http://localhost:5000',
    production: 'https://sri-lab-backend.vercel.app'
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