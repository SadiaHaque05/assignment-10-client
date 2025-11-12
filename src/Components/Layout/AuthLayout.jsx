import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Navbar/Navbar';

const AuthLayout = () => {
    return (
         <div className='min-h-screen'>
            <header className='mx-auto w-11/12 py-4'>
                <Navbar></Navbar>
            </header>
            <main className='w-11/12, py-5 mx-auto'>
              <Outlet></Outlet>
            </main>
        </div>
    );
};

export default AuthLayout;