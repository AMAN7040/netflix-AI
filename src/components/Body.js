import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './Login'
import Browse from './Browse'
import Shows from './Shows';
import Choose from './Choose';
import ChooseShow from './ChooseShow';
import MyList from './MyList';



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
        {
            path: '/chooseShow/:id',
            element: <ChooseShow/>,
        },
        {
            path: '/list',
            element: <MyList/>,
        },
    ]); 

  return (
    <div className=''>
        <RouterProvider router={appRouter}/>
    </div>
  );
};

export default Body