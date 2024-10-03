import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { TodoContext } from "../../context/todoContext";
import { Form } from "../../components/form/form";
import { IoChevronBackCircle } from "react-icons/io5";
import { Button } from "../../components/button/button";
import styles from "./editpage.module.css";

export const Editpage = () => {
  const { id } = useParams();
  const { todos, submitEditForm } = useContext(TodoContext);
  const foundTodo = todos.find((todo) => todo._id === id.toString());

  return foundTodo ? (
    <>
      <Form
        heading={`Editing: ${foundTodo?.title}`}
        subHeading={foundTodo?.description}
        submitFn={submitEditForm}
        defaultValues={foundTodo}
        buttons={
          <>
            <Link to={"/"}>
              <IoChevronBackCircle size={19} />
              All todos
            </Link>
            <Button buttonText="Update" classes={styles.editBtn} />
          </>
        }
      />
    </>
  ) : (
    <p>Todo not found</p>
  );
};
