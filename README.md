# Advanced React E-Commerce Web App with TypeScript

A complete, modular e-commerce application built with React, TypeScript, and Firebase. This is a generic, reusable template ready to power any type of online store with full Firebase integration for authentication, product management, and order tracking.

## 🎯 Key Features

- **Firebase Authentication**: Complete email/password registration and login system
- **User Management**: Full CRUD operations for user profiles (create, read, update, delete)
- **Product Management**: Complete product catalog with CRUD operations in Firestore
- **Shopping Cart**: Redux-managed cart with persistent state
- **Order Management**: Order creation, history tracking, and detailed order views
- **Clean Architecture**: Generic, modular template suitable for any store type
- **Full Test Coverage**: TDD-implemented APIs with comprehensive unit tests
- **Type-Safe**: Complete TypeScript implementation with strict mode

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Backend**: Firebase (Firestore v9+, Authentication)
- **State Management**: Context API + Redux Toolkit
- **Testing**: Jest + React Testing Library
- **Styling**: CSS3 with responsive design
- **Type Safety**: TypeScript with strict configuration

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase account

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/Phlotonic/Advanced-React-Ecommerce-Web-App-with-TypeScript-within-scope.git
cd Advanced-React-Ecommerce-Web-App-with-TypeScript-within-scope
```

2. Install dependencies:
```bash
npm install
```

3. Set up Firebase configuration:
   - Create a `.env.local` file in the root directory
   - Copy the template from `FIREBASE_ENV_DOCS.md`
   - Add your Firebase configuration:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```
   - See `FIREBASE_INTEGRATION_GUIDE.md` for detailed setup instructions

4. Start the development server:
```bash
npm run dev
```

## 📱 Usage

1. **Register/Login**: Create an account or sign in with existing credentials
2. **Browse Products**: View all available products in the store
3. **Manage Cart**: Add products to cart and adjust quantities
4. **Place Orders**: Checkout and place your order
5. **View Order History**: Access your previous orders and their details
6. **Manage Profile**: Update your user information

## ✅ Implementation Checklist

### Requirements Compliance Checklist

#### Part 1: Firebase Setup ✅
- [x] Firebase project created and configured
- [x] Firebase SDK integration with v9+ modular approach
- [x] Firebase Authentication enabled (email/password)
- [x] Firestore database enabled
- [x] Environment variables properly configured

#### Part 2: Firebase Authentication ✅
- [x] User registration with email/password validation
- [x] User profile document created in Firestore on registration
- [x] Login functionality with Firebase Authentication
- [x] Logout functionality with session management

#### Part 3: User Management (CRUD) ✅
- [x] **Create**: User profiles created on registration (`createUserProfile`)
- [x] **Read**: User profile data retrieval (`getUserProfile`)
- [x] **Update**: Profile editing capabilities (`updateUserProfile`)
- [x] **Delete**: Account deletion with data removal (`deleteUserProfile`)
- [x] All operations fully tested with TDD implementation

#### Part 4: Product Management ✅
- [x] Products collection created in Firestore
- [x] FakeStore API replaced with Firestore integration
- [x] **Create**: Product creation (`createProduct`, `createProductWithId`)
- [x] **Read**: Product fetching (`getProduct`, `getAllProducts`, `getProductsByCategory`)
- [x] **Update**: Product editing (`updateProduct`)
- [x] **Delete**: Product removal (`deleteProduct`)
- [x] Category filtering and management

#### Part 5: Order Management ✅
- [x] Order creation in Firestore (`createOrder`)
- [x] Order items include product details and quantities
- [x] Orders linked to authenticated users
- [x] Order history retrieval (`getUserOrders`)
- [x] Order detail viewing (`getOrder`, `OrderDetail.tsx`)
- [x] Order status tracking (pending, confirmed, shipped, delivered, cancelled)
- [x] Comprehensive order display with product lists and totals

## 📁 Project Structure

