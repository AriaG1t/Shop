import { Navigate, Outlet } from "react-router-dom"
import { useAppContext } from "../../context/AppContext"

function PrivateRoute({requiredRole}) {

    const { isLogin } = useAppContext()

    if (!isLogin.isLogin) {
        return <Navigate to="/Login" replace />;
    }

    if (requiredRole === "admin" && !isLogin.isAdmin) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}

export default PrivateRoute;