import React, { useState } from 'react';
import Input from '../Input';
import axios from 'axios'; 

export default function MemberForm() {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telefone: '',
    });

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:5000/auth/register', {
                email: formData.email,
                password: 'defaultpassword', 
                nome: formData.nome,
                telefone: formData.telefone,
                userType: 'membro' 
            });

            console.log('Cadastro realizado com sucesso:', response.data);
            alert('Membro cadastrado com sucesso!');
        } catch (err: any) {
            setError('Erro ao cadastrar o membro: ' + (err.response?.data?.message || err.message));
            console.error('Erro no cadastro:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Input
                label="Nome Completo"
                type="text"
                name="nome"
                value={formData.nome}
                placeholder="Digite seu nome"
                onChange={handleChange}
            />
            <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                placeholder="Digite seu email"
                onChange={handleChange}
            />
            <Input
                label="Telefone"
                type="tel"
                name="telefone"
                value={formData.telefone}
                placeholder="Digite seu telefone"
                onChange={handleChange}
            />
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 px-4 rounded mt-4"
                disabled={loading}
            >
                {loading ? 'Cadastrando...' : 'Cadastrar Membro'}
            </button>
        </form>
    );
}
