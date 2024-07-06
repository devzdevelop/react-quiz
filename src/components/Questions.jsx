import Options from "./Options";

export default function Questions({questions, index, dispatch, answer}) {
  return (
    <div>
      <h4>{questions.question}</h4>
      <Options questions={questions} dispatch={dispatch} answer={answer}/>
    </div>
  )
}