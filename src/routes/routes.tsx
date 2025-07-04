import { createBrowserRouter } from "react-router";
import App from "../App";
import BookList from "../components/book/BookList";
import BookListPage from "../pages/BookListPage";

 const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
    {
      path:"/books",
      element:<BookListPage/>
    }
    



    ]
  },
]);


export default router;