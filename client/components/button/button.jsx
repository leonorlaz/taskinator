import styles from "./button.module.css";

export const Button = ({
  type,
  handleClick,
  buttonText,
  number,
  isActive,
  classes,
  form,
}) => {
  return (
    <div className={styles.btnContainer}>
      <button
        form={form}
        type={type}
        onClick={handleClick}
        className={`${styles.btn} ${classes} ${
          isActive ? styles.activeBtn : ""
        }`}
      >
        {buttonText}
      </button>
      <span className={isActive ? styles.activeSpan : ""}>{number}</span>
    </div>
  );
};
