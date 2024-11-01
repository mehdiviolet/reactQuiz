function NextButton({ dispatch, newAnswer, isFinished }) {
  if (newAnswer === null) return;
  if (!isFinished)
    return (
      <button className="btn btn-ui" onClick={() => dispatch({ type: "next" })}>
        Next
      </button>
    );
  if (isFinished)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finished" })}
      >
        Go to score!
      </button>
    );
}

export default NextButton;
