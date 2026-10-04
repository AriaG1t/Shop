
function ItemSkeleton() {
    
    return(
        <div className="shadow-mist-500 sm:m-3 my-3 flex sm:flex-col p-3 sm:pt-5 border rounded-lg border-mist-500 shadow">
            <div className="skeleton w-full sm:h-40 rounded"></div>
            <div className="grid w-full grid-cols-6 items-center sm:ml-0 sm:mt-5 ml-3">
                <div className="skeleton h-5 rounded bg-linear-to-r from-gray-400 via-mist-700 to-gray-400 col-span-6 mb-3"></div>
                <div className="skeleton h-5 rounded col-span-2"></div>
                <div className="skeleton h-5 rounded col-span-2 col-start-5"></div>
                <div className="skeleton h-5 rounded my-5 col-span-6"></div>
                <div className="skeleton h-5 rounded col-span-6"></div>
            </div>
        </div>
    )
}

export default ItemSkeleton;