import { useContext } from "react";
import { TodoContext } from "../../context/todoContext";
import { Todo } from "../../components/todo/todo";
import styles from "./todoLayout.module.css";

export const TodoLayout = () => {
  const { todos, viewState } = useContext(TodoContext);
  let filteredTodos = [];
  switch (viewState) {
    case "open":
      filteredTodos = todos.filter((todo) => todo.isCompleted === false);
      break;
    case "closed":
      filteredTodos = todos.filter((todo) => todo.isCompleted === true);
      break;
    default:
      filteredTodos = todos;
  }
  return (
    <div className={styles.layout}>
      {filteredTodos?.map((todo, index) => (
        <Todo
          key={todo._id}
          id={todo._id}
          title={todo.title}
          description={todo.description}
          isCompleted={todo.isCompleted}
          number={index}
        />
      ))}
    </div>
  );
};
