// Nested rating structure first
interface Rating {
    rate: number;
    count: number;
}

// Main Product interface definition
interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: Rating;
}

// This is used to fetch the necessary information 
// from the fakestore API an display it in the catalog

export type { Product, Rating };