# Seltronik ATCS - Adaptive Traffic Control System

![ATCS Dashboard](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-18.0-336791?logo=postgresql)

A comprehensive traffic control system designed for Indonesian cities using a **multi-instance deployment architecture**. Each city operates its own isolated instance with dedicated servers, databases, and domains.

---

## 🏗️ Multi-Instance Architecture

### Deployment Strategy

```
┌─────────────────────────────────────────────┐
│      Company Central Monitoring             │
│      (Read-only access to all cities)       │
│         ↓         ↓         ↓               │
└─────────────────────────────────────────────┘
         │         │         │
    ┌────┘    ┌────┘    └────┐
    ↓         ↓              ↓
┌─────────┐ ┌─────────┐ ┌─────────┐
│ Bandung │ │ Jakarta │ │Surabaya │
│ Instance│ │ Instance│ │Instance │
├─────────┤ ├─────────┤ ├─────────┤
│ Domain  │ │ Domain  │ │ Domain  │
│Frontend │ │Frontend │ │Frontend │
│Backend  │ │Backend  │ │Backend  │
│   DB    │ │   DB    │ │   DB    │
└─────────┘ └─────────┘ └─────────┘
```

**Key Benefits:**
- ✅ Complete data isolation per city
- ✅ No single point of failure
- ✅ Independent scalability
- ✅ Government data sovereignty
- ✅ Optimal performance

**Same Codebase, Multiple Deployments**: One repository deployed three times with different environment configurations.

---

## 📋 Table of Contents

