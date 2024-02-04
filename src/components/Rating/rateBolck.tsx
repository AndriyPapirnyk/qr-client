const Block = (props: any) => {

    return(
        <div className="blockUser">
            <div className="name__holder">
            <div className="number">#{props.place}</div>
            <div className="name">{props.name}</div>
            </div>
            <div className="id__holder">
            <div className="id">id: {props.id}</div>
            <div className="points">{props.points}</div>
            </div>
        </div>
    )
}

export default Block