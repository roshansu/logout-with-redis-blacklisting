# 🔐 Scalable Auth System with JWT & Redis Blacklisting

![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![Express](https://img.shields.io/badge/Express.js-Framework-black)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)
![Redis](https://img.shields.io/badge/Redis-InMemoryCache-red)
![JWT](https://img.shields.io/badge/Auth-JWT-blue)

---

## 🚀 Overview

A **production-ready authentication system** built with **Node.js, Express, MongoDB, JWT, and Redis**, designed to solve one of the biggest limitations of JWT:

> ❗ *Secure logout and token invalidation*

This project implements a **Redis-based token blacklist system** to ensure that logged-out users cannot reuse old tokens.

---

## ✨ Key Highlights

* 🔐 Secure Authentication using JWT
* 🚪 Logout with Token Invalidation (Redis Blacklist)
* ⚡ High-performance Redis for real-time token checks
* 🛡️ Protected Routes with middleware validation
* 📦 Scalable and production-ready architecture

---

## 🧠 Problem Solved

JWT is **stateless**, meaning:

> ❌ Once issued, a token remains valid until expiry (even after logout)

### ✅ Solution Implemented:

* Store invalidated tokens in **Redis**
* Check token status on every request
* Reject blacklisted tokens instantly

---

## ⚙️ Tech Stack

| Layer    | Technology       |
| -------- | ---------------- |
| Backend  | Node.js, Express |
| Database | MongoDB          |
| Auth     | JWT              |
| Cache    | Redis            |
| Security | bcrypt           |

---

## 🔄 Authentication Flow

```plaintext
User Login → JWT Issued → Access Protected Routes
                     ↓
                  Logout
                     ↓
     Token Stored in Redis (Blacklist)
                     ↓
     Future Requests → Token Rejected ❌
```

---

## 📂 Project Structure

```
├── controllers/
├── models/
├── routes/
├── middleware/
├── config/
├── utils/
├── server.js
└── package.json
```

---

## 🔌 API Endpoints

### 🧾 Register

```
POST /user/register
```

### 🔐 Login

```
POST /user/login
```

### 🚪 Logout

```
GET /user/logout
```

---

## 🛠️ Core Logic (Important)

### 🔍 Middleware Flow

```js
// Verify Token Middleware
1. Extract token from headers
2. Check Redis blacklist
3. If blacklisted → Reject ❌
4. Else verify JWT → Allow ✅
```


## ⚡ Why Redis?

* ⚡ Ultra-fast (in-memory)
* ⏳ Built-in TTL (auto-expiry)
* 📈 Scalable for high traffic
* 🔐 Ideal for token management

---

## 🚀 Getting Started

### 1️⃣ Clone Repo

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Setup Environment Variables

Create `.env` file:

```
PORT=8000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
REDIS_URL=your_redis_url
```

---

### 4️⃣ Run Server

```bash
npm run dev
```

