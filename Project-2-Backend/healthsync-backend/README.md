# 🧠 HealthSync Backend API

A robust RESTful API built for the HealthSync platform as part of the DecodeLabs Full Stack Internship (Project 2 & 3).

This backend handles appointment management with proper database integration, validation, and clean architecture.

---

## 🚀 Project Overview

This project demonstrates:

- Building a RESTful API using Express.js  
- Connecting to MongoDB for persistent data storage  
- Implementing full CRUD operations  
- Applying validation and data integrity principles  
- Structuring backend code using best practices  

---

## ⚙️ Tech Stack

- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose (ODM)
- ES Modules
- dotenv

---

## 📁 Project Structure

```
healthsync-backend/
│
├── config/            # Database connection
├── controllers/       # Business logic
├── middlewares/       # Error handling
├── models/            # Mongoose schemas
├── routes/            # API routes
├── utils/             # Helpers (async handler)
│
├── server.js          # Entry point
├── .env.example       # Environment template
└── package.json
```

---

## 🔗 API Endpoints

### Appointments

| Method | Endpoint | Description |
|--------|---------|------------|
| POST   | /api/appointments        | Create appointment |
| GET    | /api/appointments        | Get all appointments |
| GET    | /api/appointments/:id   | Get single appointment |
| PUT    | /api/appointments/:id   | Update appointment |
| DELETE | /api/appointments/:id   | Delete appointment |

---

## 🧠 Key Features

- ✅ Full CRUD functionality  
- ✅ MongoDB integration (persistent storage)  
- ✅ Schema validation (Mongoose)  
- ✅ Input sanitization & validation  
- ✅ Centralized error handling  
- ✅ RESTful API design  
- ✅ Clean MVC architecture  

---

## 🔐 Data Validation & Integrity

- Required fields enforced in schema  
- Email format validation using regex  
- Date validation before database write  
- Input sanitization (trim, lowercase)  
- Field whitelisting (no direct req.body usage)  

---

## ⚡ How to Run Locally

### 1. Clone the repository
```
git clone <your-repo-link>
cd healthsync-backend
```

### 2. Install dependencies
```
npm install
```

### 3. Setup environment variables

Create a `.env` file based on `.env.example`:

```
PORT=5001
MONGO_URI=your_mongodb_connection_string
NODE_ENV=development
```

### 4. Start server
```
npm run dev
```

Server runs on:
```
http://localhost:5001
```

---

## 🧪 Testing

You can test endpoints using:

- Thunder Client (VS Code)
- Postman

---

## 🧩 Project Scope (DecodeLabs)

- **Project 2:** Backend API development  
- **Project 3:** Database integration & data validation  

---

## 🎯 Learning Outcomes

- REST API design principles  
- Backend architecture (MVC)  
- MongoDB + Mongoose usage  
- Data validation and security basics  
- Building production-ready backend systems  

---

## 👨‍💻 Author

**Abraham Ogbu**  
Full Stack Developer

---

## 📌 Internship

Built as part of the **DecodeLabs Internship Program**

---