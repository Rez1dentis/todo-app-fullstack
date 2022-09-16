import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Registration from './Registration';
import Login from './Login';
import Main from './Main';
import Navbar from './Navbar';
import TodoApp from './TodoApp';

function App({ tasks, userSession }) {
  const [todo, setTodo] = useState(tasks || []);
  const [authState, setAuthState] = useState(userSession || null);
  console.log(todo);

  return (
    <div className="container">
      <Navbar authState={authState} setAuthState={setAuthState} />
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/todo" element={<TodoApp todo={todo} setTodo={setTodo} />} />
          <Route path="/registration" element={<Registration setAuthState={setAuthState} />} />
          <Route path="/login" element={<Login setAuthState={setAuthState} />} />
        </Routes>
      </div>
    </div>

  );
}

export default App;
