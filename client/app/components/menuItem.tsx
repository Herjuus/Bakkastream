export default function MenuItem(props){
    return(
        <div
        onClick={props.onClick}
        className="px-4 py-3 bg-gray-50 hover:bg-gray-200">
            {props.label}
        </div>
    )
}