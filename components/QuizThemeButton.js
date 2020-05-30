import * as React from 'react';
import {Button, View, StyleSheet} from 'react-native';

export default class QuizThemeButton extends React.Component {
  render() {
    return (
      <View style={styles.button}>
        <Button
          title={this.props.theme}
          color="white"
          onPress={() => this.props.onSelect()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    borderColor: 'white',
    borderWidth: 2,
    padding: 5,
    margin: 15,
  },
});
