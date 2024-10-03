import { useContext } from "react";
import { TodoContext } from "../../context/todoContext";
import { Link } from "react-router-dom";
import styles from "./todo.module.css";
import { RiCheckboxBlankCircleLine } from "react-icons/ri";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { Button } from "../../components/button/button";
import { CiEdit } from "react-icons/ci";
import { Modal } from "../modal/modal";
export const Todo = ({ title, description, isCompleted, id }) => {
  const { toggleModal, toggleComplete, modalState } = useContext(TodoContext);

  const { isModalOpen, deletedTodoId } = modalState;
  return (
    <div className={styles.todo}>
      <div className={styles.content}>
        <div className={styles.title}>
          <h2 className={isCompleted ? styles.completed : ""}>{title}</h2>
          <div className={styles.icons} onClick={() => toggleComplete(id)}>
            {isCompleted ? (
              <RiCheckboxCircleFill color=" rgba(7, 96, 251, 255)" size={21} />
            ) : (
              <RiCheckboxBlankCircleLine size={21} />
            )}
          </div>
        </div>
        <p>{description}</p>
        <hr />
      </div>
      <div className={styles.btnGrp}>
        <Link to={`/edit/${id}`} className={styles.btnEdit}>
          Edit
          <CiEdit size={15} />
        </Link>
        <Button
          handleClick={() => toggleModal(1, id)}
          classes={styles.btnDelete}
          buttonText={"Delete"}
        />
      </div>

      {isModalOpen && deletedTodoId === id && <Modal />}
    </div>
  );
};
