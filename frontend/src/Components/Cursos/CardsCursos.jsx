import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import "./cardsCursos.css";

export default function CardsCursos() {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current.scrollLeft -= 300; // Ajuste o valor conforme necessário
  };

  const scrollRight = () => {
    sliderRef.current.scrollLeft += 300; // Ajuste o valor conforme necessário
  };

  const cursos = [
    { id: 1, titulo: "Técnico de Medicina Geral", descricao: "Formação abrangente para atuar na área de medicina geral.", img: "../../../images/tmg.jpg" },
    { id: 2, titulo: "Técnico de Medicina Preventiva e Saneamento do Meio", descricao: "Especialização em prevenção de doenças e saneamento ambiental.", img: "../../../images/ts.jpg" },
    { id: 3, titulo: "Técnico de Enfermagem Geral", descricao: "Capacitação em cuidados de enfermagem em diversas áreas da saúde.", img: "../../../images/c1.jpg" },
    { id: 4, titulo: "Técnico de Saúde Materna Infantil", descricao: "Formação focada em cuidados de saúde para mães e crianças.", img: "../../../images/smi.jpg" },
    { id: 5, titulo: "CV3 em Contabilidade", descricao: "Curso de contabilidade nível CV3 com foco em práticas contábeis.", img: "../../../images/cv1.jpg" },
    { id: 6, titulo: "CV4 em Contabilidade", descricao: "Curso de contabilidade nível CV4 com aprofundamento em contabilidade gerencial.", img: "../../../images/cv2.jpg" },
    { id: 7, titulo: "CV5 em Contabilidade", descricao: "Curso de contabilidade nível CV5 com foco em auditoria e controladoria.", img: "../../../images/cv3.jpg" },
    { id: 8, titulo: "CV3 em Secretariado", descricao: "Capacitação em técnicas de secretariado e gestão administrativa.", img: "../../../images/s.jpg" }
  ];

  return (
    <div className="cards-slider-container w-full">
      <button className="scroll-button left" onClick={scrollLeft}>←</button>
      <div className="cards-slider w-full" ref={sliderRef}>
        {cursos.map((curso) => (
          <div key={curso.id} className="card">
            <img src={curso.img} alt={curso.titulo} className="card-image" />
            <h3 className="card-title">{curso.titulo}</h3>
            <p className="card-description">{curso.descricao}</p>
            <Link to={`/cursos/${curso.id}`} className="card-button">
              <button>Ver Detalhes</button>
            </Link>
          </div>
        ))}
      </div>
      <button className="scroll-button right" onClick={scrollRight}>→</button>
    </div>
  );
}