- [Multi-Instance Architecture](#-multi-instance-architecture)
- [Quick Start](#-quick-start)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Documentation](#-documentation)
- [Development](#-development)
- [Deployment](#-deployment)

---

## 🚀 Quick Start

### Development Setup

**Prerequisites:**
- Node.js 18+
- PostgreSQL 15+
- npm or yarn

**Backend Setup:**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials
npm run migrate
npm run seed
npm run dev
```

**Frontend Setup:**
```bash
npm install
npm run dev
```

**Default Login:**
- Username: `admin`
- Password: `admin123`

See [SERVER_SETUP.md](./docs/SERVER_SETUP.md) for detailed setup instructions.

---

## ✨ Features

### Current (v1.0)

#### 🔐 Authentication System
- User login with role-based access (Admin/Operator)
- JWT token-based authentication
- Session persistence
- Multi-instance ready

#### 🏠 Home Dashboard
- **Interactive Map**: Leaflet-powered map with device markers
- **Device Browser**: Traffic lights, street lamps, pedestrian crossings
- **Device Selection**: Click to view details and manage
- **Responsive Design**: Tablet to 8K display support

#### 📊 Live Monitoring
- **Real-time Signal Status**: 16 traffic light grid visualization
- **Traffic Flow**: 4-leg and 3-leg intersection support
- **Phase Display**: Current signal phase indication
- **Live Updates**: Real-time device state changes (Socket.io ready)

#### 🎛️ Controller Tab
- **Phase Configuration**: 16-phase configuration table
- **Phase Indication**: Assign indications to phases
- **Signal Group Indication**: 16 signal groups per indication
- **Mode Configuration**: Normal, flashing yellow, all red modes
- **Edit → Save → Send → Read workflow**

#### ⏱️ FTC Tab (Fixed Time Controller)
- **Phase Timing**: Green/yellow/red durations for 12 plans
- **Day Plan**: 24-hour schedule (48 time slots)
- **Week Plan**: 7-day weekly schedule
- **Special Day Plan**: Holiday/event schedules
- **Year Plan**: Annual calendar planning
- **Options**: Feature toggles and flash night settings

#### 🏢 Intersection Management
- Add, edit, delete intersections
- Auto-increment Site IDs
- Intersection type support (3-leg, 4-leg, T-junction)
- Location and coordinate management

#### 🔌 IoT Device Integration
- Device authentication (API key + IP whitelist)
- Real-time status updates
- Configuration push (protocol-agnostic)
- Device health monitoring
- Heartbeat mechanism

---

## 🛠️ Technology Stack

### Frontend
- **React** 18.3.1 - UI framework
- **Vite** - Build tool and dev server
- **React Leaflet** - Interactive maps
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

### Backend
- **Node.js** 18+ - Runtime
- **Express** 4.18 - Web framework
- **PostgreSQL** 18.0 - Database
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Socket.io** 4.8 - Real-time (ready)

### Infrastructure
- **Docker** - Containerization
- **Nginx** - Reverse proxy
- **SSL/TLS** - Encryption

---

## 📁 Project Structure

```
seltronik-atcs/
├── backend/              # Backend API server
│   ├── src/             # Application code
│   │   ├── controllers/ # Request handlers
│   │   ├── routes/      # API routes
│   │   ├── middleware/  # Express middleware
│   │   ├── models/      # Data models
│   │   ├── services/    # Business logic
│   │   └── utils/       # Utilities
│   ├── database/        # Migrations and seeds
│   ├── scripts/         # Utility scripts
│   ├── tests/           # Test files
│   └── docs/            # Backend documentation
│
├── src/                  # Frontend React app
│   ├── components/      # React components
│   ├── services/         # API services
│   ├── config/          # Configuration
│   └── constants/       # Constants
│
├── docs/                 # Project documentation
│   ├── PROGRESS.md
│   ├── OBJECTIVE_PLAN.md
│   ├── WEBSITE_PRESENTATION.md
│   ├── WORKFLOW.md
│   ├── DEPLOYMENT.md
│   ├── SERVER_SETUP.md
│   └── DEVICE_INTEGRATION.md
│
├── scripts/              # Deployment scripts
├── nginx/                # Nginx configuration
└── README.md            # This file
```

See `backend/docs/PROJECT_STRUCTURE.md` for detailed backend structure.

---

## 📚 Documentation

Comprehensive documentation is available in the `docs/` folder:

### Core Documentation

1. **[PROGRESS.md](./docs/PROGRESS.md)** - Current project status and completed work
2. **[OBJECTIVE_PLAN.md](./docs/OBJECTIVE_PLAN.md)** - Overall goals, roadmap, and vision
3. **[WEBSITE_PRESENTATION.md](./docs/WEBSITE_PRESENTATION.md)** - Frontend features and UI overview
4. **[WORKFLOW.md](./docs/WORKFLOW.md)** - User workflows and configuration patterns

### Technical Documentation

5. **[SERVER_SETUP.md](./docs/SERVER_SETUP.md)** - Backend server installation and setup
6. **[DEPLOYMENT.md](./docs/DEPLOYMENT.md)** - Production deployment guide with Docker
7. **[DEVICE_INTEGRATION.md](./docs/DEVICE_INTEGRATION.md)** - IoT device connection guide

### Backend Documentation

- `backend/docs/PROJECT_STRUCTURE.md` - Backend code organization
- `backend/docs/IOT_INTEGRATION.md` - IoT integration technical details
- `backend/README.md` - Backend API documentation

---

## 🧪 Development

### Running Tests

```bash
# Backend - Test database connection
cd backend
npm run test:db

# Backend - Test all API endpoints
npm run test:endpoints

# Backend - Test mock IoT device
npm run test:mock-device
```

### Available Scripts

**Backend:**
```bash
npm start              # Start production server
npm run dev            # Start development server
npm run migrate        # Run database migrations
npm run seed           # Seed database
npm run test:db        # Test database connection
```

**Frontend:**
```bash
npm run dev            # Start development server
npm run build          # Build for production
npm run preview        # Preview production build
```

---

## 🚀 Deployment

### Quick Deployment (Docker)

```bash
# Development
docker-compose up -d

# Production
docker-compose -f docker-compose.prod.yml up -d
```

### Multi-City Deployment

Each city requires:
- Separate server
- Separate database
- Separate domain
- Separate SSL certificates
- Same codebase, different `.env` configuration

See [DEPLOYMENT.md](./docs/DEPLOYMENT.md) for complete deployment guide.

---

## 📊 Current Status

### Completed ✅
- Database schema (30 tables)
- Backend API (59 endpoints)
- Frontend UI (36 components)
- Authentication system
- Security features
- IoT foundation (protocol-agnostic)
- Project reorganization

### In Progress 🚧
- Socket.io real-time updates
- Full integration testing

### Pending 🔜
- IoT device protocol implementation
- Production deployment
- Advanced features (VAC, analytics)

See [PROGRESS.md](./docs/PROGRESS.md) for detailed status.

---

## 🔐 Security Features

- ✅ JWT authentication with refresh tokens
- ✅ Role-based access control (Admin/Operator)
- ✅ Rate limiting (API and login)
- ✅ CORS protection
- ✅ XSS protection
- ✅ SQL injection prevention
- ✅ Device authentication (API key + IP whitelist)
- ✅ Comprehensive audit logging
- ✅ Password hashing (bcrypt)
- ✅ Security headers (Helmet)

---

## 🤝 Contributing

Internal project for Seltronik ATCS development team.

---

## 📄 License

Proprietary - Seltronik

---

## 📞 Support

For questions or issues:
1. Check the [documentation](./docs/)
2. Review [troubleshooting guides](./docs/SERVER_SETUP.md#troubleshooting)
3. Contact the development team

---

**Last Updated:** January 2025  
**Version:** 1.0.0
