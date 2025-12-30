# User Management & Authentication System – Backend

## Overview
This is the backend service for the **User Management & Authentication System**.  
It provides secure authentication, role-based access control, and admin-level user management APIs.

The backend is built with **Node.js**, **Express**, and **MongoDB**, following clean architecture and production-ready practices.

---

## Tech Stack
- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **JWT Authentication (HTTP-only cookies)**
- **Zod** (request validation)
- **bcrypt** (password hashing)

---

## Features
- User Registration & Login
- Secure Logout
- Password hashing using bcrypt
- Role-based access (Admin / User)
- Admin user management:
  - View all users
  - Activate / Deactivate users
  - Pagination & search
- User profile:
  - View own profile
  - Update full name and password
- JWT-based authentication with protected routes
- Centralized error handling
- Input validation using Zod
- Clean, modular folder structure

---

## Folder Structure

``` 
src/
├─ controllers/
├─ routes/
├─ models/
├─ middlewares/
├─ validations/
├─ utils/
├─ config/
└─ app.js
```


---

## Environment Variables

Create a `.env` file in the root directory and add the following:
```
PORT=
MONGO_URI=
JWT_SECRET=
JWT_EXPIRES_IN=
CLIENT_URL=
NODE_ENV=
```


---

## Setup Instructions

1. Clone the repository
```
npm install
npm run dev
http://localhost:5000
```
---

## API Endpoints
- Authentication
```
    POST /api/auth/register – Register user

    POST /api/auth/login – Login user

    POST /api/auth/logout – Logout user
```

   - User

``` 
    GET /api/user/profile – Get logged-in user profile

    PUT /api/user/profile – Update user profile
```

   - Admin

```
    GET /api/admin/users – Get all users (pagination & search)

    PATCH /api/admin/users/:id/toggle – Activate / Deactivate user

    DELETE /api/admin/users/:id – Soft delete user (if enabled)
```
---

## Security Practices
```
Passwords hashed using bcrypt

JWT stored in HTTP-only cookies

Role-based route protection

Input validation with Zod

Centralized error handling

No hard-coded secrets
```

---
## Notes
```
Admin users are protected via middleware

Duplicate emails are prevented using MongoDB indexes

Designed to be scalable and production-ready
```