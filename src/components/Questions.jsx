import { useQuiz } from '../context/QuizContext';
import Options from './Options';
export default function Questions() {
  const { questions: quest, index } = useQuiz();
  const questions = quest[index];
  return (
    <div>
      <h4>{questions.question}</h4>
      <Options questions={questions} />
    </div>
  );
}
