import Container from "../../components/Container/Container";
import Items from "../Items/Items";

function AdminPanel() {

    return (
        <div>
            <Container>
                <p className="font-mono">create</p>
            </Container>
            <Items />
        </div>
    )
}

export default AdminPanel;