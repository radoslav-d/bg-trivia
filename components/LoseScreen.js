import * as React from 'react';
import {Button, Text, View, StyleSheet, Image} from 'react-native';

const icon = require('../assets/lose.png');

export class LoseScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={icon} />
        <Text style={styles.text}>
          Този път не успя да пребориш всички въпроси! Пробвай се пак!
        </Text>
        <Button
          title="Започни отначало"
          color="white"
          onPress={() => this.props.navigation.navigate('Начало')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 820,
    backgroundColor: '#ff5252',
  },
  text: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 24,
    margin: 40,
    color: 'white',
  },
  image: {
    width: 150,
    height: 150,
    margin: 130,
  },
});
