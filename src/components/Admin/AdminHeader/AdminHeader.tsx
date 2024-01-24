import { FC } from 'react';
import './AdminHeader.scss';
interface AdminHeaderProps {
    onSwitch: (component: 'Заявки' | 'Історія') => void;
}
const AdminHeader: FC<AdminHeaderProps> = ({ onSwitch }) => {
    return (
        <div className='admin__header' >
            <h3>Адміністратор</h3>

            <div className='admin__header-link-container' >
                <p onClick={() => onSwitch('Заявки')}>Заявки</p>
                <p onClick={() => onSwitch('Історія')}>Історія</p>

            </div>
        </div>
    )
}

export default AdminHeader;