import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignupPage from '../../src/components/pages/SignupPage';

describe('SignupPage UI Tests', () => {
    test('renders the SignupPage component', () => {
        render(<SignupPage />);
        expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
    });

    test('renders the email, password, and confirm password input fields', () => {
        render(<SignupPage />);
        expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Confirm Password/i)).toBeInTheDocument();
    });

    test('renders the sign-up button', () => {
        render(<SignupPage />);
        expect(screen.getByRole('button', { name: /Sign Up/i })).toBeInTheDocument();
    });

    test('calls the sign-up function when the form is submitted', () => {
        const mockSignup = jest.fn();
        render(<SignupPage onSignup={mockSignup} />);
        fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'password123' } });
        fireEvent.change(screen.getByPlaceholderText(/Confirm Password/i), { target: { value: 'password123' } });
        fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));
        expect(mockSignup).toHaveBeenCalledWith('test@example.com', 'password123', 'password123');
    });

    test('displays an error message if sign-up fails', () => {
        render(<SignupPage error="Email already exists" />);
        expect(screen.getByText(/Email already exists/i)).toBeInTheDocument();
    });
});