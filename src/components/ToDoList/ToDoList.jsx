import { useState } from 'react';
import Notification from '../Notification';
import styles from './ToDoList.module.css';
import ToDoListItem from './ToDoListItem';

function ToDoList({
  toDos,
  clickedTodo,
  setClickedTodo,
  deleteToDo,
  editToDo,
  toggleChecked,
  showModal,
}) {
  const [textToEdit, setTextToEdit] = useState('');

  return (
    <div className={styles.wrapper}>
      {toDos.length > 0 ? (
        <ul className={styles.list}>
          {toDos.map(({ text, id, done }) => (
            <ToDoListItem
              key={id}
              id={id}
              text={text}
              toDos={toDos}
              clickedTodo={clickedTodo}
              setClickedTodo={setClickedTodo}
              deleteToDo={() => deleteToDo(id)}
              toggleChecked={() => toggleChecked(id)}
              isDone={done}
              textToEdit={textToEdit}
              setTextToEdit={setTextToEdit}
              editToDo={editToDo}
              showModal={showModal}
            />
          ))}
        </ul>
      ) : (
        <Notification message="The list is empty" />
      )}
    </div>
  );
}

export default ToDoList;
