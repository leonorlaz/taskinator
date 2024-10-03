import styles from "./header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <h1>Taskinator</h1>
      <p>Organize your day, achieve your goals!</p>
    </header>
  );
};
