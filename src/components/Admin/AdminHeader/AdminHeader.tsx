import { FC } from 'react';
import './AdminHeader.scss';
interface AdminHeaderProps {
    onSwitch: (component: 'Заявки' | 'Історія' | 'Створити') => void;
}
const AdminHeader: FC<AdminHeaderProps> = ({ onSwitch }) => {
    return (
        <div className='admin__header' >
            <h3>Адміністратор</h3>

            <div className='admin__header-container' >
                <p onClick={() => onSwitch('Заявки')}>Заявки</p>
                <p onClick={() => onSwitch('Історія')}>Історія</p>
                <button className='admin__header-btn' onClick={() => onSwitch('Створити')}>Створити</button>

            </div>
        </div>
    )
}

export default AdminHeader;