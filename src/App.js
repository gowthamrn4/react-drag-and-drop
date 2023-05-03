import React, { useState, useCallback } from 'react';
import './style.css';

export default function App() {
  const [data, setData] = useState([
    {
      id: 1,
      title: 'Task 1',
      content: 'new task created by gowtham',
      status: 'pending',
    },
  ]);

  const handleChange = (item, status) => {
    const state = data.map((value) =>
      value.id == item.id
        ? {
            ...value,
            status: status,
          }
        : value
    );
    setData(state);
  };

  // inprogress

  const renderData = (currentStatus, nextStatus) => {
    return data
      .filter((item) => item.status === currentStatus)
      .map((item, index) => (
        <div
          onClick={() => handleChange(item, nextStatus)}
          className="item-box"
          key={index}
        >
          {item.title}
        </div>
      ));
  };
  return (
    <>
      <div className="container">
        <div className="box">{renderData('pending', 'inprogress')}</div>
        <div className="box">{renderData('inprogress', 'done')}</div>
        <div className="box">{renderData('done', 'pending')}</div>
      </div>
      <div className="input-container"></div>
    </>
  );
}
