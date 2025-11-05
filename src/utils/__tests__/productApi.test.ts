/**
 * Product API Tests - Test Driven Development
 * 
 * This test suite implements TDD for product management functionality.
 * Tests are written first to define expected behavior, then implementation
 * follows to make tests pass.
 * 
 * @fileoverview TDD implementation for product CRUD operations
 * @author Your Team
 * @version 1.0.0
 */

// Import the functions we're going to implement (will fail initially - Red phase)
import { 
    createProduct, 
    getProduct, 
    getAllProducts, 
    updateProduct, 
    deleteProduct 
} from '../productApi';

// Import Firestore functions that we need to mock
import { setDoc, getDoc, getDocs, updateDoc, deleteDoc, doc, collection } from 'firebase/firestore';

/**
 * Mock Firebase configuration
 */
jest.mock('../../config/firebase', () => ({
    db: {}
}));

/**
 * Mock all Firestore functions used by productApi
 */
jest.mock('firebase/firestore', () => ({
    collection: jest.fn(),
    doc: jest.fn(), 
    setDoc: jest.fn(),
    getDoc: jest.fn(),
    getDocs: jest.fn(),
    updateDoc: jest.fn(),
    deleteDoc: jest.fn()
}));

// Create typed mock functions
const mockSetDoc = setDoc as jest.MockedFunction<typeof setDoc>;
const mockGetDoc = getDoc as jest.MockedFunction<typeof getDoc>;
const mockGetDocs = getDocs as jest.MockedFunction<typeof getDocs>;
const mockUpdateDoc = updateDoc as jest.MockedFunction<typeof updateDoc>;
const mockDeleteDoc = deleteDoc as jest.MockedFunction<typeof deleteDoc>;
const mockDoc = doc as jest.MockedFunction<typeof doc>;
const mockCollection = collection as jest.MockedFunction<typeof collection>;

/**
 * TDD Test Suite: Product Creation
 * 
 * Red Phase: These tests will fail until we implement createProduct
 */
describe('createProduct - TDD Implementation', () => {
    beforeEach(() => {
        mockSetDoc.mockReset();
        mockDoc.mockReset();
    });

    it('creates a new product successfully', async () => {
        // Arrange
        mockSetDoc.mockResolvedValue(undefined);
        mockDoc.mockReturnValue({} as any);
        
        const productData = {
            id: 'prod123',
            name: 'Test Product',
            price: 29.99,
            description: 'A test product',
            image: 'https://example.com/image.jpg',
            category: 'Electronics',
            stock: 10
        };
        
        // Act
        const result = await createProduct(productData);
        
        // Assert
        expect(mockDoc).toHaveBeenCalledWith(expect.anything(), 'products', productData.id);
        expect(mockSetDoc).toHaveBeenCalledWith({}, productData);
        expect(result).toEqual(productData);
    });

    it('throws error when product creation fails', async () => {
        // Arrange
        mockSetDoc.mockRejectedValue(new Error('Creation failed'));
        mockDoc.mockReturnValue({} as any);
        
        const productData = {
            id: 'prod123',
            name: 'Test Product',
            price: 29.99,
            description: 'A test product',
            image: 'https://example.com/image.jpg',
            category: 'Electronics',
            stock: 10
        };
        
        // Act & Assert
        await expect(createProduct(productData)).rejects.toThrow('Creation failed');
    });
});

/**
 * TDD Test Suite: Product Retrieval
 */
describe('getProduct - TDD Implementation', () => {
    beforeEach(() => {
        mockGetDoc.mockReset();
        mockDoc.mockReset();
    });

    it('retrieves a product by ID successfully', async () => {
        // Arrange
        const productData = {
            id: 'prod123',
            name: 'Test Product',
            price: 29.99,
            description: 'A test product',
            image: 'https://example.com/image.jpg',
            category: 'Electronics',
            stock: 10
        };

        const mockDocSnap = {
            exists: () => true,
            data: () => productData
        };

        mockGetDoc.mockResolvedValue(mockDocSnap as any);
        mockDoc.mockReturnValue({} as any);
        
        // Act
        const result = await getProduct('prod123');
        
        // Assert
        expect(mockDoc).toHaveBeenCalledWith(expect.anything(), 'products', 'prod123');
        expect(mockGetDoc).toHaveBeenCalled();
        expect(result).toEqual(productData);
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

/**
 * TDD Test Suite: Get All Products
 */
describe('getAllProducts - TDD Implementation', () => {
    beforeEach(() => {
        mockGetDocs.mockReset();
        mockCollection.mockReset();
    });

    it('retrieves all products successfully', async () => {
        // Arrange
        const products = [
            { id: 'prod1', name: 'Product 1', price: 10.99 },
            { id: 'prod2', name: 'Product 2', price: 20.99 }
        ];

        const mockQuerySnapshot = {
            docs: products.map((product, index) => ({
                id: product.id,
                data: () => product
            }))
        };

        mockGetDocs.mockResolvedValue(mockQuerySnapshot as any);
        mockCollection.mockReturnValue({} as any);
        
        // Act
        const result = await getAllProducts();
        
        // Assert
        expect(mockCollection).toHaveBeenCalledWith(expect.anything(), 'products');
        expect(mockGetDocs).toHaveBeenCalled();
        expect(result).toEqual(products);
    });
});

/**
 * TDD Test Suite: Product Update
 */
describe('updateProduct - TDD Implementation', () => {
    beforeEach(() => {
        mockUpdateDoc.mockReset();
        mockDoc.mockReset();
    });

    it('updates product successfully', async () => {
        // Arrange
        mockUpdateDoc.mockResolvedValue(undefined);
        mockDoc.mockReturnValue({} as any);
        
        const updateData = { name: 'Updated Product', price: 39.99 };
        
        // Act
        const result = await updateProduct('prod123', updateData);
        
        // Assert
        expect(mockDoc).toHaveBeenCalledWith(expect.anything(), 'products', 'prod123');
        expect(mockUpdateDoc).toHaveBeenCalledWith({}, updateData);
        expect(result).toEqual(updateData);
    });
});

/**
 * TDD Test Suite: Product Deletion
 */
describe('deleteProduct - TDD Implementation', () => {
    beforeEach(() => {
        mockDeleteDoc.mockReset();
        mockDoc.mockReset();
    });

    it('deletes product successfully', async () => {
        // Arrange
        mockDeleteDoc.mockResolvedValue(undefined);
        mockDoc.mockReturnValue({} as any);
        
        // Act
        const result = await deleteProduct('prod123');
        
        // Assert
        expect(mockDoc).toHaveBeenCalledWith(expect.anything(), 'products', 'prod123');
        expect(mockDeleteDoc).toHaveBeenCalledWith({});
        expect(result).toBe(true);
    });
});