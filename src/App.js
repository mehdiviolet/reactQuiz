import { useReducer } from "react";
import Header from "./Header";
import StartPage from "./StartPage";
import Loader from "./Loader";
import { useEffect } from "react";
import Questions from "./Questions";
import ProgressBar from "./ProgressBar";
import Button from "./Button";
import ScorePage from "./ScorePage";
import Main from "./Main";
import Error from "./Error";
import NextButton from "./NextButton";

function reducer(state, action) {
  switch (action.type) {
    case "getData":
      return { ...state, questions: action.payload, status: "dataRecieved" };
    case "start":
      return {
        ...state,
        status: state.timeRemaining === 0 ? "finito" : "inizio",
        timeRemaining: state.timeRemaining > 0 ? state.timeRemaining-- : 0,
      };
    case "answered":
      const currQuestion = state.questions.at(state.index);
      return {
        ...state,
        newAnswer: action.payload,
        punti:
          currQuestion.correctOption === action.payload
            ? state.punti + currQuestion.points
            : state.punti,
      };
    case "next":
      return { ...state, index: state.index++, newAnswer: null };
    case "finished":
      return { ...state, status: "finito" };
    case "error":
      return { ...state, status: "error", message: action.payload };
    default:
      throw new Error("Err");
  }
}

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  newAnswer: null,
  punti: 0,
  timeRemaining: 120,
  message: "",
};
function App() {
  const [
    { questions, status, index, newAnswer, punti, timeRemaining, message },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(function () {
    async function getData() {
      try {
        const res = await fetch(`http://localhost:9000/questions`);
        console.log(res);
        if (!res.ok) throw new Error("There is a connection problem!");

        const data = await res.json();
        if (!data) throw new Error("There is not any data!");
        dispatch({ type: "getData", payload: data });
      } catch (err) {
        console.error(err.message);
        dispatch({ type: "error", payload: err.message });
      }
    }

    getData();
  }, []);

  const isFinished = questions.length === index + 1;
  const numQuestions = questions.length;
  const allPoints = questions.reduce((acc, cur) => acc + cur.points, 0);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error message={message} />}
        {status === "dataRecieved" && (
          <StartPage numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "inizio" && (
          <>
            <ProgressBar
              numQuestions={numQuestions}
              index={index}
              punti={punti}
              newAnswer={newAnswer}
              allPoints={allPoints}
            />
            <Questions
              dispatch={dispatch}
              newAnswer={newAnswer}
              questions={questions.at(index)}
              index={index}
              timeRemaining={timeRemaining}
            />
            <NextButton
              dispatch={dispatch}
              newAnswer={newAnswer}
              isFinished={isFinished}
            />
          </>
        )}
        {status === "finito" && <ScorePage />}
      </Main>
    </div>
  );
}

export default App;
