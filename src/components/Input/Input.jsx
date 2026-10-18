import { useState } from "react";

function Input({ type }) {

    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="relative sm:w-min">
            <input
                maxLength={type === "Password" || type ==="Re-Enter Password" ? 16 : -1}
                minLength={type === "Password" || type ==="Re-Enter Password" ? 8 : -1}
                required
                placeholder=" "
                id={type}
                className="border border-mist-400 focus:ring-2 transition-all focus:ring-mist-400 px-2 py-0.5 sm:w-80 w-full peer rounded outline-0 "
                type={type === "Re-Enter Password" ? showPassword ? "text" : "password" : showPassword ? "text" : type.toLowerCase()} />
            <label className="
            pointer-events-none
            peer-not-placeholder-shown:-top-2.75 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:left-0
            absolute top-1/2 left-2 peer-focus:text-sm peer-focus:-top-2.75 peer-focus:left-0 transition-all -translate-y-1/2 text-mist-400" htmlFor={type}>{type}</label>
            {
                type === "Re-Enter Password" || type === "Password" ?
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-xs absolute cursor-pointer top-1/2 -translate-y-1/2 right-1 bg-mist-800 px-1">
                        {showPassword ? "Hide" : "Show"}
                    </button> : null
            }
        </div>
    )
}

export default Input;