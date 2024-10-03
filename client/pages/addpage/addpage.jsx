import { useContext } from "react";
import { Form } from "../../components/form/form";
import { TodoContext } from "../../context/todoContext";
import { Link } from "react-router-dom";
import { Button } from "../../components/button/button";
import { IoChevronBackCircle } from "react-icons/io5";
import styles from "./addpage.module.css";
export const Addpage = () => {
  const { submitAddForm } = useContext(TodoContext);
  return (
    <Form
      heading={`Add new task`}
      submitFn={submitAddForm}
      buttons={
        <>
          <Link to={"/"}>
            <IoChevronBackCircle size={19} />
            Go back
          </Link>
          <Button
            buttonText={"Add task"}
            type="submit"
            classes={styles.addBtn}
            form="addTask"
          />
        </>
      }
    />
  );
};
