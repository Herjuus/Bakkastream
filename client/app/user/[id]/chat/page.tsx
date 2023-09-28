"use client";

import ChatMessage from "./chatMessage";
import { use, useEffect, useState } from "react";
import { io } from "socket.io-client";
import getCurrentUser from '@/app/actions/getCurrentUser';
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

export const socket = io("http://20.100.168.237:8081");

export default function ChatPage(props) {
    const [messages, setMessages]:any = useState([])

    socket.on("recieve-message", data => {
        setMessages([{ user: data.user, message: data.message }, ...messages]);
    })

    return(
        <div className="w-full px-1 overflow-y-scroll overflow-x-hidden flex flex-col-reverse">
            {messages.map((message) => (
                <ChatMessage key={message.id} user={message.user} message={message.message} />
            ))}
        </div>
    )
};
