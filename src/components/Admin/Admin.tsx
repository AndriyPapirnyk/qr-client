import { useState } from 'react';
import './Admin.scss'
import AdminContainer from './AdminContainer/AdminContainer'
import AdminHeader from './AdminHeader/AdminHeader';
import AdminHistory from './AdminHistory/AdminHistory';
import AdminPopup from './AdminPopup/AdminPopup';
const Admin = () => {

    const [isComponent, setIsComponent] = useState<'Заявки' | 'Історія' | 'Створити'>('Заявки');

    const switchChange = (component: 'Заявки' | 'Історія' | 'Створити') => {
        setIsComponent(component);
    }


    return (

        <div className='admin'>

            <AdminHeader onSwitch={switchChange} />

            {
                isComponent === "Заявки" && (
                    <AdminContainer />
                )
            }

            {
                isComponent === "Історія" && (
                    <AdminHistory />
                )
            }
            {
                isComponent === "Створити" && (
                    <AdminPopup />
                )
            }


        </div>
    )
}

export default Admin

