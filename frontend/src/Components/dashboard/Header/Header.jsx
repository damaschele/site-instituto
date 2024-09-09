// src/components/Header/Header.jsx
import React, { useEffect, useState } from "react";
import { GoBell } from "react-icons/go";

const Header = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const storedUserName = localStorage.getItem('username');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="flex justify-between items-center p-4">
      <div>
        <h1 className="text-xs">Bem vindo!</h1>
        <p className="text-xl font-semibold">{userName}</p>
      </div>
      <div className="flex items-center space-x-5">
        <div className="hidden md:flex">
          <input
            type="text"
            placeholder="Search..."
            className="bg-indigo-100/30 px-4 py-2 rounded-lg focus:outline-0 focus:ring-2 focus:ring-indigo-600"
          />
        </div>
        <div className="relative flex items-center space-x-5">
          <button
            onClick={toggleNotifications}
            className="relative text-2xl text-gray-600 focus:outline-none"
          >
            <GoBell size={28} />
            <span className="absolute top-0 right-0 -mt-[15px] -mr-1 flex justify-center items-center bg-indigo-600 text-white font-semibold text-[10px] w-[30px!important] h-[30px] rounded-full border-2 border-white">
              9
            </span>
          </button>
          <img
            className="w-8 h-8 rounded-full border-4 border-indigo-400"
            src="https://randomuser.me/api/portraits/women/50.jpg"
            alt="User avatar"
          />

          {showNotifications && (
            <div className="absolute right-10 mt-[140px] w-64 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50">
              <h2 className="text-sm font-semibold mb-2">Notificações</h2>
              <ul>
                <li className="mb-2">
                  <p className="text-gray-600 text-xs">Notificação 1</p>
                </li>
                <li className="mb-2">
                  <p className="text-gray-600 text-xs">Notificação 2</p>
                </li>
                <li className="mb-2">
                  <p className="text-gray-600 text-xs">Notificação 3</p>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
