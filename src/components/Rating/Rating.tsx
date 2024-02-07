import './Rating.scss';
import React, { useState, useEffect } from 'react';
import Block from './rateBolck';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { BounceLoader } from 'react-spinners';
import burger from '../../assets/burger.png';
import MobileNav from '../MobileNav/MobileNav';
// import { Link } from 'react-router-dom';

interface User {
  name: string;
  userId: string;
  count: number;
}

const Rating: React.FC = () => {
    // const [itemsPerPage, setItemsPerPage] = useState(5);
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [users, setUsers] = useState(Array<User>);
    const [loaded, setLoaded] = useState<boolean>(false);
    const [opened, setOpened] = useState<boolean>(false);

  const handleBurger = () : void => {
    setOpened(!opened);
  }

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
          <img onClick={handleBurger} className='burger' src={burger} alt="" />
          <div className="head_container">
          {/* <Link to={'/home'}>
          <button className="home_btn">На головну</button>
          </Link> */}
            <h1 className='text_head'>Рейтинг</h1>
            </div>
            <div className="users">
              {loaded ? (
                <>
                {displayedUsers.map((user, i) => (
                  <Block key={user.userId} name={user.name} points={user.count} place={startIndex + i + 1} />
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
            {opened && <MobileNav />}
        </div>
  );
};

export default Rating;
