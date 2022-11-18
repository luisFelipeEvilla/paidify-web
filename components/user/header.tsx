import Image from 'next/image';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { ACCESS_TOKEN } from '../../utils/constants';

const Header = () => {
    const [cookie, setCookie, removeCookie] = useCookies([ACCESS_TOKEN]);
    const router = useRouter();

    const handleLogout = async () => {
        await router.replace('/signin'); // first redirect; otherwise _app will get /user with no token and will redirect to /guest
        removeCookie(ACCESS_TOKEN);
    }

    return (
        <nav className='flex justify-between mx-32 mt-4'>
                <a href='/'>
                    <Image src='/images/logo.svg' width={200} height={55} />
                </a>
            <ul className='flex justify-around font-bold text-xl'>
                <li className='mr-8 mt-4'>
                    <Link href='/'><a>
                        Facturas
                    </a></Link>
                </li>
                <li className='mr-8 mt-4'>
                    <Link href='/history'><a>
                        Historico
                    </a></Link>
                </li>
                <li className='mr-8 mt-4'>
                    <Link href='/payment-methods'><a>
                        Métodos de pago
                    </a></Link>
                </li>
                <li className='mt-2 text-white'>
                    <button onClick={handleLogout} className='rounded-2xl text-center py-2.5 px-4'>Cerrar sesión</button>
                </li>
            </ul>
        </nav>
    );
}

export default Header;