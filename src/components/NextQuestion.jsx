import React from 'react';
import { useQuiz } from '../context/QuizContext';

export default function NextQuestion() {
  const { index, answer, numQuestions, dispatch } = useQuiz();

  if (answer === null) return null;

  if (index < numQuestions - 1) {
    return (
      <button
        className='btn btn-ui'
        onClick={() => dispatch({ type: 'nextQuestion' })}
      >
        Next Question
      </button>
    );
  }

  if (index === numQuestions - 1) {
    return (
      <button
        className='btn btn-ui'
        onClick={() => dispatch({ type: 'finished' })}
      >
        Finish
      </button>
    );
  }
}
