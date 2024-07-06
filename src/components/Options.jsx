import React from 'react'

export default function Options({questions, dispatch, answer}) {
    const hasAnswer =  answer !== null;
    console.log(hasAnswer)
  return (
    <div className="options">
        {
            questions.options.map((option, index) => 
            <button 
            className={`btn btn-option ${index === answer ? "answer" : ""}  
            ${
            hasAnswer 
                ? index === questions.correctOption
                    ? "correct" 
                    : "wrong" 
                    :  
                ""}`} 
            key={option} 
            onClick={() => dispatch({type: "newAnswer", payload: index})}
            disabled={hasAnswer} >
                {option}
            </button>)
        }
      </div>
  )
}
