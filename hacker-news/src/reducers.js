import {
  SET_LOADING,
  SET_STORIES,
  HANDLE_PAGE,
  HANDLE_SEARCH,
  REMOVE_STORIES,
} from "./actions";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, isLoading: true };
    case SET_STORIES:
      return {
        ...state,
        isLoading: false,
        hits: action.payload.hits,
        nbPages: action.payload.nbPages,
      };
    case REMOVE_STORIES:
      const newHits = state.hits.filter(
        (story) => story.objectID !== action.payload
      );
      return {
        ...state,
        hits: newHits,
      };
    case HANDLE_SEARCH:
      return { ...state, query: action.payload, page: 0 };
    case HANDLE_PAGE:
      let newPage;
      if (action.payload === "dec") {
        newPage = state.page === 0 ? state.nbPages - 1 : state.page - 1;
      } else if (action.payload === "inc") {
        newPage = state.page === state.nbPages - 1 ? 0 : state.page + 1;
      }
      return { ...state, page: newPage };
    default:
      return state;
  }
};

export default reducer;
