export default function ChatMessage(props) {
    return(
        <div className="w-full flex bg-black/20 p-1 mb-1 rounded text-gray-100 shadow-sm">
            <span><span className="font-bold">{props.user}: </span>{props.message}</span>
        </div>
    )
};
