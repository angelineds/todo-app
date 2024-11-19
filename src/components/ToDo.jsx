import React from 'react';
import TodoInput from './TodoInput';
import TodoList from './TodoList';

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      filter: 'all',
      theme: 'dark',
    };
    
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onAddTodoHandler = this.onAddTodoHandler.bind(this);
    this.isCompleteHandler = this.isCompleteHandler.bind(this);
    this.onFilterChangeHandler = this.onFilterChangeHandler.bind(this);
    this.deleteCompleteHandler = this.deleteCompleteHandler.bind(this);
    this.switchThemeHandler = this.switchThemeHandler.bind(this);
    this.onDragEndHandler = this.onDragEndHandler.bind(this);
  }

  componentDidMount() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    this.setState({ theme: savedTheme, todos: savedTodos });
    document.body.className = savedTheme;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.todos !== this.state.todos) {
      localStorage.setItem('todos', JSON.stringify(this.state.todos));
    }
  }

  onDeleteHandler(id) {
    const todos = this.state.todos.filter(todo => todo.id !== id);
    this.setState({ todos });
  }

  onDragEndHandler(result) {
    if (!result.destination) return; 
    const { source, destination } = result;
    const reorderedTodos = Array.from(this.state.todos);
  
    // Reorder array
    const [movedItem] = reorderedTodos.splice(source.index, 1);
    reorderedTodos.splice(destination.index, 0, movedItem);
  
    // Update state
    this.setState({ todos: reorderedTodos });
  }  

  onAddTodoHandler({ body }) {
    this.setState((prevState) => {
      const lastId = prevState.todos.length > 0 ? prevState.todos[prevState.todos.length - 1].id : 0;

      return {
        todos: [
          ...prevState.todos,
          {
            id: lastId + 1,
            body,
            completed: false,
          }
        ]
      }
    });
  }

  isCompleteHandler(id) {
    const todos = this.state.todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed};
      }
      return todo;
    });
    this.setState({ todos });
  }

  onFilterChangeHandler(filterType) {
    this.setState({ filter: filterType });
  }

  deleteCompleteHandler(ids) {
    const todos = this.state.todos.filter(todo => !ids.includes(todo.id));
    this.setState({ todos });
  }

  switchThemeHandler() {
    this.setState((prevState) => {
      const newTheme = prevState.theme === 'dark' ? 'light' : 'dark';
      document.body.className = newTheme;
      localStorage.setItem('theme', newTheme);
      
      return {theme: newTheme};
    });
  }

  render() {
    const {theme, todos, filter } = this.state;

    const filteredTodos = todos.filter(todo => {
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
      return true;
    })

    const uncompleteTodos = todos.filter(todo => !todo.completed);
    const completeTodos = todos.filter(todo => todo.completed);

    return (
      <div className={`todo-header__image ${theme}`}>
        <div className='todo-container'>
          <div className='todo-header__text'>
            <h1 style={{fontSize: '40px', color:'white'}}>T O D O</h1>
            <button className={`switch-theme ${theme}`} onClick={this.switchThemeHandler}></button>
          </div>
          <TodoInput theme={this.state.theme} addTodo={this.onAddTodoHandler} />
          <TodoList 
            allitem={todos}
            todos={filteredTodos} 
            uncompletedTodos={uncompleteTodos}
            completeTodos = {completeTodos} 
            onDelete={this.onDeleteHandler} 
            deleteCompleteTodos = {this.deleteCompleteHandler}
            isComplete={this.isCompleteHandler}
            onFilterChange={this.onFilterChangeHandler}
            onDragEnd={this.onDragEndHandler}
            filter={filter}
            theme={theme}
          />
        </div>
      </div>
    );
  }
}

export default TodoApp;;