import { Link } from "react-router-dom";
import { ButtonLayout } from "../../layout/buttonLayout/buttonLayout";
import { TodoLayout } from "../../layout/todoLayout/todoLayout";
import styles from "./homepage.module.css";

const formatDateWithUppercasedMonth = (date) => {
  const options = { weekday: "long", day: "numeric", month: "short" };
  const formattedDate = date.toLocaleDateString("en-GB", options);
  const [weekday, day, month] = formattedDate.split(" ");
  const uppercasedMonth = month.toUpperCase();
  return `${weekday}, ${day} ${uppercasedMonth}`;
};

export const Homepage = () => {
  const date = new Date();
  const formattedDate = formatDateWithUppercasedMonth(date);

  return (
    <div className={styles.homepage}>
      <div className={styles.hero}>
        <div className={styles.left}>
          <span>Today&apos;s Tasks</span>
          <p>{formattedDate}</p>
        </div>
        <Link to={"/add"} className={styles.addBtn}>
          + New task
        </Link>
      </div>
      <ButtonLayout />
      <TodoLayout />
    </div>
  );
};
