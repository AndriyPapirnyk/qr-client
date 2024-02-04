import { useEffect, useState } from 'react';
import './Header.scss';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

const Header = () => {

    const [user, setUser] = useState<any>({})

    useEffect(() => {
        const storedUser = Cookies.get('user');
    
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          console.log(storedUser)
        }
    }, []);

    useEffect(()=>{
        console.log(user)
    }, [user])



    return (
        <div className='header'>
            {user&& (
                <Link to="/user">
                    <div className="header__container">
                        <p>{user.name}</p>
                        <div className='header__user'>
                            <img src={`https://robohash.org/${user.userId}/?set=set4`} alt="" />
                        </div>
                    </div>
                </Link>
            )}
        </div>
    )
    
}

export default Header