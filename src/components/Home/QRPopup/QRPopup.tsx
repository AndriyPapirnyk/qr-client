import React from 'react'
import './QRPopup.scss';
import qrImg from '../Image/QECode.png';

interface ChildProps {
    onCloseQR: () => void;
  }

const QRPopup: React.FC<ChildProps> = ({ onCloseQR }) => {
    const handleButtonClick = () => {
        onCloseQR();
    };

    return (
        <div className='qr-popup' onClick={handleButtonClick}>
            <img src={qrImg} alt="" />
            <p>Натисни щоб закрити</p>
        </div>
    )
}

export default QRPopup;
