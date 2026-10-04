import { createContext, useContext, useState } from "react";

export const AppContext = createContext(null)

export const useAppContext = () => {
    return useContext(AppContext)
}

function AppContextProvider({children}) {
    
    const [products, setProducts] = useState([])

    const [isLoad, setIsLoad] = useState(false)
    
    return(
        <AppContext.Provider
        value={{
            products,
            setProducts,
            isLoad,
            setIsLoad
        }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;