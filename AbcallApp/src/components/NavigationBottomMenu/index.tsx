import React, { useState } from 'react';
import { View } from 'react-native';
import { BottomNavigation, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { lightTheme } from '@styles/lightTheme';
import { COLORS } from '@styles/colors';
import { global } from '@styles/global';
import { Chat } from '@modules/Chat';
import { Issue } from '@modules/Issue/index';

const HomeRoute = () => (
    <Chat />
);

const ReportsRoute = () => (
    <Text>Reportes</Text>
);

const QAndARoute = () => (
    <Text>Preguntas Frecuentes</Text>
);

const IssuesRoute = () => (
    <Issue />
);



const NavigationBottomMenu = () => {
    const [index, setIndex] = useState(0);
    const styles = global(lightTheme);

    const [routes] = useState([
        { key: 'home', title: 'Inicio', icon: 'home-outline' },
        { key: 'report', title: 'Reportes', icon: 'file-document-outline' },
        { key: 'qanda', title: 'Preguntas', icon: 'file-question-outline' },
        { key: 'issues', title: 'Problemas', icon: 'chat-plus-outline' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        home: HomeRoute,
        report: ReportsRoute,
        qanda: QAndARoute,
        issues: IssuesRoute,
    });

    const renderIcon = ({ route, color }) => (
        <Icon name={route.icon} size={24} color={color} />
    );

    return (
        <View style={styles.container}>
            <BottomNavigation
                navigationState={{ index, routes }}
                onIndexChange={setIndex}
                renderScene={renderScene}
                activeColor={COLORS.PRIMARY_VARIATY}
                inactiveColor={COLORS.PRIMARY}
                renderIcon={renderIcon}
                barStyle={
                    {
                        borderTopWidth: 1,
                        borderTopColor: COLORS.PRIMARY,
                        backgroundColor: lightTheme.colors.background,
                    }
                }
            />
        </View>
    );
};

export { NavigationBottomMenu };
