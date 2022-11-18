import Image from "next/image";

const Header = () => {

    return (
        <nav className="flex justify-between mx-32 mt-4">
            <a href="/">
                <Image src="/images/logo.svg" width={200} height={55} />
            </a>
        </nav>
    );
}

export default Header;