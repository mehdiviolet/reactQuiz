import { useContext } from "react";
import Header from "./Header";
import StartPage from "./StartPage";
import Loader from "./Loader";
import Questions from "./Questions";
import ProgressBar from "./ProgressBar";
// import Button from "./Button";
import ScorePage from "./ScorePage";
import Main from "./Main";
import Error from "./Error";
import { QuizContext } from "./QuizContext";

function App() {
  const { status } = useContext(QuizContext);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "dataRecieved" && <StartPage />}
        {status === "inizio" && (
          <>
            <ProgressBar />
            <Questions />
          </>
        )}
        {status === "finito" && <ScorePage />}
      </Main>
    </div>
  );
}

export default App;
