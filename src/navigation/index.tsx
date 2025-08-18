import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducers';
import { AuthNavigator, HomeNavigator } from './StackNavigator';

const MainStack = createNativeStackNavigator();
const Navigation: React.FC = () => {
  const { token } = useSelector((state: RootState) => state?.signInDataReducer);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <MainStack.Navigator screenOptions={{ headerShown: false }}>
        {!token ? (
          <MainStack.Screen name="Auth" component={AuthNavigator} />
        ) : (
          <MainStack.Screen name="Home" component={HomeNavigator} />
        )}
      </MainStack.Navigator>
    </>
  );
};

export default Navigation;
