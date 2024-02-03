import './AdminContainer.scss';
import React, { FC, useEffect, useState } from 'react'
import AdminCard from '../AdminCard/AdminCard';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import axios from 'axios';


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

const AdminContainer: FC = () => {


    const [orders, setOrders] = useState(Array<Card>)

    useEffect(()=>{
        async function postHandle () {
            axios.post('http://localhost:8000/api/user/getOrders')
            .then((response: any) => {
                if(response.status === 200) {
                    setOrders(response.data);
                    console.log(response.data)
                } else {
                    alert('Ой, щось пішло не так')
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
        postHandle();
    },[])

   

    let itemsPerPage = 3;
    const [currentPage, setCurrentPage] = useState<number>(1);

  

    const sorting = (array: Array<Card>): Array<Card> => {
        return array.sort((a, b) => b.totalPrice - a.totalPrice)
    };

    sorting(orders);

    
    const totalPages = Math.ceil(orders.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const adminCards = orders.slice(startIndex, endIndex);


    const pageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    }

    return (
        <div className='admin__container'>
            <div className="card__conatiner">
                {
                    adminCards.map((item) => (
                        <AdminCard key={item._id} name={item.name} date={item.date} _id={item._id} userId={item.userId} products={item.products} totalPrice={item.totalPrice} />
                    ))
                }

            </div>

            <Stack spacing={2} className="admin__container-pagination">
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={pageChange}
                    color="primary"
                    style={{ backgroundColor: 'none' }}
                    className='pagination-buttons'
                />
            </Stack>

        </div>
    )
}

export default AdminContainer