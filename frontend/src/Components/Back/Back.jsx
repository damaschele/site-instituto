// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useLocation } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
export default function Back({title}) {
    const location = useLocation();
  return (
    <div>
        <section className="back">
            <h2>Pagina/ {location.pathname.split("/")[1]}</h2>
            <h1>{title}</h1>
        </section>
        <div className="marigin"></div>
    </div>
  )
}
