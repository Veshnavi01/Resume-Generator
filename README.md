# 🚀 Resume Generator - MERN Stack

<p align="center">

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen?logo=mongodb)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![Vercel](https://img.shields.io/badge/Frontend-Vercel-black?logo=vercel)
![Render](https://img.shields.io/badge/Backend-Render-46E3B7)
![License](https://img.shields.io/badge/License-Educational-blue)

</p>

---

# 📖 Project Overview

Resume Generator is a full-stack MERN application that enables users to create professional resumes online. The application provides secure authentication, multiple resume management, live preview, template selection, automatic saving, and PDF download functionality.

The project is designed to demonstrate complete MERN Stack development including frontend, backend, REST APIs, MongoDB integration, authentication, deployment, and production-ready architecture.

---

# 🎯 Project Objective

The objective of this project is to simplify resume creation by providing an intuitive web application where users can:

* Register and Login securely
* Create professional resumes
* Edit existing resumes
* Store resumes in the cloud
* Download resumes as PDF
* Access resumes anytime from any device

---

# 🌐 Live Demo

### Frontend (Vercel)

https://resume-generator-nu-one.vercel.app

### Backend (Render)

https://resume-generator-backend-0fqw.onrender.com

---

# 💻 GitHub Repository

https://github.com/Veshnavi01/Resume-Generator

---

# ✨ Key Features

## 🔐 Authentication

* User Registration
* Secure Login
* JWT Authentication
* Password Encryption using bcrypt
* Protected API Routes

---

## 📝 Resume Builder

* Personal Details
* Professional Summary
* Education
* Experience
* Skills
* Projects
* Contact Information

---

## 🎨 Resume Templates

* Modern Template
* ATS Friendly Template
* Professional Template
* Minimal Template

---

## ⚡ Live Features

* Live Resume Preview
* Automatic Save
* Dashboard
* Resume Editing
* Resume Deletion
* Multiple Resume Management
* Responsive Design

---

## 📄 PDF Export

* High Quality PDF
* A4 Size
* Multi-page Support
* Print Ready Layout

---

# 🏗️ System Architecture

```text
                User
                  │
                  ▼
        React + Vite Frontend
                  │
          Axios REST API Calls
                  │
                  ▼
        Node.js + Express Server
                  │
        JWT Authentication
                  │
                  ▼
        MongoDB Atlas Database
```

---

# 🛠️ Technologies Used

## Frontend

* React.js
* Vite
* Tailwind CSS
* Axios
* HTML2Canvas
* jsPDF
* Lucide React

---

## Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT
* bcryptjs
* dotenv
* CORS

---

## Deployment

Frontend → Vercel

Backend → Render

Database → MongoDB Atlas

---

# 📁 Folder Structure

```text
Resume-Generator
│
├── client
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── context
│   │   ├── pages
│   │   ├── services
│   │   └── assets
│   └── package.json
│
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── server.js
│   └── package.json
│
├── README.md
└── package.json
```

---

# ⚙️ Installation Guide

## Clone Repository

```bash
git clone https://github.com/Veshnavi01/Resume-Generator.git
```

---

## Move into Project

```bash
cd Resume-Generator
```

---

## Install Dependencies

```bash
npm install
npm install --prefix client
npm install --prefix server
```

---

## Configure Environment Variables

Create a `.env` file inside the `server` folder.

```env
PORT=5000
NODE_ENV=development

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

CLIENT_URL=http://localhost:5173
```

---

## Run Development Server

```bash
npm run dev
```

---

## Frontend

```
http://localhost:5173
```

## Backend

```
http://localhost:5000
```

---

# 📡 REST API Endpoints

## Authentication

| Method | Endpoint              | Description   |
| ------ | --------------------- | ------------- |
| POST   | /api/v1/auth/register | Register User |
| POST   | /api/v1/auth/login    | Login User    |

---

## Resume

| Method | Endpoint            | Description     |
| ------ | ------------------- | --------------- |
| GET    | /api/v1/resumes     | Get All Resumes |
| GET    | /api/v1/resumes/:id | Get Resume      |
| POST   | /api/v1/resumes     | Create Resume   |
| PUT    | /api/v1/resumes/:id | Update Resume   |
| DELETE | /api/v1/resumes/:id | Delete Resume   |

---

# 📸 Screenshots

Add screenshots here before submission.

### Login Page

<img width="640" height="276" alt="image" src="https://github.com/user-attachments/assets/ca779c4b-8811-4735-a6fd-471997f8ce4a" />



---

### Registration Page

<img width="640" height="280" alt="image" src="https://github.com/user-attachments/assets/da29ece6-1e08-4a90-9961-a54f76f28f21" />


---

### Dashboard

<img width="640" height="255" alt="image" src="https://github.com/user-attachments/assets/c3880bfe-c765-4b57-a87d-4a97bbf5f955" />


---

### Resume Builder

<img width="640" height="264" alt="image" src="https://github.com/user-attachments/assets/422a6c6b-c87e-4441-af86-d3c781e44104" />


---

### Resume Preview

<img width="164" height="257" alt="image" src="https://github.com/user-attachments/assets/cee15be1-7cb7-4ad0-b785-0fb0ddd0634a" />


---

### Generated PDF

<img width="179" height="250" alt="image" src="https://github.com/user-attachments/assets/546bbe5b-4631-4ef3-84ef-2e12231c7ce0" />


---

# 📄 Sample Workflow

Register

↓

Login

↓

Create Resume

↓

Preview Resume

↓

Save Resume

↓

Edit Anytime

↓

Download PDF

---

# 🧪 Testing Performed

* User Registration
* User Login
* JWT Authentication
* CRUD Operations
* MongoDB Integration
* PDF Generation
* Dashboard
* API Testing
* Responsive Design
* Deployment Testing

---

# 🚀 Deployment

### Frontend

Hosted on **Vercel**

https://resume-generator-nu-one.vercel.app

---

### Backend

Hosted on **Render**

https://resume-generator-backend-0fqw.onrender.com

---

### Database

MongoDB Atlas

---

# ⚠️ Challenges Faced

* Managing global state using React Context API
* JWT Authentication implementation
* MongoDB Atlas integration
* PDF generation with html2canvas and jsPDF
* CORS configuration
* Render deployment
* Vercel deployment
* Production environment variables
* React dependency compatibility during deployment

---

# 🔮 Future Enhancements

* AI Resume Suggestions
* AI Resume Score
* Cover Letter Generator
* Resume Sharing via URL
* Drag & Drop Resume Sections
* Profile Photo Upload
* QR Code Support
* Dark Mode
* More Resume Templates
* Multi-language Support

---

# 👩‍💻 Developer

**Veshnavi Singh**

B.Tech Computer Science Engineering

MERN Stack Developer

---

# 📜 License

This project was developed for educational purposes as part of a MERN Stack Resume Generator project.
