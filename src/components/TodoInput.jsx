/* eslint-disable react/prop-types */

import React from 'react';

class TodoInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      body: '',
      remainingCharacter: 50
    }

    this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onBodyChangeEventHandler(event) {
    const maxCharacters = 50;
    const inputText = event.target.value;

    this.setState(() => {
      return {
        body: event.target.value,
        remainingCharacter: maxCharacters - inputText.length,
      }
    });
  }

  onSubmitEventHandler(event) {
    event.preventDefault();

    if (this.state.body.trim() === ''){
      return;
    } 
    
    this.props.addTodo(this.state);
    
    this.setState({
      body: '',
      remainingCharacter: 50,
    });
  }

  render() {
    const isTyping = this.state.body.length > 0;
    const { theme } = this.props;

    return (
      <form className='todo-input__container' onSubmit={this.onSubmitEventHandler}>
        <p className={`todo-input__char ${theme}`}>Remaining Character(s): {this.state.remainingCharacter}</p>
        <div className={`todo-input ${theme}`}>
          <button className={`submit-button ${theme}`} type='submit'></button>
          <input 
            type='text' 
            placeholder='Create a new todo..' 
            maxLength={50} 
            className={`todo-input__text ${theme} ${isTyping ? 'typing' : ''}`} 
            value={this.state.body} 
            onChange={this.onBodyChangeEventHandler} 
          />
        </div>
      </form>
    )
  }
}

export default TodoInput;