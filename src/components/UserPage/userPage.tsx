import { useState } from 'react'
import './userPage.scss'

const UserPage = () => {

    const [userObject, setUserObject] = useState({
        name: 'Mike',
        sename: 'Smith',
        id: 70259564,
        points: 34,
        inventory: []
    })

    return (
        <div className='userBox'>
            <header className="head">
                <h1>Profile</h1>
            </header>
            <div className="main">
                <div className="left">
                    <div className="image">
                        <div className="imageDiv" style={{backgroundImage: `url(https://robohash.org/${userObject.id}/?set=set4)`}}></div>
                    </div>
                    <div className="userName">
                        {userObject.name} {userObject.sename}
                    </div>
                    <div className="idcode">
                        ID: {userObject.id}
                    </div>
                </div>
                <div className="right">
                    <h1>{userObject.name}'s profile</h1>
                    <div className="mainRight">
                        <div className="points">
                            Points:<br /><div className="blockPoints">{userObject.points}</div>
                        </div>
                        <div className="btns">
                            <div className="blockBtn" id="historyBlock">
                                History of scans
                                <div className="blockImage"></div>
                            </div>
                            <div className="blockBtn" id="shopBlock">
                                Shop
                                <div className="blockImage"></div>                              
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserPage;