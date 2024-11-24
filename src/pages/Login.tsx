// src/pages/Login.tsx
import React, { useState } from 'react';
import Input from '../components/Input';

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        senha: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const emei = document.getElementById('email') as HTMLInputElement
        const senha = document.getElementById('senha') as HTMLInputElement
        if (emei.value == 'allday@essencia.com' && senha.value == '123321') {
            alert('Logadei!!')
            location.assign('/')
        }
        else{
            alert('Login incorreto!')
        }
    };

    return (
        <main className="flex items-center justify-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl mb-6 text-center">Login</h2>
                <div className="flex flex-col mb-4">
                    <label className="mb-1 text-gray-700">Email</label>
                    <input
                        id='email'
                        type={'email'}
                        // value={formData.email}
                        placeholder={'Digite seu email'}
                        className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label className="mb-1 text-gray-700">Senha</label>
                    <input
                        id='senha'
                        type={'password'}
                        // value={formData.senha}
                        placeholder={'Digite sua senha'}
                        className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded mt-4"
                >
                    Entrar
                </button>
            </form>
        </main>
    );
}
