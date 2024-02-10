import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.scss';
import axios from 'axios';
import Fingerprint2 from 'fingerprintjs2';
import Cookies from 'js-cookie';

const LoginForm = () => {

    const navigate = useNavigate();
    const [name, setName] = useState<string>('');

    const getDeviceId = async () => {
        return new Promise<string>((resolve, _reject) => {
          Fingerprint2.get({}, function (components) {
            const values = components.map((component) => component.value);
            const deviceId = Fingerprint2.x64hash128(values.join(''), 31);
            resolve(deviceId);
          });
        });
      };

    const handleLogin = async (e: any) => {
        try{
          e.preventDefault();
          if(name.length != 0) {
            const deviceId = await getDeviceId();
            console.log(deviceId)
            axios.post('https://qr-server-129a.onrender.com/api/user/createUser', {name: name, deviceId: deviceId})
            .then((response: any) => {
                if(response.status === 200) {
                    console.log(response.data.user);
                    Cookies.set('user', JSON.stringify(response.data.user));
                    navigate('/home');
                } else {
                    alert('Ой, щось пішло не так')
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
          } else {
            alert(`Введіть ваше ім'я коректно`)
          }
        } catch(error) {
            console.error(error)
        }
    } 

  return (
    <form className='verify__form' action="POST">
        <input onChange={(e): void => {setName(e.target.value)}} type="text" placeholder='Введіть ваше імя...'/>
        <button onClick={handleLogin}>Надіслати</button>
    </form>
  )
}

export default LoginForm