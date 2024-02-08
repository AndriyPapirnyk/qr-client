import './Main.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../Home/Home';
import Rating from '../Rating/Rating';
import Admin from "../Admin/Admin";
import Verify from "../Verify/Verify";
import UserPage from "../UserPage/userPage";
import NotFound from '../NotFound/NotFound';
import HistoryPage from '../history/history';
import ShopPage from '../shop/shop';


const Main = () => {

  return (
    <div className='main'>
      <BrowserRouter>
        <Routes>
          <Route index element={<Verify />} />
          <Route path="/home" element={<Home />} />
          <Route path="/rating" element={<Rating />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/history" element={<HistoryPage/>} />
          <Route path="/shop" element={<ShopPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Main