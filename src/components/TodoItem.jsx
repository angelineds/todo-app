/* eslint-disable react/prop-types */
import React from 'react';
import { DeleteButton } from './ActionButton';

function TodoItem({ theme, id, body, completed, onDelete, isComplete }) {
  return (
    <div className={`todo-item__content ${theme}`}>
      <div className='todo-item__contentText'>
        <button className={`check-button ${completed ? 'complete' : ''}`} onClick={() => isComplete(id)}></button>
        <p className={`todo-item__body ${theme}`}>{body}</p>
      </div>
      <DeleteButton id={id} onDelete={onDelete} />  
    </div>
  );
}

export default TodoItem;