// src/pages/Home.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();

    const handleNavigate = (userType: string) => {
        if (userType === 'membro') {
            navigate('/mem');
        } else if (userType === 'empresa') {
            navigate('/emp');
        }
    };

    return (
        <main className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl mb-6 text-center">Bem-vindo ao Sistema</h2>
                <p className="text-center mb-4">Escolha a sua página inicial:</p>
                <button
                    className="w-full bg-green-500 text-white py-2 px-4 rounded mb-4"
                    onClick={() => handleNavigate('membro')}
                >
                    Ir para Home do Membro
                </button>
                <button
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded"
                    onClick={() => handleNavigate('empresa')}
                >
                    Ir para Home da Empresa
                </button>
            </div>
        </main>
    );
}
