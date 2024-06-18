import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './Login'
import Browse from './Browse'
import Shows from './Shows';
import Choose from './Choose';



const Body = () => {
   
    const appRouter = createBrowserRouter([
        {
            path: '/',
            element: <Login/>,
        },
        {
            path: '/browse',
            element: <Browse/>,
        },
        {
            path: '/shows',
            element: <Shows/>,
        },
        {
            path: '/choose/:id',
            element: <Choose/>,
        },
    ]); 

  return (
    <div>
        <RouterProvider router={appRouter}/>
    </div>
  );
};

export default Body