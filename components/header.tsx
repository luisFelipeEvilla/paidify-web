import Image from "next/image";
import Link from "next/link";
import { useCookies } from "react-cookie";

const Header = () => {
    const [cookie, setCookie, removeCookie] = useCookies(["token"]);

    const handleLogout = () => {
        removeCookie("token");
        console.log(cookie.token);
        
    }

    return (
        <nav className="flex justify-between mx-32 mt-4">
                <a href="">
                    <Image src="/images/logo.svg" width={200} height={55} />
                </a>
            <ul className="flex justify-around font-bold text-xl">
                <li className="mr-8 mt-4">
                    <Link href="/"><a>
                        Facturas
                    </a></Link>
                </li>
                <li className="mr-8 mt-4">
                    <Link href="/historico"><a>
                        Historico
                    </a></Link>
                </li>
                <li className="mr-8 mt-4">
                    <Link href="/clientes"><a>
                        Métodos de pago
                    </a></Link>
                </li>
                <li className="mt-2 text-white">
                    <button onClick={handleLogout} className="rounded-2xl text-center py-2.5 px-4">Cerrar sesión</button>
                </li>
            </ul>
        </nav>
    );
}

export default Header;