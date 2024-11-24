import CompanyForm from './CompanyForm';
import MemberForm from './MemberForm';

interface RegisterFormProps {
    userType: string;
}

export default function RegisterForm({ userType }: RegisterFormProps) {
    return (
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
            <h2 className="text-2xl mb-6 text-center">
                Cadastro de {userType === 'empresa' ? 'Empresa' : 'Membro'}
            </h2>
            {userType === 'empresa' ? <CompanyForm /> : <MemberForm />}
        </div>
    );
}
