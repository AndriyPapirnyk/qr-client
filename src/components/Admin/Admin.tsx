import { useState } from 'react';
import './Admin.scss'
import AdminContainer from './AdminContainer/AdminContainer'
import AdminHeader from './AdminHeader/AdminHeader';
import AdminHistory from './AdminHistory/AdminHistory';
const Admin = () => {

    const [isComponent, setIsComponent] = useState<'Заявки' | 'Історія'>('Заявки');

    const switchChange = (component: 'Заявки' | 'Історія') => {
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


        </div>
    )
}

export default Admin

