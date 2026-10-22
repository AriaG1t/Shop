import { Navigate, Outlet } from "react-router-dom"
import { useAppContext } from "../../context/AppContext"

function PrivateRoute() {

    const { isLogin } = useAppContext()

    return (
        <>
            {
                isLogin.isLogin ? <Outlet /> : <Navigate to="/login" />
            }
        </>
    )
}

export default PrivateRoute;