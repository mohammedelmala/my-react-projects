import { useGlobalContext } from "./context";
import Loading from "./Loading";
import SetupForm from "./SetupForm";
import Modal from "./Modal";

const App = () => {
  const {
    waiting,
    loading,
    questions,
    index,
    correct,
    nextQuestion,
    checkAnswer,
  } = useGlobalContext();

  if (waiting) {
    return <SetupForm />;
  }
  if (loading) {
    return <Loading />;
  }
  const { question, incorrect_answers, correct_answer } = questions[index];
  const answers = [...incorrect_answers];
  const tempIndex = Math.floor(Math.random() * 4);
  if (tempIndex == 3) {
    answers.push(correct_answer);
  } else {
    answers.push(answers[tempIndex]);
    answers[tempIndex] = correct_answer;
  }
  console.log(tempIndex);
  return (
    <main>
      <Modal />
      <section className="quiz">
        <p className="correct-answers">
          correct answers: {correct}/{index}
        </p>
        <article className="container">
          <h4 dangerouslySetInnerHTML={{ __html: question }} />
          <div className="btn-container">
            {answers.map((answer, index) => (
              <button
                key={index}
                className="answer-btn"
                onClick={(e) => {
                  checkAnswer(answer === correct_answer);
                }}
                dangerouslySetInnerHTML={{ __html: answer }}
              />
            ))}
          </div>
        </article>
        <button className="next-question" onClick={nextQuestion}>
          next question
        </button>
      </section>
    </main>
  );
};

export default App;
