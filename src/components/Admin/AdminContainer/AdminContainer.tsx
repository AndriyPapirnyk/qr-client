import './AdminContainer.scss';
import React, { FC, useState } from 'react'
import AdminCard from '../AdminCard/AdminCard';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';



interface Card {
    id: number,
    name: string,
    product: string,
    points: number
}
const AdminContainer: FC = () => {

    let itemsPerPage = 3;
    const [currentPage, setCurrentPage] = useState<number>(1);

    const arr: Array<Card> = [
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
        },
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
        },
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
        },
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
        },
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
        }

    ]

    const sorting = (array: Array<Card>): Array<Card> => {
        return array.sort((a, b) => b.points - a.points)
    };

    sorting(arr);

    const totalPages = Math.ceil(arr.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const adminCards = arr.slice(startIndex, endIndex);


    const pageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    }

    return (
        <div className='admin__container'>
            <div className="card__conatiner">
                {
                    adminCards.map((item) => (
                        <AdminCard key={item.id} name={item.name} id={item.id} product={item.product} points={item.points} />
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