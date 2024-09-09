// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
// import "./Dashboard.css";
import Header from "./Header/Header";
import Sidebar from './Sidebar/Sidebar';

const Dashboard = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <div className={`flex ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <Sidebar toggleTheme={toggleTheme} />
      <div className="w-full ml-16 md:ml-56">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
