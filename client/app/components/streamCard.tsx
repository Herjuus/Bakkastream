export default function StreamCard(){
    return(
        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            <div style={{backgroundImage: 'url("")'}} className='text-white bg-cover bg-gray-300 bg-center rounded h-48 flex items-end overflow-hidden shadow-md cursor-pointer'>
                <div className='h-1/3 z-10 w-full bg-gradient-to-t from-black/60 to-transparent'></div>
                <span className='absolute p-2 z-10'>Herjuus</span>
            </div>
        </div>
    )
}