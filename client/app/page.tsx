import { Inter } from 'next/font/google'
import VideoPlayer from './components/videoPlayer'
import Header from './components/header'
import StreamCard from './components/streamCard'

const inter = Inter({ subsets: ['latin'] })

async function getStreams(){
  try {
    const res = await fetch('http://20.100.168.237:8888/streams', {cache: 'no-store'});
    const data = await res.json();
    return data as any[];

  } catch {
    console.log("Fetch error");
  }

}

export default async function Home() {
  const streams = await getStreams();

  return (
    <main className='bg-gray-900 overflow-hidden'>
      <div className='flex items-center flex-col'>
        <div className='container'>
          <span className='text-white text-2xl'>Explore</span>
          {streams ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-5'>
              {streams.map((stream) => {
                return <StreamCard className="cursor-pointer" key={stream.user} stream={stream}/>
              })}
            </div>
          ) : (
            <div className='flex w-full h-full text-gray-100 justify-center items-center flex-col'>
              <span className='text-4xl'>404 SERVER</span>
              <span className='text-2xl'>API NOT WORKING</span>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
