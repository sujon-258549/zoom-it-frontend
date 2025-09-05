# 🛒 ZoomIt E-commerce Platform

A full-stack **MERN (MongoDB, Express.js, React, Node.js)** E-commerce application built with modern tools and best practices.  
It includes secure authentication, product & order management, dynamic cart functionality, and an admin dashboard.  

---

## 📌 Table of Contents
1. [Overview](#-overview)  
2. [Features](#-features)  
3. [Tech Stack](#-tech-stack)  
4. [Project Architecture](#-project-architecture)  
5. [Database Design](#-database-design)  
6. [Installation & Setup](#-installation--setup)  
7. [Environment Variables](#-environment-variables)  
8. [API Documentation](#-api-documentation)  
9. [Deployment](#-deployment)  
10. [Admin Credentials](#-admin-credentials)  
11. [Project Screenshots](#-project-screenshots)  
12. [Best Practices](#-best-practices)  
13. [Author](#-author)  

---

## 🔎 Overview
ZoomIt E-commerce is a **scalable online shopping platform** that allows users to browse products, manage carts, place orders, and track purchases.  
Admins can manage products, categories, and orders through a dedicated dashboard.  

The project was built as part of a **MERN Stack Internship Assessment** at **Zoom IT**.  

---

## ✨ Features

### 👤 Authentication & Authorization
- User registration with **name, email, password, photo**  
- JWT-based authentication (Access Token: 1 hour)  
- Role-based access: **Admin / User**  
- Password hashing with **bcrypt**  

### 🛍️ Product Management
- CRUD operations (Create, Read, Update, Delete)  
- Manage details: Name, Slug, Photos, Price, Discount, Stock, Categories  
- Product filtering & pagination  

### 🛒 Cart & Checkout
- Add to cart, update quantities, remove items  
- Persist cart using **redux-persist**  
- Stock validation (no out-of-stock items)  
- Cart summary with total & shipping costs  

### 📦 Orders
- Place orders with shipping info  
- Track order status (Pending, Processing, Completed)  
- Admin order management with filters  

### 📊 Admin Dashboard
- Manage users (roles, active/inactive)  
- Manage products & categories  
- Manage orders with filtering  

### 🎨 UI & UX
- Fully responsive with **Tailwind CSS**   
- Notifications with **sonner**  
- Reusable components & modals  

---

## 🛠️ Tech Stack

### Frontend
- **React.js**  
- **Redux Toolkit + RTK Query**  
- **TypeScript**  
- **Tailwind CSS + ShadCN UI**  

### Backend
- **Node.js & Express.js**  
- **MongoDB & Mongoose**  
- **JWT Authentication & bcrypt**   
- **Cloudinary**  

### Deployment
- **Frontend:** Vercel  
- **Backend:** Vercel 
- **Database:** MongoDB Atlas  

# Node Environment
NODE_ENV=development

# MongoDB Connection
DATABASE_URL=mongodb+srv://rootx:rY8yaJnFp0cgqOYU@cluster0.yx0jx.mongodb.net/rootx?retryWrites=true&w=majority&appName=Cluster0

# Backend Port
PORT=4000

# JWT Settings
JWT_ACCESS_TOKEN=fksdlaaaaaaaaaaaaaadlsfkjjjjjj
JWT_EXPIRE_IN_ACCESS_TOKEN=1h

# Bcrypt Salt Rounds
BCRYPT_HASH=5h

# Admin & User Initial Credentials (for reference)
ADMIN_EMAIL=johndoe@example.com
ADMIN_PASSWORD=hashed_password_here

USER_EMAIL=sujon11@gmail.com
USER_PASSWORD=Pa$$w0rd!


Clone the repositories
# Frontend
git clone https://github.com/sujon-258549/zoom-it-frontend.git
cd zoomit-frontend

# Backend
git clone https://github.com/sujon-258549/zoom-it-backend.git
cd zoomit-backend


