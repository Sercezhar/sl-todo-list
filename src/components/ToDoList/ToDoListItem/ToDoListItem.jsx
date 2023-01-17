import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { GoCheck, GoX } from 'react-icons/go';
import styles from './ToDoListItem.module.css';

function ToDoListItem({
  text,
  id,
  deleteToDo,
  toDoToEdit,
  setToDoToEdit,
  textToEdit,
  setTextToEdit,
  editToDo,
  isDone,
  toggleChecked,
}) {
  function handleInputChange(event) {
    const { value } = event.currentTarget;

    setTextToEdit(value);
  }

  function handleUpdate() {
    const noChanges = text === textToEdit.trim();
    if (noChanges || textToEdit.length === 0 || textToEdit.trim() === '') {
      setToDoToEdit(-1);
      return;
    }

    editToDo(id, textToEdit.trim());
    setToDoToEdit(-1);
  }

  function onEdit(toDoId, toDoText) {
    setToDoToEdit(toDoId);
    setTextToEdit(toDoText);
  }

  function onEnterKey(event) {
    if (event.key === 'Enter') {
      handleUpdate();
    }
  }

  return (
    <li className={styles.item}>
      {toDoToEdit === id ? (
        <input
          className={styles.inputEdit}
          value={textToEdit}
          onChange={handleInputChange}
          onBlur={handleUpdate}
          autoFocus
          onKeyDown={e => onEnterKey(e)}
        />
      ) : (
        <label className={styles.checkLabel}>
          <input
            className={styles.checkInput}
            type="checkbox"
            id={id}
            checked={isDone}
            onChange={toggleChecked}
          />

          <span className={styles.checkBox}></span>

          <span className={styles.text}>{text}</span>
        </label>
      )}

      <span className={styles.buttonGroup}>
        <button
          className={styles.button}
          type="button"
          onMouseDown={e => e.preventDefault()}
          onClick={
            toDoToEdit === id ? () => handleUpdate() : () => onEdit(id, text)
          }
          disabled={isDone}
        >
          {toDoToEdit === id ? <GoCheck size={20} /> : <AiFillEdit size={20} />}
        </button>

        <button
          className={styles.button}
          type="button"
          onMouseDown={e => e.preventDefault()}
          onClick={toDoToEdit === id ? () => setToDoToEdit(-1) : deleteToDo}
        >
          {toDoToEdit === id ? <GoX size={20} /> : <AiFillDelete size={20} />}
        </button>
      </span>
    </li>
  );
}

export default ToDoListItem;
