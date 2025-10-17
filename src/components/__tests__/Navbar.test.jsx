import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../Navbar';

test('відмічає активний лінк', () => {
    render(
        <MemoryRouter initialEntries={['/stock']}>
            <Navbar />
        </MemoryRouter>
    );

    const stockLink = screen.getByText('Stock');
    expect(stockLink).toBeInTheDocument();
});