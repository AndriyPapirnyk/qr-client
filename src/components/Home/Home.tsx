import { useEffect, useState } from 'react';
import './Home.scss';
import { Link } from 'react-router-dom';
import { BounceLoader } from 'react-spinners';

// import Header from '../Header/Header';
import image from './Image/QECode.png';
import MobileNav from '../MobileNav/MobileNav';
import burger from '../../assets/burger.png';

const Home = () => {

  const [loaded, setLoaded] = useState<boolean>(false);
  const [digit1, setDigit1] = useState<number>(0)
  const [digit2, setDigit2] = useState<number>(0)
  const [digit3, setDigit3] = useState<number>(0)
  const [opened, setOpened] = useState<boolean>(false);

  const handleBurger = () : void => {
    setOpened(!opened);
  }

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch('https://qr-server-129a.onrender.com/api/user/getCount');
            const result = await response.json();
            const scoreStr = result.totalCount.toString();
            const paddedNumber: any = scoreStr.padStart(3, '0');
            setDigit1(parseInt(paddedNumber[0], 10))
            setDigit2(parseInt(paddedNumber[1], 10))
            setDigit3(parseInt(paddedNumber[2], 10))
            setLoaded(true);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    fetchData();
}, []);

    return (
        <>
        <div className="home">
            {/* <Header /> */}
            <img onClick={handleBurger} className='burger' src={burger} alt="" />
            <div className='home__container'>
                    <div className="home__holder" >
                        <img src={image} alt="QR Code" />
                    </div>
                <div className='home__main'>
                    <h3>Відскановано</h3>
                    <div className='home__main-holder'>
                        {loaded ? (
                            <>
                             <div className="home__main-card">
                            <p>{digit1}</p>
                        </div>
                        <div className="home__main-card">
                            <p>{digit2}</p>
                        </div>
                        <div className="home__main-card">
                            <p>{digit3}</p>
                        </div>
                            </>
                        ) : <BounceLoader color="#36d7b7" size={200}/>}
                    </div>
                    <div className="home__main-options">
                    <Link className='link' to="/rating">
                        <button className='home__main-button'>
                            Рейтинг
                        </button>
                    </Link>
                    <button className='home__main-qr'>QR</button>
                    </div>
                </div>
            </div>
        </div>
        {opened && <MobileNav />}
        </>
    )
}

export default Home