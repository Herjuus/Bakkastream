import prisma from '@/app/libs/prismadb';
import Player from '@/app/components/videoPlayer';
import ChatPage from './chat/page';
import MessageInput from './chat/MessageInput';
import getCurrentUser from '@/app/actions/getCurrentUser';

export default async function UserPage({ params }:any){
    const currentUser = await getCurrentUser();

    let key;
    let streamName;
    let streamDescription;
    let streamer;

    const user = await prisma.user.findFirst({ where: { username: params.id } })
     .then(user => {
        key = user?.streamKey;
        streamName = user?.streamName;
        streamDescription = user?.streamDescription;
        streamer = user?.username;
     })

    return(
        <div className="flex justify-center bg-gray-900 w-full">
            {streamer ? (
                <div className="container">
                    <div className="flex flex-col lg:flex-row space-x-4 w-full">
                        <div className="flex-1 z-10">
                            <Player url={key}/>
                        </div>
                        <div className="rounded bg-gray-700/50 h-[35rem] w-11/12 mt-2 md:w-80 shadow-md overflow-hidden flex flex-col justify-end">
                            <ChatPage currentUser={currentUser}/>
                            <MessageInput currentUser={currentUser}/>
                        </div>
                    </div>
                    <div className="flex flex-col text-gray-100 mt-4">
                        <div className="flex space-x-4 items-end">
                            <span className="font-bold text-2xl">{streamer}</span>
                            <span className="text-2xl font-extralight">|</span>
                            <span className="text-2xl font-extralight">{streamName}</span>
                        </div>
                        <span className="font-light text-xl">{streamDescription}</span>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col justify-center items-center text-3xl text-gray-100">
                    <img src="notFound.svg" alt="" />
                    <span>User {params.id} not found!</span>
                </div>
            )}
            
        </div>
    )
}