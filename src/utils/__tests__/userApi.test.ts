import { createUserProfile } from '../userApi';
import { firestore } from '../../components/firebaseConfig';

jest.mock('../../components/firebaseConfig', () => ({
    firestore: {
        collection: jest.fn(() => ({
            doc: jest.fn(() => ({
                set: jest.fn(async (data) => data)
            }))
        }))
    }
}));

describe('createUserProfile', () => {
    it('adds user document to Firestore', async () => {
        const result = await createUserProfile('uid123', 'test@example.com', 'Abe', 'OK');
        expect(result).toEqual({
            id: 'uid123',
            email: 'test@example.com',
            name: 'Abe',
            address: 'OK'
        });
    });
});

it('reads a user profile by id', async () => {
    // Mock Firestore get
    firestore.collection = jest.fn(() => ({
        doc: jest.fn(() => ({
            get: jest.fn(async () => ({ exists: true, data: () => ({ id: 'uid123', name: 'Abe' }) }))
        }))
    }));
    const profile = await getUserProfile('uid123');
    expect(profile).toEqual({ id: 'uid123', name: 'Abe' });
});