/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';
import { View, TouchableOpacity, StyleSheet,Text } from 'react-native';

const Tabs = () => {
  const [isEmpresaSelected, setIsEmpresaSelected] = useState(true);
  return (
    <View style={styles.tabs}>
    <TouchableOpacity
        style={[styles.tab, isEmpresaSelected && styles.activeTab]}
        onPress={() => setIsEmpresaSelected(true)}>
        <Text style={[styles.tabText, isEmpresaSelected && styles.activeTabText]}>Empresas</Text>
    </TouchableOpacity>
    <TouchableOpacity
        style={[styles.tab, !isEmpresaSelected && styles.activeTab]}
        onPress={() => setIsEmpresaSelected(false)}>
        <Text style={[styles.tabText, !isEmpresaSelected && styles.activeTabText]}>Internos</Text>
    </TouchableOpacity>
</View>
  );
};

const styles = StyleSheet.create({
    tabs: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    tab: {
        padding: 10,
        marginHorizontal: 10,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    activeTab: {
        borderBottomColor: '#8FEEF6',
        borderBottomWidth: 4,
        paddingBottom: 1,
    },
    tabText: {
        fontSize: 16,
        color: '#767676',
        fontWeight:'bold',
    },
    activeTabText: {
        fontSize: 16,
        color: '#000',
        fontWeight:'bold',
    },
});

export { Tabs };
