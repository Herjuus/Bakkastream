"use client";

import Link from "next/link";

export default function StreamCard(props){
    return(
        <Link href={`/user/${props.stream.user}`} className=''>
            <div style={{ backgroundImage: `url(${props.stream.streamThumbnail})` }} className={`text-white bg-cover bg-gray-300 bg-center rounded h-48 relative flex items-end overflow-hidden shadow-md cursor-pointer`}>
                <div className='h-1/3 z-10 w-full bg-gradient-to-t from-black/60 to-transparent'></div>
                <div className="absolute p-2 z-10 flex flex-row justify-between w-full items-end">
                    <span className='font-semibold'>{props.stream.streamName}</span>
                    <span className='font-light text-sm'>{props.stream.user}</span>
                </div>
            </div>
        </Link>
    )
}