import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/login";
import Error from "../pages/Error";
import AddPayment from "../pages/AddPayment";
import EditPayment from "../pages/EditPayment";

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App></App>,
      errorElement: <Error/>,
      children: [
        {
          path: '/addPayment',
          element: <AddPayment/>,
        },
        {
          path: '/EditPayment/:id',
          element: <EditPayment/>
        },
      ]
    },
    {
      path: '/login',
      element: <Login/>
    },
  ]
)