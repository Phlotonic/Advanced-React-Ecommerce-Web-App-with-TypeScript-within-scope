import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EditProfile from '../EditProfile';
import { AuthContext } from '../../../context/AuthContext';

// Mock the userApi functions we'll need
jest.mock('../../../utils/userApi', () => ({
    getUserProfile: jest.fn(),
    updateUserProfile: jest.fn(),
}));

const mockUser = {
    uid: 'test-uid',
    email: 'test@example.com'
};

const MockAuthProvider = ({ children }) => (
    <AuthContext.Provider value={{
        user: mockUser,
        login: jest.fn(),
        logout: jest.fn(),
        register: jest.fn()
    }}>
        {children}
    </AuthContext.Provider>
);

describe('EditProfile Component', () => {
    it('renders form fields for name and address', () => {
        render(
            <MockAuthProvider>
                <EditProfile />
            </MockAuthProvider>
        );

        expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/address/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
    });
});

it('loads and displays existing user profile data', async () => {
    const { getUserProfile } = require('../../../utils/userApi');
    getUserProfile.mockResolvedValue({
        id: 'test-uid',
        name: 'John Doe',
        address: '123 Main St'
    });

    render(
        <MockAuthProvider>
            <EditProfile />
        </MockAuthProvider>
    );

    await waitFor(() => {
        expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
        expect(screen.getByDisplayValue('123 Main St')).toBeInTheDocument();
    });

    expect(getUserProfile).toHaveBeenCalledWith('test-uid');
});

jest.mock('../../utils/userApi', () => ({
    updateUserProfile: jest.fn(async (id, data) => ({ ...data, id })),
}));

test('updates profile in Firestore', async () => {
    render(<EditProfile />);
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Lincoln' } });
    fireEvent.click(screen.getByText(/save/i));
    // You'd check that updateUserProfile was called with correct args
});

