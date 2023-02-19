import { useState, useEffect } from "react";
import Head from "next/head";
import { FlexColumn, FlexRowAlignCenter } from "@/components/Flex";
import io from "socket.io-client";
import { IUser, IUserWithMessage } from "@/types/common";
import InputWithJoinButtonHandler from "./InputWithJoinButtonHandler";

const socket = io("http://localhost:5000");

type useSocketListenerHandlerProps = {
    disabled: boolean;
    onNewMessage: (data: IUserWithMessage) => void;
};

const useSocketListenerHandler = ({ disabled, onNewMessage }: useSocketListenerHandlerProps) => {
    useEffect(() => {
        if (disabled) return;

        socket.on("new-message", (data: IUserWithMessage) => onNewMessage(data));
        socket.on("get-profile", (data: IUser) => {
            sessionStorage.setItem("user", JSON.stringify(data));
        });

        return () => {
            socket.off("new-message");
            socket.off("get-profile");
        };
    }, [disabled, onNewMessage]);
};

export default function Home() {
    const [isJoined, setIsJoined] = useState(false);

    // message related states
    const [value, setValue] = useState("");
    const [messages, setMessages] = useState<IUserWithMessage[]>([]);

    // socket listeners
    useSocketListenerHandler({
        disabled: !isJoined,
        onNewMessage: data => setMessages(prev => [...prev, data]),
    });

    // socket emmiters
    const sendMessage = () => {
        socket.emit("send-message", { message: value });
        setValue("");
    };

    // UI related functions
    const renderBody = () => {
        if (!isJoined) {
            return <InputWithJoinButtonHandler socket={socket} onJoin={() => setIsJoined(true)} />;
        }

        return (
            <FlexRowAlignCenter style={{ marginTop: "auto", gap: "1rem" }}>
                <input
                    style={{ width: "100%", height: "3rem", fontSize: "1.2rem" }}
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    onKeyDown={e => {
                        if (e.key === "Enter") sendMessage();
                    }}
                />
                <button style={{ height: "3rem", fontSize: "1.2rem", width: "5rem" }} onClick={sendMessage}>
                    Send
                </button>
            </FlexRowAlignCenter>
        );
    };

    const renderMessages = () => {
        if (!isJoined || !messages.length) return null;

        return messages.map(({ user, message }, i) => {
            return (
                <span
                    key={user.id + message + i}
                    style={{ padding: "0.6rem 1rem", backgroundColor: i % 2 === 1 ? "#fff" : "#eee" }}>
                    {user.username}: {message}
                </span>
            );
        });
    };

    return (
        <>
            <Head>
                <title>DFlow Socket App</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <FlexColumn as="main" style={{ justifyContent: "flex-end", height: "100vh" }}>
                {renderMessages()}
                {renderBody()}
            </FlexColumn>
        </>
    );
}
