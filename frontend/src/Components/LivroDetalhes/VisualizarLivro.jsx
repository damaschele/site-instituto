/* eslint-disable no-unused-vars */
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Back from '../Back/Back';

const VisualizarLivro = () => {
    const { codigo } = useParams(); // Pega o código do livro da URL
    const [livro, setLivro] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // Instância do plugin para o layout padrão do visualizador de PDF
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

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
        return <p>Carregando livro...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <>
            <Back title="Visualizar Livro" />
            <div className="min-h-screen bg-gray-100 p-6 flex">
                <div className="container mx-auto bg-white p-6 rounded shadow-md">
                    {livro && (
                        <>
                            <div className="flex flex-col md:flex-row">
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
                                        <div className="text-lg font-semibold mb-2">Conteúdo do Livro (PDF):</div>
                                        <div className="pdf-container h-[600px] border border-gray-300">
                                            {livro.livro ? (
                                                <Worker workerUrl={`https://unpkg.com/pdfjs-dist@2.9.359/build/pdf.worker.min.js`}>
                                                    <Viewer
                                                        fileUrl={livro.livro} // URL do PDF retornado pela API
                                                        plugins={[defaultLayoutPluginInstance]}
                                                    />
                                                </Worker>
                                            ) : (
                                                <p>O PDF do livro não está disponível.</p>
                                            )}
                                        </div>
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

export default VisualizarLivro;
