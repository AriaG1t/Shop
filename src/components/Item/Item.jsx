
function Item(item) {
    const discount = (item.discount/100)
    const finalPrice = item.price * (1 - discount);
    
    return(
        <div className="shadow-mist-500 hover:border-gray-400 sm:h-auto items-center hover:ring-3 ring-0 ring-gray-400 transition-all sm:m-3 my-3 flex sm:flex-col p-3 sm:pt-5 border rounded-lg border-mist-500 shadow justify-between">
            <div className="h-30 sm:h-40 aspect-square rounded">
                <img src={item.image} className="h-full mx-auto rounded" alt={`product ${item.id}`} />
            </div>
            <div className="grid grid-cols-6 items-center sm:ml-0 sm:mt-2 ml-3">
                <p className="col-span-6 text-sm line-clamp-2 font-bold">{item.title}</p>
                {
                    discount === 0 ? null : 
                    <p className="font-mono col-span-3"><span className="text-sm line-through">{item.price}$</span> <span className="bg-red-400 rounded px-1">{item.discount}%</span></p>
                }
                <p className={`font-mono sm:col-span-3 col-span-6 text-green-300 ${discount === 0 ? "text-left" : "sm:text-center"}`}>{discount === 0 ? item.price : finalPrice.toFixed(2)}$</p>
                <p className="font-mono col-span-2 flex items-center">
                    <svg className="size-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="yellow" viewBox="0 0 24 24" strokeWidth={1.5} stroke="yellow">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                    </svg>
                    {item.rating}
                </p>
                
                <p className="line-clamp-2 col-span-6 text-sm">
                    {item.description}
                </p>
            </div>
        </div>
    )
}

export default Item;