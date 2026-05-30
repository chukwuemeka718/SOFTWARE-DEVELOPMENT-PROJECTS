import Api from './api.js';

/* =============================================
   PROJECT-4 | app.js
   UI logic, rendering, and event handling
   ============================================= */

// ─── State ──────────────────────────────────────
let allUsers = [];
let deleteTargetId = null;
let isEditMode = false;

// ─── INIT (PUT THIS AT THE TOP AFTER VARIABLES) ─
window.addEventListener('DOMContentLoaded', async () => {
  await checkServerStatus();
  loadUsers();
  setInterval(checkServerStatus, 15000);
});

// ─── Server Status ───────────────────────────────
async function checkServerStatus() {
  const dot = document.getElementById('statusDot');
  const text = document.getElementById('statusText');

  try {
    const ok = await Api.healthCheck();
    dot.className = 'status-dot ' + (ok ? 'online' : 'offline');
    text.textContent = ok
      ? 'Server connected — API ready'
      : 'Server offline';
  } catch {
    dot.className = 'status-dot offline';
    text.textContent = 'Cannot reach server — is it running?';
  }
}

// ─── Load / Render ───────────────────────────────
async function loadUsers() {
  try {
    allUsers = await Api.getUsers();
    renderTable(allUsers);
    updateStats();
  } catch {
    showTableError('Failed to load users. Make sure the server is running.');
  }
}

function renderTable(users) {
  const tbody = document.getElementById('userTableBody');
  const count = document.getElementById('resultsCount');

  count.textContent = `${users.length} record${users.length !== 1 ? 's' : ''}`;

  if (!users.length) {
    tbody.innerHTML = `<tr class="empty-row"><td colspan="6">No records found.</td></tr>`;
    return;
  }

  tbody.innerHTML = users.map(user => `
    <tr data-id="${user.id}">
      <td class="id-cell">#${String(user.id).padStart(3, '0')}</td>
      <td class="name-cell">${escapeHtml(user.name)}</td>
      <td class="email-cell">${escapeHtml(user.email)}</td>
      <td><span class="role-badge role-${user.role}">${user.role}</span></td>
      <td class="date-cell">${formatDate(user.created_at)}</td>
      <td class="actions-cell">
        <button class="btn-edit" onclick="editUser(${user.id})">Edit</button>
        <button class="btn-delete" onclick="promptDelete(${user.id})">Delete</button>
      </td>
    </tr>
  `).join('');
}

function showTableError(msg) {
  document.getElementById('userTableBody').innerHTML =
    `<tr class="empty-row"><td colspan="6">${msg}</td></tr>`;
}

// ─── Stats ───────────────────────────────────────
async function updateStats() {
  try {
    const stats = await Api.getStats();
    document.getElementById('statTotal').textContent = stats.total ?? '0';
    document.getElementById('statAdmins').textContent = stats.admins ?? '0';
    document.getElementById('statEditors').textContent = stats.editors ?? '0';
    document.getElementById('statLatest').textContent =
      stats.latest ? escapeHtml(stats.latest.split(' ')[0]) : '—';
  } catch {}
}

// ─── Search ──────────────────────────────────────
function searchUsers() {
  const query = document.getElementById('searchInput').value.toLowerCase().trim();

  if (!query) return renderTable(allUsers);

  const filtered = allUsers.filter(u =>
    u.name.toLowerCase().includes(query) ||
    u.email.toLowerCase().includes(query) ||
    u.role.toLowerCase().includes(query)
  );

  renderTable(filtered);
}

// ─── Create / Update ─────────────────────────────
async function saveUser() {
  const id = document.getElementById('userId').value;
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const role = document.getElementById('role').value;

  if (!name || !email) return showMsg('Fill all fields', 'error');
  if (!isValidEmail(email)) return showMsg('Invalid email', 'error');

  const btn = document.getElementById('saveBtn');
  btn.disabled = true;
  btn.textContent = isEditMode ? 'Updating…' : 'Adding…';

  try {
    if (isEditMode && id) {
      await Api.updateUser(id, { name, email, role });
    } else {
      await Api.createUser({ name, email, role });
    }

    resetForm();
    await loadUsers();
    highlightNewestRow();

  } catch (err) {
    showMsg(err.message, 'error');
  } finally {
    btn.disabled = false;
    btn.innerHTML = isEditMode
      ? '<span class="btn-icon">✓</span> Update User'
      : '<span class="btn-icon">+</span> Add User';
  }
}

// ─── Edit ────────────────────────────────────────
async function editUser(id) {
  const user = await Api.getUserById(id);

  document.getElementById('userId').value = user.id;
  document.getElementById('name').value = user.name;
  document.getElementById('email').value = user.email;
  document.getElementById('role').value = user.role;

  isEditMode = true;
}

// ─── Delete ──────────────────────────────────────
function promptDelete(id) {
  deleteTargetId = id;
  document.getElementById('deleteModal').classList.add('active');

  document.getElementById('confirmDeleteBtn').onclick = async () => {
    await Api.deleteUser(deleteTargetId);
    closeModal();
    loadUsers();
  };
}

function closeModal() {
  document.getElementById('deleteModal').classList.remove('active');
}

// ─── Helpers ─────────────────────────────────────
function resetForm() {
  document.getElementById('userId').value = '';
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('role').value = 'user';
  isEditMode = false;
}

function showMsg(text, type) {
  const msg = document.getElementById('formMsg');
  msg.textContent = text;
  msg.className = `form-msg ${type}`;
  setTimeout(() => msg.textContent = '', 3000);
}

function highlightNewestRow() {}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString();
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}