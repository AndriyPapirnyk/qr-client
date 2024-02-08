import './AdminContainer.scss';
import React, { FC, useEffect, useState } from 'react';
import SearchImg from './img/search.png';
import AdminCard from '../AdminCard/AdminCard';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import CloseImg from './img/close.png'
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
    totalPrice: number,
    state: String
}

const AdminContainer: FC = () => {

    const [reasonPopupKey, setReasonPopupKey] = useState<Array<boolean | string>>([false, '']);
    const [orders, setOrders] = useState(Array<Card>);
    const [filterOrders, setFilterOrders] = useState(Array<Card>);
    const [reasonInpData, setReasonInpData] = useState<string>('');
    const [searchData, setSearchData] = useState<string>('');

    useEffect(()=>{
        async function postHandle () {
            axios.post('http://localhost:8000/api/user/getOrders')
            .then((response: any) => {
                if(response.status === 200) {
                    let newArr = response.data.filter((item: Card) => item.state === 'inProgres')
                    setOrders(response.data);
                    setFilterOrders(newArr)
                    console.log(response.data);
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

    useEffect(()=>{
        let newArr = orders.filter((item: Card) => item.state === 'inProgres')
        setFilterOrders(newArr)
    },[orders])

    const closePopupHandle = () => {
        setReasonPopupKey([false, '']);
        setReasonInpData('')
    }
    
    const inpDataHandle = (e: any) => {
        let {value} = e.target;
        setReasonInpData(value);
    }

    const unacceptedHandle = async () => {
        let orderId = reasonPopupKey[1];
        axios.post('http://localhost:8000/api/user/unacceptedOrder',{orderId, reasonInpData})
        .then((response: any) => {
            if(response.status === 200) {
                let newArr = response.data.filter((item: Card) => item.state === 'inProgres')
                setOrders(response.data);
                setFilterOrders(newArr)
                console.log(response.data);
            } else {
                alert('Ой, щось пішло не так')
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        setReasonPopupKey([false, '']);
        setReasonInpData('');
    }


    const searchChangeHandle = (e: any) => {
        let data: string = e.target.value.toLowerCase();
        setSearchData(data);
    }

    useEffect(()=>{
        if(filterOrders){
            let newOrders = orders.filter((el) => {
              if (searchData === '') {
                return el;
            }
            //return the item which contains the user input
            else {
                return el.name.toLowerCase().includes(searchData)
            }
            })
           newOrders = newOrders.filter((item: Card)=> item.state === 'inProgres');
            setFilterOrders(newOrders);
          }  
    },[searchData])

    let itemsPerPage = 3;
    const [currentPage, setCurrentPage] = useState<number>(1);

  

    const sorting = (array: Array<Card>): Array<Card> => {
        return array.sort((a, b) => b.totalPrice - a.totalPrice)
    };

    sorting(filterOrders);

    
    const totalPages = Math.ceil(filterOrders.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const adminCards = filterOrders.slice(startIndex, endIndex);


    const pageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    }

    return (
        <div className='admin__container'>
            <div className="admin__container__row">
                <div className="admin__search">
                    <div className="admin__search__img">
                        <img src={SearchImg} alt="" />
                    </div>
                    <input type="text" className='admin__search__inp' onChange={searchChangeHandle} value={searchData} placeholder='User name'/>
                </div>
            </div>

            <div className="reasonPopup__container" style={{marginTop: reasonPopupKey[0] ? '0' : '-100vh'}}>
                <div className="admin__container__reasonPopup reasonPopup">
                <div className="reasonPopup__row">
                    <div className="reasonPopup__closeBtn" onClick={closePopupHandle}>
                        <img src={CloseImg} alt="" />
                    </div>
                </div>
                <div className="reasonPopup__header">Write Your Reason</div>
                <input type="text" className="reasonPopup__input" onChange={inpDataHandle} value={reasonInpData} placeholder='Reason'/>
                <div className="reasonPopup__submitBtn" onClick={unacceptedHandle}>Submit</div>
                </div>
            </div>
            <div className="card__conatiner">
                {filterOrders.length > 0 ? (
                    adminCards.map((item) => (
                        <AdminCard  key={item._id} setReasonPopupKey={setReasonPopupKey} reasonPopupKey={reasonPopupKey} name={item.name} date={item.date} _id={item._id} userId={item.userId} setOrders={setOrders} products={item.products} totalPrice={item.totalPrice} />
                    ))
                ) : <h1>You dont have any orders in progress</h1>
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