import { useEffect } from "react";
import Button from "./Button";

function Questions({
  questions,
  dispatch,
  newAnswer,
  timeRemaining,
  index: myAnswer,
}) {
  const hasAnswer = newAnswer !== null;

  const min = Math.floor(timeRemaining / 60);
  const sec = Math.ceil(timeRemaining % 60);

  useEffect(
    function () {
      const intId = setInterval(() => {
        dispatch({ type: "start" });
      }, 1000);

      return () => clearInterval(intId);
    },
    [dispatch, timeRemaining]
  );

  return (
    <div>
      <h4>{questions.question}</h4>
      <div className="options">
        {questions.options.map((opt, index) => (
          <button
            className={`btn btn-option ${index === newAnswer ? "answer" : ""} ${
              hasAnswer
                ? index === questions.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            } `}
            key={opt}
            onClick={() => dispatch({ type: "answered", payload: index })}
            disabled={hasAnswer}
          >
            <div>{opt}</div>
          </button>
        ))}
        <Button className="btn-ui">
          {min < 10 ? "0" : ""}
          {min}:{sec < 10 ? "0" : ""}
          {sec}
        </Button>
      </div>
    </div>
  );
}

export default Questions;