```
src/
├── App.tsx                    # Main app component (generic e-commerce template)
├── main.tsx                   # React entry point
├── index.css                  # Global styles
├── store.ts                   # Redux store setup
├── components/
│   ├── Navigation.tsx         # Clean navigation bar
│   ├── ProductCard.tsx        # Reusable product display card
│   ├── auth/
│   │   ├── Auth.tsx           # Auth component
│   │   ├── AuthForm.tsx       # Combined login/register form
│   │   ├── Login.tsx          # Login page
│   │   ├── Register.tsx       # Registration page
│   │   ├── PasswordReset.tsx  # Password reset functionality
│   │   ├── UserProfile.tsx    # User profile display
│   │   └── __tests__/
│   │       ├── Login.test.tsx
│   │       └── Register.test.tsx
│   ├── checkout/
│   │   └── Checkout.tsx       # Checkout with order creation
│   ├── orders/
│   │   ├── OrderHistory.tsx   # User order history view
│   │   └── OrderDetail.tsx    # Individual order details
│   ├── profile/
│   │   ├── EditProfile.tsx    # User profile editor
│   │   └── __tests__/
│   │       └── EditProfile.test.tsx
│   ├── product catalog/
│   │   └── List.tsx           # Product management interface
│   └── shopping cart/
│       └── ShoppingCart.tsx   # Cart display and management
├── config/
│   └── firebase.ts            # Firebase initialization (v9+ modular)
├── context/
│   └── AuthContext.tsx        # Auth state management
├── features/
│   └── cart/
│       └── cartSlice.ts       # Redux cart state
├── pages/
│   └── Homepage.tsx           # Product listing page
├── types/
│   └── product.ts             # TypeScript interfaces
├── utils/
│   ├── userApi.ts             # User CRUD operations (TDD)
│   ├── productApi.ts          # Product CRUD operations (TDD)
│   ├── orderApi.ts            # Order CRUD operations (TDD)
│   └── __tests__/
│       ├── userApi.test.ts    # 8 passing tests
│       ├── productApi.test.ts # 6 passing tests
│       └── orderApi.test.ts   # 9 passing tests
└── vite-env.d.ts              # Vite type definitions
```

## 🔐 Firebase Collections & Data Models

### Users Collection
```typescript
{
  uid: string;                    // Firebase Auth UID
  email: string;                  // User email
  displayName: string;            // Display name
  firstName?: string;             // First name
  lastName?: string;              // Last name
  phoneNumber?: string;           // Contact number
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  preferences?: {
    notifications: boolean;
    newsletter: boolean;
    theme: 'light' | 'dark' | 'auto';
  };
  createdAt: Date;               // Account creation timestamp
  updatedAt: Date;               // Last update timestamp
}
```

### Products Collection
```typescript
{
  id: string;                     // Product ID (Firestore document ID)
  title: string;                  // Product name
  price: number;                  // Product price
  description: string;            // Detailed description
  category: string;               // Product category
  image: string;                  // Product image URL
  rating?: {
    rate: number;
    count: number;
  };
  stock?: number;                 // Available quantity
  tags?: string[];                // Search tags
  brand?: string;                 // Product brand
  sku?: string;                   // Stock keeping unit
  active: boolean;                // Product availability
  createdAt: Date;               // Creation timestamp
  updatedAt: Date;               // Last update timestamp
}
```

### Orders Collection
```typescript
{
  orderId: string;               // Unique order identifier
  userId: string;                // User who placed order (Firebase UID)
  products: Array<{              // Items in order
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  totalPrice: number;            // Total order amount
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;              // Order timestamp
  shippingAddress: string;      // Delivery address
}
```

## 🧪 Testing & Quality Assurance

### Test Coverage Summary
- **Total Tests**: 24 passing (100% pass rate)
- **Test Suites**: 6 suites (all passing)
- **Test Framework**: Jest 30.2.0 with TypeScript support
- **Testing Library**: React Testing Library with proper mocking

### Test Breakdown
| Module | Tests | Status |
|--------|-------|--------|
| User API | 8 | ✅ Passing |
| Product API | 6 | ✅ Passing |
| Order API | 9 | ✅ Passing |
| Login Component | 1 | ✅ Passing |
| Register Component | 1 | ✅ Passing |
| Edit Profile | 1 | ✅ Passing |
| **Total** | **24** | **✅ All Passing** |

