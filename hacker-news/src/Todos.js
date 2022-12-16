import { useReducer } from "react";
import reducer from "./reducer";

const Todos = () => {
  const initialTodos = [
    {
      id: 1,
      title: "Todo 1",
      complete: false,
    },
    {
      id: 2,
      title: "Todo 2",
      complete: false,
    },
  ];

  const [todos, dispatch] = useReducer(reducer, initialTodos);
  const handleComplete = (todo) => {
    console.log(todo);
    dispatch({ type: "COMPLETE", id: todo.id });
  };
  return (
    <>
      {todos.map((todo) => (
        <div key={todo.id}>
          <label>
            <input
              type="checkbox"
              checked={todo.complete}
              onChange={() => handleComplete(todo)}
            />
            {todo.title}
          </label>
        </div>
      ))}
    </>
  );
};

export default Todos;
