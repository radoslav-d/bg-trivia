import * as React from 'react';
import {Button, Text, View, StyleSheet} from 'react-native';
import NotificationService from '../services/NotificationService';

const RIGHT_ANSWERS_TO_WIN = 15;
const NEXT_BUTTON_LABEL = 'Продължи';

export class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.notificationService = new NotificationService();
    const quiz = this.props.route.params.quiz;
    this.state = {
      currentQuestionIndex: 0,
      totalQuestions: quiz.questions.length,
      quiz: quiz,
    };
  }

  onSelectedAnswer = selectedAnswer => {
    if (this.state.selectedAnswer) {
      return;
    }
    if (selectedAnswer.correct) {
      const nextQuestionIndex = this.state.currentQuestionIndex + 1;
      if (
        nextQuestionIndex === RIGHT_ANSWERS_TO_WIN ||
        nextQuestionIndex === this.state.totalQuestions
      ) {
        this.onFinalQuestion(selectedAnswer);
      } else {
        this.onCorrectAnswer(selectedAnswer, nextQuestionIndex);
      }
    } else {
      this.onWrongAnswer(selectedAnswer);
    }
  };

  onFinalQuestion = selectedAnswer => {
    this.setState({
      onNextButton: () => {
        this.notificationService.localNotification(
          'Честито! Победа!',
          `Ти отговори вярно на всичките въпроси от тема "${
            this.state.quiz.theme
          }"`,
        );
        this.props.navigation.navigate('Победа');
      },
      nextButton: NEXT_BUTTON_LABEL,
      selectedAnswer: selectedAnswer,
    });
  };

  onCorrectAnswer = (selectedAnswer, nextQuestionIndex) => {
    this.setState({
      onNextButton: () =>
        this.setState({
          currentQuestionIndex: nextQuestionIndex,
          onNextButton: null,
          nextButton: null,
          selectedAnswer: null,
        }),
      nextButton: NEXT_BUTTON_LABEL,
      selectedAnswer: selectedAnswer,
    });
  };

  onWrongAnswer = selectedAnswer => {
    this.setState({
      onNextButton: () => this.props.navigation.navigate('Загуба'),
      nextButton: NEXT_BUTTON_LABEL,
      selectedAnswer: selectedAnswer,
    });
  };

  render() {
    const currentQuestion = this.state.quiz.questions[
      this.state.currentQuestionIndex
    ];
    return (
      <View style={styles.container}>
        <View style={styles.questionBox}>
          <Text style={styles.questionText}>
            {`Въпрос ${this.state.currentQuestionIndex + 1}/${this.state.quiz.questions.length}: ${currentQuestion.content}`}
          </Text>
        </View>
        {currentQuestion.answers.map(answer => (
          <View
            key={currentQuestion.answers.indexOf(answer)}
            style={this.getAnswerButtonStyles(answer)}>
            <Button
              title={answer.content}
              color={this.getAnswerButtonColor(answer)}
              onPress={() => this.onSelectedAnswer(answer)}
            />
          </View>
        ))}
        {this.state.selectedAnswer && (
          <Button
            title={this.state.nextButton}
            onPress={() => this.state.onNextButton()}
          />
        )}
      </View>
    );
  }

  getAnswerButtonStyles = answer => {
    return {
      margin: 20,
      borderWidth: 5,
      borderColor: this.getAnswerButtonBackground(answer),
      borderRadius: 10,
      backgroundColor:
        this.state.selectedAnswer === answer
          ? this.getAnswerButtonBackground(answer)
          : 'transparent',
    };
  };

  getAnswerButtonBackground = answer => {
    if (!this.state.selectedAnswer) {
      return '#5eeffe'; //'#d9d9d9';
    }
    return answer.correct ? 'green' : '#ff5252';
  };

  getAnswerButtonColor = answer => {
    return answer === this.state.selectedAnswer ? 'white' : 'black';
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#b8f8ff',
    height: 820,
  },
  questionBox: {
    textAlign: 'center',
    justifyContent: 'center',
    height: 200,
    marginTop: 30,
    marginBottom: 30,
    padding: 10,
    paddingTop: 50,
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  questionText: {
    fontSize: 24,
    flexShrink: 1,
  },
});
