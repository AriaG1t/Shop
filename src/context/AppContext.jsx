import { createContext, useContext, useEffect, useState } from "react";
import { getProducts } from "../services/api";

export const AppContext = createContext(null)

export const useAppContext = () => {
    return useContext(AppContext)
}

function AppContextProvider({children}) {
    
    const [products, setProducts] = useState([])

    const [isLoad, setIsLoad] = useState(false)

    useEffect(() => {
        setIsLoad(true)
        getProducts()
        .then(result => setProducts(result))
        .catch(error => console.log(error))
        .finally(() => setIsLoad(false))
    }, [])
    
    return(
        <AppContext.Provider
        value={{
            products,
            setProducts,
            isLoad,
            setIsLoad,
        }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;