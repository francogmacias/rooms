import "./ChatStyles.css";

const ChatHistory = (props: any) => {
    type Message = {
        from: string;
        content: string;
    };
    return (
        <div className="message-listing">
            <ul className="list-group">
                {props.messages.map((message: Message) => (
                    <li className="list-group-item">
                        ({message.from}): {message.content}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChatHistory;
