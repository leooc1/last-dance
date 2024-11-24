import React, { useEffect, useState } from 'react';
import Input from '../components/Input';

export default function CadastroEvento() {

    const [formData, setFormData] = useState({
        nome: '',
        descricao: '',
        dataHoraInicio: '',
        dataHoraFim: '',
        local: '',
        capacidade: '',
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/eventos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome: formData.nome,
                    descricao: formData.descricao,
                    data_hora_inicio: formData.dataHoraInicio,
                    data_hora_fim: formData.dataHoraFim,
                    local: formData.local,
                    capacidade: parseInt(formData.capacidade, 10),
                }),
            });

            if (response.ok) {
                alert('Evento cadastrado com sucesso!');
                setFormData({
                    nome: '',
                    descricao: '',
                    dataHoraInicio: '',
                    dataHoraFim: '',
                    local: '',
                    capacidade: '',
                });
            } else {
                const errorData = await response.json();
                alert(`Erro ao cadastrar evento: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Erro ao cadastrar evento. Tente novamente mais tarde.');
        }
    };

    useEffect(() => {
        if (location.search.length > 0) {

            const queryString = location.search.split('?')[1];

            const jsonString = decodeURIComponent(queryString);
            const jsonObject = JSON.parse(jsonString);
            setFormData({
                nome: jsonObject.titulo,
                descricao: jsonObject.descricao,
                dataHoraInicio: jsonObject.data_inicio.slice(0,16),
                dataHoraFim: jsonObject.data_fim.slice(0,16),
                local: '',
                capacidade: '',
            })
        }
    }, [])

    return (
        <main className="flex justify-center items-center h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded shadow-md w-full max-w-lg"
            >
                <h1 className="text-2xl font-bold mb-6 text-center">Cadastro de Evento</h1>
                <Input
                    label="Nome do Evento"
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    placeholder="Digite o nome do evento"
                    required
                />
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Descrição</label>
                    <textarea
                        name="descricao"
                        value={formData.descricao}
                        onChange={handleChange}
                        placeholder="Digite a descrição do evento"
                        className="w-full p-2 border rounded"
                        rows={4}
                    />
                </div>
                <Input
                    label="Data e Hora de Início"
                    type="datetime-local"
                    name="dataHoraInicio"
                    value={formData.dataHoraInicio}
                    onChange={handleChange}
                    required
                />
                <Input
                    label="Data e Hora de Fim"
                    type="datetime-local"
                    name="dataHoraFim"
                    value={formData.dataHoraFim}
                    onChange={handleChange}
                    required
                />
                <Input
                    label="Local"
                    type="text"
                    name="local"
                    value={formData.local}
                    onChange={handleChange}
                    placeholder="Digite o local do evento"
                />
                <Input
                    label="Capacidade"
                    type="number"
                    name="capacidade"
                    value={formData.capacidade}
                    onChange={handleChange}
                    placeholder="Digite a capacidade máxima"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded mt-4"
                >
                    Cadastrar Evento
                </button>
            </form>
        </main>
    );
}
