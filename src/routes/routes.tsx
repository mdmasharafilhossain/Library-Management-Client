import { createBrowserRouter } from "react-router";
import App from "../App";

import BookListPage from "../pages/BookListPage";
import AddBookPage from "../pages/AddBookPage";
import EditBookPage from "../pages/EditBookPage";
import BorrowPage from "../pages/BorrowPage";
import BorrowSummaryPage from "../pages/BorrowSummaryPage";

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
    },
    {
      path:"/borrow/:bookId",
      element:<BorrowPage/>
    },
    {
      path:"/borrow-summary",
      element:<BorrowSummaryPage/>
    }
    



    ]
  },
]);


export default router;