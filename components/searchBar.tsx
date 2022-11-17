import Image from "next/image";

export const SearchBar = (props: any) => {
    
    return (
        <div className="flex flex-row align-items shadow-md rounded-xl border border-gray-300 w-96 p-2">
            <div style={{ position: "relative", width: "15px", heigth: "15px" }} >
                <Image className="hover:cursor-pointer p-1" src="/icons/search.svg" alt="Vercel Logo" layout="fill" objectFit="contain" />
            </div>
            <input
                className="ml-3 w-full focus:outline-none focus:shadow-outline"
                name="search"
                type="text"
                placeholder="Buscar por concepto"
                onChange={e => props.handleChange(e.target.value)}
            >
            </input>
        </div>
    )
}

export default SearchBar;