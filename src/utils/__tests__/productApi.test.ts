/**
 * Product API Tests - Test Driven Development
 * 
 * This test suite validates product management functionality
 * using mocked Firestore operations.
 * 
 * @fileoverview TDD implementation for product CRUD operations
 * @version 1.0.0
 */

// Import the functions we're testing
import { 
    createProduct, 
    getProduct, 
    getAllProducts
} from '../productApi';

// Import Firestore functions that we need to mock
import { setDoc, getDoc, getDocs, updateDoc, deleteDoc, doc, collection, addDoc, query, where, Timestamp } from 'firebase/firestore';

/**
 * Mock Firebase configuration
 */
jest.mock('../../config/firebase', () => ({
    db: {}
}));

/**
 * Mock all Firestore functions used by productApi
 */
jest.mock('firebase/firestore', () => {
  class MockTimestamp {
    toDate() {
      return new Date();
    }
  }
  
  return {
    collection: jest.fn(),
    doc: jest.fn(), 
    setDoc: jest.fn(),
    addDoc: jest.fn(),
    getDoc: jest.fn(),
    getDocs: jest.fn(),
    updateDoc: jest.fn(),
    deleteDoc: jest.fn(),
    query: jest.fn(),
    where: jest.fn(),
    orderBy: jest.fn(),
    limit: jest.fn(),
    Timestamp: MockTimestamp
  };
});

// Create typed mock functions
const mockAddDoc = addDoc as jest.MockedFunction<typeof addDoc>;
const mockGetDoc = getDoc as jest.MockedFunction<typeof getDoc>;
const mockGetDocs = getDocs as jest.MockedFunction<typeof getDocs>;
const mockUpdateDoc = updateDoc as jest.MockedFunction<typeof updateDoc>;
const mockDeleteDoc = deleteDoc as jest.MockedFunction<typeof deleteDoc>;
const mockDoc = doc as jest.MockedFunction<typeof doc>;
const mockCollection = collection as jest.MockedFunction<typeof collection>;
const mockQuery = query as jest.MockedFunction<typeof query>;
const mockWhere = where as jest.MockedFunction<typeof where>;

describe('createProduct - TDD Implementation', () => {
    beforeEach(() => {
        mockAddDoc.mockReset();
        mockCollection.mockReset();
    });

    it('creates a new product successfully', async () => {
        // Arrange
        mockAddDoc.mockResolvedValue({ id: 'newProdId' } as any);
        mockCollection.mockReturnValue({} as any);
        
        const productData = {
            title: 'Test Product',
            price: 29.99,
            description: 'A test product',
            image: 'https://example.com/image.jpg',
            category: 'Electronics',
            rating: { rate: 4.5, count: 100 }
        };
        
        // Act
        const result = await createProduct(productData);
        
        // Assert
        expect(result).toBe('newProdId');
        expect(mockAddDoc).toHaveBeenCalled();
    });

    it('throws error when product creation fails', async () => {
        // Arrange
        mockAddDoc.mockRejectedValue(new Error('Creation failed'));
        mockCollection.mockReturnValue({} as any);
        
        const productData = {
            title: 'Test Product',
            price: 29.99,
            description: 'A test product',
            image: 'https://example.com/image.jpg',
            category: 'Electronics',
            rating: { rate: 4.5, count: 100 }
        };
        
        // Act & Assert
        await expect(createProduct(productData)).rejects.toThrow('Creation failed');
    });
});

describe('getProduct - TDD Implementation', () => {
    beforeEach(() => {
        mockGetDoc.mockReset();
        mockDoc.mockReset();
    });

    it('retrieves a product by ID successfully', async () => {
        // Arrange
        const productData = {
            title: 'Test Product',
            price: 29.99,
            description: 'A test product',
            image: 'https://example.com/image.jpg',
            category: 'Electronics',
            rating: { rate: 4.5, count: 100 }
        };

        const mockDocSnap = {
            exists: () => true,
            id: 'prod123',
            data: () => productData
        };

        mockGetDoc.mockResolvedValue(mockDocSnap as any);
        mockDoc.mockReturnValue({} as any);
        
        // Act
        const result = await getProduct('prod123');
        
        // Assert
        expect(mockDoc).toHaveBeenCalledWith(expect.anything(), 'products', 'prod123');
        expect(mockGetDoc).toHaveBeenCalled();
    });

    it('returns null when product does not exist', async () => {
        // Arrange
        const mockDocSnap = {
            exists: () => false,
            data: () => undefined
        };

        mockGetDoc.mockResolvedValue(mockDocSnap as any);
        mockDoc.mockReturnValue({} as any);
        
        // Act
        const result = await getProduct('nonexistent');
        
        // Assert
        expect(result).toBeNull();
    });
});

describe('getAllProducts - TDD Implementation', () => {
    beforeEach(() => {
        mockGetDocs.mockReset();
        mockCollection.mockReset();
    });

    it('retrieves all products successfully', async () => {
        // Arrange
        const products = [
            { id: 'prod1', title: 'Product 1', price: 10.99 },
            { id: 'prod2', title: 'Product 2', price: 20.99 }
        ];

        const mockDocs = products.map((product) => ({
            id: product.id,
            data: () => ({ title: product.title, price: product.price })
        }));

        const mockQuerySnapshot = {
            docs: mockDocs,
            forEach: function(callback: any) {
                mockDocs.forEach(callback);
            }
        };

        mockGetDocs.mockResolvedValue(mockQuerySnapshot as any);
        mockCollection.mockReturnValue({} as any);
        
        // Act
        const result = await getAllProducts();
        
        // Assert
        expect(mockCollection).toHaveBeenCalledWith(expect.anything(), 'products');
        expect(mockGetDocs).toHaveBeenCalled();
        expect(Array.isArray(result)).toBe(true);
    });
});