// eslint-disable-next-line no-unused-vars
import React from 'react';
import Back from "../Back/Back";

const Welcome = () => (
  <div>
    <Back />
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
      <h1 className="text-2xl font-bold mb-4">Bem-vindo!</h1>
      <p>Obrigado por visitar a nossa aplicação. Sinta-se à vontade para explorar.</p>
    </div>
  </div>
);

export default Welcome;
