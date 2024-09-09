import React from 'react';
import { FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { FaPhone } from "react-icons/fa6";
import logo from '../../assets/logo.png';

export default function Footer() {
  return (
    <footer className="bg-[#5FA1AE] text-white py-10 w-full">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Primeiro Bloco: Logo e Nome da Instituição (Centralizado) */}
        <div className="flex flex-col items-center md:items-center">
          <img src={logo} alt="Instituto Logo" className="h-40 mb-4" />
          <h2 className="text-2xl font-sembold capitalize text-center ml-[5px] md:text-center">
            Instituto Médio Politécnico Nibukha
          </h2>
        </div>
        
        {/* Segundo Bloco: Links Rápidos */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Links Rápidos</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-gray-400">Início</a></li>
            <li><a href="#" className="hover:text-gray-400">Cursos</a></li>
            <li><a href="#" className="hover:text-gray-400">Sobre Nós</a></li>
            <li><a href="#" className="hover:text-gray-400">Contactos</a></li>
          </ul>
        </div>

        {/* Terceiro Bloco: Sobre Nós */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Sobre Nós</h3>
          <p className="text-white-300">
            O Instituto Médio Politécnico Nibukha é uma instituição dedicada à formação técnica e profissional, preparando os alunos para enfrentar os desafios do mercado de trabalho.
          </p>
        </div>

        {/* Quarto Bloco: Contactos */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Contactos</h3>
          <ul className="space-y-2">
            <li className="flex items-center ">
              <FaPhone className="mr-2" /> +258 84 123 4567
            </li>
            <li className="flex items-center">
              <FaEnvelope className="mr-2" /> info@nibukha.co.mz
            </li>
            <li className="flex items-center">
              <FaMapMarkerAlt className="mr-2" /> Av. 25 de Setembro, Maputo, Moçambique
            </li>
          </ul>
        </div>

      </div>

      {/* Linha de Separação */}
      <div className="border-t border-white-700 mt-10"></div>

      {/* Copyright */}
      <div className="text-center text-white-300 mt-4">
        Copyright &copy; {new Date().getFullYear()} Instituto Médio Politécnico Nibukha | Todos os direitos reservados.
      </div>
    </footer>
  );
}
