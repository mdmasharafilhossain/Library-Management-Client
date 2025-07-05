import { createBrowserRouter } from "react-router";
import App from "../App";
import BookList from "../components/book/BookList";
import BookListPage from "../pages/BookListPage";
import AddBookPage from "../pages/AddBookPage";

 const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
    {
      path:"/books",
      element:<BookListPage/>
    },
    {
      path:"/add-book",
      element:<AddBookPage/>
    }
    



    ]
  },
]);


export default router;