import {useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./commons/sidebar/sidebar.component";
import { RouterProvider, redirect } from "react-router-dom";
import { authrouter, router } from "./routes/routes";
import { useAuth } from "./context/auth-context";

function App() {
  const { currentUser } = useAuth();

  useEffect(() => {
    redirect('/login')
  }, [])

  if (currentUser) {
    return (
      <Sidebar>
        <RouterProvider router={router} />
      </Sidebar>
    );
  } else {
    return <RouterProvider router={authrouter} />;
  }
}

export default App;
