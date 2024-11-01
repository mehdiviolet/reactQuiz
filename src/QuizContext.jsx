import { createContext, useEffect, useReducer } from "react";

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  newAnswer: null,
  punti: 0,
  timeRemaining: 120,
  message: "",
};
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

const QuizContext = createContext();

const URL = "https://react-quiz-mehdi.netlify.app/.netlify/functions/questions";

function QuizProvider({ children }) {
  const [
    { questions, status, index, newAnswer, punti, timeRemaining, message },
    dispatch,
  ] = useReducer(reducer, initialState);

  const isFinished = questions.length === index + 1;
  const numQuestions = questions.length;
  const allPoints = questions.reduce((acc, cur) => acc + cur.points, 0);

  useEffect(function () {
    async function getData() {
      try {
        const res = await fetch(`${URL}`);
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

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        newAnswer,
        punti,
        timeRemaining,
        message,
        numQuestions,
        allPoints,
        dispatch,
        isFinished,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

// function useCo() {
//   const useCon = useContext(QuizContext);
//   return useCon;
// }

export { QuizProvider, QuizContext };
