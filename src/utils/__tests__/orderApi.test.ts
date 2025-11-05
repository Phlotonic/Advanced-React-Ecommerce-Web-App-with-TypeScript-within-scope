/**
 * Order API Tests - Test Driven Development
 * 
 * This test suite implements TDD for order management functionality.
 * Orders represent completed purchases with cart items, user info, and timestamps.
 * 
 * @fileoverview TDD implementation for order CRUD operations
 * @author Your Team
 * @version 1.0.0
 */

// Import the functions we're going to implement (Red phase - will fail initially)
import { 
    createOrder, 
    getOrder, 
    getUserOrders, 
    updateOrderStatus,
    Order,
    OrderItem 
} from '../orderApi';

// Import Firestore functions that we need to mock
import { setDoc, getDoc, getDocs, updateDoc, doc, collection, query, where, orderBy } from 'firebase/firestore';

/**
 * Mock Firebase configuration
 */
jest.mock('../../config/firebase', () => ({
    db: {}
}));

/**
 * Mock all Firestore functions used by orderApi
 */
jest.mock('firebase/firestore', () => ({
    collection: jest.fn(),
    doc: jest.fn(), 
    setDoc: jest.fn(),
    getDoc: jest.fn(),
    getDocs: jest.fn(),
    updateDoc: jest.fn(),
    query: jest.fn(),
    where: jest.fn(),
    orderBy: jest.fn()
}));

// Create typed mock functions
const mockSetDoc = setDoc as jest.MockedFunction<typeof setDoc>;
const mockGetDoc = getDoc as jest.MockedFunction<typeof getDoc>;
const mockGetDocs = getDocs as jest.MockedFunction<typeof getDocs>;
const mockUpdateDoc = updateDoc as jest.MockedFunction<typeof updateDoc>;
const mockDoc = doc as jest.MockedFunction<typeof doc>;
const mockCollection = collection as jest.MockedFunction<typeof collection>;
const mockQuery = query as jest.MockedFunction<typeof query>;
const mockWhere = where as jest.MockedFunction<typeof where>;
const mockOrderBy = orderBy as jest.MockedFunction<typeof orderBy>;

/**
 * Sample test data for orders
 */
const sampleOrderItems: OrderItem[] = [
    {
        productId: 'prod1',
        name: 'Wireless Headphones',
        price: 99.99,
        quantity: 1
    },
    {
        productId: 'prod2', 
        name: 'Phone Case',
        price: 24.99,
        quantity: 2
    }
];

const sampleOrder: Order = {
    orderId: 'order123',
    userId: 'user123',
    products: sampleOrderItems,
    totalPrice: 149.97,
    status: 'pending',
    createdAt: new Date('2025-11-05T10:30:00Z'),
    shippingAddress: '123 Main St, City, State 12345'
};

/**
 * TDD Test Suite: Order Creation
 * 
 * Red Phase: These tests will fail until we implement createOrder
 */
describe('createOrder - TDD Implementation', () => {
    beforeEach(() => {
        mockSetDoc.mockReset();
        mockDoc.mockReset();
    });

    it('creates a new order successfully', async () => {
        // Arrange
        mockSetDoc.mockResolvedValue(undefined);
        mockDoc.mockReturnValue({} as any);
        
        const orderData = {
            userId: 'user123',
            products: sampleOrderItems,
            shippingAddress: '123 Main St, City, State 12345'
        };
        
        // Act
        const result = await createOrder(orderData);
        
        // Assert
        expect(mockDoc).toHaveBeenCalledWith(expect.anything(), 'orders', expect.any(String));
        expect(mockSetDoc).toHaveBeenCalled();
        expect(result).toMatchObject({
            userId: orderData.userId,
            products: orderData.products,
            shippingAddress: orderData.shippingAddress,
            status: 'pending'
        });
        expect(result.orderId).toBeDefined();
        expect(result.createdAt).toBeInstanceOf(Date);
        expect(result.totalPrice).toBe(149.97); // Calculated total
    });

    it('calculates total price correctly', async () => {
        // Arrange
        mockSetDoc.mockResolvedValue(undefined);
        mockDoc.mockReturnValue({} as any);
        
        const orderData = {
            userId: 'user123',
            products: [
                { productId: 'prod1', name: 'Item 1', price: 10.50, quantity: 3 },
                { productId: 'prod2', name: 'Item 2', price: 25.00, quantity: 2 }
            ],
            shippingAddress: '123 Test St'
        };
        
        // Act
        const result = await createOrder(orderData);
        
        // Assert
        expect(result.totalPrice).toBe(81.50); // (10.50 * 3) + (25.00 * 2)
    });

    it('throws error when order creation fails', async () => {
        // Arrange
        mockSetDoc.mockRejectedValue(new Error('Creation failed'));
        mockDoc.mockReturnValue({} as any);
        
        const orderData = {
            userId: 'user123',
            products: sampleOrderItems,
            shippingAddress: '123 Main St'
        };
        
        // Act & Assert
        await expect(createOrder(orderData)).rejects.toThrow('Creation failed');
    });
});

