import Container from "../../components/Container/Container";
import Notification from "../../components/Notification/Notification";
import Items from "../Items/Items";

function AdminPanel() {

    return (
        <div>
            <Container>
                <button className="font-mono bg-green-700 rounded px-2">Create +</button>
            </Container>
            <Items />
        </div>
    )
}

export default AdminPanel;