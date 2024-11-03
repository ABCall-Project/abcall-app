import {Issue} from '@models/Issue';
import {Status} from '@utils/constants/Status';

describe('Unit test suite Issue model', () => {
  it('Should create an Issue instance', () => {
    const issue = new Issue(
      'e8b8a5d2-0f71-4e4d-b6e3-9c9d64f9cdda',
      'e8b8a5d2-0f71-4e4d-b6e3-9c9d64f9cdda',
      Status.CREATED,
      'Test subject',
      'Test description',
      '2021-01-01T00:00:00Z',
      '2021-01-01T00:00:00Z',
      'e8b8a5d2-0f71-4e4d-b6e3-9c9d64f9cdda',
    );
    expect(issue).toBeInstanceOf(Issue);
  });
});
