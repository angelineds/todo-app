/* eslint-disable react/prop-types */
import React from 'react';

function DeleteButton({ id, onDelete }) {
  return (
    <button 
      className='del-button' 
      onClick={() => onDelete(id)}
    ></button>
  )
}

export { DeleteButton };