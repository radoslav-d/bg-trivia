import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import QuizThemeButton from './QuizThemeButton';
import Constants from 'expo-constants';
import RestClient from '../services/RestClient';

export class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quizes: [],
    };
    new RestClient().getQuizes().then(quizes => {
      this.setState({quizes: quizes});
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Българска тривия</Text>
        <Text style={styles.paragraph}>
          Избери темата, в която да предизвикаш своите знания и да се състезаваш
        </Text>
        <View style={styles.buttonContainer}>
          {this.state.quizes.map(quiz => (
            <QuizThemeButton
              key={this.state.quizes.indexOf(quiz)}
              theme={quiz.theme}
              style={styles.button}
              onSelect={() =>
                this.props.navigation.navigate('Куиз', {quiz: quiz})
              }
            />
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    margin: 24,
    marginTop: 80,
    marginBottom: 115,
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'green',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'white',
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
    backgroundColor: '#adff96',
    height: 270,
    marginTop: 10,
    padding: 80,
    paddingTop: 100,
  },
  button: {
    margin: 20,
  },
  buttonContainer: {
    backgroundColor: '#ff5252',
    padding: 25,
  },
});
