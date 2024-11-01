function ProgressBar({ numQuestions, index, punti, newAnswer, allPoints }) {
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
