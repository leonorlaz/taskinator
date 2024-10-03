import { Toaster } from "react-hot-toast";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "../../components/header/header";
import styles from "./rootLayout.module.css";

export const RootLayout = () => {
  const location = useLocation();

  const hideHeader = location.pathname.includes("/edit/");

  return (
    <div className={styles.container}>
      {!hideHeader && (
        <nav>
          <Header />
        </nav>
      )}
      <main>
        <Toaster position="top-center" />
        <Outlet />
      </main>
    </div>
  );
};
