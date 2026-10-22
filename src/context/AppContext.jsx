import { createContext, useContext, useEffect, useState } from "react";
import { getProducts } from "../services/api";

export const AppContext = createContext(null)

export const useAppContext = () => {
    return useContext(AppContext)
}

function AppContextProvider({ children }) {

    const [products, setProducts] = useState([])

    const [isLoad, setIsLoad] = useState(false)

    const [cartItems, setCartItems] = useState([])

    const [signUp, setSignUp] = useState({
        email: "",
        password: "",
        rePassword: ""
    })

    const [login, setLogin] = useState({
        email: "",
        password: ""
    })

    const [isLogin, setIsLogin] = useState({
        isLogin: false,
        isAdmin: false
    })

    const [isLoginMode, setIsLoginMode] = useState(true)

    useEffect(() => {
        setIsLoad(true)
        getProducts()
            .then(result => setProducts(result))
            .catch(error => console.log(error))
            .finally(() => setIsLoad(false))
    }, [])

    const addToCart = (product) => {
        setCartItems(prev => {
            return [
                ...prev,
                {
                    product: product,
                    qty: 1
                }
            ]
        })
    }

    const plusOne = (id) => {
        setCartItems(prev => {
            return prev.map(item => {
                if (item.product.id === id) {
                    return {
                        ...item,
                        qty: item.qty + 1
                    }
                } else {
                    return item
                }
            })
        })
    }

    const removeOne = (id) => {
        setCartItems(prev => {
            if (cartItems.find(item => item.product.id === id).qty === 1 ) {
                return prev.filter(item => item.product.id !== id)
            } else {
                return prev.map(item => {
                    if (item.product.id === id) {
                        return {
                            ...item,
                            qty: item.qty - 1
                        }
                    } else {
                        return item
                    }
                })
            }
        })
    }

    const removeFromCart = (id) => {
        setCartItems(prev => {
            return prev.filter(item => item.product.id !== id)
        })
    }

    const getQty = (id) => {
        return cartItems.find(item => item.product.id === id)?.qty
    }

    // {
    //      product: {product},
    //      qty: 1
    // }

    return (
        <AppContext.Provider
            value={{
                products,
                setProducts,
                isLoad,
                setIsLoad,
                cartItems,
                addToCart,
                plusOne,
                removeOne,
                removeFromCart,
                getQty,
                signUp,
                setSignUp, 
                isLoginMode,
                setIsLoginMode,
                isLogin,
                setIsLogin,
                login,
                setLogin
            }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;