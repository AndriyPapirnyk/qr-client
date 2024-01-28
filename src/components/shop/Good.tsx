import React, { useState, useEffect } from 'react';
import './shop.scss';

interface GoodProps {
  name: string;
  points: number;
  id: string;
  img: string;
  addToCart: (id: string) => void;
}

const Good: React.FC<GoodProps> = ({ name, points, id, img, addToCart }) => {
  const [selected, setSelected] = useState(() => {
    const storedSelected = localStorage.getItem(`selected_${id}`);
    return storedSelected === 'true';
  });

  useEffect(() => {
    // Save the selected state in local storage whenever it changes
    localStorage.setItem(`selected_${id}`, String(selected));
  }, [id, selected]);

  const handleClick = () => {
    setSelected(!selected);
    addToCart(id);
  };

  return (
    <div className={`good ${selected ? 'selected' : ''}`} key={id} onClick={handleClick}>
      <img src={img} alt={name} className="goodImg" />
      <div className="goodInfo">
        <h2 className="goodName">{name}</h2>
        <p className="goodPoints">{`Points: ${points}`}</p>
      </div>
    </div>
  );
};

export default Good;
