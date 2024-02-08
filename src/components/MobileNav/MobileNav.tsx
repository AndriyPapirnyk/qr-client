import './MobileNav.scss';
// import homeImg from './img/home.png';
// import ratingImg from './img/rating.png';
// import userImg from './img/user.png';
// import cartImg from './img/cart.png';
// import burger from './img/burger.png';

//

import { Link } from 'react-router-dom';

export default function MobileNav() {
  return (
    <nav className='mobile-nav'>
        {/* <img className='burger' src={burger} alt="" /> */}
        <Link className='link' to='/home'>
            {/* <img src={homeImg} alt="" /> */}
            <p>Home</p>
        </Link>
        <Link className='link' to='/rating'>
            {/* <img src={ratingImg} alt=""  /> */}
            <p>Rating</p>
        </Link>
        <Link className='link' to='/shop'>
            {/* <img src={cartImg} style={{width: '35px'}} alt="" /> */}
            <p>Shop</p>
        </Link>
        <Link className='link' to='/user'>
            {/* <img src={userImg} alt="" /> */}
            <p>Profile</p>
        </Link>        
    </nav>
  )
}
