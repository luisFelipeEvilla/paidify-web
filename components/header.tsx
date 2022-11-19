import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import { useCookies } from "react-cookie";

const Header = () => {
    const [cookie, setCookie, removeCookie] = useCookies(["token"]);

    const handleLogout = () => {
        removeCookie("token");
        Router.push("/signin");
    }

    return (
        <nav className="flex justify-between mx-32 mt-4">
                <a href="/">
                    <Image src="/logo/logo.png" width={160} height={40} />
                </a>
            <ul className="flex justify-around font-bold text-xl">
                <li className="mr-8 mt-4">
                    <Link href="/"><a>
                        Facturas
                    </a></Link>
                </li>
                <li className="mr-8 mt-4">
                    <Link href="/history"><a>
                        Historico
                    </a></Link>
                </li>
                <li className="mr-8 mt-4">
                    <Link href="/payment-methods"><a>
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