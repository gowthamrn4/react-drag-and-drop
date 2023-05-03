import React, { useState } from 'react';
import './style.css';

export default function App() {
  const [data, setData] = useState([
    {
      id: 1,
      title: 'Task 1',
      content: 'new task created by gowtham',
      status: 'pending',
    },
    {
      id: 2,
      title: 'Task 2',
      content: 'new task created by gowtham',
      status: 'pending',
    },
  ]);

  const [input, setInput] = useState({
    title: null,
    content: null,
  });

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

  const handleInputChanges = (e, inputName) => {
    const state = {
      ...input,
      [inputName]: e.target.value,
    };
    setInput(state);
  };

  const addNewTask = () => {
    if (input.title && input.content) {
      setData([
        ...data,
        {
          ...input,
          id: Date.now(),
          status: 'pending',
        },
      ]);
      setInput({
        title: '',
        content: '',
      });
    }
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
          <p>Pending</p>
          <hr/>
          {renderData('pending', 'inprogress')}
        </div>
        <div
          className="box"
          onDrop={(e) => dropItem(e, 'inprogress')}
          onDragOver={(e) => allowDrop(e)}
        >
          <p>InProgress</p>
          <hr/>
          {renderData('inprogress', 'done')}
        </div>
        <div
          className="box"
          onDrop={(e) => dropItem(e, 'done')}
          onDragOver={(e) => allowDrop(e)}
        >
          <p>Done</p>
          <hr/>
          {renderData('done', 'pending')}
        </div>
      </div>
      <div className="input-container">
        <span>Create new task</span>
        <div>
          <input
            type="input"
            onChange={(e) => handleInputChanges(e, 'title')}
            placeholder="Title"
            value={input.title}
          />
          <input
            type="input"
            onChange={(e) => handleInputChanges(e, 'content')}
            placeholder="content"
            value={input.content}
          />
          <button onClick={addNewTask}>Add</button>
        </div>
      </div>
    </>
  );
}
