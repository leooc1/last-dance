import React from 'react';

interface InputProps {
    label: string;
    type: string;
    value: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name: string; // Adicionado para passar o nome do campo
    required?: boolean; // Tornar o campo opcionalmente obrigatório
}

export default function Input({ label, type, value, placeholder, onChange, name, required }: InputProps) {
    return (
        <div className="flex flex-col mb-4">
            <label className="mb-1 text-gray-700">{label}</label>
            <input
                type={type}
                name={name} // Vincula ao estado pelo nome
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                required={required} // Para suportar validação nativa
                className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
            />
        </div>
    );
}
