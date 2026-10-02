import Container from "../Container/Container";

function NavBar() {
    return(
        <nav className="w-full top-0 bg-gray-400 rounded-b-xl fixed top-0">
            <Container>
                <div className="flex justify-between items-center h-11">
                    <ul className="flex">
                        <li>Home</li>
                        <li className="mx-3">User</li>
                        <li>Items</li>
                    </ul>
                    <button>Cart</button>
                </div>
            </Container>
        </nav>
    )
}

export default NavBar;