import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { GoCheck, GoX } from 'react-icons/go';
import styles from './ToDoListItem.module.css';

function ToDoListItem({
  text,
  id,
  clickedTodo,
  setClickedTodo,
  textToEdit,
  setTextToEdit,
  editToDo,
  isDone,
  toggleChecked,
  showModal,
}) {
  function handleInputChange(event) {
    const { value } = event.currentTarget;

    setTextToEdit(value);
  }

  function handleUpdate() {
    const noChanges = text === textToEdit.trim();
    if (noChanges || textToEdit.length === 0 || textToEdit.trim() === '') {
      setClickedTodo(-1);
      return;
    }

    editToDo(id, textToEdit.trim());
    setClickedTodo(-1);
  }

  function onEdit(toDoId, toDoText) {
    setClickedTodo(toDoId + 'edit');
    setTextToEdit(toDoText);
  }

  function onDelete(id) {
    showModal('Delete this to-do?', 'delete');
    setClickedTodo(id);
  }

  function handleOnKeyPress(event) {
    if (event.key === 'Enter') {
      handleUpdate();
    }

    if (event.key === 'Escape') {
      setClickedTodo(-1);
    }
  }

  const isEdit = clickedTodo === id + 'edit';

  return (
    <li className={styles.item}>
      {isEdit ? (
        <input
          className={styles.inputEdit}
          value={textToEdit}
          onChange={handleInputChange}
          onBlur={handleUpdate}
          autoFocus
          onKeyDown={e => handleOnKeyPress(e)}
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

      <div className={styles.buttonGroup}>
        <button
          className={styles.button}
          type="button"
          onMouseDown={e => e.preventDefault()}
          onClick={isEdit ? () => handleUpdate() : () => onEdit(id, text)}
          disabled={isDone}
        >
          {isEdit ? <GoCheck size={20} /> : <AiFillEdit size={20} />}
        </button>

        {isEdit ? (
          <button
            className={styles.button}
            type="button"
            onMouseDown={e => e.preventDefault()}
            onClick={() => setClickedTodo(-1)}
          >
            <GoX size={20} />
          </button>
        ) : (
          <button
            className={styles.button}
            type="button"
            onClick={() => onDelete(id)}
          >
            <AiFillDelete size={20} />
          </button>
        )}
      </div>
    </li>
  );
}

export default ToDoListItem;
