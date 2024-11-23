import React, {useState} from 'react';
import {View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {BottomNavigation, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {lightTheme} from '@styles/lightTheme';
import {COLORS} from '@styles/colors';
import {global} from '@styles/global';
import {Chat} from '@modules/Chat';
import {Issues} from '@modules/Issues';
import {Issue} from '@modules/Issue';

const Stack = createNativeStackNavigator();

const HomeRoute = () => <Chat />;

const ReportsRoute = () => <Text>Reportes</Text>;

const QAndARoute = () => <Text>Preguntas Frecuentes</Text>;

const IssuesRoute = () => <Issues />;

const IssueScreen = () => <Issue />;

const IssueStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Issues" component={IssuesRoute} options={{ headerShown: false }} />
    <Stack.Screen name="Issue" component={IssueScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const NavigationBottomMenu = () => {
  const [index, setIndex] = useState(0);
  const styles = global(lightTheme);

  const [routes] = useState([
    {key: 'home', title: 'Inicio', icon: 'home-outline'},
    {key: 'report', title: 'Reportes', icon: 'file-document-outline'},
    {key: 'qanda', title: 'Preguntas', icon: 'file-question-outline'},
    {key: 'issues', title: 'Problemas', icon: 'chat-plus-outline'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    report: ReportsRoute,
    qanda: QAndARoute,
    issues: IssueStack,
  });

  const renderIcon = ({route, color}) => (
    <Icon name={route.icon} size={24} color={color} />
  );

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <BottomNavigation
          navigationState={{index, routes}}
          onIndexChange={setIndex}
          renderScene={renderScene}
          activeColor={COLORS.PRIMARY_VARIATY}
          inactiveColor={COLORS.PRIMARY}
          renderIcon={renderIcon}
          barStyle={{
            borderTopWidth: 1,
            borderTopColor: COLORS.PRIMARY,
            backgroundColor: lightTheme.colors.background,
          }}
        />
      </NavigationContainer>
    </View>
  );
};

export {NavigationBottomMenu};
