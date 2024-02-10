import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { parse } from 'cookie';
import Cookies from 'js-cookie';
import './shop.scss';
import Good from './Good';
import axios from 'axios';
import { BounceLoader } from 'react-spinners';
import burger from '../../assets/burger.png';
import MobileNav from '../MobileNav/MobileNav';

interface Good {
  name: string;
  price: number;
  _id: string;
  amount: number;
  img: string;
}

interface cartGood {
  name: string;
  _id: string;
  price: number;
  amount: number;
  img: string;
}

const ShopPage = () => {

  // const navigate = useNavigate();

  const [userObject, setUserObject] = useState({
    name: '',
    userId: 0,
    count: 0,
    history: [],
    lastScan: '',
    _id: ''
});

  const [products, setProducts] = useState(Array<Good>);
  const [loaded, setLoaded] = useState<boolean>(false);

  const [opened, setOpened] = useState<boolean>(false);

  const handleBurger = () : void => {
    setOpened(!opened);
  }
  
  const getCookieValue = (cookieName: string) => {
    const cookies = parse(document.cookie);
    return cookies[cookieName];
};

useEffect(() => {
    const userCookieValue = getCookieValue('user');  // Замініть на фактичне ім'я кукі
    if (userCookieValue) {
        try {
            const parsedUserObject = JSON.parse(userCookieValue);
            setUserObject(parsedUserObject);
            console.log(parsedUserObject);
        } catch (error) {
            console.error('Error parsing user cookie value:', error);
        }
    }
}, []);

  useEffect(()=>{
    const postHandle = async () => {
      await axios.post('https://qr-server-129a.onrender.com/api/user/getAllProducts', {})
      .then((response: any) => {
        if (response.status !== 404) {
          console.log(response.data);
          setProducts(response.data);
          setLoaded(true);
        } else {
          alert('Something went wrong!');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    };
    
    postHandle();
  }, [])

 

  const [cart, setCart] = useState(Array<cartGood>);

  useEffect(() => {
    // Load cart from localStorage on component mount
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

const addToCart = (product: cartGood) => {

  let updatedCart: Array<cartGood> = []
  const isPersonInCart = cart.some((item) => item._id === product._id);

  if (isPersonInCart) {
    updatedCart = cart.filter((item) => item._id !== product._id);
  } else {
    updatedCart = [...cart, product];
  }

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };


  const handleConfirm = () => {
    if(checkAmount() === true){
      if(getAllPrice() <= userObject.count){
        postHandle();
      }else{
        alert('You dont have enough points')
      }
    }else if(typeof checkAmount() === 'string'){
      alert(`Sorry, but ${checkAmount()} aren't in stock`)
    }
  };

  const handleClient = () => {
    alert('Order confirmed!');
    setCart([]);
    localStorage.removeItem('cart');
    localStorage.clear();
  }

  const getAllPrice = () => {
    let fullPrice: number = cart.reduce((acc: number, item: any) => {
      const price = parseInt(item.price, 10);
      return !isNaN(price) ? acc + price : acc;
    }, 0);
    return fullPrice
  }

  const postHandle = async () => {
    const fullPrice = getAllPrice();
    const userId = userObject._id
    await axios.post('https://qr-server-129a.onrender.com/api/user/saveRequest', {userId, fullPrice, cart})
    .then((response: any) => {
      if (response.status !== 404) {
        handleClient();
        setUserObject(response.data.user);
        setProducts(response.data.products); 
        Cookies.set('user', JSON.stringify(response.data));
      } else {
        alert('Something went wrong!');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  let newCart: Array<cartGood> = [];

  const checkAmount = () => {
    newCart = cart.filter((item) => item.amount < 1);
    let nameArr: Array<string> = []
    if(newCart.length > 0){
      for(let el of newCart){
        nameArr.push(el.name)
      }
      return nameArr.join();
    }else{
      return true
    }
  }

  // const returnFunc = () => {
  //   navigate('/user')
  // }

 
  return (
    <div className="shopPage">
      <img onClick={handleBurger} className='burger' src={burger} alt="" />
      <div className="row">
        <div className="row__left">
        <h2>You Have: {userObject.count > 0 ? userObject.count : '0' } Points</h2>
        </div>
        <div className="row__right">
          {/* <div className="shopPage__closeBtn" onClick={returnFunc}>Return</div> */}
        </div>
      </div>
      <h1 className="shoph1">QR Harbor Shop</h1>
      <div className="blockShop">
        {loaded ? (
          products.map((item) => (
            <Good key={item._id} {...item}  addToCart={addToCart} />
          ))
        ) : (<BounceLoader className='loader' color="#36d7b7" size={200}/>)}
      </div>
      <div className="cart">
        <h2>Your Cart</h2>
        {cart.length > 0 ? (
          <ul>
            {cart.map((item) => (
              <li key={item._id} className='li_cart'>
                {item.name}
              </li>
            ))}
          </ul>
        ) : (
          <p>You don't have any items in your cart</p>
        )}
        {cart.length > 0 && (
          <button onClick={handleConfirm} className="confirmButton">
            Confirm
          </button>
        )}
      </div>
      {opened && <MobileNav />}
    </div>
  );
};

export default ShopPage;


