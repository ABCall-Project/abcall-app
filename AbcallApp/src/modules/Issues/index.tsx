import React, {useCallback} from 'react';
import {View, StyleSheet, FlatList, RefreshControl} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {HeaderTitle} from '@components/HeaderTitle';
import {SecondaryHeader} from '@components/Issues/SecondaryHeader';
import {useGetIssuesPaginationByUserId} from '@hooks/useIssues';
import {COLORS} from '@styles/colors';
import {IssueCard} from '@components/Issues/IssueCard';

const Issues = () => {
  const {
    issues,
    setPage,
    setIsRefreshing,
    isRefreshing,
    fetchIssues,
    isLoading,
    page,
  } = useGetIssuesPaginationByUserId(
    'f7d0b546-94cb-468f-acf9-a3f287ba1b77',
    1,
    10,
  );

  const onRefresh = useCallback(() => {
    const nextPage = page + 1;
    setIsRefreshing(true);
    setPage(nextPage);
    fetchIssues(nextPage).then(() => setIsRefreshing(false));
  }, [fetchIssues, setIsRefreshing, page, setPage]);

  const onEndReached = useCallback(() => {
    if (!isLoading) {
      fetchIssues(issues.page + 1);
    }
  }, [isLoading, issues.page, fetchIssues]);
  return (
    <>
      <HeaderTitle
        imagePath={require('@assets/issue.png')}
        title="Incidentes"
      />
      <SecondaryHeader />
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="large"
            animating={true}
            color={COLORS.PRIMARY_VARIATY}
          />
        </View>
      ) : (
        <FlatList
          data={issues.data}
          renderItem={({item}) => (
            <IssueCard
              title={item.subject}
              description={item.description}
              status={item.status}
            />
          )}
          keyExtractor={item => item.id}
          refreshControl={
            <RefreshControl  refreshing={isRefreshing} onRefresh={onRefresh} />
          }
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={isLoading ? <ActivityIndicator size="large" color={COLORS.PRIMARY_VARIATY} /> : null}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});

export {Issues};
