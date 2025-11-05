/**
 * Jest Setup Configuration for React E-commerce App
 * 
 * This file configures the testing environment with necessary polyfills
 * and global objects for running tests in Node.js environment.
 */

// Import Jest DOM matchers for better assertions
import '@testing-library/jest-dom';

// Polyfill TextEncoder/TextDecoder for Node.js environment
import { TextEncoder, TextDecoder } from 'util';

if (!(global as any).TextEncoder) {
    (global as any).TextEncoder = TextEncoder;
}
if (!(global as any).TextDecoder) {
    (global as any).TextDecoder = TextDecoder;
}

// Mock fetch for Firebase and other API calls
if (!(global as any).fetch) {
    (global as any).fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve({}),
            ok: true,
            status: 200,
        })
    );
}

// Mock console methods to reduce test noise
global.console = {
    ...console,
    log: jest.fn(), // Silent console.log in tests
    warn: jest.fn(), // Silent console.warn in tests
    error: jest.fn(), // Keep console.error for debugging
};