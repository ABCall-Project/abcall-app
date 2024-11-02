import {faker} from '@faker-js/faker';

describe('Unit test suite for IssueServices', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });
  test('Should call the fetch function with the correct patch', () => {
    const fetchMock = jest.fn();
    fetchMock.mockReturnValue(Promise.resolve({json: jest.fn()}));
    const user_id = faker.string.uuid();
    global.fetch = fetchMock;
    const expectedPatch = `http://localhost:5002/issues/find?user_id=${user_id}&page=1&limit=10`;
    const module = require('@clients/backendForFrontend/issuesServices');
    const issueServices = new module.IssuesServices();

    issueServices.getIssuesPaginationByUserId(user_id, 1, 10);

    expect(fetchMock).toHaveBeenCalledWith(expectedPatch);
  });
});
