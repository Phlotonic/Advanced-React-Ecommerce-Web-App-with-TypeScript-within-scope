# Firebase Integration Guide

This document provides a comprehensive overview of the Firebase integration in the React E-commerce application, including setup, configuration, and usage patterns.

## 📁 Project Structure

```
src/
├── config/
│   └── firebase.ts          # Firebase initialization and configuration
├── context/
│   └── AuthContext.tsx      # Authentication context provider
├── utils/
│   ├── userApi.ts          # Firestore user management functions
│   └── __tests__/
│       └── userApi.test.ts # Unit tests for user API functions
├── components/
│   ├── DisplayData.tsx     # User CRUD operations demo
│   └── AddDataForm.tsx     # User creation form
└── ...
```

## 🔧 Configuration Files

### `src/config/firebase.ts`
- **Purpose**: Central Firebase configuration and service initialization
- **Exports**: `auth`, `db`, `firestore` (alias)
- **Features**: 
  - Environment variable-based configuration
  - TypeScript type safety
  - Backwards compatibility support

### `.env.local`
- **Purpose**: Environment variables for Firebase project configuration  
- **Security**: Client-safe configuration (no server secrets)
- **Documentation**: See `FIREBASE_ENV_DOCS.md` for variable details

## 🔐 Authentication

### AuthContext (`src/context/AuthContext.tsx`)
Provides application-wide authentication state management:

```typescript
// Usage in components
import { useAuth } from '../context/AuthContext';

function MyComponent() {
  const { user, login, logout, register } = useAuth();
  
  // user: Current authenticated user or null
  // login: Sign in with email/password
  // logout: Sign out current user  
  // register: Create new user account
}
```

### Key Features:
- ✅ Real-time authentication state updates
- ✅ Automatic auth state persistence
- ✅ Type-safe authentication methods
- ✅ Error handling and validation
- ✅ Clean component unmounting

## 💾 Database Operations

### User API (`src/utils/userApi.ts`)
Provides Firestore operations for user profile management:

```typescript
import { createUserProfile, getUserProfile } from '../utils/userApi';

// Create a new user profile
const newUser = await createUserProfile(
  'user123',
  'user@example.com', 
  'John Doe',
  '123 Main St'
);

// Retrieve existing user profile
const existingUser = await getUserProfile('user123');
```

### Supported Operations:
- ✅ **Create**: Store new user profiles in Firestore
- ✅ **Read**: Retrieve user data by ID
- ✅ **Update**: Modify user information (via DisplayData component)
- ✅ **Delete**: Remove user profiles (via DisplayData component)

## 🎯 Component Examples

### DisplayData Component
Demonstrates comprehensive Firestore CRUD operations:

- **Real-time data fetching** from Firestore collections
- **Inline editing** with immediate Firestore updates  
- **Optimistic UI updates** with error handling
- **Bulk operations** with proper loading states
- **Responsive design** with accessible form controls

### Key Features:
- ✅ Loading states and error handling
- ✅ Form validation and user feedback
- ✅ Confirmation dialogs for destructive actions
- ✅ Keyboard navigation support
- ✅ Mobile-responsive layout

## 🧪 Testing Strategy

### Unit Tests (`src/utils/__tests__/userApi.test.ts`)
Comprehensive test coverage for Firestore operations:

```typescript
// Mock Firebase dependencies for isolated testing
jest.mock('../../config/firebase', () => ({ db: {} }));
jest.mock('firebase/firestore', () => ({
  setDoc: jest.fn(),
  getDoc: jest.fn(),
  doc: jest.fn()
}));
```

### Test Coverage:
- ✅ **Function behavior**: Verify correct return values
- ✅ **Firestore integration**: Ensure proper SDK usage
- ✅ **Error handling**: Test failure scenarios  
- ✅ **Edge cases**: Handle missing/invalid data
- ✅ **Type safety**: Validate TypeScript interfaces

## 🔒 Security Best Practices

### Environment Variables
- ✅ All Firebase config uses `VITE_` prefixed variables
- ✅ No sensitive server secrets in client environment
- ✅ Proper `.gitignore` configuration for `.env.local`

### Firebase Security Rules
```javascript
// Example Firestore security rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own profile
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### Code Security
- ✅ Input validation and sanitization
- ✅ Proper error handling without data leaks
- ✅ Type-safe database operations
- ✅ Authentication state verification

## 🚀 Performance Optimizations

### Firestore Best Practices
- **Efficient queries**: Use indexes and query limitations
- **Batch operations**: Minimize individual read/write operations  
- **Real-time listeners**: Only where needed to reduce costs
- **Caching strategy**: Leverage Firestore offline persistence

### React Optimizations  
- **useEffect dependencies**: Prevent unnecessary re-renders
- **Memoization**: Cache expensive calculations with useMemo
- **Component splitting**: Separate concerns for better performance
- **Loading states**: Provide immediate user feedback

## 🔧 Development Workflow

### Setup Steps
1. **Install dependencies**: `npm install firebase`
2. **Configure environment**: Copy `.env.example` to `.env.local`
3. **Update Firebase config**: Add your project credentials
4. **Initialize Firebase**: Run `npm run dev` to test connection
5. **Verify setup**: Check browser console for Firebase initialization

### Development Commands
```bash
# Start development server
npm run dev

# Run tests  
npm test

# Build for production
npm run build

# Type checking
npm run type-check
```

## 📖 API Reference

### Firebase Configuration
```typescript
// firebase.ts exports
export { auth, db, firestore };

// Types
Auth: Firebase Authentication instance
Firestore: Firebase Firestore database instance  
```

### Authentication Context
```typescript  
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<UserCredential>;
}
```

### User API
```typescript
interface UserProfile {
  id: string;      // Firebase Auth UID
  email: string;   // User email address  
  name: string;    // Display name
  address: string; // Shipping address
}

// Function signatures
createUserProfile(id: string, email: string, name: string, address: string): Promise<UserProfile>
getUserProfile(id: string): Promise<UserProfile | null>
```

## 🐛 Common Issues & Solutions

### Environment Variables Not Loading
- ✅ Ensure variables are prefixed with `VITE_`
- ✅ Restart development server after changes
- ✅ Check `.env.local` is in project root directory

### Firebase Connection Errors  
- ✅ Verify Firebase project configuration
- ✅ Check network connectivity and firewall settings
- ✅ Validate API key and project ID in console

### Authentication Issues
- ✅ Enable Email/Password authentication in Firebase Console
- ✅ Configure authorized domains in Firebase settings
- ✅ Check Firebase Security Rules for proper permissions

### Build/Type Errors
- ✅ Update TypeScript configuration for Vite compatibility  
- ✅ Ensure proper Firebase SDK imports (v9+ modular)
- ✅ Verify all environment variables are properly typed

## 📚 Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Web SDK Guide](https://firebase.google.com/docs/firestore/quickstart)
- [Firebase Authentication Guide](https://firebase.google.com/docs/auth/web/start)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [React Context API](https://react.dev/reference/react/useContext)

---

*This documentation is maintained by the development team and updated as the Firebase integration evolves.*