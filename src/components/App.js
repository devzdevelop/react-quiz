import { useEffect, useReducer } from 'react';

import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Questions from './Questions';
import NextQuestion from './NextQuestion';
import Progress from './Progress';
import FinishScreen from './FinishScreen';
import Footer from './Footer';
import Timer from './Timer';
import { useQuiz } from '../context/QuizContext';

export default function App() {
  const { questions, status, index, numQuestions, dispatch } = useQuiz();

  // fetching questions
  console.log('Status: ', status);
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch('https://82f5jm-8000.csb.app/questions');
        const data = await res.json();

        dispatch({ type: 'dataReceived', payload: data });
      } catch (e) {
        dispatch({ type: 'dataFailed' });
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div className='app'>
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === 'active' && (
          <>
            <Progress />
            <Questions key={questions[index].question} />
            <Footer>
              <Timer />
              <NextQuestion />
            </Footer>
          </>
        )}
        {status === 'finished' && <FinishScreen />}
      </Main>
    </div>
  );
}
