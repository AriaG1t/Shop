import { Link, useLocation } from "react-router-dom";
import { deleteProduct } from "../../services/api";
import { useAppContext } from "../../context/AppContext";
import Modal from "../Modal/Modal";

function Item(item) {

    const { setIsLoad, activeModal, setActiveModal, setActiveNotif } = useAppContext()

    const discount = (item.discount / 100)

    const finalPrice = item.price * (1 - discount)

    const location = useLocation()

    const handleDelete = async () => {

        try {
            setIsLoad(true);

            await deleteProduct(item.id)

            setActiveModal(null);
        showNotification(true);

        } catch (error) {
            console.error("Failed to delete product:", error);
        } finally {
            setIsLoad(false);
        }
    }

    const confirmModal = () => {
        setActiveModal(`product${item.id}`)
    }

    return (
        <div className={`shadow-mist-500 sm:h-min ${location === "/admin" && "has-[a:hover]:hover:ring-0 has-[button:hover]:hover:ring-0"} bg-zinc-700 hover:border-gray-400 items-center hover:ring-3 ring-0 ring-gray-400 transition-all flex sm:flex-col p-3 sm:pt-5 border rounded-lg border-mist-500 shadow justify-between`}>
            <Link to={`/product/${item.id}`} className="h-30 sm:h-40 aspect-square rounded">
                <img src={item.image} className="h-full mx-auto rounded" alt={`product ${item.id}`} />
            </Link>
            <div className="grid grid-cols-6 items-center sm:ml-0 sm:mt-2 ml-3">
                <Link to={`/product/${item.id}`} className="col-span-6 w-fit">
                    <p className="text-sm w-fit hover:scale-110 transition-all line-clamp-2 font-bold">{item.title}</p>
                </Link>
                {
                    item.availability === "out_of_stock" ?
                        <div className="flex col-span-6 my-0.5">
                            <p className="font-mono bg-red-500 px-2 rounded">Out of stock</p>
                        </div>
                        :
                        <>
                            {
                                discount === 0 ? null :
                                    <p className="font-mono col-span-3"><span className="text-sm line-through">{item.price}$</span> <span className="bg-red-500 rounded px-1">{item.discount}%</span></p>
                            }
                            <p className={`font-mono sm:col-span-3 col-span-6 text-green-300 ${discount === 0 ? "text-left" : "sm:text-center"}`}>{discount === 0 ? item.price : finalPrice.toFixed(2)}$</p>
                        </>
                }
                <p className="font-mono col-span-2 flex items-center">
                    <svg className="size-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="yellow" viewBox="0 0 24 24" strokeWidth={1.5} stroke="yellow">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                    </svg>
                    {item.rating}
                </p>

                <p className="line-clamp-2 col-span-6 text-sm">
                    {item.description}
                </p>
                {
                    location.pathname === "/admin" &&
                    <div className="font-mono text-sm mt-2 col-span-6 gap-2 flex justify-between">
                        <Link
                            to={`/admin/product/${item.id}`}
                            className="bg-green-700 rounded-lg px-3 shadow hover:ring-3 hover:ring-mist-400 transition-all">
                            Edit
                        </Link>
                        <button
                            onClick={(e) => { e.preventDefault(), e.stopPropagation(), confirmModal() }}
                            className="bg-red-700 cursor-pointer rounded-lg px-3 shadow hover:ring-3 hover:ring-mist-400 transition-all">
                            Delete
                        </button>
                    </div>
                }
            </div>
            <Modal isOpen={activeModal === `product${item.id}`}>
                <h2 className="text-lg">Are you sure you want to delete this product?  " {item.title} "</h2>
                <div className="mt-5">
                    <button onClick={() => {handleDelete()}} className="cursor-pointer hover:ring-3 hover:ring-mist-400 transition-all mr-4 bg-green-700 px-4 rounded-lg ">Delete</button>
                    <button onClick={() => setActiveModal(null)} className="cursor-pointer hover:ring-3 hover:ring-mist-400 transition-all bg-red-700 px-4 rounded-lg ">Cancel</button>
                </div>
            </Modal>
        </div>
    )
}

export default Item;