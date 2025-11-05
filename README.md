# Advanced React E-Commerce Web App with TypeScript

A full-featured e-commerce application built with React, TypeScript, and Firebase, offering complete product management, user authentication, and order tracking capabilities.

## 🚀 Features

- **User Authentication**: Secure registration and login system using Firebase Authentication
- **Product Management**: Full CRUD operations for managing products
- **Shopping Cart**: Add, remove, and manage products in cart
- **Order Management**: Place orders and view order history
- **User Profiles**: Manage user information and preferences
- **Responsive Design**: Mobile-friendly interface

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

### Part 1: Firebase Setup
- [x] Create Firebase project
- [x] Add app to Firebase project
- [x] Configure Firebase SDK
- [x] Enable Firebase Authentication
- [x] Enable Firestore

### Part 2: Firebase Authentication
- [x] Implement user registration (email/password)
- [x] Create user document in Firestore on registration
- [x] Implement login functionality
- [x] Implement logout functionality

### Part 3: User Management ✅ COMPLETED
- [x] **Create**: Add user document on registration (createUserProfile function)
- [x] **Read**: Fetch and display user profile data (getUserProfile function)  
- [x] **Update**: Allow users to edit profile information (updateUserProfile function) - *Implemented via TDD*
- [x] **Delete**: Enable account deletion with data removal (deleteUserProfile function) - *Implemented via TDD*

### Part 4: Product Management ✅ COMPLETED  
- [x] Create `products` collection in Firestore - *Implemented via TDD*
- [x] **Read**: Fetch and display all products from Firestore (getProduct, getAllProducts)
- [x] **Create**: Add new products to Firestore (createProduct function) - *Implemented via TDD*
- [x] **Update**: Edit existing product details (updateProduct function) - *Implemented via TDD*
- [x] **Delete**: Remove products from Firestore (deleteProduct function) - *Implemented via TDD*
- [x] Replace FakeStore API with Firestore integration - *API functions ready for UI integration*

### Part 5: Order Management
- [ ] Store cart/order data in Firebase when users place orders
- [ ] Include all products in order document
- [ ] Link orders to authenticated user
- [ ] **Order History Page**: Display list of user's previous orders
- [ ] Show order details (ID, date, total price)
- [ ] Enable clicking individual orders to view full details
- [ ] Display product list and total for each order

## 🗂️ Project Structure

```
src/
├── components/          # React components
│   ├── auth/           # Authentication components
│   ├── profile/        # User profile components  
│   └── shopping cart/  # Shopping cart components
├── config/             # Configuration files
│   └── firebase.ts     # Firebase setup and initialization
├── context/            # React context providers
│   └── AuthContext.tsx # Authentication state management
├── features/           # Redux Toolkit features
│   └── cart/          # Cart state management
├── pages/             # Page components
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
│   ├── userApi.ts     # User CRUD operations
│   └── __tests__/     # Unit tests
└── App.tsx            # Main application component
```

## 🔐 Firebase Collections

### Users Collection
```typescript
{
  uid: string;
  email: string;
  name?: string;
  address?: string;
  createdAt: timestamp;
}
```

### Products Collection
```typescript
{
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  stock: number;
}
```

### Orders Collection
```typescript
{
  orderId: string;
  userId: string;
  products: Array<{
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  totalPrice: number;
  createdAt: timestamp;
}
```

## 🧪 Test-Driven Development (TDD)

This project follows TDD principles for implementing new features:

### TDD Workflow:
1. **Red**: Write failing tests for desired functionality
2. **Green**: Write minimal code to make tests pass  
3. **Refactor**: Improve code quality while keeping tests green

### Current Test Coverage:
- ✅ **User API Functions**: Complete CRUD operations (create, read, update, delete)
- ✅ **Product API Functions**: Complete CRUD operations (create, read, update, delete)  
- ✅ **Firebase Integration**: Proper mocking and error handling for all operations
- ✅ **TDD Implementation**: Red-Green-Refactor cycle followed for all new features
- 📋 **Order Management**: Upcoming TDD implementation
- 📋 **UI Components**: Integration testing with API functions

### Running Tests:
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🚧 Development Status

**Current Phase**: Implementing Order Management and UI Integration (Part 5)

**Recently Completed** ✅:
- **Firebase Configuration Modernization**: Migrated to Firebase v9+ modular SDK
- **Code Documentation**: Added comprehensive JSDoc comments and guides
- **User Management CRUD**: Complete user profile operations (userApi.ts) - *TDD Implementation*
- **Product Management CRUD**: Complete product operations (productApi.ts) - *TDD Implementation*
- **Test-Driven Development**: Red-Green-Refactor cycle for all API functions
- **TypeScript Integration**: Strict type safety throughout Firebase integration
- **Environment Setup**: Proper `.env.local` configuration with documentation

**In Progress** 🚧:
- Order management API implementation using TDD
- UI component integration with API functions
- Shopping cart persistence with Firebase

**Upcoming** 📋:
- Order history and tracking functionality
- Advanced product filtering and search
- Performance optimizations and caching

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Phlotonic/Advanced-React-Ecommerce-Web-App-with-TypeScript-within-scope/issues).

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
