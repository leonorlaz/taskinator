import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Editpage } from "../pages/editpage/editpage";
import { RootLayout } from "../layout/rootLayout/rootLayout";
import { Homepage } from "../pages/homepage/homepage";
import { Addpage } from "../pages/addpage/addPage";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "/",
          element: <Homepage />,
        },
        {
          path: "/edit/:id",
          element: <Editpage />,
        },
        {
          path: "/add",
          element: <Addpage />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
