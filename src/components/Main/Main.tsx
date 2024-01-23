import { useEffect, useState } from "react";
import Container from '../Container/Container';
import Rating from '../Rating/Rating';
import { BrowserRouter , Routes , Route } from "react-router-dom";
import './Main.scss'
import axios from 'axios';

const Main = () => {

    const [postKey, setPostKey] = useState(false);
    const [identificateKey, setIdentificateKey] = useState(true);

    
     useEffect(()=>{
        setPostKey(true);
        if(postKey){
            const postHandle = async () => {
                await axios.post('https://qr-server-129a.onrender.com/api/user/getUser', {})
                .then((response) => {
                  if(response.status !== 404){ 
                    console.log('dad');
                    setIdentificateKey(false)
                  }else{
                    alert('somethin went wrong');
                  }
                })
                .catch((error) => {
                    console.error('Error:', error);
                }); 
              }
              postHandle();
        }
      })

    return (
        <div className='Main'>
            <BrowserRouter>
                <Routes>
                    {identificateKey ? <Route index element={<Container />} /> : <div></div>}
                    <Route index element={<Container />} />
                    <Route path="/rating" element={<Rating />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Main