import React, { useState } from 'react';
// import { useLocation } from 'react-router-dom';

function TodoList({ todo, setTodo, status }) {
  const [edit, setEdit] = useState(null);
  const [value, setValue] = useState('');
  const [checked, setChecked] = useState(status);

  // удаление

  async function deleteTodo(id) {
    const newTodo = [...todo].filter((item) => item.id !== id);
    await fetch(`/delete/${id}`, {
      method: 'DELETE',
    });
    setTodo(newTodo);
  }

  // изменение статуса

  async function statusTodo(id) {
    const response = await fetch(`/status/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json ' },
      body: JSON.stringify({ status: !checked }),
    });
    if (response.ok) {
      setChecked((prev) => !prev);
    }
    const newTodo = [...todo].filter((item) => {
      if (item.id === id) {
        item.status = !item.status;
      }
      return item;
    });
    setTodo(newTodo);
  }

  // кнопка изменить

  function editTodo(id, task) {
    setEdit(id);
    setValue(task);
  }

  // сохранение изменений

  async function saveChanges(id) {
    await fetch(`/edit/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        task: value,
      }),

    });
    const newTodo = [...todo].map((item) => {
      if (item.id === id) {
        item.task = value;
      }
      return item;
    });
    setTodo(newTodo);
    setEdit(null);
  }

  return (
    <div>
      {
            todo.map((item) => (
              <div key={item.id}>
                {
                        edit === item.id
                          ? (
                            <div>
                              <input value={value} onChange={(el) => setValue(el.target.value)} />

                            </div>
                          )
                          : <div>{item.task}</div>
                        }
                {
                    edit === item.id
                      ? (
                        <div>
                          <button onClick={() => saveChanges(item.id)}>Сохранить</button>
                        </div>
                      )
                      : (
                        <div>
                          <button onClick={() => deleteTodo(item.id)}>Удалить</button>
                          <button onClick={() => editTodo(item.id, item.task)}>Изменить</button>
                          <button onClick={() => statusTodo(item.id)}>Закрыть/Открыть</button>
                        </div>
                      )
                 }

              </div>
            ))
                }
    </div>
  );
}

export default TodoList;
