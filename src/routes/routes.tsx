import { createBrowserRouter } from "react-router";
import App from "../App";

import BookListPage from "../pages/BookListPage";
import AddBookPage from "../pages/AddBookPage";
import EditBookPage from "../pages/EditBookPage";

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
    },
   
    {
      path:"/edit-book/:id",
      element:<EditBookPage/>
    }
    



    ]
  },
]);


export default router;