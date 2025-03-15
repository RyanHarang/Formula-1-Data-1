import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from '../../src/components/pages/HomePage';

describe('HomePage UI Tests', () => {
    test('renders the HomePage component', () => {
        render(<HomePage />);
        expect(screen.getByText(/Welcome to Formula 1 Data/i)).toBeInTheDocument();
    });

    test('renders the navigation links', () => {
        render(<HomePage />);
        expect(screen.getByRole('link', { name: /Drivers/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Teams/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Races/i })).toBeInTheDocument();
    });
});