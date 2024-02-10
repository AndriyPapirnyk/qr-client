import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Fingerprint2 from 'fingerprintjs2';
import './Verify.scss';

import LoginForm from './LoginForm/LoginForm';
import { BounceLoader } from 'react-spinners';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

interface UserData {
  scanned: boolean;
  user: {
    count: number;
    scans: number,
    lastScan: string;
    name: string;
    userId: string;
    history: Array<string>;
    __v: number;
    _id: string;
  };
}

function Verify() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [postKey, setPostKey] = useState<boolean>(false);
  const [resData, setResData] = useState<UserData>({ scanned: false, user: { count: 0, scans: 0, lastScan: "", name: "", userId: "", history: [], __v: 0, _id: "" } });

  const getDeviceId = async () => {
    return new Promise<string>((resolve, _reject) => {
      Fingerprint2.get({}, function (components) {
        const values = components.map((component) => component.value);
        const deviceId = Fingerprint2.x64hash128(values.join(''), 31);
        resolve(deviceId);
      });
    });
  };

  useEffect(() => {
    setPostKey(true);
    if (postKey) {
      const postHandle = async () => {
        const deviceId = await getDeviceId()
        await axios.post('https://qr-server-129a.onrender.com/api/user/verifyUser', { deviceId })
          .then((response: any) => {
            if (response.status !== 404) {
              setResData(response.data);
              setLoading(false);
              Cookies.set('user', JSON.stringify(response.data.user));
            } else {
              alert('Something went wrong!');
            }
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }
      postHandle();
    }
  }, [postKey]);

  const getHomePage = () => {
    navigate('/home')
  }


  return (
    <div className="verify">
      <div className="verify__container">
        {loading ? (<BounceLoader color="#36d7b7" size={200} />) : (
          resData.user ? (
            <>
              <h1>Вітаю, <br /> {resData.user.name}</h1>
              {resData.scanned ? (<h2>Ви вже сканували сьогодні <br />Зачекайте трохи 😊 </h2>) : (<h2>Дякуємо за відвідування, + 1 бал</h2>)}
              <button onClick={getHomePage}>На головну</button>
            </>
          ) : (
            <>
              <h1>Вітаємо на QR Harbor</h1>
              <LoginForm />
              <Link to="/home" style={{ color: '#fff', textDecoration: 'underline' }}>Перейти до QR-коду</Link>
            </>
          )
        )}
      </div>
    </div>
  )
}

export default Verify;
