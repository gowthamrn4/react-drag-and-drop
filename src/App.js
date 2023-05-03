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

  const handleChange = (id, status) => {
    const state = data.map((value) =>
      value.id == id
        ? {
            ...value,
            status: status,
          }
        : value
    );
    setData(state);
  };

  const onDragStart = (e, item) => {
    e.dataTransfer.setData('dataId', item.id);
  };

  const dropItem = (e, status) => {
    e.preventDefault();
    var id = e.dataTransfer.getData('dataId');
    handleChange(id, status);
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  const renderData = (currentStatus, nextStatus) => {
    return data
      .filter((item) => item.status === currentStatus)
      .map((item, index) => (
        <div
          onClick={() => handleChange(item, nextStatus)}
          className="item-box"
          key={index}
          draggable="true"
          onDragStart={(e) => onDragStart(e, item)}
        >
          {item.title}
        </div>
      ));
  };
  return (
    <>
      <div className="container">
        <div
          className="box"
          onDrop={(e) => dropItem(e, 'pending')}
          onDragOver={(e) => allowDrop(e)}
        >
          {renderData('pending', 'inprogress')}
        </div>
        <div
          className="box"
          onDrop={(e) => dropItem(e, 'inprogress')}
          onDragOver={(e) => allowDrop(e)}
        >
          {renderData('inprogress', 'done')}
        </div>
        <div
          className="box"
          onDrop={(e) => dropItem(e, 'done')}
          onDragOver={(e) => allowDrop(e)}
        >
          {renderData('done', 'pending')}
        </div>
      </div>
      <div className="input-container"></div>
    </>
  );
}
