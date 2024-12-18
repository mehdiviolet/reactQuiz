import { useContext } from "react";
import Button from "./Button";
import { QuizContext } from "./QuizContext";

function StartPage() {
  const { numQuestions, dispatch } = useContext(QuizContext);
  return (
    <div className="start">
      <h2>React Quiz!</h2>
      <h3>There are {numQuestions} questions and you have X minuets.</h3>
      <Button className="btn-ui" onClick={() => dispatch({ type: "start" })}>
        Let's start!
      </Button>
    </div>
  );
}

export default StartPage;
