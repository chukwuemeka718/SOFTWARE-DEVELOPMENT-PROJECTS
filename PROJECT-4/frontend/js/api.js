const API_BASE = 'http://localhost:3000/api';

const Api = {
  async getUsers() {
    const res = await fetch(`${API_BASE}/users`);
    return res.json();
  },

  async getUserById(id) {
    const res = await fetch(`${API_BASE}/users/${id}`);
    return res.json();
  },

  async createUser(data) {
    const res = await fetch(`${API_BASE}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async updateUser(id, data) {
    const res = await fetch(`${API_BASE}/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async deleteUser(id) {
    const res = await fetch(`${API_BASE}/users/${id}`, {
      method: 'DELETE',
    });
    return res.json();
  },

  async getStats() {
    const res = await fetch(`${API_BASE}/users/stats/summary`);
    return res.json();
  },

  async healthCheck() {
    try {
      const res = await fetch('http://localhost:3000/health');
      return res.ok;
    } catch {
      return false;
    }
  }
};

export default Api;