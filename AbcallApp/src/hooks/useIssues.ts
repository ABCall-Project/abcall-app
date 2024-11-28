import {useState, useEffect, useCallback} from 'react';
import {IssuesServices} from '@clients/backendForFrontend/issuesServices';
import {Issue} from '@models/Issue';

type IssuePaginationProps = {
  page: number;
  limit: number;
  hasNext: boolean;
  data: Issue[];
};

const INITIAL_STATE = {
  page: 1,
  limit: 10,
  hasNext: false,
  data: [],
};

const useGetIssuesPaginationByUserId = (
  userId: string,
  newPage: number = 1,
  limit: number = 10,
  token: string,
) => {
  const [issues, setIssues] = useState<IssuePaginationProps>(INITIAL_STATE);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(newPage);

  const fetchIssues = useCallback(async (page = 1) => {
    setIsLoading(true);
    const issuesServices = new IssuesServices();
    // Fetch issues from your API
    const newIssues = await issuesServices.getIssuesPaginationByUserId(userId, page, limit, token);
    setIssues(prevState => ({
      data: page === 1 ? newIssues.data : [...prevState.data, ...newIssues.data],
      page,
      limit: prevState.limit,
      hasNext: newIssues.hasNext,
    }));
    setIsLoading(false);
  }, [userId, limit, token]);

  useEffect(() => {
    const issuesServices = new IssuesServices();
    setIsLoading(true);
    issuesServices
      .getIssuesPaginationByUserId(userId, page, limit, token)
      .then(data => {
        setIssues(data);
      })
      .finally(() => setIsLoading(false));
  }, [userId, page, limit, token]);

  return {
    issues,
    setPage,
    isLoading,
    isRefreshing,
    setIsRefreshing,
    page,
    fetchIssues,
  };
};

export {useGetIssuesPaginationByUserId};
