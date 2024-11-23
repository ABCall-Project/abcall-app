import React from 'react';
import {render, screen} from '@testing-library/react-native';
import { Messages } from '@components/Chat/Messages';
import { Bubble } from '@components/Chat/Messages/Message';
import BubbleBuilder from '@tests/builders/BubbleBuilder';

describe('Unit test suite for Messages component', () => {
    test('Should render the Messages component', () => {
        const bubbles: Bubble[] = [new BubbleBuilder().build()];

        render(<Messages messages={bubbles} />);
        const element = screen.getByText(bubbles[0].message);

        expect(element).toBeTruthy();
    });

    test('Should render the Messages component from with a request', () => {
        const bubbles: Bubble[] = [new BubbleBuilder()
                .withParam('request', true)
                .withParam('response', false)
                .build()];

        render(<Messages messages={bubbles} />);
        const element = screen.getByText(bubbles[0].message);

        expect(element).toBeTruthy();
    });

    test('Should without any element when it is not set', () => {
        render(<Messages />);
        const element = screen.queryByText(/message/i);

        expect(element).toBeNull();
    });
});
