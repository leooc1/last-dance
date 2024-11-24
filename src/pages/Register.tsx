import { useState } from 'react';
import RegisterForm from '../components/forms/RegisterForm';

export default function Register() {
    const [userType, setUserType] = useState<string | null>(null);

    const handleUserTypeSelect = (type: string) => {
        setUserType(type);
    };

    return (
        <main className="flex flex-col items-center justify-center h-screen bg-gray-100">
            {!userType ? (
                <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                    <h2 className="text-2xl mb-6 text-center">Escolha o tipo de conta</h2>
                    <button
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded mb-4"
                        onClick={() => handleUserTypeSelect('empresa')}
                    >
                        Empresa
                    </button>
                    <button
                        className="w-full bg-green-500 text-white py-2 px-4 rounded"
                        onClick={() => handleUserTypeSelect('membro')}
                    >
                        Membro
                    </button>
                </div>
            ) : (
                <RegisterForm userType={userType} />
            )}
        </main>
    );
}
