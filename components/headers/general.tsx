import Image from "next/image";

const Header = () => {

    return (
        <nav className="flex justify-between mx-32 mt-4 pb-2">
            <a href="/" className="self-end">
                <Image src="/images/logo.svg" width={160} height={40} />
            </a>
        </nav>
    );
}

export default Header;