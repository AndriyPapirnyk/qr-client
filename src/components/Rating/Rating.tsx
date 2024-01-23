import './Rating.scss';
import React, { useState } from 'react';
import Block from './rateBolck';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface User {
  name: string;
  id: number;
  points: number;
}

const Rating: React.FC = () => {
    const itemsPerPage = 5; // Set the number of items to display per page
    const [currentPage, setCurrentPage] = useState<number>(1);

    const arr: Array<User> = [
        {
          name: 'Alex',
          id: 1234567890,
          points: 10,
        },
        {
          name: 'John',
          id: 234567801,
          points: 455,
        },
        {
          name: 'Karl',
          id: 3456789012,
          points: 435,
        },
        {
          name: 'Alice',
          id: 4567890123,
          points: 200,
        },
        {
          name: 'Bob',
          id: 5678901234,
          points: 320,
        },
        {
          name: 'Eva',
          id: 6789012345,
          points: 120,
        },
        {
          name: 'Michael',
          id: 7890123456,
          points: 600,
        },
        {
          name: 'Sara',
          id: 8901234567,
          points: 350,
        },
        {
          name: 'Tom',
          id: 9012345678,
          points: 180,
        },
        {
          name: 'Sophie',
          id: 12345678901,
          points: 520,
        },
        {
          name: 'David',
          id: 23456789012,
          points: 270,
        },
        {
          name: 'Linda',
          id: 34567890123,
          points: 440,
        },
        {
          name: 'Frank',
          id: 45678901234,
          points: 290,
        },
        {
          name: 'Julia',
          id: 56789012345,
          points: 510,
        },
        {
          name: 'Chris',
          id: 67890123456,
          points: 400,
        },
        {
          name: 'Emma',
          id: 78901234567,
          points: 180,
        },
        {
          name: 'Ryan',
          id: 89012345678,
          points: 350,
        },
        {
          name: 'Laura',
          id: 90123456789,
          points: 220,
        },
        {
          name: 'Daniel',
          id: 123456789012,
          points: 470,
        },
        {
          name: 'Mia',
          id: 234567890123,
          points: 310,
        },
      ];
      

    function sorting(array:Array<User>):Array<User>{
        return array.sort((a, b) => b.points - a.points)
    }

    sorting(arr)

    const totalPages = Math.ceil(arr.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedUsers = arr.slice(startIndex, endIndex);

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    return (
        <div className='rating'>
            <h1 className='text_head'>Рейтинг гравців</h1>
            <div className="users">
                {displayedUsers.map((user, i) => (
                    <Block key={user.id} name={user.name} id={user.id} points={user.points} place={startIndex + i + 1} />
                ))}
            </div>
            <Stack spacing={2} className='pagination-container'>
            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                style={{ backgroundColor: 'none' }}
                className='pagination-buttons'
            />
            </Stack>
        </div>
  );
};

export default Rating;
