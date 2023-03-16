"use client";

import Image from 'next/image'
import { Inter } from 'next/font/google'
import {ReactFlvPlayer} from 'react-flv-player'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <ReactFlvPlayer
        url = 'http://localhost:8000/live/123.flv'
        isLive={true}
        isMuted={false}
        showControlls={false}
      />
    </main>
  )
}