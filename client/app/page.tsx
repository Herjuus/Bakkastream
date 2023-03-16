

import { Inter } from 'next/font/google'
import mpegts from 'mpegts.js'
import VideoPlayer from './components/videoPlayer';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  return (
    <main className='bg-gray-900'>
      <div className='flex items-center flex-col'>
        <div className='container text-3xl'>
          <span className='text-green-500'>Bakka</span><span className='text-gray-100'>stream</span>
        </div>
        <div className='container rounded overflow-hidden'>
          <VideoPlayer/>
        </div>
      </div>
    </main>
  )
}
