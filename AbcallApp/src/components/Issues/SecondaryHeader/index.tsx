import React from 'react';
import {Text, IconButton} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {COLORS} from '@styles/colors';
import Config from 'react-native-config'

const SecondaryHeader = () => {
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.headerContainer}>
        <Text style={styles.text}>
          Te presentamos el estado actual de los incidentes reportados por ti
        </Text>
        <View style={styles.sectionContainer}>
          <Text style={styles.text}>Reportar nuevo incidente</Text>
          <IconButton
            style={styles.icon}
            icon="plus-circle-outline"
            size={42}
            iconColor={COLORS.PRIMARY_VARIATY}
            onPress={() => navigation.navigate('Issue')}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 10,
  },
  text: {
    color: COLORS.PRIMARY,
    fontSize: 18,
  },
  icon: {
    textAlignVertical: 'center',
  },
  sectionContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  }
});

export {SecondaryHeader};
