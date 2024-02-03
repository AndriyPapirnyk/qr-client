import { FC, useEffect, useState } from 'react';
import './AdminCard.scss';



interface cartGood {
    name: string;
    _id: string;
    price: number;
    img: string;
  }

interface Card {
    userId: number,
    _id: string,
    date: string
    name: string,
    products: Array<cartGood>,
    totalPrice: number
}

const AdminCard: FC<Card> = ({ _id, userId, name, products, totalPrice, date }) => {

    const [expandKey, setExpandKey] = useState<boolean>(false);
    const [namelist, setNameList] = useState<string>('');

    useEffect(()=>{
        let newArr = [];
        for(let el of products){
            newArr.push(el.name);
        }
        setNameList(newArr.join());
        console.log(newArr.join())
    })

    const expandHandle = () => {
        setExpandKey(!expandKey);
    }

    return (
        <div className='admin__card'>
            <div className="admin__card-data__container">
                <h3>{name}</h3>
                <p>id: {userId}</p>
                <div className='data__text'><p>{date}</p><span>{totalPrice} балів</span></div>
            </div>
            <div className="admin__card-btn__container">
                {expandKey ? (
                    <div className='admin__card__productGroup'>
                        {products.map((item)=> 

                    <div className={'admin__card__good'} key={item._id} >
                    <img src={'img/' + item.img} alt={item.name} className="goodImg" />
                    <div className="goodInfo">
                      <h2 className="goodName">{item.name}</h2>
                      <p className="goodPoints">{`Points: ${item.price}`}</p>
                    </div>
                  </div>

                    )}
                    </div>
                ) : <div className='data__text'><p>Товари: {namelist}</p></div>}
                <div className="admin__card__btnGroup">
                <button className="admin__card-btn">Підтвердити</button>
                <button className="admin__card-btn red">Відхилити</button>
                <button className=" admin__card-btn admin__card-btn_grey" onClick={expandHandle}>Розширити</button>
                </div>
            </div>


        </div>
    )
}

export default AdminCard;