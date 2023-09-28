"use client";

import Image from 'next/image'
import { Inter } from 'next/font/google'
// import {ReactFlvPlayer} from 'react-flv-player'
import { useRef, useEffect, useState, Suspense } from 'react'
import mpegts from 'mpegts.js'
import { toast } from 'react-hot-toast';
import ReactHlsPlayer from 'react-hls-player';
import { Replay } from 'vimond-replay';
import 'vimond-replay/index.css';
import HlsjsVideoStreamer from 'vimond-replay/video-streamer/hlsjs';
import ShakaVideoStreamer from 'vimond-replay/video-streamer/shaka-player';


const inter = Inter({ subsets: ['latin'] })

export default function Player(props) {
    const videoRef: any = useRef(null);

    useEffect(() => {
        // var player = mpegts.createPlayer({
        //     type: 'flv',
        //     isLive: true,
        //     url: `http://localhost:8000/live/${props.url}/index.m3u8`,
        // });
        // player.attachMediaElement(videoRef.current);
        // player.load();
        // player.play();

        // videoRef.current.play();
    }, [])



    return (
        <main className='rounded w-full h-full relative overflow-hidden bg-black/20'>
            {/* <video ref={videoRef} autoPlay controls className='w-full h-full shadow-md rounded z-0'></video> */}
            <ReactHlsPlayer playerRef={videoRef} className='w-full h-full' controls autoPlay={true} src={`http://20.100.168.237:8000/live/${props.url}/index.m3u8`}/>
            {/* <Replay
            source={`http://20.100.168.237:8000/live/${props.url}/index.m3u8`}
            initialPlaybackProps={{  }}
            >
                <HlsjsVideoStreamer />
            </Replay> */}
        </main> 
    )
}