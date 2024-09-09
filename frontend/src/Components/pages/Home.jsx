// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import CardsCursos from '../Cursos/CardsCursos';
import CardSobre from '../Sobre/CardSobre';
import Titlo from '../titlo/titlo';
import Hero from './hero/hero';
import './Home.css';

export default function Home() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Atraso para garantir que a animação só começa depois do componente ser montado
    setTimeout(() => {
      setAnimate(true);
    }, 100); // você pode ajustar esse tempo, se necessário
  }, []);

  return (
    <div>
      <Hero />
      <div className={`cards container ${animate ? 'animate' : ''}`}>
        <CardSobre />
      </div>
      <div className="cardscursos conatiner">
        <Titlo title="CURSOS LECIONADOS" />
        <CardsCursos />
      </div>
    </div>
  );
}
