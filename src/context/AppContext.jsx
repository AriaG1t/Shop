import { createContext, useContext, useState } from "react";

export const AppContext = createContext(null)

export const useAppContext = () => {
    return useContext(AppContext)
}

function AppContextProvider({children}) {
    
    const [products, setProducts] = useState([])
    
    return(
        <AppContext.Provider
        value={{
            products,
            setProducts
        }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;