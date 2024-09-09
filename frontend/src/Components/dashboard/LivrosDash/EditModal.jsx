import axios from 'axios';
import React, { useState } from 'react';

const EditModal = ({ livro, onClose }) => {
    const [titulo, setTitulo] = useState(livro.titulo);
    const [descricao, setDescricao] = useState(livro.descricao);

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:8080/api/livros/${livro.id}`, {
                titulo,
                descricao,
            });
            alert('Livro atualizado com sucesso!');
            onClose(); // Fecha o modal após salvar
        } catch (err) {
            alert('Erro ao atualizar o livro.');
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h2 className="text-xl font-bold mb-4">Editar Livro</h2>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Título</label>
                    <input
                        className="border border-gray-300 p-2 w-full"
                        type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Descrição</label>
                    <textarea
                        className="border border-gray-300 p-2 w-full"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleSave}
                    >
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditModal;
