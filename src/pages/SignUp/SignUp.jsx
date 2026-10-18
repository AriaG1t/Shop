import { Link } from "react-router-dom";
import Container from "../../components/Container/Container";
import Input from "../../components/Input/Input";

function SignUp() {

    return (
        <Container>
            <div className="font-mono mt-10 sm:w-max p-4 rounded-lg shadow mx-auto border border-mist-500 shadow-mist-600 bg-mist-800">
                <h2 className="text-xl">Sign Up</h2>
                <form className="mt-6 sm:w-auto w-full gap-y-8 flex flex-col" action="">
                    <Input type="Email"/>
                    <Input type="Password"/>
                    <Input type="Re-Enter Password"/>
                    <div className="m-auto"><p className="text-sm">Already got an account? <Link className="text-xs underline hover:text-green-500" to="/login">Login</Link></p></div>
                    <button className="bg-gray-600 w-min m-auto px-2 py-1 rounded-xl shadow shadow-mist-600 hover:ring-2 hover:ring-mist-400 cursor-pointer transition-all">Submit</button>
                </form>
            </div>
        </Container>

    )
}

export default SignUp; 