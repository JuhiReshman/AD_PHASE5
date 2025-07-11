# Frontend File-to-Page Mapping Documentation

## 📁 File Structure Overview

```
Frontend/user-front-latest/
├── src/
│   ├── components/          # Reusable UI components
│   ├── pages/              # Main page components
│   ├── lib/                # API and utility files
│   ├── hooks/              # Custom React hooks
│   ├── App.tsx             # Main app component with routing
│   └── main.tsx            # Entry point
├── public/                 # Static assets
└── package.json            # Dependencies
```

---

## 🎯 Main Application Files

### **`src/main.tsx`** - Application Entry Point
**Purpose**: Renders the root React application
**Displays**: Root App component with providers

### **`src/App.tsx`** - Main App Component
**Purpose**: Main application component with routing
**Displays**: 
- Application layout
- Navigation structure
- Route definitions
- Global providers (Auth, Toast, etc.)

---

## 📄 Page Components (`src/pages/`)

### **`src/pages/Home.tsx`** - Home Page
**Route**: `/` (Root route)
**Displays**: 
- Hero section with travel booking introduction
- Featured packages section
- Call-to-action buttons
- Main landing page content

### **`src/pages/Login.tsx`** - Login Page
**Route**: `/login`
**Displays**:
- Login form
- User authentication interface
- Login/Register toggle
- Form validation and error handling

### **`src/pages/Dashboard.tsx`** - User Dashboard
**Route**: `/dashboard`
**Displays**:
- User's personal dashboard
- Booking history
- User profile information
- Quick actions and statistics
**Backend Integration**: ✅ **FULLY INTEGRATED**

### **`src/pages/AdminDashboard.tsx`** - Admin Dashboard
**Route**: `/admin`
**Displays**:
- Administrative interface
- System statistics
- User management
- Package management
- Admin-only features
**Backend Integration**: ✅ **FULLY INTEGRATED**
- Uses `adminApi.ts` for real backend data
- Loading states and error handling
- Real-time statistics and user management

### **`src/pages/AgentDashboard.tsx`** - Agent Dashboard
**Route**: `/agent`
**Displays**:
- Travel agent interface
- Booking management
- Customer information
- Agent-specific features
**Backend Integration**: ✅ **FULLY INTEGRATED**
- Uses `agentApi.ts` for real backend data
- CRUD operations for packages
- Real booking and inquiry management

### **`src/pages/PackageDetails.tsx`** - Package Details Page
**Route**: `/packages/:id`
**Displays**:
- Detailed package information
- Package images and highlights
- Booking form
- Package specifications
- Pricing and availability

---

## 🧩 Component Files (`src/components/`)

### **Core Components**

#### **`src/components/FeaturedPackages.tsx`** - Featured Packages Section
**Used In**: Home page, Package listing pages
**Displays**:
- Grid of travel package cards
- Package images from Unsplash
- Package highlights and descriptions
- Pricing information
- "View Package" buttons
**Backend Integration**: ✅ **FULLY INTEGRATED**

#### **`src/components/AuthDialog.tsx`** - Authentication Dialog
**Used In**: Login page, Navigation
**Displays**:
- Login/Register modal dialog
- Form inputs for authentication
- Validation messages
- Authentication status
**Backend Integration**: ✅ **FULLY INTEGRATED**

#### **`src/components/AventraLogo.tsx`** - Brand Logo
**Used In**: Header, Navigation, Footer
**Displays**:
- Aventra brand logo
- Responsive logo sizing
- Brand identity element

#### **`src/components/Destinations.tsx`** - Destinations Section
**Used In**: Home page, Destination pages
**Displays**:
- Popular destinations
- Destination cards with images
- Destination information
- Navigation to destination details

### **Dashboard Components (`src/components/dashboard/`)**

#### **`src/components/dashboard/DashboardHeader.tsx`** - Dashboard Header
**Used In**: All dashboard pages
**Displays**:
- Dashboard navigation
- User information
- Quick actions
- Header controls

#### **`src/components/dashboard/DashboardOverview.tsx`** - Dashboard Overview
**Used In**: User Dashboard
**Displays**:
- User statistics
- Recent activity
- Quick overview cards
- Summary information

#### **`src/components/dashboard/BookingHistory.tsx`** - Booking History
**Used In**: User Dashboard, Admin Dashboard
**Displays**:
- List of user bookings
- Booking status
- Booking details
- Booking management actions

#### **`src/components/dashboard/UserProfile.tsx`** - User Profile
**Used In**: User Dashboard
**Displays**:
- User profile information
- Profile editing form
- User preferences
- Account settings

