import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';
import EditModal from './EditModal';

const LivrosTable = () => {
    const [livros, setLivros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedLivro, setSelectedLivro] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [sucesso, setSucesso] = useState('');

    // Função para buscar a lista de livros
    const fetchLivros = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/livros');
            setLivros(response.data);
            setLoading(false);
        } catch (err) {
            setError('Erro ao buscar a lista de livros');
            setLoading(false);
        }
    };

    // Função para remover livro
    const handleRemoverLivro = async (id) => {
        if (!window.confirm('Tem certeza que deseja remover este livro?')) return;
    
        try {
          await axios.delete(`http://localhost:8080/api/livros/${id}`);
          setLivros((prevLivros) => prevLivros.filter((livro) => livro.id !== id));
          setSucesso('Livro removido com sucesso!');
          console.log("Livro removido, ID:", id);
        } catch (error) {
          console.error('Erro ao remover livro', error);
        }
    };

    // Função para abrir o modal de edição
    const handleEditar = (livro) => {
        setSelectedLivro(livro);
        setShowEditModal(true);
    };

    useEffect(() => {
        fetchLivros();
    }, []);

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h2>Lista de Livros</h2>
            <table className="table-auto w-full border-collapse border border-gray-200">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border px-4 py-2">ID</th>
                        <th className="border px-4 py-2">Título</th>
                        <th className="border px-4 py-2">Descrição</th>
                        <th className="border px-4 py-2">Categoria</th>
                        <th className="border px-4 py-2">Foto</th> {/* Coluna para Foto */}
                        <th className="border px-4 py-2">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {livros.map((livro) => (
                        <tr key={livro.id}>
                            <td className="border px-4 py-2">{livro.codigo}</td>
                            <td className="border px-4 py-2">{livro.titulo}</td>
                            <td className="border px-4 py-2">{livro.descricao}</td>
                            <td className="border px-4 py-2">{livro.categoria ? livro.categoria.nome : 'N/A'}</td>
                            <td className="border px-4 py-2 align-center">
                                {livro.foto ? (
                                    <img src={`http://localhost:8080/api/livros/foto/${livro.foto}`} alt={livro.foto} width="50" />
                                ) : (
                                    <p>{livro.foto}</p>
                                )}
                            </td>
                            <td className="border px-4 py-2">
                                <button
                                    className="bg-green-500 hover:bg-green-700 h-[35px] w-[35px] text-white font-bold py-1 px-2 rounded mr-2"
                                    onClick={() => handleEditar(livro)}
                                >
                                    <FiEdit />
                                </button>
                                <button
                                    className="bg-red-500 hover:bg-red-700 h-[35px] w-[35px] text-white font-bold py-1 px-2 rounded"
                                    onClick={() => handleRemoverLivro(livro.codigo)}
                                >
                                   <MdDelete />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal de Edição */}
            {showEditModal && (
                <EditModal livro={selectedLivro} onClose={() => setShowEditModal(false)} />
            )}
        </div>
    );
};

export default LivrosTable;
