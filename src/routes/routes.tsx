import {
    createBrowserRouter,
  } from "react-router-dom";
import OrdersList from "../features/orders/orders-list";
import CustomerList from "../features/customers/customer-list.feature";
import InventoryList from "../features/inventory/inventory-list.feature";
import Login from "../features/authentication/login.feature";
import DashboardPage from "../features/dashboard/dashboard.feature";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <DashboardPage/>,
    },
    {
        path: "/orders",
        element: <OrdersList/>
    },
    {
        path: "/customers",
        element: <CustomerList/>
    },
    {
        path: "/inventory",
        element: <InventoryList/>
    }
  ]);
  

  export const authrouter = createBrowserRouter([
    {
        path: '/login',
        element: <Login/>
    },
    {
      path: '/',
      element: <Login/>
  }
  ])