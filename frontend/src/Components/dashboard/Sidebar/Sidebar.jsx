// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { AiFillProduct } from "react-icons/ai";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa6";
import { LuCalendar, LuInfo, LuSettings } from "react-icons/lu";
import { Link } from "react-router-dom";
import aaee from "../../../assets/logo.png";

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState(0);

  const handleLinkClick = (index) => {
    setActiveLink(index);
  };

  const SIDEBAR_LINKS = [
    { id: 1, path: "/dashboard/homeDash", name: "Dashboard", icon: AiFillProduct },
    { id: 2, name: "Sobre IMPN", icon: LuInfo },
    { id: 3, path: "/dashboard/cursosDash", name: "Cursos", icon: FaChalkboardTeacher },
    { id: 4, path: "/dashboard/livrosDash", name: "Livros", icon: FaBookOpen },
    { id: 5, path: "/dashboard/eventos", name: "Eventos", icon: LuCalendar },
    { id: 6, path: "/dashboard/configuracoes", name: "Configurações", icon: LuSettings },
  ];

  return (
    <div className="w-16 md:w-56 fixed left-0 top-0 z-10 h-screen border-r pt-8 px-4 bg-white">
      {/* Logo */}
      <div className="flex justify-center items-center mb-8 h-30">
        <img src={aaee} alt="logo" className="w-28 hidden md:block" />
        <img src={aaee} alt="logo" className="w-8 md:hidden" />
      </div>
      {/* Navigation Links */}
      <ul className="mt-6 space-y-6">
        {SIDEBAR_LINKS.map((link, index) => (
          <li
            key={index}
            className={`font-medium rounded-md py-2 px-5 text-xl hover:bg-gray-200 hover:text-indigo-700 ${
              activeLink === index ? "bg-[#0F45A3] text-white" : "text-gray-500"
            }`}
            style={{ fontSize: "18px!important" }} // Tamanho da fonte
          >
            <Link
              to={link.path}
              className="flex justify-center md:justify-start items-center md:space-x-5"
              onClick={() => handleLinkClick(index)}
            >
              <span style={{ fontSize: "25px" }}>
                <link.icon />
              </span>
              <span className="text-sm hidden md:flex">{link.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
