import { FC } from 'react';
import './AdminCard.scss';
interface Card {
    id: number,
    name: string,
    product: string,
    points: number
}
const AdminCard: FC<Card> = ({ id, name, product, points }) => {
    return (
        <div className='admin__card'>
            <div className="admin__card-data__container">
                <h3>{name}</h3>
                <p>id: {id}</p>
                <div className='data__text'><p>{product}</p><span>{points} балів</span></div>
            </div>
            <div className="admin__card-btn__container">
                <button className="admin__card-btn">Підтвердити</button>
                <button className="admin__card-btn red">Відхилити</button>
            </div>


        </div>
    )
}

export default AdminCard;