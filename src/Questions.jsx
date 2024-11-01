import { useContext, useEffect } from "react";
import Button from "./Button";
import NextButton from "./NextButton";
import { QuizContext } from "./QuizContext";

function Questions() {
  const { questions, dispatch, newAnswer, timeRemaining, isFinished, index } =
    useContext(QuizContext);
  console.log(questions);

  const hasAnswer = newAnswer !== null;

  const min = Math.floor(timeRemaining / 60);
  const sec = Math.ceil(timeRemaining % 60);

  useEffect(
    function () {
      const intId = setInterval(() => {
        dispatch({ type: "start" });
        console.log(timeRemaining);
      }, 1000);

      return () => clearInterval(intId);
    },
    [dispatch, timeRemaining]
  );

  return (
    <div>
      <h4>{questions.at(index).question}</h4>
      <div className="options">
        {questions.at(index).options.map((opt, i) => (
          <button
            className={`btn btn-option ${i === newAnswer ? "answer" : ""} ${
              hasAnswer
                ? i === questions.at(index).correctOption
                  ? "correct"
                  : "wrong"
                : ""
            } `}
            key={opt}
            onClick={() => dispatch({ type: "answered", payload: i })}
            disabled={hasAnswer}
          >
            <div>{opt}</div>
          </button>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button>
          {min < 10 ? "0" : ""}
          {min}:{sec < 10 ? "0" : ""}
          {sec}
        </Button>

        <NextButton
          dispatch={dispatch}
          newAnswer={newAnswer}
          isFinished={isFinished}
        />
      </div>
    </div>
  );
}

export default Questions;
