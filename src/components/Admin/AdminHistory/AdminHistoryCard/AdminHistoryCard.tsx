import { FC } from 'react';
import './AdminHistoryCard.scss';
interface HistoryCard {
    id: number,
    name: string,
    product: string,
    points: number,
    place: number
}
const AdminHistoryCard: FC<HistoryCard> = ({ id, name, product, points, place }) => {
    return (
        <div className="admin__history-card">
            <p className='index'>#{place}</p>
            <h4>{name}</h4>
            <p>id: {id}</p>
            <div className='data__text'><p>{product} </p><span>{points} балів</span></div>
        </div>
    )
}

export default AdminHistoryCard