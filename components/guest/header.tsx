import Image from "next/image";
import Router from "next/router";

const Header = () => {
    
    const handleLogin = () => Router.push("/signin");

    return (
        <nav className="flex justify-between mx-32 mt-4">
            <a href="/">
                <Image src="/images/logo.svg" width={200} height={55} />
            </a>
            <li className="mt-2 text-white">
                <button
                    onClick={handleLogin} className="rounded-2xl text-center py-2.5 px-4 font-bold text-xl"
                >
                    Iniciar sesión
                </button>
            </li>
        </nav>
    );
}

export default Header;