### Test Implementation Approach
- **TDD Methodology**: Red-Green-Refactor cycle for all API implementations
- **Firebase Mocking**: Proper mocking of Firestore collections and Auth methods
- **Error Handling**: Comprehensive error scenarios tested
- **Type Safety**: Full TypeScript test coverage

### Running Tests
```bash
# Run all tests once
npm test

# Run tests in watch mode (development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## 🚧 Development Status & Recent Updates

**Current Phase**: ✅ **COMPLETE - All Requirements Implemented**

### Recent Major Updates (January 2026)

#### Code Quality & Architecture Improvements
- ✅ **Complete Debranding**: Removed all "Quanumis Systems" branded content and business-specific files
- ✅ **Generic Template**: Transformed from branded business showcase to clean, reusable e-commerce template
- ✅ **Code Cleanup**: Deleted unnecessary files (`products.ts` config, `SoftwareComponents.tsx`)
- ✅ **Comment Modernization**: Updated all file headers and removed business-specific references
- ✅ **UI Simplification**: Clean, modern interface without branded styling

#### Test Infrastructure & Fixes
- ✅ **Jest Configuration**: Resolved import.meta issues with proper ESM and transform setup
- ✅ **Firebase Mocking**: Fixed Timestamp class mocks and querySnapshot forEach methods
- ✅ **Test Stability**: All 24 tests passing across 6 test suites (100% pass rate)
- ✅ **Module Resolution**: Proper handling of Firebase Auth and Firestore imports in tests

#### Production Build Optimization
- ✅ **Bundle Size Reduction**: 761.50 kB → 757.61 kB (code cleanup impact)
- ✅ **Zero Compilation Errors**: Clean TypeScript compilation
- ✅ **Production Ready**: Successful builds with Vite v6.3.3

### Test Results
```
Test Suites: 6 passed, 6 total
Tests:       24 passed, 24 total
Time:        ~1.4s average
Success Rate: 100% ✅
```

### Previously Completed Features

## 🔄 Latest Updates & Improvements (January 2026)

### Code Quality & Architecture
- **Generic Template Transformation**: Removed all business-specific branding and created a clean, reusable e-commerce template suitable for any store type
- **Debranding**: Eliminated all "Quanumis Systems" references from code, UI, and documentation
- **File Cleanup**: Removed unnecessary business-specific files:
  - `src/config/products.ts` (branded product catalog)
  - `src/components/SoftwareComponents.tsx` (business component showcase)
- **Code Modernization**: Updated all file headers and removed branded content

### Test Infrastructure
- **Jest Configuration Fix**: Resolved import.meta handling for Vite integration
- **Firebase Mocking Enhancement**: Fixed Timestamp class mocks and querySnapshot methods
- **Test Stability**: Achieved 100% pass rate (24/24 tests)
- **Module Resolution**: Proper handling of ESM imports in test environment

### UI/UX Improvements
- **Simplified Interface**: Clean, modern design without business branding
- **Consistent Styling**: Updated all components with generic e-commerce theming
- **Navigation Updates**: Changed from branded logo to generic store icon (🛍️)
- **Form Messaging**: Updated authentication form text for generic use case

### Build & Performance
- **Bundle Optimization**: Reduced bundle size (761.50 kB → 757.61 kB)
- **Clean Build Process**: Zero TypeScript errors, successful Vite builds
- **Production Ready**: Optimized for deployment

### Documentation
- **Comprehensive README**: Complete guide for setup, usage, and architecture
- **Code Comments**: JSDoc documentation throughout codebase
- **Setup Guides**: Firebase integration documentation in separate files
- **Type Definitions**: Full TypeScript interfaces and types documented



## 📝 License

This project is created for educational purposes as part of a course assignment.

## 👤 Author

**Phlotonic (Adam Dryden)**
- GitHub: [@Phlotonic](https://github.com/Phlotonic)

## 🙏 Acknowledgments

- Firebase for backend services
- React team for the amazing framework
- Course instructors for project requirements and guidance

---

Built with ❤️ using React, TypeScript, and Firebase