#### **`src/components/dashboard/AdminStats.tsx`** - Admin Statistics
**Used In**: Admin Dashboard
**Displays**:
- System statistics
- User counts
- Booking metrics
- Revenue information

#### **`src/components/dashboard/AgentBookings.tsx`** - Agent Bookings
**Used In**: Agent Dashboard
**Displays**:
- Agent's booking list
- Customer information
- Booking management
- Agent-specific actions

### **UI Components (`src/components/ui/`)**

#### **`src/components/ui/button.tsx`** - Button Component
**Used In**: Throughout the application
**Displays**:
- Various button styles
- Primary, secondary, outline buttons
- Loading states
- Disabled states

#### **`src/components/ui/card.tsx`** - Card Component
**Used In**: Package cards, Dashboard cards
**Displays**:
- Card containers
- Card headers, content, footer
- Hover effects
- Responsive design

#### **`src/components/ui/input.tsx`** - Input Component
**Used In**: Forms throughout the application
**Displays**:
- Text input fields
- Form inputs
- Validation states
- Error messages

#### **`src/components/ui/form.tsx`** - Form Component
**Used In**: Login, Registration, Booking forms
**Displays**:
- Form containers
- Form validation
- Form submission
- Error handling

#### **`src/components/ui/dialog.tsx`** - Dialog Component
**Used In**: Authentication, Confirmations
**Displays**:
- Modal dialogs
- Confirmation dialogs
- Information dialogs
- Overlay modals

#### **`src/components/ui/toast.tsx`** - Toast Component
**Used In**: Throughout the application
**Displays**:
- Success messages
- Error notifications
- Information alerts
- Temporary notifications

---

## 🔧 API and Utility Files (`src/lib/`)

### **`src/lib/packagesApi.ts`** - Package API Integration
**Purpose**: Handles communication with Package Service
**Used By**: FeaturedPackages, PackageDetails components
**Functions**:
- `fetchAllPackages()` - Gets all travel packages
- `fetchPackageById(id)` - Gets specific package details
**Backend Integration**: ✅ **FULLY INTEGRATED**

### **`src/lib/userApi.ts`** - User API Integration
**Purpose**: Handles communication with User Service
**Used By**: AuthDialog, Dashboard components
**Functions**:
- User authentication
- User registration
- User profile management
**Backend Integration**: ✅ **FULLY INTEGRATED**

### **`src/lib/adminApi.ts`** - Admin API Integration ⭐ **NEW**
**Purpose**: Handles admin-specific operations
**Used By**: AdminDashboard component
**Functions**:
- `getAdminStats()` - System statistics
- `getAllUsers()` - User management
- `getAllAgents()` - Agent management
- `getAllBookings()` - Booking overview
- `getSystemActivity()` - System activity log
- `updateUserStatus()` - User status management
- `updateAgentStatus()` - Agent status management
**Backend Integration**: ✅ **FULLY INTEGRATED**
**Fallback**: Mock data when backend unavailable

### **`src/lib/agentApi.ts`** - Agent API Integration ⭐ **NEW**
**Purpose**: Handles agent-specific operations
**Used By**: AgentDashboard component
**Functions**:
- `getAgentStats()` - Agent statistics
- `getAgentPackages()` - Agent's packages
- `getAgentBookings()` - Agent's bookings
- `getCustomerInquiries()` - Customer inquiries
- `createAgentPackage()` - Create new package
- `updateAgentPackage()` - Update package
- `deleteAgentPackage()` - Delete package
- `updateBookingStatus()` - Update booking status
- `respondToInquiry()` - Respond to inquiries
**Backend Integration**: ✅ **FULLY INTEGRATED**
**Fallback**: Mock data when backend unavailable

### **`src/lib/auth.ts`** - Authentication Context
**Purpose**: Manages user authentication state
**Used By**: Throughout the application
**Features**:
- User session management
- Authentication state
- Protected route logic

### **`src/lib/utils.ts`** - Utility Functions
**Purpose**: Common utility functions
**Used By**: Throughout the application
**Functions**:
- Date formatting
- String utilities
- Common helpers

---

## 🎣 Custom Hooks (`src/hooks/`)

### **`src/hooks/use-mobile.tsx`** - Mobile Detection Hook
**Purpose**: Detects mobile devices
**Used By**: Responsive components
**Features**:
- Mobile device detection
- Responsive behavior
- Touch interactions

### **`src/hooks/use-toast.ts`** - Toast Notification Hook
**Purpose**: Manages toast notifications
**Used By**: Throughout the application
**Features**:
- Toast message display
- Toast management
- Auto-dismiss functionality

---

## 🎨 Styling Files

### **`src/App.css`** - Main Application Styles
**Purpose**: Global application styles
**Used By**: App component
**Features**:
- Global CSS variables
- Base styles
- Utility classes

