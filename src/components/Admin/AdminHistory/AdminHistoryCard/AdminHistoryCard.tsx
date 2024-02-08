import { FC, useEffect, useState } from 'react';
import './AdminHistoryCard.scss';
import axios from 'axios';


interface cartGood {
    name: string;
    _id: string;
    price: number;
    img: string;
  }

interface Card {
    refusedReason: string,
    filterType: string,
    setOrders: any
    userId: number,
    _id: string,
    date: string
    name: string,
    products: Array<cartGood>,
    totalPrice: number,
    state: String,
}

const AdminHistoryCard: FC<Card> = ({  _id, userId, name, products, refusedReason, totalPrice, date, state, setOrders }) => {

    const [nameList, setNameList] = useState<string>('')


    useEffect(()=>{
        let newArr = [];
        for(let el of products){
            newArr.push(el.name);
        }
        setNameList(newArr.join());
        console.log(newArr.join())
    })

    const stateChangehandle = async (e: any) => {
        let orderId = e.target.id.substring(3);
        await axios.post('http://localhost:8000/api/user/orderStateChange', {orderId})
        .then((response: any) => {
          if (response.status !== 404) {
            setOrders(response.data);
          } else {
            alert('Something went wrong!');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }

    return (
        <div className="admin__history-card card">
            <div className="card-data__container">
                <h3>{name}</h3>
                <p>id: {userId}</p>
                <div className='data__text'><p>{date}</p><span>{totalPrice} балів</span></div>
            </div>
            <div className="card-btn__container">
            <div className='admin__text'><p>Товари: {nameList}</p></div>
              {  state === 'unaccepted' ?
                (    
                <>
                 <div className='admin__text'><p>Причина: {refusedReason}</p></div> 
                 <button id={'btn'+ _id} className="admin__btn admin__btn_grey" onClick={stateChangehandle}>Повернути</button>
                </>
                )
                : ''}
            </div>
        </div>
    )
}

export default AdminHistoryCard