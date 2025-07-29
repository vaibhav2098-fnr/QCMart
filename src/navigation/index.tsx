import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { AuthNavigator, HomeNavigator } from './StackNavigator';
import { NavigationContainer } from '@react-navigation/native';

const MainStack = createNativeStackNavigator();
const Navigation: React.FC = () => {
  // const { token } = useSelector((state: RootState) => state?.loginDataReducer);
  const token = true

  return (
    <NavigationContainer>
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
