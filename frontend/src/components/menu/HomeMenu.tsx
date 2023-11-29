import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HomeMenu = () => {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");

    const navigate = useNavigate();

    const handleJoinRoom = () => {
        navigate("/room", {
            state: {
                username: username,
                room: room,
            },
        });
    };

    const handleJoinNewRoom = () => {};

    return (
        <div>
            <InputGroup className="mb-3 gap-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="username"
                    placeholder="Enter Username"
                    onChange={(e) => setUsername(e.target.value)}
                />
            </InputGroup>
            <InputGroup className="mb-3 gap-3">
                <Form.Label>Room</Form.Label>
                <Form.Control
                    type="room"
                    placeholder="Enter Room ID"
                    onChange={(e) => setRoom(e.target.value)}
                />
                <Button
                    variant="outline-secondary"
                    id="button-addon1"
                    onClick={handleJoinRoom}
                >
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
