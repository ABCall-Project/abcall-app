import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import {IssueCard} from '@components/Issues/IssueCard';
import {Issue} from '@models/Issue';
import { global } from '@styles/global';
import { lightTheme } from '@styles/lightTheme';

const styles = global(lightTheme);

type IssueListProps = {
  list: Issue[];
};

const renderList = (list: Issue[]) =>
  list.map(item => (
    <IssueCard
      key={item.id}
      title={item.subject}
      description={item.description}
      status={item.status}
    />
  ));

const IssueList = ({ list }: IssueListProps) => {

  return (
    <ScrollView style={issueListStyles.containerPages}>
        {renderList(list)}
    </ScrollView>
  );
};

const issueListStyles = StyleSheet.create({
  containerPages: {
    ...styles.containerPages,
    paddingLeft: 10,
    paddingRight: 10,
  }
});

export {IssueList};
