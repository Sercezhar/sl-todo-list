import { useState, useEffect } from 'react';
import { customAlphabet } from 'nanoid';
import Container from './Container/Container';
import ToDoForm from './ToDoForm/ToDoForm';
import ToDoList from './ToDoList/ToDoList';

const nanoid = customAlphabet('1234567890', 8);

const defaultToDos = [
  { id: 1, text: 'Donate to the Armed Forces of Ukraine', done: false },
  { id: 2, text: 'Buy milk', done: false },
  { id: 3, text: 'Learn TypeScript', done: false },
];

function App() {
  const [toDos, setToDos] = useState(() => {
    return JSON.parse(window.localStorage.getItem('todos')) ?? defaultToDos;
  });

  useEffect(() => {
    window.localStorage.setItem('todos', JSON.stringify(toDos));
  }, [toDos]);

  function addToDo(text) {
    const data = {
      id: nanoid(),
      text,
      done: false,
    };

    setToDos(prevState => [...prevState, data]);
  }

  function deleteToDo(id) {
    setToDos(prevState => prevState.filter(item => item.id !== id));
  }

  function editToDo(id, newText) {
    setToDos(prevState =>
      prevState.map(todo =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  }

  function toggleChecked(id) {
    setToDos(prevState =>
      prevState.map(todo =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  }

  function clearList() {
    setToDos([]);
  }

  return (
    <Container>
      <ToDoForm addToDo={addToDo} clearList={clearList} />
      <ToDoList
        toDos={toDos}
        deleteToDo={deleteToDo}
        editToDo={editToDo}
        toggleChecked={toggleChecked}
      />
    </Container>
  );
}

export default App;
