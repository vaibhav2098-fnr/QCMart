import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { AuthNavigator, HomeNavigator } from './StackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducers';

const MainStack = createNativeStackNavigator();
const Navigation: React.FC = () => {
  const { token } = useSelector((state: RootState) => state?.signInDataReducer);

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <MainStack.Navigator screenOptions={{ headerShown: false }}>
        {!token ? (
          <MainStack.Screen name="Auth" component={AuthNavigator} />
        ) : (
          <MainStack.Screen name="Home" component={HomeNavigator} />
        )}
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
