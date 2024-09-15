// eslint-disable-next-line no-unused-vars
import React from 'react';
import { FaEnvelope, FaFacebook, FaInstagram, FaMapMarkerAlt, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { FaPhone } from "react-icons/fa6";
import Back from '../Back/Back';
import "./Contactos.css";

export default function Contactos() {
  return (
    <div className="mb-10">
      <Back title="Contactos" />
      <div className="container content-contact mx-auto px-4 md:px-8 mt-[-15rem] border-left-[1px solid]">
        <div className="bg-white p-6 rounded-sm content-contact-inf shadow-md">
          <div className="flex flex-col md:flex-row">
            
            {/* Lista de Contatos */}
            <div className="w-full md:w-1/2 pr-4">
              <h2 className="text-3xl font-smbold mb-4">Contatos</h2>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center mb-3">
                  <FaPhone className="text-blue-600 mr-3" /> +258 84 123 4567
                </li>
                <li className="flex items-center mb-3">
                  <FaWhatsapp className="text-blue-600 mr-3" /> +258 84 123 4567
                </li>
                <li className="flex items-center mb-3">
                  <FaEnvelope className="text-blue-600 mr-3" /> info@nibukha.co.mz
                </li>
                <li className="flex items-center mb-3">
                  <FaMapMarkerAlt className="text-blue-600 mr-3" /> Av. 25 de Setembro, Maputo, Moçambique
                </li>
              </ul>

              {/* Redes Sociais */}
              <h2 className="text-3xl font-smbold mb-4">Redes Sociais</h2>
              <div className="flex space-x-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                  <FaFacebook size={24} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                  <FaTwitter size={24} />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                  <FaInstagram size={24} />
                </a>
              </div>
            </div>
            
            {/* Formulário de Contato */}
            <div className="w-full md:w-1/2 pl-4 contact-form">
              <h2 className="text-3xl font-smbold mb-4">Entre em Contato</h2>
              <form action="#" method="POST" className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-gray-700">Nome</label>
                  <input type="text" id="name" name="name" className="w-full p-2 border border-gray-300 rounded-sm" required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700">Email</label>
                  <input type="email" id="email" name="email" className="w-full p-2 border border-gray-300 rounded-sm" required />
                </div>
                <div>
                  <label htmlFor="message" className="block text-gray-700">Mensagem</label>
                  <textarea id="message" name="message" rows="4" className="w-full p-2 border border-gray-300 rounded-sm" required></textarea>
                </div>
                <button type="submit" className="bg-blue-600 text-white p-2 w-[150px] rounded-sm hover:bg-blue-700">Enviar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
