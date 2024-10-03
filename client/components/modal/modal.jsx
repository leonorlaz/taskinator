import { useContext } from "react";
import { TodoContext } from "../../context/todoContext";
import { Button } from "../button/button";
import styles from "./modal.module.css";

export const Modal = () => {
  const { modalState, toggleModal, deleteTodo, todos, notify } =
    useContext(TodoContext);
  const { isModalOpen, deletedTodoId } = modalState;

  const todo = todos.find((todo) => todo._id === deletedTodoId);

  if (!isModalOpen) return null;
  return (
    <div className={styles.modal}>
      <p>Are you sure you want to delete {todo.title}?</p>
      <div className={styles.btnGrp}>
        <Button
          classes={styles.btnYes}
          handleClick={() => {
            deleteTodo(deletedTodoId);
            notify("Todo deleted succesfully!");
          }}
          buttonText={"Yes"}
        />

        <Button
          classes={styles.btnNo}
          handleClick={() => toggleModal(0)}
          buttonText={"No"}
        />
      </div>
    </div>
  );
};
