import React, { useState, useEffect } from 'react';
import './shop.scss';


interface cartGood {
  name: string;
  _id: string;
  price: number;
  amount: number;
  img: string;
}

interface GoodProps {
  name: string;
  price: number;
  _id: string;
  img: string;
  amount: number;
  addToCart: (data: cartGood) => void;
}

const Good: React.FC<GoodProps> = ({ name, price, _id, img, amount, addToCart }) => {
  const [selected, setSelected] = useState(() => {
    const storedSelected = localStorage.getItem(`selected_${_id}`);
    return storedSelected === 'true';
  });

  useEffect(() => {
    // Save the selected state in local storage whenever it changes
    localStorage.setItem(`selected_${_id}`, String(selected));
  }, [_id, selected]);

  const handleClick = () => {
    setSelected(!selected);
    let data: cartGood = {
      _id: _id,
      name:name,
      price: price,
      amount: amount,
      img: img
    }
  addToCart(data) 
  };

  

  return (
    <div className={`good ${selected ? 'selected' : ''}`} key={_id} onClick={handleClick}>
      <img src={'img/' + img} alt={name} className="goodImg" />
      <div className="goodInfo">
        <h2 className="goodName">{name}</h2>
        <p className="goodPoints">{`Points: ${price}`}</p>
      </div>
    </div>
  );
};

export default Good;
