import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const HomeMenu = () => {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");

    const handleJoinRoom = () => {};

    const handleJoinNewRoom = () => {};

    return (
        <div>
            <InputGroup className="mb-3 gap-3">
                <Form.Label>Username</Form.Label>
                <Form.Control type="username" placeholder="Enter Username" />
            </InputGroup>
            <InputGroup className="mb-3 gap-3">
                <Form.Label>Room</Form.Label>
                <Form.Control type="room" placeholder="Enter Room ID" />
                <Button variant="outline-secondary" id="button-addon1">
                    Join
                </Button>
            </InputGroup>
            <Button variant="outline-secondary" id="button-addon1">
                Join New Room
            </Button>
        </div>
    );
};

export default HomeMenu;
