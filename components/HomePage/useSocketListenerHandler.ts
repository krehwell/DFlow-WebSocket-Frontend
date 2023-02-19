import { IUser, IUserWithMessage } from "@/types/common";
import { useEffect } from "react";
import { Socket } from "socket.io-client";

type useSocketListenerHandlerProps = {
    disabled: boolean;
    onNewMessage: (data: IUserWithMessage) => void;
    onLeft: (data: IUser) => void;
    onJoin: (data: IUser) => void;
    onWhoIsOnline: (data: IUser[]) => void;
};

export const useSocketListenerHandler = (
    socket: Socket,
    { disabled, onNewMessage, onLeft, onJoin, onWhoIsOnline }: useSocketListenerHandlerProps
) => {
    useEffect(() => {
        if (disabled) return;

        socket.on("new-message", (data: IUserWithMessage) => onNewMessage(data));
        socket.on("get-profile", (data: { user: IUser }) => {
            sessionStorage.setItem("user", JSON.stringify(data.user));
        });
        socket.on("left", (data: { user: IUser }) => onLeft(data.user));
        socket.on("join", (data: { user: IUser }) => onJoin(data.user));
        socket.on("who-is-online", (data: { users: IUser[] }) => onWhoIsOnline(data.users));

        return () => {
            socket.off("new-message");
            socket.off("get-profile");
            socket.off("left");
            socket.off("join");
            socket.off("who-is-online");
        };
    }, [socket, disabled, onNewMessage, onLeft, onJoin, onWhoIsOnline]);
};
