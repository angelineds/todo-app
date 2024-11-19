/* eslint-disable react/prop-types */

import React from 'react';
import TodoItem from './TodoItem';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function TodoList({ theme, allitem, todos, uncompletedTodos, completeTodos, deleteCompleteTodos, onDelete, isComplete, onFilterChange, filter, onDragEnd }) {
  if (allitem.length === 0) {
    return (
      <div className='todo-list__empty'>
        <h2 style={{margin: '0'}}>No Activity Yet.</h2>
        <p style={{margin: '0'}}>You could add your activity above.</p>
      </div>
    );
  }
  const isFilterEmpty = todos.length === 0;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='todoList'>
        {(provided) => (
          <div 
            className={`todo-list ${theme}`}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {isFilterEmpty && (
              <div className={`todo-item__empty ${theme}`}>
                <p>No tasks available.</p>
              </div>
            )}
            {!isFilterEmpty &&
              todos.map((todo, index) => (
                <Draggable key={todo.id} draggableId={String(todo.id)} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TodoItem 
                        key={todo.id}
                        id={todo.id}
                        body={todo.body}
                        completed={todo.completed}
                        onDelete={onDelete}
                        isComplete={isComplete}
                        theme={theme}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
          
      {/* For Desktop */}
      <div className={`todo-list__footer desktop ${theme}`}>
        <p>{uncompletedTodos.length} item(s) to do left</p>
        <div className='todo-list__footer-choice desktop'>
          <p 
            className={filter === 'all' ? 'onPage-button' : 'offPage-button'}
            onClick={() => onFilterChange('all')}
          >
            All
          </p>
          <p 
            className={filter === 'active' ? 'onPage-button' : 'offPage-button'} 
            onClick={() => onFilterChange('active')}
          >
            Active
          </p>
          <p 
            className={filter === 'completed' ? 'onPage-button' : 'offPage-button'}
            onClick={() => onFilterChange('completed')}
          >
            Completed
          </p>
        </div>
        <p 
          className='clear-button'
          onClick={() => deleteCompleteTodos(completeTodos.map(todo => todo.id))}
        >
          Clear Completed
        </p>
      </div>

      {/* For Mobile */}
      <div className={`todo-list__footer mobile ${theme}`}>
        <p>{uncompletedTodos.length} item(s) to do left</p>
        <p 
          className='clear-button'
          onClick={() => deleteCompleteTodos(completeTodos.map(todo => todo.id))}
        >
          Clear Completed
        </p>
      </div>

      <div className={`todo-list__footer-choice mobile ${theme}`}>
        <p 
          className={filter === 'all' ? 'onPage-button' : 'offPage-button'}
          onClick={() => onFilterChange('all')}
        >
          All
        </p>
        <p 
          className={filter === 'active' ? 'onPage-button' : 'offPage-button'} 
          onClick={() => onFilterChange('active')}
        >
          Active
        </p>
        <p 
          className={filter === 'completed' ? 'onPage-button' : 'offPage-button'}
          onClick={() => onFilterChange('completed')}
        >
          Completed
        </p>
      </div>

      <p className={`todo-list__message ${theme}`}>Drag and drop to reorder list</p>
    </DragDropContext>
  );
}

export default TodoList;