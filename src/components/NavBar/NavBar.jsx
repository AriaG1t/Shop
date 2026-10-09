import { NavLink } from "react-router-dom";
import Container from "../Container/Container";

function NavBar() {

    return(
        <nav className="z-99 backdrop-blur-sm border-mist-500 border font-mono bg-mist-800/50 text-gray-200 sm:w-3/4 w-9/10 max-w-170 top-2 right-1/2 translate-x-1/2 fixed px-5 rounded-full">
            <Container>
                <div className="flex justify-between items-center h-11">
                    <ul className="flex">
                        <li>
                            <NavLink to="/" className={({isActive}) => 
                                `relative cursor-pointer
                                ${isActive ? "after:w-full after:left-0" : "after:w-0 after:left-1/2"}
                                hover:after:w-full after:transition-all after:absolute after:-bottom-0.5 hover:after:left-0 after:rounded-full after:h-0.5 after:bg-gray-200`
                            }>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                </svg>
                            </NavLink>
                        </li>
                        <li
                        className="mx-3">
                            User
                        </li>
                        <li>
                            <NavLink to="/items" className={({isActive}) => 
                                `relative cursor-pointer
                                ${isActive ? "after:w-full after:left-0" : "after:w-0 after:left-1/2"}
                                hover:after:w-full after:transition-all after:absolute after:-bottom-0.5 hover:after:left-0 after:rounded-full after:h-0.5 after:bg-gray-200`
                            }>
                                Products
                            </NavLink>
                        </li>
                    </ul>
                    <button>
                        Cart
                    </button>
                </div>
            </Container>
        </nav>
    )
}

export default NavBar;