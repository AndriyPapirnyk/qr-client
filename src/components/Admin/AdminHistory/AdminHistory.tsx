import './AdminHistory.scss'
import AdminHistoryCard from './AdminHistoryCard/AdminHistoryCard';
import { FC, useState, useEffect, useRef } from 'react';
import SearchImg from './img/search.png';
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
    refusedReason: string,
    userId: number,
    _id: string,
    date: string
    name: string,
    products: Array<cartGood>,
    totalPrice: number,
    state: String,
    place: any
}


const AdminHistory: FC = () => {

    const filter: any = useRef(null)
    let itemsPerPage: number = 3;
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [orders, setOrders] = useState(Array<Card>);
    const [filterType, setFilterType] = useState<string>('accepted')
    const [filterOrders, setFilterOrders] = useState(Array<Card>);
    const [searchData, setSearchData] = useState<string>('');


    useEffect(()=>{
        async function postHandle (filterType: string) {
            axios.post('http://localhost:8000/api/user/getOrders')
            .then((response: any) => {
                if(response.status === 200) {
                    setOrders(response.data);
                    let newArr = response.data.filter((item: Card) => item.state === filterType)
                    setFilterOrders(newArr);
                    console.log(response.data)
                } else {
                    alert('Ой, щось пішло не так')
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
        postHandle(filterType);
    },[]);

    useEffect(()=>{
        let newArr = orders.filter((item: Card) => item.state === filterType);
        setFilterOrders(newArr);
    },[filterType, orders])


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
           newOrders = newOrders.filter((item: Card)=> item.state === filterType);
            setFilterOrders(newOrders);
          }  
    },[searchData])

    const sorting = (array: Array<Card>): Array<Card> => {
        return array.sort((a, b) => b.totalPrice - a.totalPrice)
    }

    sorting(filterOrders);

    const totalPages = Math.ceil(filterOrders.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const historyCards = filterOrders.slice(startIndex, endIndex);


    const pageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value)
    }

    const filterHandle = (e: any) => {
        let target: any = e.target;
        if(target.classList.contains('admin__history__btn')){
            if(!target.classList.contains('admin__history__btn_active')){
               for(let el of filter.current.children){
                el.classList.remove('admin__history__btn_active');
               }
               target.classList.add('admin__history__btn_active');
               setFilterType(target.getAttribute('data-action'));
               setSearchData('');
            }
        }
    }


    return (
        <div className='admin__history '>
            <div className="admin__history__filter" ref={filter} onClick={filterHandle}>
                <div className="admin__history__btn admin__history__btn_active" data-action='accepted'>Accepted</div>
                <div className="admin__history__btn" data-action={'unaccepted'}>Not Accepted</div>
                <div className="admin__search">
                    <div className="admin__search__img">
                        <img src={SearchImg} alt="" />
                    </div>
                    <input type="text" className='admin__search__inp' onChange={searchChangeHandle} value={searchData} placeholder='User name'/>
                </div>
            </div>
            <div className="admin__history-container">
                { filterOrders.length > 0 ? (
                    historyCards.map((item) => (
                        <AdminHistoryCard  key={item._id} name={item.name} refusedReason={item.refusedReason} filterType={filterType} date={item.date} _id={item._id} userId={item.userId} setOrders={setOrders} products={item.products} totalPrice={item.totalPrice} state={item.state} />
                    ))
                ) : <h1>You dont have unaccepted orders</h1>
                }

            </div>

            <Stack spacing={2} className="admin__history-pagination">
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={pageChange}
                    color="primary"
                    style={{ backgroundColor: 'none' }}
                    className='pagination-buttons'
                />
            </Stack>
        </div >
    )
}

export default AdminHistory