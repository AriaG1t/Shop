import Input from "../Input/Input";
import { useAppContext } from "../../context/AppContext";
import { useState } from "react";

function Login() {

    const { setIsLoginMode, setIsLogin, isLogin, login } = useAppContext()

    const [loginError, setLoginError] = useState({
        email: null,
        password: null,
    })

    const passwordRegEx = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.*[^a-zA-Z0-9]).{8,}$/

    const emailRegEx = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/

    const handleLogin = (e) => {
        e.preventDefault()

        if (emailRegEx.test(login.email)) {
            setLoginError(prev => ({
                ...prev,
                email: true
            }))
        } else {
            setLoginError(prev => ({
                ...prev,
                email: false
            }))
        }

        if (passwordRegEx.test(login.password)) {
            setLoginError(prev => ({
                ...prev,
                password: true
            }))
        } else {
            setLoginError(prev => ({
                ...prev,
                password: false
            }))
        }

        if (emailRegEx.test(login.email) && passwordRegEx.test(login.password)) {
            setIsLogin(prev => ({
                ...prev,
                isLogin: true
            }))
            if (login.email === "admin@gmail.com" && login.password === "Admin1234") {
                setIsLogin(prev => ({
                    ...prev,
                    isAdmin: true
                }))
            }
        }
    }

    return (
        <div className="font-mono mt-10 sm:w-max p-4 rounded-lg shadow mx-auto border border-mist-500 shadow-mist-600 bg-mist-800">
            <h2 className="text-xl">Login</h2>
            <form onSubmit={handleLogin} className="mt-6 sm:w-auto w-full gap-y-8 flex flex-col" action="">
                <Input type="Email" />
                <Input type="Password" />
                { loginError.email && loginError.password ? null : 
                    <div className="flex flex-col gap-2.5">
                        {loginError.email === false && <p className="text-red-500 w-80 text-wrap text-xs">Email is not valid!</p>}
                        {loginError.password === false && <p className="text-wrap w-80 text-red-500 text-xs">Password must contain atleast 8 characters and atleast a upper case, lower case and number!</p>}
                    </div>
                }
                {
                    isLogin.isLogin && <p className="text-wrap w-80 text-green-500 text-xs">You've loged in!</p>
                }
                <div className="m-auto"><p className="text-sm">No account? <button className="cursor-pointer text-xs underline hover:text-green-500" onClick={() => setIsLoginMode(false)}>Create One</button></p></div>
                <button className="bg-gray-600 w-min m-auto px-2 py-1 rounded-xl shadow shadow-mist-600 hover:ring-2 hover:ring-mist-400 cursor-pointer transition-all">Submit</button>
            </form>
        </div>
    )
}

export default Login; 