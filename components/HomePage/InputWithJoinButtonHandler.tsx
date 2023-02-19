import { useEffect, useState } from "react";
import { FlexColumnAlignJustifyCenter } from "../Flex";
import { Socket } from "socket.io-client";

type InputWithJoinButtonHandlerProps = {
    onJoin: () => void;
    socket: Socket;
};

const InputWithJoinButtonHandler = ({ onJoin, socket }: InputWithJoinButtonHandlerProps) => {
    const [username, setUsername] = useState<string>("");

    useEffect(() => {
        socket.on("connect", () => {});

        return () => {
            socket.off("connect");
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleJoin = () => {
        socket.emit("join", { username });
        onJoin();
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
