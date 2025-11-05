/**
 * Quantumis Systems Product Catalog Configuration
 * 
 * This file defines the fractal structure of our software components and services.
 * Each product can be purchased individually (granular/premium pricing) or as part
 * of bundles (discounted full-stack offerings) with feature-based middle tiers.
 * 
 * The structure mirrors how this very application is built - demonstrating our
 * modular, scalable architecture approach to potential customers.
 * 
 * @fileoverview Product catalog for software components and services
 * @author Quantumis Systems
 * @version 1.0.0
 */

/**
 * Product Categories - Our three main business domains
 * Each category contains components that can be sold individually or bundled
 */
export const PRODUCT_CATEGORIES = {
  ECOMMERCE: 'ecommerce',
  ELEARNING: 'elearning', 
  DEVSECOPS: 'devsecops'
} as const;

/**
 * Pricing Tiers - Fractal pricing structure
 * - GRANULAR: Individual components at premium pricing
 * - FEATURED: Feature-based middle tier with selective bundling
 * - FULLSTACK: Complete solution bundles at discounted rates
 */
export const PRICING_TIERS = {
  GRANULAR: 'granular',
  FEATURED: 'featured',
  FULLSTACK: 'fullstack'
} as const;

/**
 * Service Types - Consultation and maintenance offerings
 */
export const SERVICE_TYPES = {
  CONSULTATION: 'consultation',
  MAINTENANCE: 'maintenance',
  SUPPORT: 'support'
} as const;

/**
 * E-Commerce Component Catalog
 * These are the actual components used in this very application!
 */
export const ECOMMERCE_COMPONENTS = [
  {
    id: 'auth-system',
    name: 'Authentication System',
    description: 'Complete user authentication with Firebase integration, glassmorphism UI, and security features',
    // This component powers the login system you just used
    technicalDetails: 'Firebase Auth v9+, React Context, TypeScript, glassmorphism design',
    granularPrice: 299,
    bundleDiscount: 0.3, // 30% off in bundles
    category: PRODUCT_CATEGORIES.ECOMMERCE,
    features: [
      'Email/password authentication',
      'User registration with validation', 
      'Secure session management',
      'Responsive glassmorphism design',
      'Password strength indicators',
      'Form validation with real-time feedback'
    ],
    demoComponent: 'AuthForm', // References the actual component in our codebase
    codeFiles: ['AuthForm.tsx', 'Login.tsx', 'Register.tsx', 'AuthContext.tsx']
  },
  
  {
    id: 'shopping-cart',
    name: 'Redux Shopping Cart',
    description: 'State-of-the-art shopping cart with Redux Toolkit, persistent storage, and real-time updates',
    technicalDetails: 'Redux Toolkit, localStorage persistence, TypeScript interfaces',
    granularPrice: 199,
    bundleDiscount: 0.25,
    category: PRODUCT_CATEGORIES.ECOMMERCE,
    features: [
      'Redux Toolkit state management',
      'Persistent cart storage',
      'Add/remove/update quantities',
      'Real-time price calculations',
      'TypeScript type safety',
      'Optimistic UI updates'
    ],
    demoComponent: 'ShoppingCart',
    codeFiles: ['ShoppingCart.tsx', 'cartSlice.ts']
  },

  {
    id: 'order-management',
    name: 'Order Management System',
    description: 'Complete order processing with Firebase backend, order history, and status tracking',
    technicalDetails: 'Firestore integration, TDD-tested API, order lifecycle management',
    granularPrice: 399,
    bundleDiscount: 0.35,
    category: PRODUCT_CATEGORIES.ECOMMERCE,
    features: [
      'Order creation and processing',
      'Order history and tracking',
      'Status update system',
      'Firebase Firestore backend',
      'TDD-tested API functions',
      'Comprehensive error handling'
    ],
    demoComponent: 'OrderHistory',
    codeFiles: ['orderApi.ts', 'OrderHistory.tsx', 'OrderDetail.tsx', 'Checkout.tsx']
  },

  {
    id: 'user-profiles',
    name: 'User Profile Management',
    description: 'Complete CRUD operations for user profiles with Firebase integration',
    technicalDetails: 'Firestore CRUD, profile validation, TDD methodology',
    granularPrice: 149,
    bundleDiscount: 0.20,
    category: PRODUCT_CATEGORIES.ECOMMERCE,
    features: [
      'Create, read, update, delete profiles',
      'Profile data validation',
      'Firebase Firestore integration', 
      'TDD-tested functions',
      'Error handling and recovery',
      'TypeScript interfaces'
    ],
    demoComponent: 'EditProfile',
    codeFiles: ['userApi.ts', 'EditProfile.tsx']
  }
];

