import './History.scss';
import { useState, useEffect } from 'react';
import { parse } from 'cookie';
// import { Link } from 'react-router-dom';
import HistoryBlock from './historyBlock';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { BounceLoader } from 'react-spinners';

const HistoryPage: React.FC = () => {
  const [userObject, setUserObject] = useState({
    name: '',
    userId: 0,
    count: 0,
    history: [],
    lastScan: '',
  });

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loaded, setLoaded] = useState<boolean>(false);

  const itemsPerPage = 5;

  const getCookieValue = (cookieName: string) => {
    const cookies = parse(document.cookie);
    return cookies[cookieName];
  };

  useEffect(() => {
    const userCookieValue = getCookieValue('user');

    if (userCookieValue) {
      try {
        const parsedUserObject = JSON.parse(userCookieValue);
        setUserObject(parsedUserObject);
        console.log(parsedUserObject);
        setLoaded(true); // Set loaded to true when data is successfully fetched
      } catch (error) {
        console.error('Error parsing user cookie value:', error);
      }
    }
  }, []);

  const totalPages = Math.ceil(userObject.history.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedHistory = userObject.history.slice(startIndex, endIndex);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <div className='history'>
      <h1 className='historyMain'>Історія сканувань</h1>
      <div className="blockMain">
        {loaded ? (
          <>
            {displayedHistory.map((text, index) => (
              <HistoryBlock key={index} text={text} />
            ))}
          </>
        ) : (
          <BounceLoader color="#36d7b7" size={200} />
        )}
      </div>
      <Stack spacing={2} className='pagination-container'>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          sx={{ backgroundColor: 'none' }}
          className='pagination-buttons'
        />
      </Stack>
    </div>
  );
};

export default HistoryPage;
