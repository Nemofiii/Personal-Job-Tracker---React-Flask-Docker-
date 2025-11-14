# =================================
# 1. Base Python Image
# =================================

#use Python 3.11 slim version (lighter -> faster, smaller), avoids unnecessary packages
FROM python:3.11-slim      

#prevents Python from generating .pyc files
ENV PYTHONDONTWRITEBYTECODE=1
#ensures real-time log output (important for Docker logs)
ENV PYTHONUNBUFFERED=1

#this means all following commands will be run in /app directory
Workdir /app

# =================================
# 2. Install System Dependencies
# =================================

RUN apt-get update && \
    apt-get install -y build-essential sqlite3 && \
    rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# =================================
# 3. Copy Project
# =================================

COPY . .

# =================================
# 4. Expose Port and Run Application
# =================================

EXPOSE 8000

#command to run the application using Gunicorn WSGI server
CMD ["gunicorn", "wsgi:app", "--bind", "0.0.0.0:8000", "--workers", "3"]