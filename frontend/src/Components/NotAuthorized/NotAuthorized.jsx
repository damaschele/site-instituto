// src/Components/NotAuthorized/NotAuthorized.jsx
import React from 'react';

export default function NotAuthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Acesso Negado</h2>
        <p className="text-center">Você não tem permissão para acessar esta página.</p>
      </div>
    </div>
  );
}
