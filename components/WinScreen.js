import * as React from 'react';
import {Button, Text, View, StyleSheet, Image} from 'react-native';

const icon = require('../assets/win.png');

export class WinScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={icon} />
        <Text style={styles.text}>
          Ти отговори правилно на всички въпроси и спечели този куиз! Честито!
          Предизвикай себе си и пробвай друга тема.
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
    backgroundColor: 'green',
    height: 820,
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
