import { useEffect, useState } from "react";
import Container from "../../components/Container/Container";
import Item from "../../components/Item/Item";
import { getProducts } from "../../services/api";
import { useAppContext } from "../../context/AppContext";

function Items() {

    const {products, setProducts} = useAppContext() 

    const limit = 20
    const [currentPage, setCurrentPage] = useState(1)
    const totalPages = Math.ceil(products.length / limit)

    useEffect(() => {
        getProducts()
        .then(result => setProducts(result))
        .catch(error => console.log(error))
    }, [])

    const lastIndex = currentPage * limit
    const startIndex = lastIndex - limit
    const data = products.slice(startIndex, lastIndex)
    console.log(currentPage);
    
    return(
        <Container>
            <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
                {
                    data.map((item) => (
                        <Item key={item.id} {...item}/>
                    ))
                }
            </div>
            <div className="grid grid-cols-12 md:grid-cols-3 items-center-safe text-xl font-mono mt-7">
                {
                    currentPage === 1 ? null : <button onClick={() => setCurrentPage(prev => prev - 1)} 
                    className="hover:bg-mist-900 flex justify-self-end justify-center cursor-pointer font-black bg-mist-800 size-8 rounded-full">&lt;</button>
                }
                <div className="flex col-span-10 md:col-span-1 md:col-start-2 col-start-2 mx-3 flex-wrap justify-center items-center">
                    {Array.from(
                        { length: totalPages },
                        (_, index) => (
                            <button
                                className={`
                                ${currentPage === index + 1 ? "bg-gray-600 hover:bg-gray-700 " : "bg-mist-800 hover:bg-mist-900"}
                                cursor-pointer m-1 px-2 rounded-lg`}
                                key={index + 1}
                                onClick={() => setCurrentPage(index + 1)}
                            >
                                {index + 1}
                            </button>
                        )
                    )}
                </div>
                {
                    currentPage === totalPages ? null : <button onClick={() => setCurrentPage(prev => prev + 1)} 
                    className="hover:bg-mist-900 flex justify-self-start justify-center cursor-pointer font-black bg-mist-800 size-8 rounded-full">&gt;</button>
                }
            </div>
        </Container>
    )
}

export default Items;