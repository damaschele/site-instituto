// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';



export default function Layout() {
  return (
   <>
    <div style={{ width: '90vw', margin: '0 auto' }}>
      <NavBar />
      <div className="content">
        <Outlet />
      </div>
     
    </div>
     <Footer />
   </>
  );
}
