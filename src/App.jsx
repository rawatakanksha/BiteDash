import { Suspense, useState,lazy } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import Header from "./components/Header";
import Body from "./components/Body";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import About from "./components/About";
import ContactUs from "./components/ContactUs";
import Error from "./components/Error";
import RestaurantMenue from "./components/RestaurantMenu";

const Grocery=lazy(()=>import("./components/Grocery"))

function AppLayout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

function App(props) {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Body />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/contact",
          element: <ContactUs />,
        },
        {
          path:"/restaurant-menue/:resId",
          element:<RestaurantMenue/>
        },
        {
          path:"/grocery",
          element:<Suspense fallback={<h1>loading....</h1>}><Grocery/></Suspense>
        }
      ],
      errorElement: <Error />,
    },
  ]);

  return (
    <>
        <RouterProvider router={router} />
    </>
  );
}

export default App;
