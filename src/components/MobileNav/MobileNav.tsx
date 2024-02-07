import './MobileNav.scss';
import homeImg from './img/home.png';
import ratingImg from './img/rating.png';
import userImg from './img/user.png';
import cartImg from './img/cart.png';

//

import { Link } from 'react-router-dom';

export default function MobileNav() {
  return (
    <nav className='mobile-nav'>
        <Link to='/home' style={{zIndex: 11}}>
            <img src={homeImg} alt="" />
        </Link>
        <Link to='/rating' style={{zIndex: 11}}>
            <img src={ratingImg} alt=""  />
        </Link>
        <Link to='/shop' style={{zIndex: 11}}>
            <img src={cartImg} style={{width: '35px'}} alt="" />
        </Link>
        <Link to='/user' style={{zIndex: 11}}>
            <img src={userImg} alt="" />
        </Link>        
    </nav>
  )
}
