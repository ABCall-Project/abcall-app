import { generateGuid } from '@utils/uuid';

describe('Unit test suite for UUID', () => {
  test('Should return a string with a length of 36 characters', () => {
    const uuid = generateGuid();
    expect(uuid.length).toBe(36);
  });
});
