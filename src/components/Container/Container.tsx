import { useEffect, useState } from 'react';
import './Container.scss';
import { Link } from 'react-router-dom';

import Header from '../Header/Header';
import image from './Image/QECode.png';

// interface UserData {
//     scanned: boolean;
//     user: {
//       count: number;
//       lastScan: string;
//       name: string;
//       userId: string;
//       __v: number;
//       _id: string;
//     };
//   }


const Container = () => {

//   const [resData, setResData] = useState<UserData>({ scanned: false, user: { count: 0, lastScan: "", name: "", userId: "", __v: 0, _id: "" } })
  const [score, setScore] = useState<number>(0)


  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch('https://qr-server-129a.onrender.com/api/user/getCount');
            const result = await response.json();
            console.log(result);
            setScore(result.totalCount)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
}, []);



    return (
        <div className="home">
            <div className='home__container'>
            <Header />
            <div className="container__block-container">
                {/* <div className='container__first-block'> */}
                    <div className="container__first-block_image" >
                        <img src={image} alt="QR Code" />
                    </div>

                {/* </div> */}
                <div className='container__second-block'>
                    <h3>Відскановано</h3>
                    <div className='container__second-block_card-container'>
                        <div className="container__second-block_card">
                            <p>0</p>
                        </div>
                        <div className="container__second-block_card">
                            <p>0</p>
                        </div>
                        <div className="container__second-block_card">
                            <p>{score}</p>
                        </div>
                    </div>

                    <Link to="/rating">
                        <button className='container__second-block-btn'>
                            Рейтинг
                        </button>
                    </Link>

                </div>
            </div>
        </div >
        </div>
    )
}

export default Container