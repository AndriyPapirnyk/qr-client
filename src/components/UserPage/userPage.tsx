import { useState, useEffect } from 'react';
import { parse } from 'cookie';
import { Link } from 'react-router-dom';
import burger from '../../assets/burger.png';
import MobileNav from '../MobileNav/MobileNav';
import './userPage.scss';

const UserPage = () => {
    const [userObject, setUserObject] = useState({
        name: '',
        userId: 0,
        scans: 0,
        count: 0,
        history: [],
        lastScan: '',
    });
    const [opened, setOpened] = useState<boolean>(false);

  const handleBurger = () : void => {
    setOpened(!opened);
  }

    const getCookieValue = (cookieName: string) => {
        const cookies = parse(document.cookie);
        return cookies[cookieName];
    };

    useEffect(() => {
        const userCookieValue = getCookieValue('user'); 

        if (userCookieValue) {
            try {
                const parsedUserObject = JSON.parse(userCookieValue);
                setUserObject(parsedUserObject);
                console.log(parsedUserObject        )
            } catch (error) {
                console.error('Error parsing user cookie value:', error);
            }
        }
    }, []);

    return (
        <div className='userBox'>
            <img onClick={handleBurger} className='burger' src={burger} alt="" />
            {userObject ? (
                <>
                    <header className="head">
                        <h1>Profile</h1>
                    </header>
                    <div className="main">
                        <div className="left">
                            <div className="tog">
                                <div className="image">
                                    <div className="imageDiv" style={{ backgroundImage: `url(https://robohash.org/${userObject.userId}/?set=set4)` }}></div>
                                </div>
                                <div className="userName">
                                    {userObject.name}
                                </div>
                                <div className="idcode">
                                    ID: {userObject.userId}
                                </div>
                            </div>
                            <ul className='directions'>
                                <Link to="/home "><li>{'> Головна'}</li></Link>
                                <Link to="/rating"><li>{'> Рейтинг'}</li></Link>
                            </ul>
                        </div>
                        <div className="right">
                            <div className="congrats">
                                <div className="image">
                                    <div className="imageDiv" style={{ backgroundImage: `url(https://robohash.org/${userObject.userId}/?set=set4)` }}></div>
                                </div>
                                <h1>Вітаємо, {userObject.name}</h1>
                            </div>
                            <div className="mainRight">
                                <div className="points">
                                    Ваші бали:<br /><div className="blockPoints">{userObject.count}</div>
                                </div>
                                <div className="btns">
                                    <Link to="/history">
                                        <div className="blockBtn" id="historyBlock">
                                            Історія сканувань
                                            <div className="blockImage"></div>
                                        </div>
                                    </Link>
                                    <Link to="/shop">
                                        <div className="blockBtn" id="shopBlock">
                                            Магазин 
                                            <div className="blockImage"></div>                              
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <p style={{width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    Something went wrong. Maybe you don't have an account?  
                    <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>
                        <Link to="/">Try to log in here.</Link>
                    </span>
                </p>
            )}
            {opened && <MobileNav/>}
        </div>
    );
};

export default UserPage;
