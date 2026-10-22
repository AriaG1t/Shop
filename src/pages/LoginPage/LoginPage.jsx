import Container from "../../components/Container/Container";
import Login from "../../components/Login/Login";
import SignUp from "../../components/SignUp/SignUp";
import { useAppContext } from "../../context/AppContext";

function LoginPage() {

    const {isLoginMode} = useAppContext()
    
    return(
        <Container>
            {isLoginMode ? <Login /> : <SignUp />}
        </Container>
    )
}

export default LoginPage;