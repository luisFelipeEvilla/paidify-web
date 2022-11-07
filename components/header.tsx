import Image from "next/image";
import Link from "next/link";

const Header = () => {
    return (
        <nav className="flex justify-between mx-32 mt-4">
                <a href="">
                    <Image src="/images/logo.svg" width={200} height={55} />
                </a>
            <ul className="flex justify-around font-bold text-xl">
                <li className="mr-8 mt-4">
                    <Link href="/facturas"><a>
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
                    <button className="rounded-2xl text-center py-2.5 px-4">Cerrar sesión</button>
                </li>
            </ul>
        </nav>
    );
}

export default Header;