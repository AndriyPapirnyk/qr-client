import { useEffect, useState } from 'react';
import './Container.scss';
import { Link } from 'react-router-dom';
import { BounceLoader } from 'react-spinners';

import Header from '../Header/Header';
import image from './Image/QECode.png';

const Container = () => {

  const [loaded, setLoaded] = useState<boolean>(false);
  const [digit1, setDigit1] = useState<number>(0)
  const [digit2, setDigit2] = useState<number>(0)
  const [digit3, setDigit3] = useState<number>(0)

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
        <div className="home">
            <Header />
            <div className='home__container'>
                    <div className="container__first-block_image" >
                        <img src={image} alt="QR Code" />
                    </div>
                <div className='container__second-block'>
                    <h3>Відскановано</h3>
                    <div className='container__second-block_card-container'>
                        {loaded ? (
                            <>
                             <div className="container__second-block_card">
                            <p>{digit1}</p>
                        </div>
                        <div className="container__second-block_card">
                            <p>{digit2}</p>
                        </div>
                        <div className="container__second-block_card">
                            <p>{digit3}</p>
                        </div>
                            </>
                        ) : <BounceLoader color="#36d7b7" size={200}/>}
                    </div>

                    <Link to="/rating">
                        <button className='container__second-block-btn'>
                            Рейтинг
                        </button>
                    </Link>

                </div>
            </div>
        </div>
    )
}

export default Container