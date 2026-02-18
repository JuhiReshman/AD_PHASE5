# User Service Integration

## Simple Setup

Your frontend is now connected to your user-service backend running on `http://localhost:8081`.

## What's Connected

### Backend Endpoints (from your user-service):
- `POST /api/users` - Register user
- `POST /api/users/login` - Login user  
- `GET /api/users/{id}` - Get user by ID
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

### Frontend Integration:
- Registration form with: username, email, password, firstName, lastName
- Login form with: email, password
- Automatic token management
- Role-based routing (CUSTOMER, ADMIN, TRAVEL_AGENT)

## To Test:

1. **Start your user-service backend** on port 8081
2. **Start the frontend**: `npm run dev`
3. **Register a new user** or **login with existing user**
4. **Check the network tab** to see API calls to `localhost:8081`

## API Structure

```typescript
// User registration
{
  username: "testuser",
  email: "test@example.com", 
  password: "password123",
  firstName: "Test",
  lastName: "User",
  role: "CUSTOMER"
}

// Login response
{
  token: "jwt_token_here",
  user: { /* user object */ }
}
```

That's it! Simple and direct connection to your user-service. 🎉 