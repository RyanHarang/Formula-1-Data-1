import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DriversPage from '../../src/components/pages/DriversPage';

describe('DriversPage UI Tests', () => {
    test('renders the DriversPage component', () => {
        render(<DriversPage />);
        expect(screen.getByText(/Drivers/i)).toBeInTheDocument();
    });

    test('renders the driver list', () => {
        render(<DriversPage />);
        expect(screen.getByTestId('driver-list')).toBeInTheDocument();
    });

    test('renders a search bar for drivers', () => {
        render(<DriversPage />);
        expect(screen.getByPlaceholderText(/Search drivers/i)).toBeInTheDocument();
    });

    test('renders a loading spinner when data is loading', () => {
        render(<DriversPage isLoading={true} />);
        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    });

    test('displays an error message if data fails to load', () => {
        render(<DriversPage error="Failed to load drivers" />);
        expect(screen.getByText(/Failed to load drivers/i)).toBeInTheDocument();
    });
});