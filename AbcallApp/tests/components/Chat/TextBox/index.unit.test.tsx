import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import { TextBox } from '@components/Chat/TextBox';

describe('Unit test suite for TextBox component', () => {
    test('Should render the TextBox component', () => {
        const onSendHandler = jest.fn();
        render(<TextBox onSendHandler={onSendHandler} />);

        const element = screen.getByPlaceholderText('Ingresa tu mensaje...');

        expect(element).toBeTruthy();
    });

    test('Should type information to send to the chat', () => {
        const onSendHandler = jest.fn();
        render(<TextBox onSendHandler={onSendHandler} />);

        const element = screen.getByPlaceholderText('Ingresa tu mensaje...');
        fireEvent.changeText(element, 'Hello, World!');

        expect(element.props.value).toBe('Hello, World!');
    });

    test('Should send a message when press the button', () => {
        const onSendHandler = jest.fn();
        render(<TextBox onSendHandler={onSendHandler} />);

        const element = screen.getByPlaceholderText('Ingresa tu mensaje...');
        const button = screen.getByRole('button');

        fireEvent.changeText(element, 'Hello, World!');
        fireEvent.press(button);

        expect(onSendHandler).toHaveBeenCalledWith('Hello, World!');
        expect(element.props.value).toBe('');
    });
});
