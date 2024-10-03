import { createContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import axios from "axios";

export const TodoContext = createContext();

export const TodoContextProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  const [modalState, setModalState] = useState({
    isModalOpen: false,
    deletedTodoId: null,
  });
  const [viewState, setViewState] = useState("all");
  const fetchAllTodos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/todos");
      setTodos(response.data);
    } catch (err) {
      console.error("Error fetching todos", err);
    }
  };
  const toggleModal = (mode, id = null) => {
    if (mode) {
      setModalState((prev) => {
        return { ...prev, isModalOpen: true, deletedTodoId: id };
      });
    } else if (!mode) {
      setModalState((prev) => {
        return { ...prev, isModalOpen: false, deletedTodoId: id };
      });
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/todos/${id}`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
      toggleModal(0);
      console.log("response:", response);
    } catch (err) {
      console.error("Error deleting todo", err);
    }
  };

  const notify = (msg) => {
    toast.success(msg);
  };
  const toggleComplete = async (id) => {
    try {
      const foundTodo = todos.find((todo) => todo._id === id);

      const newCompletedStatus = !foundTodo.isCompleted;
      console.log("foundTodo:", foundTodo);
      console.log("newCompletedStatus:", newCompletedStatus);

      await axios.patch(`http://localhost:3000/todos/${id}`, {
        isCompleted: newCompletedStatus,
      });

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === id ? { ...todo, isCompleted: newCompletedStatus } : todo
        )
      );
    } catch (err) {
      console.error("An error has occurred", err);
    }
  };

  const submitAddForm = async (data, reset) => {
    console.log("Submit form called with data:", data);
    try {
      const response = await axios.post("http://localhost:3000/todos", data);
      console.log("Response received:", response.data);
      setTodos((prevTodos) => [...prevTodos, response.data]);
      notify("Todo added successfully!");
      reset();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  const submitEditForm = async (data, reset) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/todos/edit/${id}`,
        data
      );
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === id ? { ...todo, ...response.data } : todo
        )
      );
      console.log("response", response.data);
    } catch (err) {
      console.error("An error occurred");
      console.log("Error:", err);
    }
  };

  const toggleView = (type) => {
    setViewState(type);
    toggleModal(0);
  };

  useEffect(() => {
    fetchAllTodos();
  }, []);
  console.log(viewState);

  return (
    <TodoContext.Provider
      value={{
        todos,
        notify,
        fetchAllTodos,
        setTodos,
        toggleModal,
        modalState,
        deleteTodo,
        toggleComplete,
        toggleView,
        viewState,
        submitAddForm,
        submitEditForm,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
