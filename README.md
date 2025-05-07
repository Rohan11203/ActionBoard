# 📝 Task Management Website

A full-stack web application where users can sign up, log in, and manage their tasks — including creating, updating, deleting, and assigning tasks to other users.

---

## 🚀 Features

- ✅ User Authentication (JWT-based)
- ✅ Create / Read / Update / Delete Tasks
- ✅ Assign Tasks to Other Users
- ✅ Responsive UI built with **Next.js**
- ✅ Backend powered by **Express.js**
- ✅ API communication using **Axios**
- ✅ Deployed on [Render](https://render.com/)

---

## 🛠️ Setup Instructions

### Prerequisites

- Node.js ≥ 16
- MongoDB (Atlas or Local)
- npm or yarn

---

### 🔧 Backend Setup

- env example
PORT=8000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLIENT_URL=https://your-frontend-url.com


```bash
cd backend
npm install

npm start

```
`` 
### 🔧 Frontend Setup

Set up .env.local
NEXT_PUBLIC_API_BASE_URL=https://your-backend-url.com

```bash
cd frontend
npm install
```

```bash
Start development:
npm run dev
```

```bash
For production:
npm run build
npm start
```


💡 Approach Explanation
Authentication: JWT in secure cookies; token is validated via middleware.

Task Assignment: Tasks include an assignedTo field with user reference.

Role Control: Basic – only assigned users or task creators can modify tasks.

Frontend & API: Axios used to communicate securely between frontend and backend.


