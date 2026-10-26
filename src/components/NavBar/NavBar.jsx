import { NavLink } from "react-router-dom";
import Container from "../Container/Container";
import { useAppContext } from "../../context/AppContext";
import SideMenu from "../SideMenu/SideMenu";
import { useRef, useState } from "react";

function NavBar() {

    const { isLogin, setActiveMenu, activeMenu } = useAppContext()

    const [position, setPosition] = useState(null)

    const navbarRef = useRef(null);

    const handleSideMenu = (e) => {
        if (activeMenu === null) {
            setActiveMenu("navbar")
        } else {
            setActiveMenu(null)
        }

        const navbarRect =
            navbarRef.current.getBoundingClientRect();

        setPosition({
            top: navbarRect.bottom,
        })
    }

    return (
        <>
            <nav ref={navbarRef} className="z-80 backdrop-blur-sm border-mist-500 border font-mono bg-mist-800/50 text-gray-200 sm:w-3/4 w-9/10 max-w-170 top-2 right-1/2 translate-x-1/2 fixed px-5 rounded-full">
                <Container>
                    <div className="flex justify-between items-center h-11">
                        <ul className="flex">
                            <li>
                                <NavLink to="/" className={({ isActive }) =>
                                    `relative cursor-pointer
                                ${isActive ? "after:w-full after:left-0" : "after:w-0 after:left-1/2"}
                                hover:after:w-full after:transition-all after:absolute after:-bottom-0.5 hover:after:left-0 after:rounded-full after:h-0.5 after:bg-gray-200`
                                }>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                    </svg>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/login" className={({ isActive }) =>
                                    `relative cursor-pointer mx-3
                                ${isActive ? "after:w-full after:left-0" : "after:w-0 after:left-1/2"}
                                sm:block hidden hover:after:w-full after:transition-all after:absolute after:-bottom-0.5 hover:after:left-0 after:rounded-full after:h-0.5 after:bg-gray-200`
                                }>
                                    User
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/items" className={({ isActive }) =>
                                    `relative cursor-pointer
                                ${isActive ? "after:w-full after:left-0" : "after:w-0 after:left-1/2"}
                                sm:block hidden hover:after:w-full after:transition-all after:absolute after:-bottom-0.5 hover:after:left-0 after:rounded-full after:h-0.5 after:bg-gray-200`
                                }>
                                    Products
                                </NavLink>
                            </li>
                        </ul>
                        <div>

                        </div>
                        <div className="flex items-center gap-3 sm:flex-row-reverse" >
                            <NavLink to="/cart" className={({ isActive }) =>
                                `relative cursor-pointer
                                ${isActive ? "after:w-full after:left-0" : "after:w-0 after:left-1/2"}
                                hover:after:w-full after:transition-all after:absolute after:-bottom-0.5 hover:after:left-0 after:rounded-full after:h-0.5 after:bg-gray-200`
                            }>
                                <div className="text-white">
                                    <svg
                                        width="24px"
                                        height="24px"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="#e5e7eb">
                                        <circle cx={16.5} cy={18.5} r={1.5} />
                                        <circle cx={9.5} cy={18.5} r={1.5} />
                                        <path d="M18 16H8a1 1 0 0 1-.958-.713L4.256 6H3a1 1 0 0 1 0-2h2a1 1 0 0 1 .958.713L6.344 6H21a1 1 0 0 1 .937 1.352l-3 8A1 1 0 0 1 18 16zm-9.256-2h8.563l2.25-6H6.944z" />
                                    </svg>
                                </div>
                            </NavLink>
                            {
                                isLogin.isAdmin &&
                                <NavLink to="/admin" className={({ isActive }) =>
                                    `relative cursor-pointer
                                ${isActive ? "after:w-full after:left-0" : "after:w-0 after:left-1/2"}
                                sm:block hidden hover:after:w-full after:transition-all after:absolute after:-bottom-0.5 hover:after:left-0 after:rounded-full after:h-0.5 after:bg-gray-200`
                                }>
                                    Admin Panel
                                </NavLink>
                            }
                            <button onClick={handleSideMenu} className="sm:hidden cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M3 5h18v2H3zm0 6h18v2H3zm0 6h18v2H3z"></path></svg>
                            </button>
                        </div>

                    </div>
                </Container>
            </nav>
            <SideMenu position={position} isOpen={activeMenu === "navbar"}>
                {
                    isLogin.isAdmin &&
                    <NavLink to="/admin" className={({ isActive }) =>
                        `relative cursor-pointer
                                ${isActive ? "after:w-full after:left-0" : "after:w-0 after:left-1/2"}
                                sm:hidden hover:after:w-full after:transition-all after:absolute after:-bottom-0.5 hover:after:left-0 after:rounded-full after:h-0.5 after:bg-gray-200`
                    }
                    onClick={() => setActiveMenu(null)}>
                        Admin Panel
                    </NavLink>
                }
                <NavLink to="/login" className={({ isActive }) =>
                    `relative cursor-pointer
                                ${isActive ? "after:w-full after:left-0" : "after:w-0 after:left-1/2"}
                            hover:after:w-full after:transition-all after:absolute after:-bottom-0.5 hover:after:left-0 after:rounded-full after:h-0.5 after:bg-gray-200`
                }
                onClick={() => setActiveMenu(null)}>
                    User
                </NavLink>
                <NavLink to="/items" className={({ isActive }) =>
                    `relative cursor-pointer
                                ${isActive ? "after:w-full after:left-0" : "after:w-0 after:left-1/2"}
                                hover:after:w-full after:transition-all after:absolute after:-bottom-0.5 hover:after:left-0 after:rounded-full after:h-0.5 after:bg-gray-200`
                }
                onClick={() => setActiveMenu(null)}>
                    Products
                </NavLink>
            </SideMenu>
        </>
    )
}

export default NavBar;