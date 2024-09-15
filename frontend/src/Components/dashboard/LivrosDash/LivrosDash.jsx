import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { FaBook, FaPlus } from 'react-icons/fa';
import LivrosTable from './LivrosTable';

export default function LivrosDash() {
  const [livros, setLivros] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [showLivroModal, setShowLivroModal] = useState(false);
  const [showCategoriaModal, setShowCategoriaModal] = useState(false);
  const [novoLivro, setNovoLivro] = useState({
    titulo: '',
    descricao: '',
    foto: null,
    livro: null,
    categoriaId: '',
  });
  const [novaCategoria, setNovaCategoria] = useState({ nome: '' });
  const [livroError, setLivroError] = useState('');
  const [categoriaError, setCategoriaError] = useState('');
  const [sucesso, setSucesso] = useState(''); // Novo estado para mensagem de sucesso

  useEffect(() => {
    carregarLivros();
    carregarCategorias();
  }, []);

  const carregarLivros = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/livros');
      setLivros(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Erro ao carregar livros", error);
    }
  };

  const carregarCategorias = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/categorias');
      setCategorias(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Erro ao carregar categorias", error);
    }
  };

  const handleRegistrarLivro = async () => {
    // Validação dos campos
    if (!novoLivro.titulo || !novoLivro.descricao || !novoLivro.foto || !novoLivro.livro || !novoLivro.categoriaId) {
      setLivroError('Todos os campos são obrigatórios.');
      return;
    }

    const formData = new FormData();
    formData.append('titulo', novoLivro.titulo);
    formData.append('descricao', novoLivro.descricao);
    formData.append('foto', novoLivro.foto);
    formData.append('livro', novoLivro.livro);
    formData.append('categoriaId', novoLivro.categoriaId);

    try {
      await axios.post('http://localhost:8080/api/livros/registrar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      carregarLivros();
      setShowLivroModal(false);
      setNovoLivro({
        titulo: '',
        descricao: '',
        foto: null,
        livro: null,
        categoriaId: '',
      });
      setLivroError('');
      setSucesso('Livro registrado com sucesso!'); // Mensagem de sucesso
      setTimeout(() => setSucesso(''), 3000); 
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setLivroError('Erro ao cadastrar');
    }
  };

  const handleRegistrarCategoria = async () => {
    if (!novaCategoria.nome) {
      setCategoriaError('Nome da categoria é obrigatório.');
      return;
    }

    try {
      await axios.post('http://localhost:8080/api/categorias', novaCategoria);
      carregarCategorias();
      setShowCategoriaModal(false);
      setNovaCategoria({ nome: '' });
      setCategoriaError('');
      setSucesso('Categoria registrada com sucesso!'); 
      setTimeout(() => setSucesso(''), 3000); 
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setCategoriaError('Erro ao cadastrar');
    }
  };

  return (
    <div className="p-4">
      {/* Barra de Mensagem de Sucesso */}
      {sucesso && (
        <div className="fixed top-0 left-0 right-0 bg-green-500 text-white p-4 text-center">
          {sucesso}
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        {/* Widget 1: Quantidade de Livros */}
        <div className="p-4 bg-white shadow-lg rounded-sm flex items-center mb-5" style={{ boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)', marginBottom: '20px' }}>
          <FaBook className="text-3xl text-blue-500" />
          <div className="ml-4">
            <h3 className="text-lg font-semibold">Total de Livros</h3>
            <p className="text-2xl font-bold">{livros.length}</p>
          </div>
        </div>

        {/* Widget 2: Registrar Livro */}
        <div className="p-4 bg-white shadow-lg rounded-sm relative mb-5" style={{ boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)', marginBottom: '20px' }}>
          <h3 className="text-lg font-semibold">Registrar Livro</h3>
          <p className="text-sm text-gray-600">Adicione novos livros ao catálogo.</p>
          <FaPlus 
            className="absolute top-2 right-2 cursor-pointer text-blue-500" 
            onClick={() => setShowLivroModal(true)} 
          />
        </div>

        {/* Widget 3: Registrar Categoria */}
        <div className="p-4 bg-white shadow-lg rounded-sm relative mb-5" style={{ boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)', marginBottom: '20px' }}>
          <h3 className="text-lg font-semibold">Registrar Categoria</h3>
          <p className="text-sm text-gray-600">Adicione novas categorias de livros.</p>
          <FaPlus 
            className="absolute top-2 right-2 cursor-pointer text-blue-500" 
            onClick={() => setShowCategoriaModal(true)} 
          />
        </div>
      </div>
      <LivrosTable />
      {/* Modal de Registrar Livro */}
      {showLivroModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <form className="bg-white w-[500px] p-6 rounded-sm shadow-lg">
            <h3 className="text-lg font-semibold">Registrar Novo Livro</h3>
            {livroError && <p className="text-red-500 mb-2">{livroError}</p>}
            <input
              type="text"
              placeholder="Título"
              value={novoLivro.titulo}
              onChange={(e) => setNovoLivro({ ...novoLivro, titulo: e.target.value })}
              className="border p-2 rounded w-full mb-2"
            />
            <textarea
              placeholder="Descrição"
              value={novoLivro.descricao}
              onChange={(e) => setNovoLivro({ ...novoLivro, descricao: e.target.value })}
              className="border p-2 rounded w-full mb-2"
            />
            <input
              type="file"
              onChange={(e) => setNovoLivro({ ...novoLivro, foto: e.target.files[0] })}
              className="border p-2 rounded w-full mb-2"
            />
            <input
              type="file"
              onChange={(e) => setNovoLivro({ ...novoLivro, livro: e.target.files[0] })}
              className="border p-2 rounded w-full mb-2"
            />
            <select
              value={novoLivro.categoriaId}
              onChange={(e) => setNovoLivro({ ...novoLivro, categoriaId: e.target.value })}
              className="border p-2 rounded w-full mb-2"
            >
              <option value="">Selecione a Categoria</option>
              {categorias.map(categoria => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nome}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={handleRegistrarLivro}
              className="bg-blue-500 text-white p-2 rounded-sm w-[220px]"
            >
              Registrar
            </button>
            <button
              type="button"
              onClick={() => setShowLivroModal(false)}
              className="bg-red-500 text-white p-2 rounded-sm mt-2 w-[220px] ml-2"
            >
              Cancelar
            </button>
          </form>
        </div>
      )}
      {/* Modal de Registrar Categoria */}
      {showCategoriaModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <form className="bg-white w-[300px] p-6 rounded-sm shadow-lg">
            <h3 className="text-lg font-semibold">Registrar Nova Categoria</h3>
            {categoriaError && <p className="text-red-500 mb-2">{categoriaError}</p>}
            <input
              type="text"
              placeholder="Nome da Categoria"
              value={novaCategoria.nome}
              onChange={(e) => setNovaCategoria({ nome: e.target.value })}
              className="border p-2 rounded w-full mb-2"
            />
            <button
              type="button"
              onClick={handleRegistrarCategoria}
              className="bg-blue-500 text-white p-2 rounded-sm w-[220px]"
            >
              Registrar
            </button>
            <button
              type="button"
              onClick={() => setShowCategoriaModal(false)}
              className="bg-red-500 text-white p-2 rounded-sm mt-2 w-[220px] ml-2"
            >
              Cancelar
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
