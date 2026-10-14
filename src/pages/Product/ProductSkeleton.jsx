
function ProductSkeleton() {

    return (
        <div className="flex md:flex-row flex-col gap-5 mt-5 w-full">
            <div className="shadow-mist-500 bg-zinc-700 rounded-lg border border-mist-500 shadow p-3 md:w-60">
                <div className="skeleton mb-2 rounded h-30 w-60 mx-auto md:w-full"></div>
                <div className="skeleton h-4 w-4/5 rounded-xl"></div>
                <div className="skeleton h-5 my-3 rounded-xl"></div>
                <div className="skeleton h-5 rounded-xl"></div>
            </div>
            <div className="w-full">
                <div className="skeleton h-5 w-full rounded-xl"></div>
                <div className="skeleton my-4 h-5 w-full rounded-xl"></div>
                <div className="skeleton h-5 w-full rounded-xl"></div>
                <div className="skeleton mt-4 h-5 w-full rounded-xl"></div>
            </div>
        </div>
    )
}

export default ProductSkeleton;