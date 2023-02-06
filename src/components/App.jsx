import { customAlphabet } from 'nanoid';
import { useEffect, useRef, useState } from 'react';
import Container from './Container/Container';
import Modal from './Modal';
import Options from './Options';
import Pagination from './Pagination';
import ToDoForm from './ToDoForm';
import ToDoList from './ToDoList';

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
  const [clickedTodo, setClickedTodo] = useState(-1);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState(() => {
    return Number(window.localStorage.getItem('sortType')) ?? 0;
  });
  const [filterOption, setFilterOption] = useState(0);

  const modalRef = useRef();

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

  function showModal(message, action) {
    modalRef.current.showModal(message, action);
  }

  function modalOnConfirm(action) {
    if (action === 'clear') {
      clearList();
    }

    if (action === 'delete') {
      deleteToDo(clickedTodo);
    }
  }

  function paginateToDos(array) {
    const startIndex = currentPage * limit - limit;
    const endIndex = currentPage * limit;

    const paginatedToDos =
      sortOption === 0
        ? array.slice(startIndex, endIndex)
        : [...array].reverse().slice(startIndex, endIndex);

    const filteredTodos = () => {
      if (filterOption === 0) {
        return paginatedToDos;
      } else if (filterOption === 1) {
        return paginatedToDos.filter(todo => todo.done);
      } else if (filterOption === 2) {
        return paginatedToDos.filter(todo => !todo.done);
      } else {
        return;
      }
    };

    if (paginatedToDos.length === 0 && currentPage > 1) {
      setCurrentPage(prevState => prevState - 1);
    }

    return filteredTodos();
  }

  return (
    <div>
      <Modal ref={modalRef} onConfirm={modalOnConfirm} />

      <Container>
        <ToDoForm addToDo={addToDo} showModal={showModal} />

        {toDos.length > 0 ? (
          <Options
            sortOption={sortOption}
            setSortOption={setSortOption}
            filterOption={filterOption}
            setFilterOption={setFilterOption}
            showModal={showModal}
          />
        ) : null}

        <ToDoList
          toDos={paginateToDos(toDos)}
          deleteToDo={deleteToDo}
          editToDo={editToDo}
          toggleChecked={toggleChecked}
          clickedTodo={clickedTodo}
          setClickedTodo={setClickedTodo}
          showModal={showModal}
        />

        <Pagination
          currentPage={currentPage}
          total={toDos.length}
          limit={limit}
          onPageChange={page => setCurrentPage(page)}
        />
      </Container>
    </div>
  );
}

export default App;
