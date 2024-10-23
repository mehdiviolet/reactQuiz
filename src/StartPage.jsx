import Button from "./Button";

function StartPage({ numQuestions, dispatch }) {
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
