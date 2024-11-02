import {renderHook, act, waitFor} from '@testing-library/react-native';
import {faker} from '@faker-js/faker';
import {useGetIssuesPaginationByUserId} from '@hooks/useIssues';
import {IssuesServices} from '@clients/backendForFrontend/issuesServices';
import {Issue} from '@models/Issue';
import IssueBuilder from '@tests/builders/IssueBuilder';

jest.mock('@clients/backendForFrontend/issuesServices');

describe('Unit test suite for useIssues custom hook', () => {
  beforeEach(() => {
    (IssuesServices as jest.Mock).mockClear();
  });

  test('Should fetch and set issues correctly', async () => {
    const mockIssues: Issue[] = [
      new IssueBuilder().build(),
      new IssueBuilder()
        .withParam('id', faker.string.uuid())
        .withParam('authUserId', faker.string.uuid())
        .withParam('channelPlanId', faker.string.uuid())
        .build(),
    ];
    (
      IssuesServices.prototype.getIssuesPaginationByUserId as jest.Mock
    ).mockResolvedValue({
      data: mockIssues,
      page: 1,
      limit: 10,
      hasNext: false,
    });

    const {result} = renderHook(() =>
      useGetIssuesPaginationByUserId(mockIssues[0].authUserId, 1, 10),
    );

    expect(result.current.isLoading).toBeTruthy();

    await waitFor(() => {
      expect(result.current.isLoading).toBeFalsy();
    });

    expect(result.current.issues.data).toEqual(mockIssues);
  });

  test('should take params by default to send the request', async () => {
    const mockIssues: Issue[] = [
      new IssueBuilder().build(),
      new IssueBuilder()
        .withParam('id', faker.string.uuid())
        .withParam('authUserId', faker.string.uuid())
        .withParam('channelPlanId', faker.string.uuid())
        .build(),
    ];
    (
      IssuesServices.prototype.getIssuesPaginationByUserId as jest.Mock
    ).mockResolvedValue({
      data: mockIssues,
      page: 1,
      limit: 10,
      hasNext: false,
    });

    const {result} = renderHook(() =>
      useGetIssuesPaginationByUserId(mockIssues[0].authUserId),
    );

    expect(result.current.isLoading).toBeTruthy();

    await waitFor(() => {
      expect(result.current.isLoading).toBeFalsy();
    });

    expect(result.current.issues.data).toEqual(mockIssues);
  });

  test('should update issues when fetchIssues is called', async () => {
    const mockIssues: Issue[] = [
      new IssueBuilder().build(),
      new IssueBuilder()
        .withParam('id', faker.string.uuid())
        .withParam('authUserId', faker.string.uuid())
        .withParam('channelPlanId', faker.string.uuid())
        .build(),
    ];
    const expectedResponse = {
      data: [...mockIssues, ...mockIssues],
      page: 2,
      limit: 10,
      hasNext: false,
    };
    (
      IssuesServices.prototype.getIssuesPaginationByUserId as jest.Mock
    ).mockResolvedValue({
      data: mockIssues,
      page: 1,
      limit: 10,
      hasNext: false,
    });
    const {result} = renderHook(() =>
      useGetIssuesPaginationByUserId(mockIssues[0].authUserId, 1, 10),
    );

    await act(async () => {
      await result.current.fetchIssues(2);
    });

    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.issues).toEqual(expectedResponse);
  });

  test('should update issues when fetchIssues is called with one page by default', async () => {
    const mockIssues: Issue[] = [
      new IssueBuilder().build(),
      new IssueBuilder()
        .withParam('id', faker.string.uuid())
        .withParam('authUserId', faker.string.uuid())
        .withParam('channelPlanId', faker.string.uuid())
        .build(),
    ];
    const expectedResponse = {
      data: [...mockIssues],
      page: 1,
      limit: 10,
      hasNext: false,
    };
    (
      IssuesServices.prototype.getIssuesPaginationByUserId as jest.Mock
    ).mockResolvedValue({
      data: mockIssues,
      page: 1,
      limit: 10,
      hasNext: false,
    });
    const {result} = renderHook(() =>
      useGetIssuesPaginationByUserId(mockIssues[0].authUserId, 1, 10),
    );

    await act(async () => {
      await result.current.fetchIssues();
    });

    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.issues).toEqual(expectedResponse);
  });
});
