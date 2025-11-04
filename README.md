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
- **Backend**: Firebase (Firestore, Authentication)
- **Styling**: [Your styling solution - CSS/Tailwind/Material-UI]
- **State Management**: [Your state management solution - Context API/Redux/Zustand]

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
   - Create a `.env` file in the root directory
   - Add your Firebase configuration:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

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

### Part 3: User Management
- [ ] **Create**: Add user document on registration
- [ ] **Read**: Fetch and display user profile data
- [ ] **Update**: Allow users to edit profile information (name, address)
- [ ] **Delete**: Enable account deletion with data removal from Firestore

### Part 4: Product Management
- [ ] Create `products` collection in Firestore
- [ ] **Read**: Fetch and display all products from Firestore
- [ ] **Create**: Add new products to Firestore
- [ ] **Update**: Edit existing product details
- [ ] **Delete**: Remove products from Firestore
- [ ] Replace FakeStore API with Firestore integration

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
├── components/         # React components
├── contexts/          # Context providers
├── firebase/          # Firebase configuration and utilities
├── hooks/             # Custom React hooks
├── pages/             # Page components
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
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

## 🚧 Development Status

**Current Phase**: Implementing User and Product Management (Parts 3-4)

**Completed**:
- Firebase project setup and configuration
- User authentication (registration, login, logout)

**In Progress**:
- User profile CRUD operations
- Product management system migration to Firestore

**Upcoming**:
- Order management and history functionality

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
