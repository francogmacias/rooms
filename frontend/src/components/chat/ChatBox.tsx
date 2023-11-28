import Stack from "react-bootstrap/Stack";
import ChatHistory from "./ChatHistory";
import ChatInput from "./ChatInput";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useState, useEffect } from "react";
import { socket } from "../../socket";
import { useNavigate } from "react-router-dom";

const ChatBox = () => {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [currentRoom, setCurrentRoom] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        socket.on("connect", () => console.log("CONNECTED"));
        socket.on("chat", pushMessage);

        return () => {
            socket.off("connect");
            socket.off("chat", pushMessage);
        };
    }, []);

    type Message = {
        from: string;
        content: string;
    };

    const pushMessage = (message: Message) => {
        setMessages((state) => [...state, message]);
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        console.log("Client message: ", currentMessage);
        const message: Message = {
            from: "Me",
            content: currentMessage,
        };
        pushMessage(message);
        socket.emit("chat", message);
        console.log("MESSAGES: ", messages);
    };

    const handleBackToMenu = () => {
        navigate("/");
    };

    return (
        <Stack>
            <div className="chatbox-header d-flex gap-3 align-items-center">
                <Button variant="outline-secondary" onClick={handleBackToMenu}>
                    Back to Menu
                </Button>
                {currentRoom ? (
                    <p className="align-self-center m-0">Room: {currentRoom}</p>
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
