import React from 'react';
import { useQuiz } from '../context/QuizContext';

export default function Options({ questions }) {
  const { dispatch, answer } = useQuiz();

  const hasAnswer = answer !== null;
  // console.log(hasAnswer)
  return (
    <div className='options'>
      {questions.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? 'answer' : ''}  
            ${
              hasAnswer
                ? index === questions.correctOption
                  ? 'correct'
                  : 'wrong'
                : ''
            }`}
          key={option}
          onClick={() => dispatch({ type: 'newAnswer', payload: index })}
          disabled={hasAnswer}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
