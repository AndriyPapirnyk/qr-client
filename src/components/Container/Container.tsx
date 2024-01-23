
import './Container.scss';


import image from './Image/QRCode.png'
const Container = () => {
    return (
        <div className='container'>
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
            </div>


        </div>
    )
}

export default Container