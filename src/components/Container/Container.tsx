
import './Container.scss';
import { Link } from 'react-router-dom';
import image from './Image/QRCode.png'
import Header from '../Header/Header';
const Container = () => {
    return (

        <div className='container'>
            <Header />
            <div className="container__block-container">
                <div className='container__first-block'>
                    <div className="container__first-block_image" >
                        <img src={image} alt="QR Code" />
                    </div>

                </div>
                <div className='container__second-block'>
                    <h3>Відскановано</h3>
                    <div className='container__second-block_card-container'>
                        <div className="container__second-block_card">
                            <p>4</p>
                        </div>
                        <div className="container__second-block_card">
                            <p>2</p>
                        </div>
                        <div className="container__second-block_card">
                            <p>8</p>
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
    )
}

export default Container