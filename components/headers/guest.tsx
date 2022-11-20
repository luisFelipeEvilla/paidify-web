import Image from 'next/image';
import Router from 'next/router';

const Header = () => {
    
    const handleLogin = () => Router.push('/signin');

    return (
        <nav className='flex justify-between mx-32 mt-4 pb-2'>
            <a href='/guest' className='self-end'>
                <Image src='/images/logo.svg' width={160} height={40} />
            </a>
            <li className='mt-2 text-white text-base'>
                <button
                    onClick={handleLogin} className='rounded-2xl text-center py-2.5 px-4 font-bold text-lg'
                >
                    Iniciar sesión
                </button>
            </li>
        </nav>
    );
}

export default Header;