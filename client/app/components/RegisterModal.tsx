"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react"
import { toast } from "react-hot-toast";

export default function RegisterModal(props) {
    const router = useRouter();

    const [loginPage, setLoginPage] = useState(true);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handlePageChange(){
        setLoginPage(!loginPage);
    }

    function handleSignup(email, username, password){
        toast.loading("Registering...");
        axios.post('/api/register', {
            email: email,
            username: username,
            password: password,
        })
         .then(() => {
            toast.dismiss();
            props.close();
            handleLogin(email, password);
         })
         .catch((error) => {
            console.log(error);
            toast.dismiss();
            toast.error("Username or email already exists!")
         })
         .finally(() => {
            
         })
    }

    function handleLogin(email, password) {
        toast.loading("Logging in");
        signIn('credentials', {
            email: email,
            password: password,
            redirect: false,
        })
        .then((callback) => {
            if (callback?.ok) {
                toast.dismiss();
                toast.success("Successfully logged in!")
                router.refresh();
                props.close();
            }

            if(callback?.error){
                toast.dismiss();
                toast.error("Wrong email and/or password")
                console.log(callback.error)
            }
        })
    }

    return(
        <>
            {loginPage ? (
                <form onSubmit={async (e) => {
                    await handleLogin(email, password);
                    e.preventDefault();
                }} className="bg-gray-100 rounded p-4 z-20 w-[30rem] shadow-md">
                    <div className="flex justify-center items-center py-3">
                        <span className="text-xl">Login</span>
                    </div>
                    <div className="h-0.5 my-2 bg-gray-300"></div>
                    <div className="py-3">
                        <div className="flex flex-col">
                            <span className="font-semibold">BakkaStream</span>
                            <span className="font-light">Log in to an account</span>
                        </div>
                        <div className="py-2">
                            <label className="my-2 flex flex-col px-3 py-1 border-2 rounded border-gray-400 focus-within:border-gray-700 text-gray-400 focus-within:text-gray-700">
                                <span className="text-xs">Email</span>
                                <input value={email} onChange={e => setEmail(e.target.value.toLowerCase())} className="bg-transparent outline-none text-gray-900" type="email" required/>
                            </label>
                            <label className="my-2 flex flex-col px-3 py-1 border-2 rounded border-gray-400 focus-within:border-gray-700 text-gray-400 focus-within:text-gray-700">
                                <span className="text-xs">Password</span>
                                <input value={password} onChange={e => setPassword(e.target.value)} className="bg-transparent outline-none text-gray-900" type="password" required />
                            </label>
                        </div>
                    </div>
                    <div>
                        <button className="bg-green-500 hover:bg-green-600 rounded text-gray-100 px-4 py-2 w-full">Continue</button>
                    </div>
                    <div className="pt-3">
                        <span className="text-sm">Not registered yet? </span>
                        <span onClick={() => handlePageChange()} className="text-sm text-green-500 hover:text-green-600 cursor-pointer underline">Register now!</span>
                    </div>
                </form>
            ) : (
                <form onSubmit={async (e) => {
                    await handleSignup(email, username, password);
                    e.preventDefault();
                    }} className="bg-gray-100 rounded p-4 z-20 w-[30rem] shadow-md">
                    <div className="flex justify-center items-center py-3">
                        <span className="text-xl">Register</span>
                    </div>
                    <div className="h-0.5 my-2 bg-gray-300"></div>
                    <div className="py-3">
                        <div className="flex flex-col">
                            <span className="font-semibold">BakkaStream</span>
                            <span className="font-light">Create an account</span>
                        </div>
                        <div className="py-2">
                            <label className="my-2 flex flex-col px-3 py-1 border-2 rounded border-gray-400 focus-within:border-gray-700 text-gray-400 focus-within:text-gray-700">
                                <span className="text-xs">Username</span>
                                <input value={username} onChange={e => setUsername(e.target.value)} className="bg-transparent outline-none text-gray-900" type="text" required/>
                            </label>
                            <label className="my-2 flex flex-col px-3 py-1 border-2 rounded border-gray-400 focus-within:border-gray-700 text-gray-400 focus-within:text-gray-700">
                                <span className="text-xs">Email</span>
                                <input value={email} onChange={e => setEmail(e.target.value.toLowerCase())} className="bg-transparent outline-none text-gray-900" type="email" required/>
                            </label>
                            <label className="my-2 flex flex-col px-3 py-1 border-2 rounded border-gray-400 focus-within:border-gray-700 text-gray-400 focus-within:text-gray-700">
                                <span className="text-xs">Password</span>
                                <input value={password} onChange={e => setPassword(e.target.value)} className="bg-transparent outline-none text-gray-900" type="password" required />
                            </label>
                        </div>
                    </div>
                    <div>
                        <button className="bg-green-500 hover:bg-green-600 rounded text-gray-100 px-4 py-2 w-full">Continue</button>
                    </div>
                    <div className="pt-3">
                        <span className="text-sm">Already registered? </span>
                        <span onClick={() => handlePageChange()} className="text-sm text-green-500 hover:text-green-600 cursor-pointer underline">Log in!</span>
                    </div>
                </form>
            )}
        </>
    )
};
