import Input from "../Input/Input";
import { useAppContext } from "../../context/AppContext";
import { useId, useState } from "react";

function SignUp() {

    const passwordRegEx = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.*[^a-zA-Z0-9]).{8,}$/

    const emailRegEx = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/

    const { signUp, setIsLoginMode } = useAppContext()

    const [signUpError, setSignUpError] = useState({
        email: null,
        password: null,
        rePassword: null
    })

    const handleSignUp = (e) => {
        e.preventDefault()

        if (emailRegEx.test(signUp.email)) {
            setSignUpError(prev => ({
                ...prev,
                email: true
            }))
        } else {
            setSignUpError(prev => ({
                ...prev,
                email: false
            }))
        }

        if (passwordRegEx.test(signUp.password)) {
            setSignUpError(prev => ({
                ...prev,
                password: true
            }))
            if (signUp.password === signUp.rePassword) {
                setSignUpError(prev => ({
                    ...prev,
                    rePassword: true
                }))
            } else {
                setSignUpError(prev => ({
                    ...prev,
                    rePassword: false
                }))
            }
        } else {
            setSignUpError(prev => ({
                ...prev,
                password: false
            }))
        }
    }

    return (
        <div className="font-mono mt-10 sm:w-max p-4 rounded-lg shadow mx-auto border border-mist-500 shadow-mist-600 bg-mist-800">
            <h2 className="text-xl">Sign Up</h2>
            <form onSubmit={handleSignUp} className="mt-6 sm:w-auto w-full gap-y-8 flex flex-col" action="">
                <Input type="Email"/>
                <Input type="Password"/>
                <Input type="Re-Enter Password"/>
                {Object.values(signUpError).some(value => value === false) && (
                    <div className="flex flex-col gap-2.5">
                        {signUpError.email === false && <p className="text-red-500 w-80 text-wrap text-xs">Email is not valid!</p>}
                        {signUpError.password === false && <p className="text-wrap w-80 text-red-500 text-xs">Password must contain atleast 8 characters and atleast a upper case, lower case and number!</p>}
                        {signUpError.rePassword === false && <p className="text-wrap w-80 text-red-500 text-xs">Passwords don't match</p>}
                    </div>
                )}
                {Object.values(signUpError).every(value => value === true) && (
                    <div className="flex flex-col gap-2.5">
                        <p className="text-wrap w-80 text-green-500 text-xs">Account created!</p>
                    </div>
                )}
                <div className="m-auto"><p className="text-sm">Already got an account? <button className="cursor-pointer text-xs underline hover:text-green-500" type="button" onClick={() => setIsLoginMode(true)}>Login</button></p></div>
                <button type="submit" className="bg-gray-600 w-min m-auto px-2 py-1 rounded-xl shadow shadow-mist-600 hover:ring-2 hover:ring-mist-400 cursor-pointer transition-all">Submit</button>
            </form>
        </div>
    )
}

export default SignUp; 