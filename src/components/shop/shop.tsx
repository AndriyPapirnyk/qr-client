import { useState, useEffect } from 'react';
import './shop.scss';
import Good from './Good';

interface Good {
  name: string;
  points: number;
  id: string;
  img: string;
}

const ShopPage = () => {
  const arr: Array<Good> = [
    {
      name: 'Блокнот1',
      points: 50,
      id: 'b0001',
      img: 'https://tops.ua/sites/default/files/styles/zoom-big/public/node/product/classic.jpg?itok=SQQSk8W5',
    },
    {
      name: 'Блокнот2',
      points: 50,
      id: 'b0002',
      img: 'https://tops.ua/sites/default/files/styles/zoom-big/public/node/product/classic.jpg?itok=SQQSk8W5',
    },
    {
      name: 'Блокнот3',
      points: 50,
      id: 'b0003',
      img: 'https://tops.ua/sites/default/files/styles/zoom-big/public/node/product/classic.jpg?itok=SQQSk8W5',
    },
  ];

  const [cart, setCart] = useState<string[]>([]);

  useEffect(() => {
    // Load cart from localStorage on component mount
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const addToCart = (id: string) => {
    // Toggle item in the cart
    const updatedCart = cart.includes(id) ? cart.filter((item) => item !== id) : [...cart, id];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleConfirm = () => {
    alert('Order confirmed! Items in your cart: ' + cart.join(', '));
    setCart([]);
    localStorage.removeItem('cart');
    localStorage.clear()
  };

  return (
    <div className="shopPage">
      <h1 className="shoph1">ShopPage</h1>
      <div className="blockShop">
        {arr.map((item) => (
          <Good key={item.id} {...item} addToCart={addToCart} />
        ))}
      </div>
      <div className="cart">
        <h2>Your Cart</h2>
        {cart.length > 0 ? (
          <ul>
            {cart.map((itemId) => (
              <li key={itemId} className='li_cart'>
                {itemId}
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
    </div>
  );
};

export default ShopPage;
