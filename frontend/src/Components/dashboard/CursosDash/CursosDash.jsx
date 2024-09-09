// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa'; // Usando react-icons para o ícone de "+"

export default function CursosDash() {
    const [showCourseModal, setShowCourseModal] = useState(false);
    const [showCategoryModal, setShowCategoryModal] = useState(false);

    // Contador de cursos, você pode pegar esse número do backend
    const courseCount = 10;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
            {/* Widget 1: Contagem de cursos */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-left">
                <h2 className="text-xl font-semibold text-[#0049AD] mb-2">Total de Cursos</h2>
                <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">Veja quantos cursos estão disponíveis no sistema</p>
                    <p className="text-2xl font-bold rounded-lg text-[#0049AD]">{courseCount}</p>
                </div>

            </div>

            {/* Widget 2: Registrar curso */}
            <div
                className="bg-white shadow-lg rounded-lg p-6 relative cursor-pointer"
                onClick={() => setShowCourseModal(true)}
            >
                <h2 className="text-xl font-semibold text-[#0049AD] mb-2">Adicionar Curso</h2>
                <p className="text-sm text-gray-500 mb-4">Clique para registrar um novo curso</p>
                <FaPlus className="text-xl text-[#0049AD] absolute top-3 right-3" />
            </div>

            {/* Modal para registrar curso */}
            {showCourseModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Registrar Curso</h2>
                        <form>
                            <input type="text" placeholder="Nome do Curso" className="w-full p-2 mb-4 border rounded" />
                            <button className="bg-green-500 text-white px-4 py-2 rounded">Registrar</button>
                            <button onClick={() => setShowCourseModal(false)} className="ml-4 text-red-500">Cancelar</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Widget 3: Registrar categoria */}
            <div
                className="bg-white shadow-lg rounded-lg p-6 relative cursor-pointer"
                onClick={() => setShowCategoryModal(true)}
            >
                <h2 className="text-xl font-semibold text-[#0049AD] mb-2">Adicionar Categoria</h2>
                <p className="text-sm text-gray-500 mb-4">Clique para registrar uma nova categoria</p>
                <FaPlus className="text-xl text-[#0049AD] absolute top-3 right-3" />
            </div>

            {/* Modal para registrar categoria */}
            {showCategoryModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Registrar Categoria</h2>
                        <form>
                            <input type="text" placeholder="Nome da Categoria" className="w-full p-2 mb-4 border rounded" />
                            <button className="bg-blue-500 text-white px-4 py-2 rounded">Registrar</button>
                            <button onClick={() => setShowCategoryModal(false)} className="ml-4 text-red-500">Cancelar</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
