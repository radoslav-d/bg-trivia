import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from './components/HomeScreen';
import {Quiz} from './components/Quiz';
import {LoseScreen} from './components/LoseScreen';
import {WinScreen} from './components/WinScreen';

const Stack = createStackNavigator();
class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Начало">
          <Stack.Screen name="Начало" component={HomeScreen} />
          <Stack.Screen name="Куиз" component={Quiz} />
          <Stack.Screen
            name="Загуба"
            component={LoseScreen}
            options={{headerLeft: null}}
          />
          <Stack.Screen
            name="Победа"
            component={WinScreen}
            options={{headerLeft: null}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
