import { useEffect, useState } from 'react';
import './Header.scss';
import Cookies from 'js-cookie';
import icon from './img/account.png'

const Header = () => {

    const [user, setUser] = useState<any>({})

    useEffect(() => {
        const storedUser = Cookies.get('user');
    
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      }, []);
    return (
        <div className='header'>
            <div className="header__container">
            <p>{user.name}</p>
            <div className='header__user'>
                <img src={icon} alt="" />
            </div>
            </div>
        </div>
    )
}

export default Header