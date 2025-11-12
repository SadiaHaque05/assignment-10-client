import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const HomeLayout = () => {
    return (
        <div>
            <Navbar></Navbar>

            <Outlet></Outlet>
            
            <Footer></Footer>
        </div>
    );
};

export default HomeLayout;