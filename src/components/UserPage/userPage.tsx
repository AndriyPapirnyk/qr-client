import React, { useState, useEffect } from 'react';
import { parse } from 'cookie';
import './userPage.scss';

const UserPage = () => {
    const [userObject, setUserObject] = useState({
        name: 'Mike',
        userId: 70259564,
        count: 10,
        inventory: []
    });

    const getCookieValue = (cookieName: string) => {
        const cookies = parse(document.cookie);
        return cookies[cookieName];
    };

    useEffect(() => {
        const userCookieValue = getCookieValue('user');  // Замініть на фактичне ім'я кукі

        if (userCookieValue) {
            try {
                const parsedUserObject = JSON.parse(userCookieValue);
                setUserObject(parsedUserObject);
                console.log(parsedUserObject)
            } catch (error) {
                console.error('Error parsing user cookie value:', error);
            }
        }
    }, []);



    return (
        <div className='userBox'>
            <header className="head">
                <h1>Profile</h1>
            </header>
            <div className="main">
                <div className="left">
                    <div className="image">
                        <div className="imageDiv" style={{ backgroundImage: `url(https://robohash.org/${userObject.id}/?set=set4)` }}></div>
                    </div>
                    <div className="userName">
                        {userObject.name}
                    </div>
                    <div className="idcode">
                        ID: {userObject.userId}
                    </div>
                </div>
                <div className="right">
                    <h1>{userObject.name}'s profile</h1>
                    <div className="mainRight">
                        <div className="points">
                            Points:<br /><div className="blockPoints">{userObject.count}</div>
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
    );
};

export default UserPage;
