import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Verify.scss';

import LoginForm from './LoginForm/LoginForm';

interface UserData {
  scanned: boolean;
  user: {
    count: number;
    lastScan: string;
    name: string;
    userId: string;
    __v: number;
    _id: string;
  };
}

function Verify() {

  const navigate = useNavigate();
  const [postKey, setPostKey] = useState<boolean>(false);
  const [resData, setResData] = useState<UserData>({ scanned: false, user: { count: 0, lastScan: "", name: "", userId: "", __v: 0, _id: "" } })
  // const [identificateKey, setIdentificateKey] = useState(true);


  useEffect(() => {
    setPostKey(true);
    if (postKey) {
      const postHandle = async () => {
        await axios.post('https://qr-server-129a.onrender.com/api/user/verifyUser', {})
          .then((response: any) => {
            if (response.status !== 404) {
              console.log(response.data);
              setResData(response.data)
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
  }, [postKey])

  const getHomePage = () => {
    navigate('/home')
  }

  console.log(resData)

  return (
    <div className="verify">
        <div className="verify__container">
          {resData.user ? (
            <>
            <h1>Вітаю, {resData.user.name}</h1>
            {resData.scanned ? (<h2>Ви вже сканували сьогодні <br />Зачекайте трохи </h2>) : (<h2>Дякуємо за відвідування, + 1 бал</h2>)}
            <button onClick={getHomePage}>На головну</button>
            </>    
          ) : (
            <>
            <h1>Вітаємо на QR Service</h1>
            <LoginForm/>
            </>
          )}
          {/* {resData.user ? (<h1>Вітаю, {resData.user.name}</h1>) : (<div>User does not exist</div>)}
          {resData.scanned ? (<h2>Ви вже сканували сьогодні <br />Зачекайте трохи </h2>) : 'Дякуємо за відвідування, + 1 бал'} */}
        </div>
    </div>
  )
}

export default Verify
