import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.scss';
import axios from 'axios';

const LoginForm = () => {

    const navigate = useNavigate();
    const [name, setName] = useState<string>('')

    const handleLogin = (e: any) => {
        e.preventDefault()
        axios.post('https://qr-server-129a.onrender.com/api/user/createUser', {name: name})
        .then((response: any) => {
            if(response.status === 200) {
                console.log(response)
                navigate('/home')
            } else {
                alert('Ой, щось пішло не так')
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    } 

  return (
    <form className='verify__form' action="POST">
        <input onChange={(e): void => {setName(e.target.value)}} type="text" placeholder='Введіть ваше імя...'/>
        <button onClick={handleLogin}>Надіслати</button>
    </form>
  )
}

export default LoginForm