/**
 * E-Learning Components (Future Development - Local Scope Only)
 * These showcase our capability in educational technology
 */
export const ELEARNING_COMPONENTS = [
  {
    id: 'course-catalog',
    name: 'Course Management System',
    description: 'Modular course creation and management with progress tracking',
    technicalDetails: 'React components, progress tracking, video integration',
    granularPrice: 499,
    bundleDiscount: 0.4,
    category: PRODUCT_CATEGORIES.ELEARNING,
    features: [
      'Course creation interface',
      'Student progress tracking',
      'Video content management',
      'Quiz and assessment tools',
      'Certificate generation',
      'Analytics dashboard'
    ],
    status: 'coming-soon' // Local development only
  },

  {
    id: 'learning-analytics',
    name: 'Learning Analytics Dashboard',
    description: 'Real-time learning analytics with performance insights',
    technicalDetails: 'Chart.js integration, real-time data, performance metrics',
    granularPrice: 349,
    bundleDiscount: 0.35,
    category: PRODUCT_CATEGORIES.ELEARNING,
    features: [
      'Real-time progress tracking',
      'Performance analytics',
      'Custom reporting',
      'Student engagement metrics',
      'Instructor insights',
      'Data visualization'
    ],
    status: 'coming-soon'
  }
];

/**
 * DevSecOps Components (Future Development - Local Scope Only)
 * These demonstrate our security and deployment expertise
 */
export const DEVSECOPS_COMPONENTS = [
  {
    id: 'ci-cd-pipeline',
    name: 'CI/CD Pipeline Templates',
    description: 'Production-ready CI/CD configurations with security scanning',
    technicalDetails: 'GitHub Actions, security scanning, automated deployment',
    granularPrice: 599,
    bundleDiscount: 0.4,
    category: PRODUCT_CATEGORIES.DEVSECOPS,
    features: [
      'GitHub Actions workflows',
      'Automated testing pipelines',
      'Security vulnerability scanning',
      'Deployment automation',
      'Environment management',
      'Rollback strategies'
    ],
    status: 'coming-soon'
  },

  {
    id: 'monitoring-dashboard',
    name: 'Application Monitoring Suite',
    description: 'Real-time application monitoring with alerting and metrics',
    technicalDetails: 'Metrics collection, alerting system, performance monitoring',
    granularPrice: 449,
    bundleDiscount: 0.35,
    category: PRODUCT_CATEGORIES.DEVSECOPS,
    features: [
      'Real-time performance monitoring',
      'Custom alerting rules',
      'Error tracking and logging',
      'Performance metrics',
      'Uptime monitoring',
      'Security event tracking'
    ],
    status: 'coming-soon'
  }
];

/**
 * Service Offerings - Consultation and maintenance packages
 */
