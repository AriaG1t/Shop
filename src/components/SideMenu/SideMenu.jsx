import { useAppContext } from "../../context/AppContext";

function SideMenu({ children, position, isOpen }) {

    const { setActiveMenu } = useAppContext()

    return (
        <>
            <div onClick={() => setActiveMenu(null)} className={`${!isOpen && "hidden"} transition-all fixed w-screen h-screen top-0 right-0 z-81`}></div>
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    top: position?.top
                }}
                className={`${isOpen ? "translate-x-0" : "translate-x-full"} transition-all
                right-0 rounded-l-xl bg-mist-800 shadow-mist-600 shadow sm:hidden z-82 fixed w-40`}>
                <div className="font-mono p-3 gap-3 flex flex-col justify-start items-start">
                    {children}
                </div>
            </div>
        </>
    )
}

export default SideMenu;