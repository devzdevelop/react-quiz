import {useEffect, useReducer} from 'react';

import Header from "./components/Header";
import Main from "./components/Main";
// import "./styles.css";

const initialState = {
  questions: [],
  // "loading", "error", "ready", "active", "finished"
  status: "loading"
}

const reducer = (state, action) => {
  
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  useEffect(() => {
    console.log("Fetching");
    
    const fetchQuestions = async () => {
      try{
        const res = await fetch('https://82f5jm-8000.csb.app/questions');
        const data = await res.json();
        console.log("questions: ", data);
      } catch(e) {
        console.log("error: ", e);
      }
    }
    
    fetchQuestions();
  },[]);
  
  return (
    <div className="app">
      <Header />
      <Main />
    </div>
  );
}
