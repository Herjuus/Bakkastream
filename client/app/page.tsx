import { Inter } from 'next/font/google'
import VideoPlayer from './components/videoPlayer'
import Header from './components/header'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  return (
    <main className='bg-gray-900 h-screen'>
      <Header/>
      <div className='flex items-center flex-col'>
        <div className='container'>
          <div className='items-center flex space-x-10 my-10 flex-col md:flex-row'>
            <div className='flex flex-1 justify-center items-center flex-col my-4'>
              <img className='w-2/3' src="/home.png" alt="" />
              <div className='text-gray-100 text-2xl space-x-4'>
                <button className='bg-green-500 hover:bg-green-700 px-4 py-2 rounded'>Utforsk</button>
                <button className='bg-green-500 hover:bg-green-700 px-4 py-2 rounded'>Registrer deg</button>
              </div>
            </div>
            <div className='flex flex-1 justify-center items-center my-4'>
              <img className='w-5/6' src="/stream.svg" alt="" />
            </div>
          </div>
          <div className='text-gray-100 text-4xl flex justify-center space-x-2'>
            <span className='font-bold'>24</span><span>streams akuratt nå!</span>
          </div>
          {/* <VideoPlayer/> */}
          {/* <span className='text-white text-2xl'>Utforsk</span> */}
          {/* <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            <div className='text-white bg-gray-800 rounded h-48 flex items-end overflow-hidden shadow-md cursor-pointer'>
              <div className='h-1/3 w-full bg-gradient-to-t from-black/40 to-transparent'></div>
              <span className='absolute p-2'>Herjuus</span>
            </div>
            <div className='text-white bg-gray-800 rounded h-48 flex items-end overflow-hidden shadow-md cursor-pointer'>
              <div className='h-1/3 w-full bg-gradient-to-t from-black/40 to-transparent'></div>
              <span className='absolute p-2'>Herjuus</span>
            </div>
            <div className='text-white bg-gray-800 rounded h-48 flex items-end overflow-hidden shadow-md cursor-pointer'>
              <div className='h-1/3 w-full bg-gradient-to-t from-black/40 to-transparent'></div>
              <span className='absolute p-2'>Herjuus</span>
            </div>
          </div> */}
        </div>
      </div>
    </main>
  )
}
