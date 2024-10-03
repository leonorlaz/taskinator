/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";

import styles from "./form.module.css";

export const Form = ({
  submitFn,
  buttons,
  defaultValues,
  heading,
  subHeading,
}) => {
  console.log("defaultvalues:", defaultValues);
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
  });

  const resetForm = () => {
    reset({
      title: "",
      description: "",
    });
    clearErrors();
  };

  return (
    <>
      <form
        id="addTask"
        onSubmit={handleSubmit((data) => {
          submitFn(data, resetForm);
        })}
      >
        <div className={styles.heading}>
          <h2>{heading}</h2>
          <p>{subHeading}</p>
        </div>
        <label htmlFor="title">
          Title
          <input
            defaultValue={defaultValues?.title}
            type="text"
            placeholder="Title"
            {...register("title", {
              required: "This field is required",
              minLength: {
                value: 4,
                message: "Title too short, minimum length is 4",
              },
            })}
          />
          {errors.title && <p>{errors.title.message}</p>}
        </label>
        <label htmlFor="description">
          Description
          <input
            defaultValue={defaultValues?.description}
            type="text"
            placeholder="Description"
            {...register("description")}
          />
        </label>
      </form>
      <div className={styles.btnGrp}>{buttons}</div>
    </>
  );
};
