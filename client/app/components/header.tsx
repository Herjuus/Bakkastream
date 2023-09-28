"use client";

import Link from 'next/link'
import React, { useState } from 'react';
import RegisterModal from './RegisterModal';
import { Toaster, toast } from 'react-hot-toast';
import MenuItem from './menuItem';
import { User } from '@prisma/client';
import { signOut } from 'next-auth/react';

export default function Header(props){
    const [open, setOpen] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);

    const [userModal, setUserModal] = useState(false)

    function toggleUserModal() {
        setUserModal(!userModal);
    }

    return(
        <div className='bg-gray-900'>
            <div><Toaster/></div>
            {modalOpen ? (
                <div className='z-10 w-screen h-screen absolute bg-black/30 flex justify-center items-center'>
                    <div onClick={() => setModalOpen(false)} className='w-full h-full fixed'></div>
                    <RegisterModal close={() => setModalOpen(!modalOpen)}/>
                </div>
            ) : (
                <></>
            )}
            <div className="flex justify-center">
                <div className='container py-4 flex justify-between items-center px-2 md:px-0'>
                    <div className='text-3xl'>
                        <Link href={'/'}><span className='text-green-500'>Bakka</span><span className='text-gray-100 font-extralight'>stream</span></Link>
                    </div>
                    <div className='text-white text-lg space-x-4 hidden md:flex'>
                        <input className='outline-none bg-black/20 px-2 py-1 rounded' placeholder='Search' type="text" />
                        {props.currentUser ? (
                            <button onClick={() => toggleUserModal()} className={`rounded-full overflow-hidden bg-green-500 h-9 w-9 flex justify-center items-center`}>{props.currentUser.image ? (
                                <img className='w-full' src={props.currentUser.image} alt="" />
                            ) : (
                                <span>{props.currentUser.username[0]}</span>
                            )}</button>
                        ) : (
                            <button onClick={() => setModalOpen(true)}>Login</button>
                        )}
                    </div>
                    <div onClick={() => setOpen(!open)} className='flex flex-col w-7 h-4 justify-between md:hidden cursor-pointer'>
                        <div className='h-0.5 bg-gray-100'></div>
                        <div className='h-0.5 bg-gray-100'></div>
                        <div className='h-0.5 bg-gray-100'></div>
                    </div>
                </div>
            </div>
            {open ? (
                <div className='absolute z-50 bg-white top-0 h-screen w-screen p-4 flex justify-between text-2xl'>
                    <div className='text-gray-900 flex flex-col'>
                        <Link onClick={() => setOpen(false)} href={'/'}>Home</Link>
                        {props.currentUser ? (
                            <div className='flex flex-col'>
                                <Link onClick={() => {
                                setOpen(false)
                                setModalOpen(false)
                                }} href={`/user/${props.currentUser.username}`}>
                                    Profile
                                </Link>
                                <span className='hover:cursor-pointer' onClick={() => {
                                    setOpen(false)
                                    setModalOpen(false)
                                    signOut()
                                    }}>
                                    Sign out
                                </span>
                            </div>
                        ) : (
                            <div>
                                <Link onClick={() => {
                                setOpen(false)
                                setModalOpen(true)
                                }} href={'/'}>
                                    Sign in
                                </Link>
                            </div>
                            
                        )}
                        
                        <input className='outline-none bg-black/5 px-2 py-1 rounded' placeholder='Søk' type="text" />
                    </div>
                    <span onClick={() => setOpen(false)} className='cursor-pointer text-3xl text-gray-900'>X</span>
                </div>
            ) : (
                <></>
            )}
            <div className='flex justify-center'>
                <div className='container flex justify-end'>
                    {userModal && (
                        <div className='absolute rounded-xl mr-1 shadow-md w-56 bg-gray-100 overflow-hidden top-14 text-sm z-50'>
                            <div className='flex flex-col cursor-pointer'>
                                <>
                                    <Link href={`/user/${props.currentUser.username}`}>
                                        <MenuItem label={props.currentUser.username} onClick={() => setUserModal(false)}/>
                                    </Link>
                                    <hr />
                                    <Link href={"/dashboard"}>
                                        <MenuItem label="Dashboard" onClick={() => setUserModal(false)}/>
                                    </Link>
                                    <Link href={"/account"}>
                                        <MenuItem label="Account" onClick={() => setUserModal(false)}/>
                                    </Link>
                                    <hr />
                                    <MenuItem label="Sign out" onClick={signOut}/>
                                </>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            
        </div>
    );
}