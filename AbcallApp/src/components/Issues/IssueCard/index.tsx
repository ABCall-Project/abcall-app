import React from 'react';
import {StyleSheet, Image, View} from 'react-native';
import {Text, Card} from 'react-native-paper';
import {Status, STATUS_VALUE, STATUS_COLOR} from '@utils/constants/Status';
import {COLORS} from '@styles/colors';

type IssueCardProps = {
  title: string;
  description: string;
  status: Status;
};

const IssueCard = ({title, description, status}: IssueCardProps) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.cardContainer}>
          <View>
            <Image source={require('@assets/issuepurple.png')} />
          </View>
          <View>
            <Text variant="titleLarge" style={styles.title}>{title}</Text>
            <Text variant="bodyMedium" style={styles.description}>{description}</Text>
            <Text style={{color: STATUS_COLOR[status]}}>{STATUS_VALUE[status]}</Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  title: {
    color: COLORS.PRIMARY,
  },
  description: {
    color: COLORS.BLACK
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  card: {
    backgroundColor: COLORS.WHITE,
    marginBottom: 10,
  },
});

export {IssueCard};
