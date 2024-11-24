import React, { useState } from 'react';
import Input from '../Input';
import axios from 'axios';
export default function CompanyForm() {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        cnpj: '',
    });

    const [error, setError] = useState<string | null>(null); const [loading, setLoading] = useState(false);
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
                password: 'defaultpassword', nome: formData.nome,
                cnpj: formData.cnpj,
                userType: 'empresa',
            });

            console.log('Cadastro de empresa realizado com sucesso:', response.data);
            alert('Empresa cadastrada com sucesso!');
        } catch (err: any) {
            setError('Erro ao cadastrar a empresa: ' + (err.response?.data?.message || err.message));
            console.error('Erro no cadastro:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Input
                label="Nome da Empresa"
                type="text"
                name="nome"
                value={formData.nome}
                placeholder="Digite o nome da empresa"
                onChange={handleChange}
            />
            <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                placeholder="Digite o email da empresa"
                onChange={handleChange}
            />
            <Input
                label="CNPJ"
                type="text"
                name="cnpj"
                value={formData.cnpj}
                placeholder="Digite o CNPJ da empresa"
                onChange={handleChange}
            />
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded mt-4"
                disabled={loading}
            >
                {loading ? 'Cadastrando...' : 'Cadastrar Empresa'}
            </button>
        </form>
    );
}
