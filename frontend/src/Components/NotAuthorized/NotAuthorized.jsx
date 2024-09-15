
// eslint-disable-next-line no-unused-vars
import React from 'react';

export default function NotAuthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-red-600 p-8 rounded-sm shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Acesso Negado</h2>
        <p className="text-center text-white">Você não tem permissão para acessar esta página.</p>
      </div>
    </div>
  );
}
