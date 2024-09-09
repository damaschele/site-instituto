// eslint-disable-next-line no-unused-vars
import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import GradientAreaChart from './GradientAreaChart';

export default function HomeDash() {
  const [modalOpen, setModalOpen] = useState(null);
  const [categorias, setCategorias] = useState([]);


  // Função para buscar as categorias no backend
  useEffect(() => {
    axios.get('/api/categorias')
      .then(response => {
        console.log(response.data);  // Verifique os dados aqui
        setCategorias(response.data);
      })
      .catch(error => {
        console.error('Erro ao carregar as categorias:', error);
      });
  }, []);


  const openModal = (type) => setModalOpen(type);
  const closeModal = () => setModalOpen(null);

  const renderModalContent = () => {
    switch (modalOpen) {
      case 'Livros':
        return (
          <form>
            <button
                className="relative top-[5px] left-[27rem] text-gray-500 hover:text-gray-700"
                onClick={closeModal}
              >
                <IoClose />
              </button>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
              <textarea className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-500 focus:border-indigo-500"></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Foto</label>
              <input type="file" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Conteúdo</label>
              <input type="file" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
              <select className='w-full px-4 py-2 border border-gray-300 rounded-md'>
                <option value="">Selecione uma categoria</option>
                {Array.isArray(categorias) && categorias.map(categoria => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.nome}
                  </option>
                ))}
              </select>

            </div>
            <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">Salvar Livro</button>
          </form>
        );
      case 'Eventos':
        return (
          <form>
             <button
                className="relative top-[5px] left-[27rem] text-gray-500 hover:text-gray-700"
                onClick={closeModal}
              >
                <IoClose />
              </button>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
              <input type="date" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
              <textarea className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-500 focus:border-indigo-500"></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Foto</label>
              <input type="file" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
            </div>
            <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">Salvar Evento</button>
          </form>
        );
      default:
        return (
          <form>
             <button
                className="relative top-[5px] left-[27rem] text-gray-500 hover:text-gray-700"
                onClick={closeModal}
              >
                <IoClose />
              </button>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
              <textarea className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-500 focus:border-indigo-500"></textarea>
            </div>
            <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">Salvar</button>
          </form>
        );
    }
  };

  return (
    <>
      <div className="content-homedash rounded-xl bg-white p-4">
        <div className="relative h-[350px] rounded-xl bg-cover bg-center" style={{ backgroundImage: "url('/images/head.jpg')" }}>
          <div className="absolute inset-0 bg-black rounded-xl bg-opacity-30"></div>
          <div className="relative z-10 flex flex-col items-start p-4 justify-center h-full text-white text-left">
            <h1 className="text-6xl font-semibold mb-2">Bem-vindo ao Painel de Controle</h1>
            <p className="text-lg mb-4">Acesso restrito a administradores e operadores autorizados.</p>
            <button className="bg-blue-600 px-6 py-2 rounded-sm w-[200px] hover:bg-blue-700 transition duration-300">Explorar</button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <div className="widget bg-white rounded-sm shadow-lg p-4 relative">
            <div className="flex justify-between">
              <h3 className="text-xl font-semibold">IMPN</h3>
              <FaPlus className="text-blue-600 cursor-pointer" onClick={() => openModal('IMPN')} />
            </div>
            <p className="text-sm text-gray-600 mt-2">Gerenciar as informações de impressão e relatórios.</p>
          </div>

          <div className="widget bg-white rounded-sm shadow-lg p-4 relative">
            <div className="flex justify-between">
              <h3 className="text-xl font-semibold">Cursos</h3>
              <FaPlus className="text-blue-600 cursor-pointer" onClick={() => openModal('Cursos')} />
            </div>
            <p className="text-sm text-gray-600 mt-2">Adicionar, editar ou remover cursos disponíveis.</p>
          </div>

          <div className="widget bg-white rounded-sm shadow-lg p-4 relative">
            <div className="flex justify-between">
              <h3 className="text-xl font-semibold">Livros</h3>
              <FaPlus className="text-blue-600 cursor-pointer" onClick={() => openModal('Livros')} />
            </div>
            <p className="text-sm text-gray-600 mt-2">Gerenciar o acervo de livros e materiais.</p>
          </div>

          <div className="widget bg-white rounded-sm shadow-lg p-4 relative">
            <div className="flex justify-between">
              <h3 className="text-xl font-semibold">Eventos</h3>
              <FaPlus className="text-blue-600 cursor-pointer" onClick={() => openModal('Eventos')} />
            </div>
            <p className="text-sm text-gray-600 mt-2">Organizar eventos e atividades escolares.</p>
          </div>
        </div>

        {/* Adicionando o gráfico de área aqui */}
        <div className="my-10">
          <GradientAreaChart />
        </div>

        {/* Modal de Livros */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[80%] sm:w-[500px]">
              {renderModalContent()}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
