"use client";

import { AiOutlineEnter } from 'react-icons/ai'
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import getCurrentUser from '@/app/actions/getCurrentUser';
import { socket } from './page';

export default function MessageInput(props) {
    async function sendMessage(message: any) {
        if (props.currentUser) {
            socket.emit('send-message', { user: props.currentUser.username, message: message });
        } else {
            toast.error("Log in to send a message");
        }
    }
    const [message, setMessage] = useState("");

    function HandleSubmit(e){
        e.preventDefault();
        if (message !== "") {
            sendMessage(message);
            setMessage("");
        } else {
            toast.error("Please enter a message")
        }
    }

    return(
        <form onSubmit={HandleSubmit} className='h-[8%] p-1 flex justify-between rounded shadow-sm bg-purple-700'>
            <input placeholder='Type in a message' value={message} onChange={(e) => setMessage(e.target.value)} className='flex-1 h-full p-1 outline-none bg-transparent text-gray-100' type="text" />
            <button type='submit'>
                <AiOutlineEnter className='text-gray-300 text-2xl'/>
            </button>
        </form>
    )
};
