import { useAppContext } from "../../context/AppContext";

function Modal({ children, isOpen }) {

    const { setActiveModal } = useAppContext()

    return (
        <div onClick={() => setActiveModal(null)} className={`${!isOpen && "hidden"} fixed h-screen w-screen flex justify-center items-center bg-black/80 top-0 right-0 z-90`}>
            <div 
            className="bg-gray-700 relative p-5 font-mono rounded-lg"
            onClick={(e) => e.stopPropagation()}
                >
                {children}
                <button onClick={() => setActiveModal(null)} className="absolute -top-4 -right-4 hover:ring-3 hover:ring-mist-400 transition-all cursor-pointer border-2 border-mist-400 font-black text-xl bg-red-600 size-10 rounded-full">
                    x
                </button>
            </div>
        </div>
    )
}

export default Modal;