export const SERVICES = [
  {
    id: 'free-consultation',
    name: 'Free 30-Minute Consultation',
    description: 'Complimentary consultation to discuss your software architecture needs',
    price: 0,
    duration: '30 minutes',
    type: SERVICE_TYPES.CONSULTATION,
    features: [
      'Architecture assessment',
      'Technology recommendations',
      'Project scope evaluation',
      'Cost estimation',
      'Timeline planning',
      'Custom solution design'
    ],
    bookingRequired: true
  },

  {
    id: 'maintenance-retainer',
    name: 'Monthly Maintenance Retainer',
    description: 'Ongoing maintenance and support for your software components',
    price: 299,
    duration: 'Monthly',
    type: SERVICE_TYPES.MAINTENANCE,
    bundleDiscount: 0.25, // Cheaper when bundled with component purchases
    features: [
      'Monthly security updates',
      'Bug fixes and patches',
      'Performance optimization',
      'Priority support',
      'Code review services',
      'Documentation updates'
    ]
  },

  {
    id: 'premium-support',
    name: '24/7 Premium Support',
    description: 'Round-the-clock support for mission-critical applications',
    price: 599,
    duration: 'Monthly',
    type: SERVICE_TYPES.SUPPORT,
    bundleDiscount: 0.3,
    features: [
      '24/7 technical support',
      'Emergency response (< 2 hours)',
      'Dedicated support engineer',
      'Custom integrations',
      'Training sessions',
      'Architecture consulting'
    ]
  }
];

/**
 * Bundle Configurations - Full-stack solutions at discounted rates
 */
export const BUNDLES = [
  {
    id: 'ecommerce-starter',
    name: 'E-Commerce Starter Bundle',
    description: 'Complete e-commerce foundation with authentication, cart, and user management',
    components: ['auth-system', 'shopping-cart', 'user-profiles'],
    originalPrice: 647, // Sum of individual granular prices
    bundlePrice: 449,   // ~30% discount
    savings: 198,
    category: PRODUCT_CATEGORIES.ECOMMERCE,
    tier: PRICING_TIERS.FEATURED
  },

  {
    id: 'ecommerce-pro',
    name: 'E-Commerce Professional Bundle',
    description: 'Full e-commerce solution with all components and maintenance included',
    components: ['auth-system', 'shopping-cart', 'user-profiles', 'order-management'],
    services: ['maintenance-retainer'],
    originalPrice: 1345, // Components + 12 months maintenance
    bundlePrice: 899,    // ~33% discount
    savings: 446,
    category: PRODUCT_CATEGORIES.ECOMMERCE,
    tier: PRICING_TIERS.FULLSTACK,
    includes: [
      'All e-commerce components',
      '12 months maintenance',
      'Free consultation',
      'Installation support',
      'Documentation package'
    ]
  }
];

/**
 * Get all available products (combining components from all categories)
 * This function demonstrates how our modular architecture can be composed
 */
export const getAllProducts = () => {
  return [
    ...ECOMMERCE_COMPONENTS,
    ...ELEARNING_COMPONENTS.filter(c => c.status !== 'coming-soon'), // Only show available components
    ...DEVSECOPS_COMPONENTS.filter(c => c.status !== 'coming-soon')
  ];
};

/**
 * Get products by category - useful for filtered displays
 */
export const getProductsByCategory = (category: string) => {
  return getAllProducts().filter(product => product.category === category);
};

/**
 * Calculate bundle pricing - demonstrates our fractal pricing model
 */
export const calculateBundlePrice = (componentIds: string[], includeMaintenance = false) => {
  const components = getAllProducts().filter(p => componentIds.includes(p.id));
  const originalTotal = components.reduce((sum, component) => sum + component.granularPrice, 0);
  
  // Apply average bundle discount
  const avgDiscount = components.reduce((sum, component) => sum + component.bundleDiscount, 0) / components.length;
  const bundlePrice = originalTotal * (1 - avgDiscount);
  
  // Add maintenance if requested (with bundle discount)
  const maintenanceService = SERVICES.find(s => s.id === 'maintenance-retainer');
  const maintenanceCost = includeMaintenance && maintenanceService 
    ? (maintenanceService.price * 12) * (1 - (maintenanceService.bundleDiscount || 0))
    : 0;
  
  return {
    originalPrice: originalTotal + (includeMaintenance ? (maintenanceService?.price || 0) * 12 : 0),
    bundlePrice: bundlePrice + maintenanceCost,
    savings: (originalTotal + (includeMaintenance ? (maintenanceService?.price || 0) * 12 : 0)) - (bundlePrice + maintenanceCost),
    components: components.length,
    includeMaintenance
  };
};