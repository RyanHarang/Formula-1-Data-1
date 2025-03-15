import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

/* eslint-env jest */
import TeamsPage from '../../src/components/pages/TeamsPage';

describe('TeamsPage UI Tests', () => {
    test('renders the TeamsPage component', () => {
        render(<TeamsPage />);
        expect(screen.getByText(/Teams/i)).toBeInTheDocument();
    });

    test('renders the team list', () => {
        render(<TeamsPage />);
        expect(screen.getByTestId('team-list')).toBeInTheDocument();
    });

    test('renders a button to view team details', () => {
        render(<TeamsPage />);
        const buttons = screen.getAllByRole('button', { name: /View Details/i });
        expect(buttons.length).toBeGreaterThan(0);
    });

    test('renders a search bar for teams', () => {
        render(<TeamsPage />);
        expect(screen.getByPlaceholderText(/Search teams/i)).toBeInTheDocument();
    });

    test('renders a loading spinner when data is loading', () => {
        render(<TeamsPage isLoading={true} />);
        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    });

    test('displays an error message if data fails to load', () => {
        render(<TeamsPage error="Failed to load teams" />);
        expect(screen.getByText(/Failed to load teams/i)).toBeInTheDocument();
    });
});
