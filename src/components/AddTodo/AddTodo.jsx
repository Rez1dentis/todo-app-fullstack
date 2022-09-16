import React, { useState } from 'react';

function AddTodo({ todo, setTodo }) {
  const [value, setValue] = useState('');

  // новая задача

  async function saveTodo() {
    const uniqueId = Date.now();
    const response = await fetch('/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: uniqueId,
        task: value,
        status: true,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      setTodo(
        [...todo, data],
      );
    }
    setValue('');
  }

  return (
    <div>
      <input placeholder="Введите задачу" value={value} onChange={(e) => setValue(e.target.value)} />
      <button onClick={saveTodo}>Сохранить</button>
    </div>
  );
}

export default AddTodo;
