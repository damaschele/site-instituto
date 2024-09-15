/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Back from '../Back/Back';

const LivroDetalhes = () => {
    const { codigo } = useParams(); // Pega o ID do livro a partir da URL
    const [livro, setLivro] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Hook para navegação

    // Função para buscar os detalhes do livro
    const fetchLivroDetalhes = async () => {
        try {
            const resposta = await axios.get(`http://localhost:8080/api/livros/${codigo}`);
            setLivro(resposta.data);
            setLoading(false);
        } catch (erro) {
            setError('Erro ao buscar os detalhes do livro.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLivroDetalhes();
    }, [codigo]);

    if (loading) {
        return <p>Carregando detalhes do livro...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <>
            <Back title="Detalhes do Livro" />
            <div className="min-h-screen bg-gray-100 p-6 flex mt-[-15rem]">
                <div className="container mx-auto bg-white p-6 rounded shadow-md">
                    {livro && (
                        <>
                            <div className="flex flex-col md:flex-row">
                                <img
                                    src={`http://localhost:8080/api/livros/foto/${livro.foto}`} // Certifique-se de que 'livro.foto' seja válido
                                    alt={livro.titulo}
                                    className="w-full md:w-1/4 object-cover h-[400px] mb-4 md:mb-0 md:mr-6"
                                />
                                <div className="flex-1">
                                    <h2 className="text-3xl font-semibold mb-2">{livro.titulo}</h2>
                                    <p className="text-gray-700 mb-4">{livro.descricao}</p>
                                    <p className="text-gray-700 font-bold mb-2">
                                        Categoria: {livro.categoria ? livro.categoria.nome : 'N/A'}
                                    </p>
                                    <p className="text-gray-700 font-bold mb-2">
                                        Autor: {livro.autor || 'Desconhecido'}
                                    </p>
                                    <div className="mt-4">
                                        <button
                                            onClick={() => navigate(`/visualizar-livro/${livro.codigo}`)} // Navega para a página de visualização
                                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                                        >
                                            Ler Online
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default LivroDetalhes;
