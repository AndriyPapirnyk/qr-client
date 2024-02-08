import './AdminHistory.scss'
import AdminHistoryCard from './AdminHistoryCard/AdminHistoryCard';
import { FC, useState, useEffect, useRef } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


interface Card {
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
    let itemsPerPage = 4;
    const [currentPage, setCurrentPage] = useState<number>(1);


    useEffect(()=>{
        async function postHandle (filterType: string) {
            axios.post('http://localhost:8000/api/user/getOrders')
            .then((response: any) => {
                if(response.status === 200) {
                    setOrders(response.data);
                    let newArr = response.data.filter((item: Card) => item.state === filterType)
                    setFilterOrders(newArr);
                } else {
                    alert('Ой, щось пішло не так')
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }

    useEffect(()=>{
        let newArr = orders.filter((item: Card) => item.state === filterType);
        setFilterOrders(newArr);
    },[filterType])

    const sorting = (array: Array<Card>): Array<Card> => {
        return array.sort((a, b) => b.totalPrice - a.totalPrice)
    }


    const totalPages = Math.ceil(filterOrders.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const historyCards = filterOrders.slice(startIndex, endIndex);


    const pageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value)
    }


    return (
        <div className='admin__history '>
            <div className="admin__history__filter" ref={filter} onClick={filterHandle}>
                <div className="admin__history__btn admin__history__btn_active" data-action='accepted'>Accepted</div>
                <div className="admin__history__btn" data-action={'unaccepted'}>Not Accepted</div>
            </div>
            <div className="admin__history-container">
                {
                    historyCards.map((item) => (
                        <AdminHistoryCard  key={item._id} name={item.name} filterType={filterType} date={item.date} _id={item._id} userId={item.userId} setOrders={setOrders} products={item.products} totalPrice={item.totalPrice} state={item.state} />
                    ))
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