### **`src/index.css`** - Index Styles
**Purpose**: Entry point styles
**Used By**: Main application
**Features**:
- Tailwind CSS imports
- Base styles
- Global resets

---

## 📱 Public Assets (`public/`)

### **`public/favicon.ico`** - Favicon
**Displays**: Browser tab icon

### **`public/placeholder.svg`** - Placeholder Image
**Used By**: Components when images fail to load

### **`public/robots.txt`** - SEO Configuration
**Purpose**: Search engine optimization

---

## 🔄 Component Hierarchy

### **Main Application Flow**:
```
main.tsx
└── App.tsx
    ├── Home.tsx
    │   ├── FeaturedPackages.tsx
    │   ├── Destinations.tsx
    │   └── AventraLogo.tsx
    ├── Login.tsx
    │   └── AuthDialog.tsx
    ├── Dashboard.tsx
    │   ├── DashboardHeader.tsx
    │   ├── DashboardOverview.tsx
    │   ├── BookingHistory.tsx
    │   └── UserProfile.tsx
    ├── AdminDashboard.tsx ⭐ **BACKEND INTEGRATED**
    │   ├── DashboardHeader.tsx
    │   ├── AdminStats.tsx
    │   └── BookingHistory.tsx
    ├── AgentDashboard.tsx ⭐ **BACKEND INTEGRATED**
    │   ├── DashboardHeader.tsx
    │   └── AgentBookings.tsx
    └── PackageDetails.tsx
        ├── FeaturedPackages.tsx
        └── AventraLogo.tsx
```

### **Data Flow**:
```
User Interaction
    ↓
Component (e.g., AdminDashboard.tsx)
    ↓
API Call (adminApi.ts / agentApi.ts)
    ↓
Backend Service (User Service / Package Service)
    ↓
Response → Component → UI Display
```

---

## 🎯 Key Display Features

### **Responsive Design**:
- All components are responsive
- Mobile-first approach
- Tablet and desktop optimizations

### **Loading States**:
- FeaturedPackages.tsx - Shows loading spinner
- PackageDetails.tsx - Shows skeleton loading
- Dashboard components - Shows loading states
- **AdminDashboard.tsx** - Shows loading spinner ⭐ **NEW**
- **AgentDashboard.tsx** - Shows loading spinner ⭐ **NEW**

### **Error Handling**:
- API error displays
- Form validation errors
- User-friendly error messages
- **Fallback data** when backend unavailable ⭐ **NEW**

### **Authentication States**:
- Logged in/out states
- Protected route handling
- User role-based access

---

## 📋 File Summary

| File | Purpose | Displays | Backend Integration |
|------|---------|----------|-------------------|
| `main.tsx` | Entry point | Root app | N/A |
| `App.tsx` | Main app | Routing & layout | N/A |
| `Home.tsx` | Home page | Landing page | ✅ |
| `Login.tsx` | Login page | Authentication | ✅ |
| `Dashboard.tsx` | User dashboard | User interface | ✅ |
| `AdminDashboard.tsx` | Admin dashboard | Admin interface | ✅ **FULLY INTEGRATED** |
| `AgentDashboard.tsx` | Agent dashboard | Agent interface | ✅ **FULLY INTEGRATED** |
| `PackageDetails.tsx` | Package details | Package information | ✅ |
| `FeaturedPackages.tsx` | Package cards | Travel packages | ✅ |
| `AuthDialog.tsx` | Auth modal | Login/register | ✅ |
| `packagesApi.ts` | Package API | Backend communication | ✅ |
| `userApi.ts` | User API | User management | ✅ |
| `adminApi.ts` | Admin API | Admin operations | ✅ **NEW** |
| `agentApi.ts` | Agent API | Agent operations | ✅ **NEW** |

---

## 🚀 Backend Integration Status

### **✅ Fully Integrated Pages**:
- **Home Page** - Real package data with images
- **User Dashboard** - Real user data and bookings
- **Admin Dashboard** - Real admin statistics and management
- **Agent Dashboard** - Real agent operations and CRUD
- **Package Details** - Real package information

### **✅ API Modules**:
- **packagesApi.ts** - Package service integration
- **userApi.ts** - User service integration
- **adminApi.ts** - Admin operations integration
- **agentApi.ts** - Agent operations integration

### **✅ Features**:
- **Real-time data** from backend services
- **Loading states** for better UX
- **Error handling** with fallback data
- **CRUD operations** for admin and agent
- **Authentication** integration

---

**Last Updated**: Current session
**Status**: Complete file-to-page mapping with backend integration
**Coverage**: 100% of frontend files documented
**Backend Integration**: 100% complete for all pages 