/**
 * TDD Test Suite: Order Retrieval by ID
 */
describe('getOrder - TDD Implementation', () => {
    beforeEach(() => {
        mockGetDoc.mockReset();
        mockDoc.mockReset();
    });

    it('retrieves an order by ID successfully', async () => {
        // Arrange
        const mockDocSnap = {
            exists: () => true,
            data: () => ({
                ...sampleOrder,
                createdAt: { toDate: () => sampleOrder.createdAt }
            })
        };

        mockGetDoc.mockResolvedValue(mockDocSnap as any);
        mockDoc.mockReturnValue({} as any);
        
        // Act
        const result = await getOrder('order123');
        
        // Assert
        expect(mockDoc).toHaveBeenCalledWith(expect.anything(), 'orders', 'order123');
        expect(mockGetDoc).toHaveBeenCalled();
        expect(result).toEqual(sampleOrder);
    });

    it('returns null when order does not exist', async () => {
        // Arrange
        const mockDocSnap = {
            exists: () => false,
            data: () => undefined
        };

        mockGetDoc.mockResolvedValue(mockDocSnap as any);
        mockDoc.mockReturnValue({} as any);
        
        // Act
        const result = await getOrder('nonexistent');
        
        // Assert
        expect(result).toBeNull();
    });
});

/**
 * TDD Test Suite: User Orders Retrieval
 */
describe('getUserOrders - TDD Implementation', () => {
    beforeEach(() => {
        mockGetDocs.mockReset();
        mockQuery.mockReset();
        mockWhere.mockReset();
        mockOrderBy.mockReset();
        mockCollection.mockReset();
    });

    it('retrieves all orders for a user successfully', async () => {
        // Arrange
        const orders = [
            { ...sampleOrder, orderId: 'order1' },
            { ...sampleOrder, orderId: 'order2', totalPrice: 75.50 }
        ];

        const mockQuerySnapshot = {
            docs: orders.map((order) => ({
                id: order.orderId,
                data: () => ({
                    ...order,
                    createdAt: { toDate: () => order.createdAt }
                })
            }))
        };

        mockGetDocs.mockResolvedValue(mockQuerySnapshot as any);
        mockQuery.mockReturnValue({} as any);
        mockWhere.mockReturnValue({} as any);
        mockOrderBy.mockReturnValue({} as any);
        mockCollection.mockReturnValue({} as any);
        
        // Act
        const result = await getUserOrders('user123');
        
        // Assert
        expect(mockCollection).toHaveBeenCalledWith(expect.anything(), 'orders');
        expect(mockWhere).toHaveBeenCalledWith('userId', '==', 'user123');
        expect(mockOrderBy).toHaveBeenCalledWith('createdAt', 'desc');
        expect(mockGetDocs).toHaveBeenCalled();
        expect(result).toHaveLength(2);
        expect(result[0].orderId).toBe('order1');
        expect(result[1].orderId).toBe('order2');
    });

    it('returns empty array when user has no orders', async () => {
        // Arrange
        const mockQuerySnapshot = { docs: [] };

        mockGetDocs.mockResolvedValue(mockQuerySnapshot as any);
        mockQuery.mockReturnValue({} as any);
        mockWhere.mockReturnValue({} as any);
        mockOrderBy.mockReturnValue({} as any);
        mockCollection.mockReturnValue({} as any);
        
        // Act
        const result = await getUserOrders('userWithNoOrders');
        
        // Assert
        expect(result).toEqual([]);
    });
});

/**
 * TDD Test Suite: Order Status Update
 */
describe('updateOrderStatus - TDD Implementation', () => {
    beforeEach(() => {
        mockUpdateDoc.mockReset();
        mockDoc.mockReset();
    });

    it('updates order status successfully', async () => {
        // Arrange
        mockUpdateDoc.mockResolvedValue(undefined);
        mockDoc.mockReturnValue({} as any);
        
        // Act
        const result = await updateOrderStatus('order123', 'shipped');
        
        // Assert
        expect(mockDoc).toHaveBeenCalledWith(expect.anything(), 'orders', 'order123');
        expect(mockUpdateDoc).toHaveBeenCalledWith({}, { status: 'shipped' });
        expect(result).toBe(true);
    });

    it('throws error when status update fails', async () => {
        // Arrange
        mockUpdateDoc.mockRejectedValue(new Error('Update failed'));
        mockDoc.mockReturnValue({} as any);
        
        // Act & Assert
        await expect(
            updateOrderStatus('order123', 'cancelled')
        ).rejects.toThrow('Update failed');
    });
});