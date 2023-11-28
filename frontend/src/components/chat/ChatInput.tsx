import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const ChatInput = (props) => {
    const [currentMessage, setCurrentMessage] = useState("");

    return (
        <div>
            <InputGroup className="mb-3">
                <Form.Control
                    aria-describedby="basic-addon2"
                    onChange={(e) => setCurrentMessage(e.target.value)}
                />
                <Button
                    onClick={(currentMessage) => props.onSend(currentMessage)}
                >
                    Send
                </Button>
            </InputGroup>
        </div>
    );
};

export default ChatInput;
