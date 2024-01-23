const Block = (props: any) => {

    return(
        <div className="blockUser">
            <div className="number">#{props.place}</div>
            <div className="name">{props.name}</div>
            <div className="id">id: {props.id}</div>
            <div className="points">{props.points}</div>
        </div>
    )
}

export default Block