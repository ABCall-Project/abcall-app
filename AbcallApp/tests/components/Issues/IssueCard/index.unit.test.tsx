import React from 'react';
import {render, screen} from '@testing-library/react-native';
import { IssueCard } from '@components/Issues/IssueCard';
import {faker} from '@faker-js/faker';
import { Status } from '@utils/constants/Status';

describe('Unit test suite for IssueCard component', () => {
    test('Should render the IssueCard component', () => {
        const description = faker.lorem.sentence();

        render(<IssueCard title="Title" description={description} status={Status.CREATED} />);
        
        const element = screen.getByText(/Title/i);

        expect(element).toBeTruthy();
    });
});
