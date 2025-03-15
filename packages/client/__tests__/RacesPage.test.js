import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RacesPage from '../../src/components/pages/RacesPage';

describe('RacesPage UI Tests', () => {
    test('renders the RacesPage component', () => {
        render(<RacesPage />);
        expect(screen.getByText(/Races/i)).toBeInTheDocument();
    });

    test('renders the race list', () => {
        render(<RacesPage />);
        expect(screen.getByTestId('race-list')).toBeInTheDocument();
    });

    test('renders a button to view race details', () => {
        render(<RacesPage />);
        const buttons = screen.getAllByRole('button', { name: /View Details/i });
        expect(buttons.length).toBeGreaterThan(0);
    });

    test('renders a search bar for races', () => {
        render(<RacesPage />);
        expect(screen.getByPlaceholderText(/Search races/i)).toBeInTheDocument();
    });

    test('renders a loading spinner when data is loading', () => {
        render(<RacesPage isLoading={true} />);
        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    });

    test('displays an error message if data fails to load', () => {
        render(<RacesPage error="Failed to load races" />);
        expect(screen.getByText(/Failed to load races/i)).toBeInTheDocument();
    });
});