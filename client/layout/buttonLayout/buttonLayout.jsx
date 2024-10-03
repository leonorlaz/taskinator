import { useContext } from "react";
import { TodoContext } from "../../context/todoContext";
import { Button } from "../../components/button/button";
import styles from "./buttonLayout.module.css";
import { RxDividerVertical } from "react-icons/rx";

export const ButtonLayout = () => {
  const { toggleView, todos, viewState } = useContext(TodoContext);
  const allTodos = todos.length;
  const openTodos = todos.filter((todo) => todo.isCompleted === false).length;
  const closedTodos = todos.filter((todo) => todo.isCompleted === true).length;
  return (
    <div className={styles.layout}>
      <Button
        type="button"
        handleClick={() => toggleView("all")}
        buttonText={"All"}
        number={allTodos}
        isActive={viewState === "all"}
      />
      <RxDividerVertical />
      <Button
        type="button"
        handleClick={() => toggleView("open")}
        buttonText={"Open"}
        number={openTodos}
        isActive={viewState === "open"}
      />
      <RxDividerVertical />
      <Button
        type="button"
        handleClick={() => toggleView("closed")}
        buttonText={"Closed"}
        number={closedTodos}
        isActive={viewState === "closed"}
      />
    </div>
  );
};
