import {useEffect, useReducer} from 'react';

import Header from "./components/Header";
import Main from "./components/Main";
import Loader from './components/Loader'
import Error from './components/Error'
import StartScreen from './components/StartScreen'
import Questions from './components/Questions'

const initialState = {
  questions: [],
  // "loading", "error", "ready", "active", "finished"
  status: "loading"
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
      default: 
      {
        throw new Error("Uknown error");
      }
  }
}

export default function App() {
  const [{questions, status}, dispatch] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  
  useEffect(() => {
    console.log("Fetching");
    
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
        {status === "active" && <Questions questions={questions}/>}
      </Main>
    </div>
  );
}
