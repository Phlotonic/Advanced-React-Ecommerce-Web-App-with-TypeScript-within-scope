/**
 * Unit Tests for User API Functions
 * 
 * This test suite validates the functionality of user profile management functions
 * that interact with Firestore database.
 * 
 * @fileoverview Unit tests for userApi.ts functions
 * @version 1.0.0
 */

// Import the functions we want to test
import { createUserProfile, getUserProfile, updateUserProfile, deleteUserProfile } from '../userApi';
// Import Firestore functions that we need to mock
import { setDoc, getDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';

/**
 * Mock the Firebase configuration module
 */
jest.mock('../../config/firebase', () => ({
    db: {}
}));

/**
 * Mock all Firestore functions used by our userApi functions
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
    getDoc: jest.fn(),
    updateDoc: jest.fn(),
    deleteDoc: jest.fn(),
    Timestamp: MockTimestamp
  };
});

// Create typed mock functions
const mockSetDoc = setDoc as jest.MockedFunction<typeof setDoc>;
const mockGetDoc = getDoc as jest.MockedFunction<typeof getDoc>;
const mockDoc = doc as jest.MockedFunction<typeof doc>;
const mockUpdateDoc = updateDoc as jest.MockedFunction<typeof updateDoc>;
const mockDeleteDoc = deleteDoc as jest.MockedFunction<typeof deleteDoc>;

describe('createUserProfile', () => {
    it('adds user document to Firestore', async () => {
        // Arrange
        mockSetDoc.mockResolvedValue(undefined);
        mockDoc.mockReturnValue({} as any);
        
        // Act
        await createUserProfile('uid123', 'test@example.com', 'Test User');
        
        // Assert
        expect(mockSetDoc).toHaveBeenCalled();
    });
});

describe('getUserProfile', () => {
    it('reads a user profile by id', async () => {
        // Arrange
        const mockDocSnap = {
            exists: () => true,
            data: () => ({ uid: 'uid123', email: 'test@example.com' })
        };
        
        mockGetDoc.mockResolvedValue(mockDocSnap as any);
        mockDoc.mockReturnValue({} as any);
        
        // Act
        const profile = await getUserProfile('uid123');
        
        // Assert
        expect(profile).toBeDefined();
        expect(mockGetDoc).toHaveBeenCalled();
    });
    
    it('returns null when user profile does not exist', async () => {
        // Arrange
        const mockDocSnap = {
            exists: () => false,
            data: () => undefined
        };
        
        mockGetDoc.mockResolvedValue(mockDocSnap as any);
        mockDoc.mockReturnValue({} as any);
        
        // Act
        const profile = await getUserProfile('nonexistent');
        
        // Assert
        expect(profile).toBeNull();
    });
});

describe('updateUserProfile', () => {
    beforeEach(() => {
        mockUpdateDoc.mockReset();
        mockDoc.mockReset();
    });

    it('updates user profile with partial data', async () => {
        // Arrange
        mockUpdateDoc.mockResolvedValue(undefined);
        mockDoc.mockReturnValue({} as any);
        
        const userId = 'user123';
        const updateData = {
            displayName: 'Jane Doe',
            address: {
                street: '456 Oak Ave',
                city: 'Springfield',
                state: 'IL',
                zipCode: '62701',
                country: 'US'
            }
        };
        
        // Act
        await updateUserProfile(userId, updateData);
        
        // Assert
        expect(mockUpdateDoc).toHaveBeenCalled();
    });

    it('throws error when update fails', async () => {
        // Arrange
        mockUpdateDoc.mockRejectedValue(new Error('Firestore update failed'));
        mockDoc.mockReturnValue({} as any);
        
        // Act & Assert
        await expect(
            updateUserProfile('user123', { displayName: 'Test' })
        ).rejects.toThrow();
    });
});

describe('deleteUserProfile', () => {
    beforeEach(() => {
        mockDeleteDoc.mockReset();
        mockDoc.mockReset();
    });

    it('deletes user profile successfully', async () => {
        // Arrange
        mockDeleteDoc.mockResolvedValue(undefined);
        mockDoc.mockReturnValue({} as any);
        
        // Act
        const result = await deleteUserProfile('user123');
        
        // Assert
        expect(mockDoc).toHaveBeenCalledWith(expect.anything(), 'users', 'user123');
        expect(mockDeleteDoc).toHaveBeenCalled();
    });

    it('throws error when delete fails', async () => {
        // Arrange
        mockDeleteDoc.mockRejectedValue(new Error('Delete operation failed'));
        mockDoc.mockReturnValue({} as any);
        
        // Act & Assert
        await expect(
            deleteUserProfile('user123')
        ).rejects.toThrow();
    });
});