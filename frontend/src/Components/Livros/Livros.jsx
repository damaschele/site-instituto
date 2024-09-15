import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Back from '../Back/Back';
import WelcomeAlert from '../Welcome/WelcomeAlert';
import "./livros.css";

export default function Livros() {
    // Estado para armazenar livros e categorias
    const [livros, setLivros] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [pesquisa, setPesquisa] = useState('');
    const navigate = useNavigate();

    // Verifica o perfil do usuário no localStorage
    const role = localStorage.getItem('role');

    // Função para buscar livros
    const buscarLivros = async (query) => {
        try {
            const resposta = await axios.get(`http://localhost:8080/api/livros?search=${query}`);
            setLivros(resposta.data);
        } catch (erro) {
            console.error('Erro ao buscar livros:', erro);
        }
    };

    // Função para buscar categorias
    const buscarCategorias = async () => {
        try {
            const resposta = await axios.get('http://localhost:8080/api/categorias');
            setCategorias(resposta.data);
        } catch (erro) {
            console.error('Erro ao buscar categorias:', erro);
        }
    };

    useEffect(() => {
        buscarCategorias();
        buscarLivros(pesquisa);
    }, [pesquisa]);

    return (
        <>
            <Back title="Portal da Biblioteca" />
            <div className="min-h-screen bg-gray-100 p-6 relative flex mt-[-15rem]">
                {role === 'estudante' && <WelcomeAlert />}
                <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-6">Livros</h1>
                    <div className="mb-4 flex items-center text-center space-x-4">
                        <input
                            type="text"
                            placeholder="Pesquisar livros..."
                            value={pesquisa}
                            onChange={(e) => setPesquisa(e.target.value)}
                            className="p-2 border border-gray-300 rounded-full w-[600px] h-[50px]"
                        />
                        <button
                            onClick={() => buscarLivros(pesquisa)}
                            className="flex bg-blue-500 text-white p-2 ml-[-3rem!important] items-center rounded-full h-[40px] w-[40px]"
                        >
                            <FaSearch />
                        </button>
                    </div>
                    <div className="flex">
                        {/* Menu de Categorias */}
                        <div className="w-1/6 bg-white p-4 border-r border-gray-300">
                            <h2 className="text-xl font-semibold mb-4">Categorias</h2>
                            <ul>
                                {categorias.map((categoria) => (
                                    <li key={categoria.id} className="mb-2 text-white mt-auto text-center p-2 hover:rounded-md hover:border hover:p-2 border-gray-300">
                                        <a href={`http://localhost:8080/categoria/${categoria.id}`} className="text-blue-600">
                                            {categoria.nome}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* Lista de Livros */}
                        <div className="w-3/4 p-4">
                            <h2 className="text-xl font-semibold mb-4">Lista de Livros</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">
                                {livros.map((livro) => (
                                    <div key={livro.id} className="bg-white p-1 border border-gray-300 w-[250px] rounded-sm shadow-sm flex flex-col">
                                        <img
                                            src={`http://localhost:8080/api/livros/foto/${livro.foto}`} // Certifique-se de que 'livro.fotoUrl' é a URL da foto
                                            alt={livro.foto}
                                            className="w-full h-60 object-cover mb-4 rounded-sm"
                                        />
                                        <h3 className="text-lg font-semibold mb-2">{livro.titulo}</h3>
                                        <p className="text-gray-600 mb-4 overflow-hidden text-ellipsis text-sm line-clamp-2">
                                            {livro.descricao}
                                        </p>
                                            <button
                                                onClick={() => navigate(`/detalhes/livros/${livro.codigo}`)}
                                                className="text-blue-600 hover:bg-[#0F45B1] mt-auto text-center p-2 text-white cursor-pointer bg-[#0F45A3] border border-gray-300"
                                            >
                                                Ver detalhes
                                            </button>

                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
