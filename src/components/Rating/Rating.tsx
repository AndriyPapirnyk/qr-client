import './Rating.scss';
import React, { useState, useEffect } from 'react';
import Block from './rateBolck';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { BounceLoader } from 'react-spinners';

interface User {
  name: string;
  userId: string;
  count: number;
}

const Rating: React.FC = () => {
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [users, setUsers] = useState(Array<User>);
    const [loaded, setLoaded] = useState<boolean>(false)

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('https://qr-server-129a.onrender.com/api/user/getAllUsers');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
  
          const data = await response.json();
          setUsers(data);
          setLoaded(true);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);
      

    function sorting(array:Array<User>):Array<User>{
        return array.sort((a, b) => b.count - a.count)
    }

    sorting(users)

    const totalPages = Math.ceil(users.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedUsers = users.slice(startIndex, endIndex);

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    return (
        <div className='rating'>
            <h1 className='text_head'>Рейтинг користувачів</h1>
            <div className="users">
              {loaded ? (
                <>
                {displayedUsers.map((user, i) => (
                  <Block key={user.userId} name={user.name} id={user.userId} points={user.count} place={startIndex + i + 1} />
              ))}
                </>
              ) : (<BounceLoader color="#36d7b7" size={200}/>)}
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
