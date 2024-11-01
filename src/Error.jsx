import { useContext } from "react";
import { QuizContext } from "./QuizContext";

function Error() {
  const { message } = useContext(QuizContext);
  return (
    <p className="error">
      <span>💥</span> There was an error <p>⛔{message}X</p>
    </p>
  );
}

export default Error;
