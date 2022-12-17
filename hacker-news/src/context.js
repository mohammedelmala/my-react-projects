import { createContext, useContext, useReducer, useEffect } from "react";
import {
  SET_LOADING,
  SET_STORIES,
  HANDLE_PAGE,
  HANDLE_SEARCH,
  REMOVE_STORIES,
} from "./actions";
import reducer from "./reducers";

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?";

const initialState = {
  isLoading: false,
  hits: [],
  query: "react",
  page: 0,
  nbPages: 0,
};
// //////////////////////
// create context
// /////////////////////
export const AppContext = createContext();

// //////////////////////
// set provider
// /////////////////////

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const fetchStories = async (url) => {
    dispatch({ type: SET_LOADING });
    try {
      const response = await fetch(url);
      const data = await response.json();
      dispatch({
        type: SET_STORIES,
        payload: { hits: data.hits, nbPages: data.nbPages },
      });
    } catch (error) {}
  };
  //   remove story
  const removeStory = (id) => {
    dispatch({ type: REMOVE_STORIES, payload: id });
  };
  //   handle search
  const handleSearch = (query) => {
    dispatch({ type: HANDLE_SEARCH, payload: query });
  };
  //   const
  const handlePage = (value) => {
    dispatch({ type: HANDLE_PAGE, payload: value });
  };
  useEffect(() => {
    fetchStories(`${API_ENDPOINT}query=${state.query}&page=${state.page}`);
  }, [state.query, state.page]);

  return (
    <AppContext.Provider
      value={{ ...state, removeStory, handleSearch, handlePage }}
    >
      {children}
    </AppContext.Provider>
  );
};
// //////////////////////
// create global context
// /////////////////////

export const useGlobalContext = () => {
  return useContext(AppContext);
};
// export default { AppContext, AppProvider };

//
