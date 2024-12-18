import { useContext } from "react";
import { QuizContext } from "./QuizContext";

function ProgressBar() {
  const { numQuestions, index, punti, newAnswer, allPoints } =
    useContext(QuizContext);
  return (
    <div className="progress">
      <progress max={numQuestions} value={index + Number(newAnswer !== null)} />
      <p>
        <strong>{index + 1}</strong>/{numQuestions} questions
      </p>
      <p>
        <strong>{punti}</strong>/{allPoints}
      </p>
    </div>
  );
}

export default ProgressBar;
