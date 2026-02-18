# 🚀 Travel Booking System - Frontend (Updated)

## 📋 Overview

This is the updated frontend for the Travel Booking System, configured to work seamlessly with the new backend architecture including API Gateway, MySQL database, and enhanced travel packages with images and highlights.

## 🔧 Key Changes Made

### 1. **API Gateway Integration**
- ✅ Updated all API endpoints to use Gateway (port 9999)
- ✅ Centralized API configuration in `src/lib/apiConfig.ts`
- ✅ Fixed authentication token handling across all services

### 2. **Port Configuration**
- ✅ Frontend now runs on port 8081 (matches Gateway CORS config)
- ✅ Updated `vite.config.ts` for proper development server setup

### 3. **Enhanced Package Display**
- ✅ Added support for package images from Unsplash
- ✅ Integrated highlights display in package cards and details
- ✅ Enhanced PackageDetails component with featured badge

### 4. **API Service Updates**
- ✅ **User Service**: `http://localhost:9999/user-api/users`
- ✅ **Package Service**: `http://localhost:9999/api/packages`
- ✅ **Admin Service**: `http://localhost:9999/user-api/admin`
- ✅ **Agent Service**: `http://localhost:9999/api/agent`

### 5. **Authentication Improvements**
- ✅ Consistent token storage using `localStorage.getItem('token')`
- ✅ Proper JWT token handling for all authenticated requests
- ✅ Enhanced error handling and user feedback

## 🏗️ Project Structure

```
src/
├── lib/
│   ├── apiConfig.ts          # Centralized API configuration
│   ├── userApi.ts           # User service API calls
│   ├── packagesApi.ts       # Package service API calls
│   ├── adminApi.ts          # Admin dashboard API calls
│   ├── agentApi.ts          # Agent dashboard API calls
│   ├── auth.ts              # Authentication utilities
│   └── utils.ts             # General utilities
├── components/
│   ├── FeaturedPackages.tsx # Enhanced with images & highlights
│   ├── AuthDialog.tsx       # Login/Registration dialog
│   ├── ProtectedRoute.tsx   # Role-based route protection
│   └── ui/                  # Shadcn/UI components
├── pages/
│   ├── PackageDetails.tsx   # Enhanced package details
│   ├── AdminDashboard.tsx   # Admin dashboard
│   ├── AgentDashboard.tsx   # Agent dashboard
│   └── Dashboard.tsx        # User dashboard
└── App.tsx                  # Main application with routing
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Backend services running (see backend setup)

### Installation

1. **Install Dependencies**
   ```bash
   cd Frontend\ old/user-front-latest
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Access Application**
   - Frontend: http://localhost:8081
   - API Gateway: http://localhost:9999

## 🔗 API Endpoints

### User Service (via Gateway)
- `POST /user-api/users` - Register user
- `POST /user-api/users/login` - Login user
- `GET /user-api/users/me` - Get current user
- `GET /user-api/users/{id}` - Get user by ID

### Package Service (via Gateway)
- `GET /api/packages/` - Get all packages
- `GET /api/packages/{id}` - Get package by ID

### Admin Service (via Gateway)
- `GET /user-api/admin/stats` - Get admin statistics
- `GET /user-api/admin/users` - Get all users
- `GET /user-api/admin/agents` - Get all agents

### Agent Service (via Gateway)
- `GET /api/agent/stats` - Get agent statistics
- `GET /api/agent/packages` - Get agent packages
- `GET /api/agent/bookings` - Get agent bookings

## 🎨 Features

### Enhanced Package Display
- **High-Quality Images**: Unsplash images for each package
- **Highlights Section**: Key attractions and experiences
- **Responsive Design**: Mobile-friendly package cards
- **Featured Badge**: Visual indicator for premium packages

### Authentication System
- **JWT Token Management**: Secure token storage and handling
- **Role-Based Access**: USER, ADMIN, TRAVEL_AGENT roles
- **Protected Routes**: Automatic redirection based on user role
- **Form Validation**: Comprehensive input validation

### Dashboard Features
- **User Dashboard**: Booking history and profile management
- **Admin Dashboard**: System statistics and user management
- **Agent Dashboard**: Package management and customer inquiries

## 🔧 Configuration

### Environment Variables
The application uses the following configuration:

```typescript
// API Gateway Configuration
GATEWAY_BASE_URL: 'http://localhost:9999'

// Frontend Configuration
PORT: 8081
```

### CORS Configuration
The Gateway is configured to allow requests from:
- `http://localhost:8081` (Frontend)

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure Gateway is running on port 9999
   - Verify frontend is running on port 8081
   - Check Gateway CORS configuration

2. **Authentication Issues**
   - Clear browser localStorage
   - Verify JWT token format
   - Check token expiration

3. **API Connection Errors**
   - Ensure all backend services are running
   - Verify Gateway routes are properly configured
   - Check service discovery (Eureka)

### Development Tips

1. **API Testing**
   ```bash
   # Test Gateway health
   curl http://localhost:9999/actuator/health
   
   # Test package service
   curl http://localhost:9999/api/packages/
   ```

2. **Token Debugging**
   ```javascript
   // In browser console
   console.log('Token:', localStorage.getItem('token'));
   console.log('User:', localStorage.getItem('user'));
   ```

## 📱 Responsive Design

The frontend is fully responsive and optimized for:
- **Desktop**: 1200px+ (Full dashboard experience)
- **Tablet**: 768px-1199px (Adaptive layouts)
- **Mobile**: 320px-767px (Mobile-first design)

## 🎯 Next Steps

### Potential Enhancements
1. **Real-time Notifications**: WebSocket integration
2. **Payment Integration**: Stripe/PayPal integration
3. **Advanced Search**: Filter packages by criteria
4. **Booking System**: Complete booking flow
5. **Reviews & Ratings**: User feedback system

### Performance Optimizations
1. **Image Optimization**: Lazy loading and compression
2. **Code Splitting**: Route-based code splitting
3. **Caching**: API response caching
4. **Bundle Optimization**: Tree shaking and minification

## 📄 License

This project is part of the Travel Booking System and follows the same licensing terms.

---

**Happy Coding! 🚀** 