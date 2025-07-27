# 🐳 Docker Todo App - Full-Stack Project

A complete full-stack Todo application built with **React.js**, **Node.js**, and **Docker**, demonstrating modern DevOps practices and containerization.

## 📋 Project Overview

This project showcases a production-ready Todo application with:
- **Frontend**: React 19 with TypeScript
- **Backend**: Node.js/Express REST API  
- **Containerization**: Docker with multi-stage builds
- **Orchestration**: Docker Compose for service management
- **Production-ready**: Health checks, proper networking, and security headers

## 🏗️ Architecture

```
project2/
├── client/                 # React frontend
│   ├── src/               # React components and logic
│   ├── Dockerfile         # Multi-stage build for production
│   ├── nginx.conf         # Nginx configuration
│   └── package.json       # Frontend dependencies
├── server/                # Node.js backend
│   ├── src/app.js        # Express API server
│   ├── Dockerfile        # Backend container
│   └── package.json      # Backend dependencies
└── docker-compose.yml    # Service orchestration
```

## 🚀 Features

### Frontend (React + TypeScript)
- ✅ Modern React 19 with hooks
- ✅ TypeScript for type safety
- ✅ Responsive UI with CSS styling
- ✅ Real-time todo management (CRUD operations)
- ✅ Error handling and loading states
- ✅ Environment-aware API configuration

### Backend (Node.js + Express)
- ✅ RESTful API with full CRUD operations
- ✅ Security middleware (Helmet, CORS)
- ✅ Request logging with Morgan
- ✅ Health check endpoint
- ✅ Proper error handling and validation
- ✅ Environment configuration support

### DevOps & Infrastructure
- ✅ **Multi-stage Docker builds** for optimized production images
- ✅ **Docker Compose** orchestration with custom networking
- ✅ **Health checks** for both services
- ✅ **Nginx** reverse proxy for frontend
- ✅ **Hot reload** support for development
- ✅ **Production-ready** configuration

## 🔧 Technology Stack

| Component | Technology | Version |
|-----------|------------|---------|
| Frontend | React + TypeScript | 19.1.0 |
| Backend | Node.js + Express | 18-alpine |
| Web Server | Nginx | Alpine |
| Containerization | Docker | Latest |
| Orchestration | Docker Compose | 3.8 |
| HTTP Client | Axios | 1.11.0 |
| Security | Helmet + CORS | Latest |

## 🐳 Docker Implementation

### Frontend Container
- **Multi-stage build**: Build stage + Nginx serving stage
- **Base Images**: `node:18-alpine` → `nginx:alpine`
- **Optimization**: Separate build and runtime environments
- **Port**: 3002 → 80 (internal)

### Backend Container  
- **Base Image**: `node:18-alpine`
- **Optimization**: Production-only dependencies
- **Port**: 3001
- **Health Check**: `/health` endpoint

### Networking
- **Custom bridge network**: `todo-network`
- **Service communication**: Internal container networking
- **Port mapping**: Host → Container port binding

## 🚦 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Health check |
| `GET` | `/api/todos` | Get all todos |
| `GET` | `/api/todos/:id` | Get single todo |
| `POST` | `/api/todos` | Create new todo |
| `PUT` | `/api/todos/:id` | Update todo |
| `DELETE` | `/api/todos/:id` | Delete todo |

## 🏃‍♂️ Quick Start

### Prerequisites
- Docker & Docker Compose installed
- Ports 3001 and 3002 available

### Run the Application
```bash
# Clone and navigate to project
cd project2

# Start all services
docker-compose up --build

# Access the application
# Frontend: http://localhost:3002  
# Backend API: http://localhost:3001/api/todos
# Health Check: http://localhost:3001/health
```

### Development Mode
```bash
# Start with rebuild
docker-compose up --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 🛡️ Security Features

- **Helmet.js**: Security headers protection
- **CORS**: Cross-origin resource sharing configuration  
- **Input Validation**: Server-side request validation
- **Error Handling**: Proper error responses without exposure
- **Production Builds**: Minified and optimized code

## 📊 Health Monitoring

Both services include health check endpoints:
- **Backend**: `GET /health` - Returns service status
- **Frontend**: Nginx availability check
- **Docker**: Built-in health check configuration

## 🔄 Development Workflow

1. **Code Changes**: Edit source files
2. **Rebuild**: `docker-compose up --build`
3. **Test**: Verify functionality in browser
4. **Debug**: Check container logs with `docker-compose logs`


