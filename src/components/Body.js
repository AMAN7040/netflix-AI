import React, { Suspense, lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./Login";
const Browse = lazy(() => import("./Browse"));
const Shows = lazy(() => import("./Shows"));
const Choose = lazy(() => import("./Choose"));
const ChooseShow = lazy(() => import("./ChooseShow"));
const MyList = lazy(() => import("./MyList"));

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: (
        <Suspense fallback={<div className="bg-black h-screen w-screen text-white text-lg flex justify-center items-center">Loading...</div>}>
          <Browse />
        </Suspense>
      ),
    },
    {
      path: "/shows",
      element: (
        <Suspense fallback={<div className="bg-black h-screen w-screen text-white text-lg flex justify-center items-center">Loading...</div>}>
          <Shows />
        </Suspense>
      ),
    },
    {
      path: "/choose/:id",
      element: (
        <Suspense fallback={<div className="bg-black h-screen w-screen text-white text-lg flex justify-center items-center">Loading...</div>}>
          <Choose />
        </Suspense>
      ),
    },
    {
      path: "/chooseShow/:id",
      element: (
        <Suspense fallback={<div className="bg-black h-screen w-screen text-white text-lg flex justify-center items-center">Loading...</div>}>
          <ChooseShow />
        </Suspense>
      ),
    },
    {
      path: "/list",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <MyList />
        </Suspense>
      ),
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
