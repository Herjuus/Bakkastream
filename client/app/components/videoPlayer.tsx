"use client";

import Image from 'next/image'
import { Inter } from 'next/font/google'
// import {ReactFlvPlayer} from 'react-flv-player'
import { useRef, useEffect } from 'react'
import mpegts from 'mpegts.js'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const videoRef: any = useRef(null);

    useEffect(() => {
        var player = mpegts.createPlayer({
            type: 'flv',
            isLive: true,
            url: 'http://localhost:8000/live/123.flv',
        });
        player.attachMediaElement(videoRef.current);
        player.load();
        player.play();
    })


    return (
        <main>
        {/* <ReactFlvPlayer
            url = 'http://localhost:8000/live/123.flv'
        /> */}
            <video ref={videoRef} controls autoPlay className='w-full h-full rounded'></video>
        </main> 
    )
}