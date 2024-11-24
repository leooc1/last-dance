import sino from '../../public/sino.svg';
import user from '../../public/user.svg';
import { useLocation, Link } from 'react-router-dom';

export default function Header() {
    const location = useLocation();
    const isEmpPage = location.pathname === '/emp' || location.pathname === '/';

    return (
        <header className='flex justify-end px-8 py-4 gap-8'>
            <img className='w-8 h-fit' src={sino} alt="notificação" />
            <Link to={isEmpPage ? '/mem' : '/emp'}>
                <img className='w-8 h-fit' src={user} alt="usuário" />
            </Link>
        </header>
    );
}
