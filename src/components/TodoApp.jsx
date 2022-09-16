import React from 'react';
import TodoList from './TodoList/TodoList';
import AddTodo from './AddTodo/AddTodo';

function TodoApp({ todo, setTodo }) {
  return (
    <>
      <AddTodo todo={todo} setTodo={setTodo} />
      <TodoList todo={todo} setTodo={setTodo} />
    </>
  );
}

export default TodoApp;
