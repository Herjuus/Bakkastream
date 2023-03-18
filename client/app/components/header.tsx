import Link from 'next/link'

export default function Header(){
    return(
        <div className="flex justify-center">
            <div className='container py-4 flex justify-center md:justify-between items-center'>
                <div className='text-3xl'>
                    <Link href={'/'}><span className='text-green-500'>Bakka</span><span className='text-gray-100 font-extralight'>streaming</span></Link>
                </div>
                <div className='text-white text-lg space-x-4 hidden md:block lg:block'>
                    <Link href={'/'}>Hjem</Link>
                    <Link href={'/'}>Utforsk</Link>
                    <input className='outline-none bg-black/20 px-2 py-1 rounded' placeholder='Søk' type="text" />
                    <Link href={'/'}>Logg inn</Link>
                </div>
            </div>
        </div>
    )
}