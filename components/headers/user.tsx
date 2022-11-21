import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { ACCESS_TOKEN } from '../../utils/constants';

const Header = () => {
    const [cookie, setCookie, removeCookie] = useCookies([ACCESS_TOKEN]);
    const router = useRouter();

    const handleLogout = async () => {
        removeCookie(ACCESS_TOKEN);
        await router.replace('/signin');
    }

    return (
        <nav className='flex justify-between mx-32 mt-4 pb-2'>
            <a href='/user' className='self-end'>
                <Image src='/images/logo.svg' width={160} height={40} />
            </a>
            <ul className='flex justify-around font-bold text-base'>
                <li className='mr-8 mt-4'>
                    <Link href='/user'><a>
                        Facturas
                    </a></Link>
                </li>
                {/* <li className='mr-8 mt-4'>
                    <Link href='/user/payment-concepts'><a>
                        Conceptos de Pago
                    </a></Link>
                </li> */}
                <li className='mr-8 mt-4'>
                    <Link href='/user/history'><a>
                        Histórico
                    </a></Link>
                </li>
                <li className='mr-8 mt-4'>
                    <Link href='/user/payment-methods'><a>
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
