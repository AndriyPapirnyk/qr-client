import './AdminHistory.scss'
import AdminHistoryCard from './AdminHistoryCard/AdminHistoryCard';
import { FC, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


interface HistoryCard {
    id: number,
    name: string,
    product: string,
    points: number
}
const AdminHistory: FC = () => {

    let itemsPerPage = 7;
    const [currentPage, setCurrentPage] = useState<number>(1);

    const arr: Array<HistoryCard> = [
        {
            id: 127872384665,
            name: 'Климент  Альмасенко',
            product: 'Блокнот:',
            points: 10
        },
        {
            id: 127872384665,
            name: 'Климент  Альмасенко',
            product: 'Блокнот:',
            points: 10
        }, {
            id: 127872384665,
            name: 'Климент  Альмасенко',
            product: 'Блокнот:',
            points: 10
        },
        {
            id: 127872384665,
            name: 'Климент  Альмасенко',
            product: 'Блокнот:',
            points: 10
        }, {
            id: 127872384665,
            name: 'Климент  Альмасенко',
            product: 'Блокнот:',
            points: 10
        },
        {
            id: 127872384665,
            name: 'Климент  Альмасенко',
            product: 'Блокнот:',
            points: 10
        }, {
            id: 127872384665,
            name: 'Климент  Альмасенко',
            product: 'Блокнот:',
            points: 10
        },
        {
            id: 127872384665,
            name: 'Климент  Альмасенко',
            product: 'Блокнот:',
            points: 10
        }, {
            id: 127872384665,
            name: 'Климент  Альмасенко',
            product: 'Блокнот:',
            points: 10
        },
        {
            id: 127872384665,
            name: 'Климент  Альмасенко',
            product: 'Блокнот:',
            points: 10
        }

    ]

    const sorting = (array: Array<HistoryCard>): Array<HistoryCard> => {
        return array.sort((a, b) => b.points - a.points)


    }
    sorting(arr);
    const totalPages = Math.ceil(arr.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const historyCards = arr.slice(startIndex, endIndex);


    const pageChange = (e: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value)
    }


    return (
        <div className='admin__history'>
            <div className="admin__history-container">
                {
                    historyCards.map((item, i) => (
                        <AdminHistoryCard key={item.id} name={item.name} id={item.id} product={item.product} points={item.points} place={startIndex + i + 1} />
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