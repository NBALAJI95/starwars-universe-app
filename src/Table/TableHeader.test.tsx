import React from 'react';
import { render, screen } from '@testing-library/react';
import TableHeader from './TableHeader';
import {cols} from '../App';

describe('Table Header Testing', () => {
    test('renders thead', () => {
        render(<TableHeader columns={cols} />);
        expect(screen.getByTestId('characters-table-head')).toBeVisible();
    });

    test('renders tr for table headers', () => {
        render(<TableHeader columns={cols} />);
        expect(screen.getByTestId('characters-table-header-row')).toBeVisible();
    });

    test('renders all given columns', () => {
        render(<TableHeader columns={cols} />);
        const list = screen.getAllByTestId('characters-table-column');
        expect(cols.length).toBe(list.length)
    });
});

