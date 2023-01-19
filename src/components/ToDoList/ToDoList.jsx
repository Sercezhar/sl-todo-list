import { useState } from 'react';
import Notification from '../Notification';
import styles from './ToDoList.module.css';
import ToDoListItem from './ToDoListItem';

function ToDoList({ toDos, deleteToDo, editToDo, toggleChecked }) {
  const [textToEdit, setTextToEdit] = useState('');
  const [toDoToEdit, setToDoToEdit] = useState(-1);

  return (
    <div className={styles.wrapper}>
      {toDos.length > 0 ? (
        <ul className={styles.list}>
          {toDos.map(({ text, id, done }) => (
            <ToDoListItem
              key={id}
              id={id}
              text={text}
              deleteToDo={() => deleteToDo(id)}
              toggleChecked={() => toggleChecked(id)}
              isDone={done}
              toDoToEdit={toDoToEdit}
              setToDoToEdit={setToDoToEdit}
              textToEdit={textToEdit}
              setTextToEdit={setTextToEdit}
              editToDo={editToDo}
              toDos={toDos}
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
