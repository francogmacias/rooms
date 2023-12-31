import Stack from "react-bootstrap/Stack";
import ChatHistory from "./ChatHistory";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useState, useEffect, SyntheticEvent } from "react";
import { socket } from "../../socket";
import { useLocation, useNavigate } from "react-router-dom";

const ChatBox = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [currentMessage, setCurrentMessage] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const room = location?.state?.room || null;
    const username = location?.state?.username || null;

    useEffect(() => {
        if (!room || !username) {
            navigate("/");
        } else {
            socket.on("connect", () => console.log("CONNECTED"));
            socket.emit("joinRoom", room);
            socket.on("receiveMessage", pushMessage);
        }

        return () => {
            socket.off("connect");
            socket.off("receiveMessage", pushMessage);
        };
    }, []);

    const pushMessage = (message: Message) => {
        setMessages((state) => [...state, message]);
    };

    const handleOnSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        console.log("Client message: ", currentMessage);
        const message: Message = {
            from: username,
            content: currentMessage,
            room: room,
        };
        pushMessage(message);
        socket.emit("sendMessage", message);
        console.log("MESSAGES: ", messages);
    };

    const handleBackToMenu = () => {
        socket.emit("leaveRoom", room);
        navigate("/");
    };

    return (
        <Stack>
            <div className="chatbox-header d-flex gap-3 align-items-center">
                <Button variant="outline-secondary" onClick={handleBackToMenu}>
                    Back to Menu
                </Button>
                {room ? (
                    <p className="align-self-center m-0">Room: {room}</p>
                ) : (
                    <p className="align-self-center m-0">Room: none</p>
                )}
            </div>
            <ChatHistory messages={messages} />
            <div>
                <Form onSubmit={handleOnSubmit}>
                    <InputGroup className="mb-3">
                        <Form.Control
                            aria-describedby="basic-addon2"
                            onChange={(e) => setCurrentMessage(e.target.value)}
                        />
                        <Button variant="outline-secondary" type="submit">
                            Send
                        </Button>
                    </InputGroup>
                </Form>
            </div>
        </Stack>
    );
};

export default ChatBox;
