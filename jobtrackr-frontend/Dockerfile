# # 1. Build Stage

# #uses Node 20 (alpine = very small), creates a lightweight environment to build react app
# FROM node:20-alpine AS build
# WORKDIR /app

# #copies only package.json and package-lock.json
# COPY package*.json ./

# #install npm dependencies
# RUN npm install --silent

# #copy whole frontend folder
# COPY . .

# RUN npm run build

# # 2. Run using Nginx
# FROM nginx:stable-alpine
# COPY --from=build /app/dist /usr/share/nginx/html

# #web default port
# EXPOSE 80

# #runs nginx in foreground (required inside docker)
# CMD ["nginx", "-g", "daemon off;"]



# --- Build Stage ---
FROM node:20-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build



# --- Nginx Stage ---
FROM nginx:1.25-alpine
WORKDIR /usr/share/nginx/html

# Remove default nginx HTML files
RUN rm -rf ./*

# Copy built Vite files
COPY --from=build /app/dist ./

# Add fallback for React Router
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
