# JobTrackr — Personal Job Application Tracker

A full-stack job tracking system built with **React (Vite)** (frontend) and **Flask + SQLAlchemy** (backend).  
Fully containerized using **Docker**, including **Gunicorn**, **Nginx**, and **docker-compose**.

---

## Features

### **Authentication**
- **JWT-based** login & signup  
- Password hashing with **bcrypt**

### **Job Management**
- **Create / Update / Delete** job applications  
- Track **company**, **status**, **description**, **dates**, and **uploaded resumes**  
- View / download resume files  

### **Modern Frontend**
- **React (Vite)**  
- **TailwindCSS**  
- **React Router**  
- Reusable **Axios** instance  

### **Backend API**
- **Flask** with Blueprint architecture  
- **SQLAlchemy ORM**  
- **SQLite** (development database)  
- **Pydantic** validation  
- Fully **RESTful** endpoints  

### **Docker Setup**
- **Frontend:** Built with Node → served by **Nginx**  
- **Backend:** Flask served via **Gunicorn**  
- Managed using **docker-compose**  

---

## Running with Docker

### **Build & run all services**
```bash
docker compose up --build
```

---

## Access the Application

### **Frontend**
http://localhost:3000

### **Backend API**
http://localhost:8000

---

## API Endpoints

### **Authentication**
- **POST /api/auth/signup** — Create a new user  
- **POST /api/auth/login** — Login and receive JWT  

### **User**
- **GET /api/user** — Fetch user profile  
- **PUT /api/user** — Update user profile  

### **Jobs**
- **GET /api/jobs** — Get all job entries  
- **POST /api/jobs** — Create a job entry  
- **PUT /api/jobs/<id>** — Update a specific job  
- **DELETE /api/jobs/<id>** — Delete a job entry  

### **Resume Uploads**
- **POST /api/jobs/upload-resume** — Upload a resume file  
- **GET /api/jobs/resume/<filename>** — Retrieve a resume file  

---
