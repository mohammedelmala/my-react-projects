import { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";

const table = {
  sports: 21,
  history: 23,
  politics: 24,
};

const API_ENDPOINT = "https://opentdb.com/api.php?";

// const url = "";

// const tempUrl ="https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple";
// https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [waiting, setWaiting] = useState(true);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestioins] = useState([]);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [error, setError] = useState(false);
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: "sports",
    difficulty: "easy",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchQuestion = async (url) => {
    setLoading(true);
    setWaiting(false);
    try {
      const response = await axios.get(url);

      if (response) {
        const data = response.data.results;
        if (data.length > 0) {
          setQuestioins(data);

          setWaiting(false);
          setError(false);
        }
      } else {
        setWaiting(true);
        setError(true);
      }
    } catch (error) {
      setError(true);
      console.log(error.message);
    }
    setLoading(false);
  };

  const nextQuestion = () => {
    setIndex((oldIndex) => {
      const index = oldIndex + 1;
      if (index > questions.length - 1) {
        //open modal
        openModal();
        return 0;
      }
      return index;
    });
  };

  const checkAnswer = (value) => {
    if (value) {
      setCorrect((oldState) => oldState + 1);
    }
    nextQuestion();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setWaiting(true);
    setIsModalOpen(false);
    setCorrect(0);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(`${name}:${value}`);
    setQuiz({ ...quiz, [name]: value });
  };

  const handleSubmit = (e) => {
    // e.preventDafult();
    const { amount, category, difficulty } = quiz;
    //
    const url = `${API_ENDPOINT}amount=${amount}&category=${table[category]}&difficulty=${difficulty}&type=multiple`;
    fetchQuestion(url);
  };
  //   useEffect(() => {
  //     fetchQuestion(tempUrl);
  //   }, []);

  return (
    <AppContext.Provider
      value={{
        waiting,
        loading,
        questions,
        index,
        correct,
        error,
        isModalOpen,
        nextQuestion,
        checkAnswer,
        closeModal,
        quiz,
        handleChange,
        handleSubmit,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
