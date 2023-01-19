import { customAlphabet } from 'nanoid';
import { useEffect, useState } from 'react';
import Container from './Container/Container';
import Pagination from './Pagination';
import SortFeature from './SortFeature';
import ToDoForm from './ToDoForm/ToDoForm';
import ToDoList from './ToDoList/ToDoList';

const nanoid = customAlphabet('1234567890', 8);

const defaultToDos = [
  { id: 1, text: 'Donate to the Armed Forces of Ukraine', done: false },
  { id: 2, text: 'Buy milk', done: false },
  { id: 3, text: 'Learn TypeScript', done: false },
];

const limit = 10;

function App() {
  const [toDos, setToDos] = useState(() => {
    return JSON.parse(window.localStorage.getItem('todos')) ?? defaultToDos;
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState(() => {
    return window.localStorage.getItem('sortType') ?? 0;
  });

  useEffect(() => {
    window.localStorage.setItem('todos', JSON.stringify(toDos));
    window.localStorage.setItem('sortType', sortOption);
  }, [toDos, sortOption]);

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

  function paginateToDos(array) {
    const startIndex = currentPage * limit - limit;
    const endIndex = currentPage * limit;
    const paginatedToDos =
      sortOption === 0
        ? array.slice(startIndex, endIndex)
        : [...array].reverse().slice(startIndex, endIndex);

    if (paginatedToDos.length === 0 && currentPage > 1) {
      setCurrentPage(prevState => prevState - 1);
    }

    return paginatedToDos;
  }

  return (
    <Container>
      <ToDoForm addToDo={addToDo} clearList={clearList} />

      {toDos.length > 0 ? (
        <SortFeature sortOption={sortOption} setSortOption={setSortOption} />
      ) : null}

      <ToDoList
        toDos={paginateToDos(toDos)}
        deleteToDo={deleteToDo}
        editToDo={editToDo}
        toggleChecked={toggleChecked}
      />

      <Pagination
        currentPage={currentPage}
        total={toDos.length}
        limit={limit}
        onPageChange={page => setCurrentPage(page)}
      />
    </Container>
  );
}

export default App;
