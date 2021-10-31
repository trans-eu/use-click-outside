/**
 * @jest-environment jsdom
 */

import { getByTestId, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { TestExample } from './TestExample';

test("should trigger callback if user clicks outside of the element with the properties returned from the hook",
    async () => {
        const hookCallback = jest.fn();
        const { container } = render(<TestExample onClickOutside={hookCallback} />);
        const elementWithoutHook = getByTestId(container, 'without hook ref');
        userEvent.click(elementWithoutHook);
        await waitFor(() => expect(hookCallback).toHaveBeenCalled());
    });

test("should not trigger callback if user clicks the element with the properties returned from the hook",
    async () => {
        const hookCallback = jest.fn();
        const { container } = render(<TestExample onClickOutside={hookCallback} />);
        const elementWithHook = getByTestId(container, 'with hook ref');
        userEvent.click(elementWithHook);
        await new Promise((resolve) => setTimeout(resolve, 0));
        expect(hookCallback).not.toHaveBeenCalled();
    });