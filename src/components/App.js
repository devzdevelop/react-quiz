import {useEffect, useReducer} from 'react';

import Header from "./Header";
import Main from "./Main";
import Loader from './Loader'
import Error from './Error'
import StartScreen from './StartScreen'
import Questions from './Questions'
import NextQuestion from './NextQuestion';
import Progress from './Progress';

const initialState = {
  questions: [],
  // "loading", "error", "ready", "active", "finished"
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
}

const reducer = (state, action) => {
  switch(action.type){
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      }
     case "dataFailed":
       return {
         ...state,
         status: "error",
       }
     case "start":
       return {
         ...state,
         status: "active"
       }
      case "newAnswer":
        const question = state.questions.at(state.index);

        return {
          ...state,
          answer: action.payload,
          points: action.payload === question.correctOption
           ? state.points + question.points 
           : state.points,
        }
      case "nextQuestion":
        return {
          ...state,
          index: state.index + 1,
          answer: null,
        }
      default: 
      {
        throw new Error("Uknown error");
      }
  }
}

export default function App() {
  const [{questions, status, index, answer, points}, dispatch] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((prev, cur) => prev + cur.points, 0);
  
  // fetching questions
  useEffect(() => {    
    const fetchQuestions = async () => {
      try{
        const res = await fetch('https://82f5jm-8000.csb.app/questions');
        const data = await res.json();
         dispatch({type: "dataReceived", payload: data});
      } catch(e) {
        dispatch({type: "dataFailed"});
      }
    }
    
    fetchQuestions();
  },[]);
  
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" 
        && <StartScreen numQuestions={numQuestions} 
        dispatch={dispatch}
        />}
        {status === "active" && 
          <>
            <Progress 
            index={index} 
            numQuestions={numQuestions} 
            points={points} 
            maxPossiblePoints={maxPossiblePoints}
            answer={answer} 
            />
            <Questions 
            questions={questions[index]} 
            key={questions[index].question} 
            dispatch={dispatch}
            answer={answer} />
            <NextQuestion dispatch={dispatch} answer={answer} />
          </>
        }
        
      </Main>
    </div>
  );
}
