🚀 JobTrackr — Personal Job Application Tracker

A full-stack job tracking application built with React (Vite) on the frontend and Flask + SQLAlchemy on the backend.
Fully containerized using Docker, with production-ready setups including Gunicorn, Nginx, and docker-compose.

📌 Features
🔐 Authentication

Signup & Login using JWT

Secure password hashing with bcrypt

📝 Job Management

Add, edit, and delete job applications

Track company, status, description, dates, and uploaded resume files

Download and view uploaded resume files

🎨 Modern Frontend

React (Vite)

TailwindCSS

React Router

Reusable Axios API service

🛠️ Backend API

Flask with Blueprint architecture

SQLAlchemy ORM models

Database: SQLite (local)

Pydantic request validation

RESTful API endpoints

🐳 Complete Docker Setup

Frontend: Built with Node → served using Nginx

Backend: Flask app served using Gunicorn

docker-compose: Connects frontend + backend services

🐳 Running with Docker
Build & run all services
docker compose up --build

🌐 Access the App

Frontend: http://localhost:3000

Backend API: http://localhost:8000

📡 API Endpoints (Summary)
🔐 Auth
POST /api/auth/signup
POST /api/auth/login

👤 User
GET  /api/user
PUT  /api/user

📝 Jobs
GET    /api/jobs
POST   /api/jobs
PUT    /api/jobs/<id>
DELETE /api/jobs/<id>

📎 Resume Upload
POST /api/jobs/upload-resume
GET  /api/jobs/resume/<filename>
