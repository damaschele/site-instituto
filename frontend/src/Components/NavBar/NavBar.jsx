// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { TbMenuDeep } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import logo from "../../assets/logo.png";
import "../NavBar/Navbar.css";
import Head from './Head';

export default function NavBar() {
    const [click, setClick] = useState(false);
    
    // Função para verificar se o usuário é um estudante
    const getRole = () => {
        return localStorage.getItem('role'); // Supondo que o papel esteja armazenado no localStorage
    };

    const role = getRole(); // Obtém o papel do usuário

    return (
        <div>
            <Head />
            <header>
                <nav className='flexSB'>
                    <div className="logo_img">
                        <Link to="/"><img src={logo} alt="logo" /></Link>
                    </div>
                    <ul className={click ? "mobile-nav" : "flexSB"} onClick={() => setClick(false)}>
                        <li><Link to="/">Página Inicial</Link></li>
                        <li><Link to="/cursos">Cursos</Link></li>
                        <li><Link to="/sobre">Sobre nós</Link></li>
                        <li><Link to="/faq">FAQ</Link></li>
                        <li><Link to="/eventos">Eventos</Link></li>
                        {role === 'Estudante' && <li><Link to="/livros">Livros</Link></li>} {/* Condicional */}
                        <li><Link to="/contactos">Contactos</Link></li>
                        
                    </ul>
                    <div className="start">
                        <div className="button"><Link to="/login">ENTRAR NA BIBLIOTECA</Link></div>
                    </div>
                    <button className='toggle' onClick={() => setClick(!click)}>
                        { click ? <IoCloseOutline /> : <TbMenuDeep /> }
                    </button>
                </nav>
            </header>
        </div>
    );
}
