import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const HomeLayout = () => {
    return (
        <div  className="flex flex-col min-h-screen">
            <Navbar></Navbar>

           <main  className="flex-1">
             <Outlet></Outlet>
           </main>
            
            <Footer></Footer>
        </div>
    );
};

export default HomeLayout;