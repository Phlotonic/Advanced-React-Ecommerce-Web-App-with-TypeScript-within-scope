/**
 * Unit Tests for User API Functions
 * 
 * This test suite validates the functionality of user profile management functions
 * that interact with Firestore database. It uses Jest mocking to isolate the
 * functions under test from external Firebase dependencies.
 * 
 * @fileoverview Unit tests for userApi.ts functions
 * @author Your Team
 * @version 1.0.0
 */

// Import the functions we want to test
import { createUserProfile, getUserProfile, updateUserProfile, deleteUserProfile } from '../userApi';
// Import Firestore functions that we need to mock
import { setDoc, getDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';

/**
 * Mock the Firebase configuration module
 * This prevents actual Firebase initialization during tests and provides a controlled environment
 */
jest.mock('../../config/firebase', () => ({
    // Mock the database instance as an empty object since we're mocking Firestore functions separately
    db: {}
}));

/**
 * Mock all Firestore functions used by our userApi functions
 * This allows us to control their behavior and verify they're called correctly
 */
jest.mock('firebase/firestore', () => ({
    collection: jest.fn(),  // Mock collection reference creation
    doc: jest.fn(),         // Mock document reference creation
    setDoc: jest.fn(),      // Mock document write operations
    getDoc: jest.fn(),      // Mock document read operations
    updateDoc: jest.fn(),   // Mock document update operations
    deleteDoc: jest.fn()    // Mock document delete operations
}));

// Create typed mock functions for better TypeScript support and IntelliSense
const mockSetDoc = setDoc as jest.MockedFunction<typeof setDoc>;
const mockGetDoc = getDoc as jest.MockedFunction<typeof getDoc>;
const mockDoc = doc as jest.MockedFunction<typeof doc>;
const mockUpdateDoc = updateDoc as jest.MockedFunction<typeof updateDoc>;
const mockDeleteDoc = deleteDoc as jest.MockedFunction<typeof deleteDoc>;

/**
 * Test Suite: createUserProfile Function
 * 
 * Tests the user profile creation functionality to ensure it properly
 * interacts with Firestore and returns expected results
 */
describe('createUserProfile', () => {
    /**
     * Test Case: Successfully creates a user profile document
     * 
     * Verifies that the function:
     * 1. Calls Firestore functions with correct parameters
     * 2. Returns the expected user profile data
     * 3. Handles the async operation correctly
     */
    it('adds user document to Firestore', async () => {
        // Arrange: Set up mock function behaviors
        mockSetDoc.mockResolvedValue(undefined); // setDoc returns undefined on success
        mockDoc.mockReturnValue({} as any);      // doc returns a DocumentReference (mocked as empty object)
        
        // Act: Call the function under test with sample data
        const result = await createUserProfile('uid123', 'test@example.com', 'Abe', 'OK');
        
        // Assert: Verify the function returns correct data structure
        expect(result).toEqual({
            id: 'uid123',
            email: 'test@example.com',
            name: 'Abe',
            address: 'OK'
        });
        
        // Assert: Verify that Firestore setDoc was called (indicating write operation occurred)
        expect(mockSetDoc).toHaveBeenCalled();
    });
});

/**
 * Test Suite: getUserProfile Function
 * 
 * Tests the user profile retrieval functionality to ensure it properly
 * fetches data from Firestore and handles different scenarios
 */
describe('getUserProfile', () => {
    /**
     * Test Case: Successfully retrieves an existing user profile
     * 
     * Verifies that the function:
     * 1. Calls Firestore functions to fetch document
     * 2. Returns the correct user data when document exists
     * 3. Handles the async operation and document snapshot correctly
     */
    it('reads a user profile by id', async () => {
        // Arrange: Create mock document snapshot that simulates an existing document
        const mockDocSnap = {
            exists: () => true,                           // Document exists in Firestore
            data: () => ({ id: 'uid123', name: 'Abe' })   // Mock document data
        };
        
        // Set up mock function behaviors
        mockGetDoc.mockResolvedValue(mockDocSnap as any); // getDoc returns our mock document snapshot
        mockDoc.mockReturnValue({} as any);               // doc returns a DocumentReference (mocked)
        
        // Act: Call the function under test with a user ID
        const profile = await getUserProfile('uid123');
        
        // Assert: Verify the function returns the expected user data
        expect(profile).toEqual({ id: 'uid123', name: 'Abe' });
        
        // Assert: Verify that Firestore getDoc was called (indicating read operation occurred)
        expect(mockGetDoc).toHaveBeenCalled();
    });
    
    /**
     * Test Case: Handles non-existent user profile gracefully
     * 
     * Verifies that the function returns null when a user profile doesn't exist
     * instead of throwing an error or returning undefined
     */
    it('returns null when user profile does not exist', async () => {
        // Arrange: Create mock document snapshot that simulates a non-existent document
        const mockDocSnap = {
            exists: () => false,    // Document does not exist in Firestore
            data: () => undefined   // No data available
        };
        
        // Set up mock function behaviors for non-existent document
        mockGetDoc.mockResolvedValue(mockDocSnap as any);
        mockDoc.mockReturnValue({} as any);
        
        // Act: Attempt to retrieve non-existent user profile
        const profile = await getUserProfile('nonexistent');
        
        // Assert: Verify the function returns null for non-existent users
        expect(profile).toBeNull();
        
        // Assert: Verify that Firestore getDoc was still called
        expect(mockGetDoc).toHaveBeenCalled();
    });
});

/**
 * TDD Test Suite: User Profile Update Functionality
 * 
 * These tests were written first (Red phase) to define the expected behavior
 * for updating user profiles in Firestore. The implementation has now been written
 * to make these tests pass (Green phase).
 */
describe('updateUserProfile', () => {
    beforeEach(() => {
        // Reset all mocks before each test
        mockUpdateDoc.mockReset();
        mockDoc.mockReset();
    });

    /**
     * Test Case: Successfully updates user profile with partial data
     * 
     * Verifies that the function can update specific fields of a user profile
     * without affecting other fields (partial update functionality).
     */
    it('updates user profile with partial data', async () => {
        // Arrange: Set up mock behaviors
        mockUpdateDoc.mockResolvedValue(undefined);
        mockDoc.mockReturnValue({} as any);
        
        // Prepare test data for partial update
        const userId = 'user123';
        const updateData = { name: 'John Updated', address: '456 New Street' };
        
        // Act: Call the updateUserProfile function
        const result = await updateUserProfile(userId, updateData);
        
        // Assert: Verify the function calls Firestore correctly and returns expected data
        expect(mockDoc).toHaveBeenCalledWith(expect.anything(), 'users', userId);
        expect(mockUpdateDoc).toHaveBeenCalledWith({}, updateData);
        expect(result).toEqual(updateData);
    });

    /**
     * Test Case: Handles update errors gracefully
     * 
     * Verifies that the function properly handles and throws errors when
     * Firestore update operations fail.
     */
    it('throws error when update fails', async () => {
        // Arrange: Set up failure scenario
        mockUpdateDoc.mockRejectedValue(new Error('Firestore update failed'));
        mockDoc.mockReturnValue({} as any);
        
        // Act & Assert: Verify error is properly thrown
        await expect(
            updateUserProfile('user123', { name: 'Test' })
        ).rejects.toThrow('Firestore update failed');
    });
});

/**
 * TDD Test Suite: User Profile Delete Functionality
 * 
 * These tests were written first (Red phase) to define the expected behavior
 * for deleting user profiles from Firestore. The implementation has now been
 * written to make these tests pass (Green phase).
 */
describe('deleteUserProfile', () => {
    beforeEach(() => {
        // Reset mocks before each test
        mockDeleteDoc.mockReset();
        mockDoc.mockReset();
    });

    /**
     * Test Case: Successfully deletes user profile
     * 
     * Verifies that the function properly removes a user document
     * from Firestore and confirms the operation.
     */
    it('deletes user profile successfully', async () => {
        // Arrange: Set up mock behaviors
        mockDeleteDoc.mockResolvedValue(undefined);
        mockDoc.mockReturnValue({} as any);
        
        // Act: Call the deleteUserProfile function
        const result = await deleteUserProfile('user123');
        
        // Assert: Verify proper Firestore calls and return value
        expect(mockDoc).toHaveBeenCalledWith(expect.anything(), 'users', 'user123');
        expect(mockDeleteDoc).toHaveBeenCalledWith({});
        expect(result).toBe(true); // Expect confirmation of successful deletion
    });

    /**
     * Test Case: Handles delete errors gracefully
     * 
     * Verifies that delete failures are properly caught and handled.
     */
    it('throws error when delete fails', async () => {
        // Arrange: Set up failure scenario
        mockDeleteDoc.mockRejectedValue(new Error('Delete operation failed'));
        mockDoc.mockReturnValue({} as any);
        
        // Act & Assert: Verify error handling
        await expect(
            deleteUserProfile('user123')
        ).rejects.toThrow('Delete operation failed');
    });
});