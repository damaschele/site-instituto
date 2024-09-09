// eslint-disable-next-line no-unused-vars
import React from 'react'
import Titlo from '../../titlo/titlo'
import "./hero.css"

export default function Hero() {
return (
<>
<section className='hero'>
    <div className="container">
        <div className="row">
            <Titlo subtitle="BEM VINDO AO IMPN" title="Instituto Técnico Profissional de Excelência"/>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, 
                perspiciatis repellendus non delectus alias nisi. Nulla itaque deserunt 
                veritatis reiciendis.</p>

            <div className="button">
                <button className='primary-btn'>
                    INSCREVA - SE <i className='fa fa-arrow-right'></i>
                </button>
                <button>
                    VER OS CURSOS <i className='fa fa-arrow-right'></i>
                </button>
            </div>
        </div>
    </div>
    </section>
    <div className="margin"></div>
</>
)
}
