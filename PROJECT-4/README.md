# PROJECT-4 — User Management CRUD System

> **SOFTWARE-DEVELOPMENT-PROJECTS / PROJECT-4**
> Full-stack web app: Node.js · Express · SQLite · Vanilla JS

A clean, production-structured project demonstrating backend-database integration with full **CRUD operations** via a REST API.

---

## 📁 Project Structure

```
PROJECT-4/
├── frontend/
│   ├── index.html          ← UI markup
│   ├── css/
│   │   └── style.css       ← All styles
│   └── js/
│       ├── api.js          ← HTTP layer (fetch wrapper)
│       └── app.js          ← UI logic & event handlers
│
├── backend/
│   ├── server.js           ← Express entry point
│   ├── config/
│   │   └── database.js     ← SQLite connection & schema
│   ├── models/
│   │   └── User.js         ← Database queries (CRUD)
│   ├── controllers/
│   │   └── userController.js ← Request handlers + validation
│   ├── routes/
│   │   └── userRoutes.js   ← Express router
│   └── package.json
│
├── .gitignore
├── package.json
└── README.md
```

---

## 🗄️ Database Schema

```sql
CREATE TABLE users (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  name       TEXT    NOT NULL,
  email      TEXT    NOT NULL UNIQUE,
  role       TEXT    NOT NULL DEFAULT 'user'
             CHECK(role IN ('user', 'admin', 'editor', 'viewer')),
  created_at TEXT    NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT    NOT NULL DEFAULT (datetime('now'))
);
```

---

## 🔌 REST API Endpoints

| Method   | Endpoint                    | Description              |
|----------|-----------------------------|--------------------------|
| `GET`    | `/api/users`                | List all users           |
| `GET`    | `/api/users?search=query`   | Search users             |
| `GET`    | `/api/users/stats/summary`  | Get summary stats        |
| `GET`    | `/api/users/:id`            | Get user by ID           |
| `POST`   | `/api/users`                | Create new user          |
| `PUT`    | `/api/users/:id`            | Update user              |
| `DELETE` | `/api/users/:id`            | Delete user              |
| `GET`    | `/health`                   | Server health check      |

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
cd backend
npm install
```

### 2. Start the server
```bash
node server.js
# or for auto-reload:
npm run dev
```

### 3. Open the app
Navigate to **http://localhost:3000** in your browser.

---

## ⚙️ Tech Stack

| Layer      | Technology                      |
|------------|---------------------------------|
| Frontend   | HTML5, CSS3, Vanilla JavaScript |
| Backend    | Node.js, Express.js             |
| Database   | SQLite (via better-sqlite3)     |
| API Style  | REST                            |

---

## 🔑 Key Concepts Demonstrated

- **Database Schema Design** — typed columns, constraints, auto timestamps
- **CRUD Operations** — Create, Read, Update, Delete via REST
- **Input Validation** — server-side with meaningful error messages
- **Duplicate Detection** — unique email constraint enforcement
- **Separation of Concerns** — routes → controllers → models → database
- **Static File Serving** — Express serves the frontend

---

## 📤 Pushing to GitHub

```bash
# From the PROJECT-4 folder:
git init
git add .
git commit -m "feat: Project 4 - Full-stack CRUD with Node.js, Express, SQLite"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/SOFTWARE-DEVELOPMENT-PROJECTS.git
git subtree push --prefix PROJECT-4 origin main
```

Or if you have a dedicated repo:
```bash
git remote add origin https://github.com/YOUR_USERNAME/PROJECT-4.git
git push -u origin main
```

---

*Part of the SOFTWARE-DEVELOPMENT-PROJECTS portfolio.*
