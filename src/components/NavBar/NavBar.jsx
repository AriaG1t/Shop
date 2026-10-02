import Container from "../Container/Container";

function NavBar() {
    return(
        <nav className="backdrop-blur-sm border-mist-500 border font-mono bg-mist-800/50 text-gray-200 sm:w-3/4 w-9/10 max-w-170 top-2 right-1/2 translate-x-1/2 fixed px-5 rounded-full">
            <Container>
                <div className="flex justify-between items-center h-11">
                    <ul className="flex">
                        <li 
                        className="relative cursor-pointer
                        hover:after:w-full after:w-0 after:transition-all after:absolute after:-bottom-0.5 after:left-1/2 hover:after:left-0 after:rounded-full after:h-0.5 after:bg-gray-200">
                            Home
                        </li>
                        <li 
                        className="relative cursor-pointer mx-3
                        hover:after:w-full after:w-0 after:transition-all after:absolute after:-bottom-0.5 after:left-1/2 hover:after:left-0 after:rounded-full after:h-0.5 after:bg-gray-200">
                            User
                        </li>
                        <li
                        className="relative cursor-pointer
                        hover:after:w-full after:w-0 after:transition-all after:absolute after:-bottom-0.5 after:left-1/2 hover:after:left-0 after:rounded-full after:h-0.5 after:bg-gray-200">
                            Items
                        </li>
                    </ul>
                    <button className="cursor-pointer">Cart</button>
                </div>
            </Container>
        </nav>
    )
}

export default NavBar;