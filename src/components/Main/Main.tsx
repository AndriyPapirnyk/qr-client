// import { useEffect, useState } from "react";
import Container from '../Container/Container';
import Rating from '../Rating/Rating';
import Admin from "../Admin/Admin";
import Verify from "../Verify/Verify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './Main.scss'
import axios from 'axios';
import UserPage from "../UserPage/userPage";


const Main = () => {

  // const [postKey, setPostKey] = useState(false);
  // const [identificateKey, setIdentificateKey] = useState(true);



  // useEffect(() => {
  //   setPostKey(true);
  //   if (postKey) {
  //     const postHandle = async () => {
  //       await axios.post('https://qr-server-129a.onrender.com/api/user/verifyUser', {})
  //         .then((response) => {
  //           if (response.status !== 404) {
  //             console.log('dad');
  //             setIdentificateKey(false)
  //           } else {
  //             alert('somethin went wrong');
  //           }
  //         })
  //         .catch((error) => {
  //           console.error('Error:', error);
  //         });
  //     }
  //     postHandle();
  //   }
  // })

  return (
    <div className='main'>
      <BrowserRouter>
        <Routes>
          {/* {identificateKey ? <Route index element={<Container />} /> : null} */}
          <Route index element={<Verify />} />
          <Route path="/home" element={<Container />} />
          <Route path="/rating" element={<Rating />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/user" element={<UserPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Main