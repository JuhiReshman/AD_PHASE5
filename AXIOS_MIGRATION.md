# Axios Migration Guide

## Overview
This project has been migrated from using the native `fetch` API to **Axios** for all HTTP requests. This provides better error handling, request/response interceptors, and a more consistent API across different environments.

## What Changed

### 1. **Centralized API Configuration**
- Created `src/lib/api.ts` with Axios instance and interceptors
- Automatic token management via request interceptors
- Global error handling via response interceptors

### 2. **Service-Specific API Instances**
- Created `src/lib/services.ts` for different microservices
- Separate Axios instances for User, Package, Booking, and Payment services
- Environment variable support for different service URLs

### 3. **Updated API Functions**
- All `fetch` calls replaced with Axios calls
- Simplified error handling with try-catch blocks
- Automatic JSON parsing (no need for `.json()` calls)

## File Structure

```
src/lib/
├── api.ts              # Main Axios configuration with interceptors
├── services.ts         # Service-specific Axios instances
├── userApi.ts          # User service API functions
├── auth.ts             # Authentication utility functions
└── packages.ts         # Package data (static data)
```

## Usage Examples

### Making API Calls

```typescript
// Before (fetch)
const response = await fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});
const result = await response.json();

// After (Axios)
const response = await userApi.post('/users', data);
const result = response.data;
```

### Error Handling

```typescript
// Before (fetch)
if (!response.ok) {
  throw new Error('Request failed');
}

// After (Axios)
try {
  const response = await userApi.get('/me');
  return response.data;
} catch (error) {
  throw new Error('Failed to fetch user profile');
}
```

### Authentication

```typescript
// Token is automatically added to requests via interceptor
const user = await getCurrentUser(); // No need to pass token manually
```

## Environment Variables

Add these to your `.env` file:

```env
VITE_USER_API_URL=http://localhost:8080/user-api/users
VITE_PACKAGE_API_URL=http://localhost:8080/package-api/packages
VITE_BOOKING_API_URL=http://localhost:8080/booking-api/bookings
VITE_PAYMENT_API_URL=http://localhost:8080/payment-api/payments
```

## Benefits of Axios

1. **Automatic JSON Parsing**: No need to call `.json()` on responses
2. **Request/Response Interceptors**: Global token management and error handling
3. **Better Error Handling**: More detailed error information
4. **Request/Response Transformation**: Built-in data transformation
5. **Request Cancellation**: Ability to cancel requests
6. **Progress Monitoring**: Upload/download progress tracking
7. **Better Browser Support**: Consistent API across different environments

## Migration Checklist

- ✅ Install Axios: `npm install axios`
- ✅ Create centralized API configuration
- ✅ Update all API functions to use Axios
- ✅ Update authentication flow
- ✅ Test all API endpoints
- ✅ Update error handling
- ✅ Document changes

## Testing

To test the migration:

1. Start your backend services
2. Run the frontend: `npm run dev`
3. Test registration and login
4. Test protected routes
5. Verify error handling works correctly

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure your backend allows requests from your frontend origin
2. **401 Unauthorized**: Check that the token is being sent correctly
3. **Network Errors**: Verify your backend services are running

### Debug Tips

- Check browser network tab for request/response details
- Use browser dev tools to inspect localStorage for token
- Check console for any error messages 