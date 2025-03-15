import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginPage from '../../src/components/pages/LoginPage';

describe('LoginPage UI Tests', () => {
    test('renders the LoginPage component', () => {
        render(<LoginPage />);
        expect(screen.getByText(/Login/i)).toBeInTheDocument();
    });

    test('renders the email and password input fields', () => {
        render(<LoginPage />);
        expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    });

    test('renders the login button', () => {
        render(<LoginPage />);
        expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
    });

    test('calls the login function when the form is submitted', () => {
        const mockLogin = jest.fn();
        render(<LoginPage onLogin={mockLogin} />);
        fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'password123' } });
        fireEvent.click(screen.getByRole('button', { name: /Login/i }));
        expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
    });

    test('displays an error message if login fails', () => {
        render(<LoginPage error="Invalid credentials" />);
        expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
    });
});