import { useEffect, useState } from "react";
import { FlexColumnAlignJustifyCenter } from "../Flex";
import { Socket } from "socket.io-client";

type InputWithJoinButtonHandlerProps = {
    onJoin: (username: string) => void;
};

const InputWithJoinButtonHandler = ({ onJoin }: InputWithJoinButtonHandlerProps) => {
    const [username, setUsername] = useState<string>("");

    const handleJoin = () => {
        if (!username) return;
        onJoin(username);
    };

    return (
        <FlexColumnAlignJustifyCenter
            style={{ width: "30rem", height: "30rem", backgroundColor: "beige", gap: "0.5rem", margin: "auto" }}>
            <h1>Enter a username</h1>
            <input
                value={username}
                onChange={e => setUsername(e.target.value)}
                onKeyDown={e => {
                    if (e.key === "Enter") handleJoin();
                }}
            />
            <button onClick={handleJoin}>Join</button>
        </FlexColumnAlignJustifyCenter>
    );
};

export default InputWithJoinButtonHandler;
