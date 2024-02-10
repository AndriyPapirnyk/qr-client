import './MobileNav.scss';
import { Link } from 'react-router-dom';

export default function MobileNav() {
  return (
    <nav className='mobile-nav'>
        <Link className='link' to='/home'>
            <p>Home</p>
        </Link>
        <Link className='link' to='/rating'>
            <p>Rating</p>
        </Link>
        <Link className='link' to='/shop'>
            <p>Shop</p>
        </Link>
        <Link className='link' to='/user'>
            <p>Profile</p>
        </Link>        
    </nav>
  )
}
