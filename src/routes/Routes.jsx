import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import PrivateRoute from "./PrivateRoute";

import NotFound from "../components/NotFound";
import ForgotPass from "../components/ForgotPass";
import VisaDetails from "../components/ProductDetails";
import DashboardLayout from "../layouts/DashboardLayout";
import AddProduct from "../components/AddProduct";
import MyProducts from "../components/Myproducts";
import AllProducts from "../components/AllProducts";
import MyProfile from "../pages/MyProfile/MyProfile";
import UpdateProfile from "../pages/MyProfile/UpdateProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/forgotpass",
        element: <ForgotPass></ForgotPass>,
      },
      {
        path: "/details/:_id",
        element: (
          <PrivateRoute>
            <VisaDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/all-product",
        element: <AllProducts />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound></NotFound>,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "addproduct",
        element: <AddProduct></AddProduct>,
      },
      {
        path: "myproducts",
        element: <MyProducts></MyProducts>,
      },
      {
        path: "my-profile",
        element: <MyProfile></MyProfile>,
      },
      {
        path: 'update-profile',
        element: <UpdateProfile></UpdateProfile>
      }
    ],
  },
]);

export default router;
