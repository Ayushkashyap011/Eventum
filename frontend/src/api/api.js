// Eventum Centralized API Client

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const getHeaders = (includeAuth = true) => {
  const headers = {
    "Content-Type": "application/json",
  };
  if (includeAuth) {
    const token = localStorage.getItem("token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }
  return headers;
};

export const api = {
  // --- Auth Endpoints ---
  async signup(userData) {
    const res = await fetch(`${API_BASE}/auth/signup`, {
      method: "POST",
      headers: getHeaders(false),
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || data.detail || "Signup failed");
    return data;
  },

  async login(credentials) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: getHeaders(false),
      body: JSON.stringify(credentials),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || data.detail || "Login failed");
    return data;
  },

  async getProfile() {
    const res = await fetch(`${API_BASE}/auth/profile`, {
      method: "GET",
      headers: getHeaders(true),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || data.detail || "Failed to fetch profile");
    return data;
  },

  async updateProfile(profileData) {
    const res = await fetch(`${API_BASE}/auth/update`, {
      method: "PUT",
      headers: getHeaders(true),
      body: JSON.stringify(profileData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || data.detail || "Failed to update profile");
    return data;
  },

  // --- Booking Endpoints ---
  async createBooking(bookingData) {
    const res = await fetch(`${API_BASE}/bookings`, {
      method: "POST",
      headers: getHeaders(true),
      body: JSON.stringify(bookingData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || data.detail || "Booking failed");
    return data;
  },

  async getMyBookings() {
    const res = await fetch(`${API_BASE}/bookings/my`, {
      method: "GET",
      headers: getHeaders(true),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || data.detail || "Failed to fetch your bookings");
    return data;
  },

  // --- Admin Endpoints ---
  async getDashboardStats() {
    const res = await fetch(`${API_BASE}/admin/dashboard-stats`, {
      method: "GET",
      headers: getHeaders(true),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || data.detail || "Failed to fetch dashboard stats");
    return data;
  },

  async getAllUsers() {
    const res = await fetch(`${API_BASE}/admin/all-users`, {
      method: "GET",
      headers: getHeaders(true),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || data.detail || "Failed to fetch users");
    return data;
  },

  async getAllBookings() {
    const res = await fetch(`${API_BASE}/admin/all-bookings`, {
      method: "GET",
      headers: getHeaders(true),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || data.detail || "Failed to fetch all bookings");
    return data;
  },

  async updateBookingStatus(id, status) {
    const res = await fetch(`${API_BASE}/admin/update-booking/${id}`, {
      method: "PUT",
      headers: getHeaders(true),
      body: JSON.stringify({ status }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || data.detail || "Failed to update booking");
    return data;
  },
};

export default api;
