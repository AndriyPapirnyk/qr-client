import React from 'react';

interface Props {
  text: string;
}

const HistoryBlock: React.FC<Props> = ({ text }) => {
  const parseDate = (textDate: string): Date => {
    const parts = textDate.split('T');
    const datePart = parts[0].split('-');
    const timePart = parts[1].split(':');
    
    return new Date(
      parseInt(datePart[0]),
      parseInt(datePart[1]) - 1,
      parseInt(datePart[2]),
      parseInt(timePart[0]),
      parseInt(timePart[1]),
      parseInt(timePart[2].split('.')[0])
    );
  };

  const formattedDate = (textDate: string): string => {
    const date = parseDate(textDate);
    return `${padZero(date.getDate())}-${padZero(date.getMonth() + 1)}-${date.getFullYear()} ${padZero(date.getHours())}:${padZero(date.getMinutes())}:${padZero(date.getSeconds())}`;
  };

  const padZero = (value: number) => (value < 10 ? `0${value}` : `${value}`);

  return (
    <div className="history_block">
      <div>{formattedDate(text)}</div>
    </div>
  );
};

export default HistoryBlock;
