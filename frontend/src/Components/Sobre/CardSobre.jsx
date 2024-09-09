// eslint-disable-next-line no-unused-vars
import React from 'react';
import { FaBalanceScale, FaBullseye, FaEye } from 'react-icons/fa';

export default function CardSobre() {
    return (
        <div className="container mx-auto py-12 -z-[1]">
            <div className="grid md:grid-cols-3 gap-8">
                {/* Missão */}
                <div className="flex flex-col items-center bg-[#5FA1AE] p-6 rounded-sm shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
                    <FaBullseye className="text-4xl text-white mb-4" />
                    <h2 className="text-2xl font-semibold text-white mb-2">Missão</h2>
                    <p className="text-white text-justify">
                        Nossa missão é proporcionar um ambiente de aprendizado de alta qualidade que fomente o desenvolvimento pessoal e profissional.
                    </p>
                </div>
                
                {/* Visão */}
                <div className="flex flex-col items-center bg-[#5FA1AE] p-6 rounded-sm shadow-sm transition-transform transform hover:scale-105 hover:shadow-xl">
                    <FaEye className="text-4xl text-white mb-4" />
                    <h2 className="text-2xl font-semibold text-white mb-2">Visão</h2>
                    <p className="text-white text-justify">
                    Ser lider em formação técnico profissional, formando competentes profissionais e honestos cidadãos que respondam cabalmente as necessidade  das organizações a nível provincial, nacional e regional.
                    </p>
                </div>
                
                {/* Princípios */}
                <div className="flex flex-col items-center bg-[#5FA1AE] p-6 rounded-sm shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
                    <FaBalanceScale className="text-4xl text-white mb-4" />
                    <h2 className="text-2xl font-semibold text-white mb-2">Princípios</h2>
                    <p className="text-white text-justify">
                        Nossos princípios são baseados na ética, integridade e compromisso com a excelência em todas as nossas ações e decisões.
                    </p>
                </div>
            </div>
        </div>
    );
}
