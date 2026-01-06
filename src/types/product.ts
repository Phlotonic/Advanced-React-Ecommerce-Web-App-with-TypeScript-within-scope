// Nested rating structure first
interface Rating {
    rate: number;
    count: number;
}

// Product interface for e-commerce application
interface Product {
    id: string | number;            // Compatible with Firebase string IDs
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: Rating;
    stock?: number;                 // Available quantity (optional for backward compatibility)
    tags?: string[];                // Product tags for search (optional)
    brand?: string;                 // Product brand (optional)
    sku?: string;                   // Stock Keeping Unit (optional)
    weight?: number;                // Product weight (optional)
    dimensions?: {                  // Product dimensions (optional)
        length: number;
        width: number;
        height: number;
    };
    createdAt?: Date;              // Creation timestamp (optional)
    updatedAt?: Date;              // Last update timestamp (optional)
    active?: boolean;              // Product availability status (optional)
}

// This interface supports Firebase Firestore implementation
// Enhanced to meet assignment requirements while maintaining backward compatibility

export type { Product, Rating };