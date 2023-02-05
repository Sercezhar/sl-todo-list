import { useState } from 'react';
import styles from './ToDoForm.module.css';

function ToDoForm({ addToDo }) {
  const [text, setText] = useState('');

  function resetState() {
    setText('');
  }

  function handleInputChange(event) {
    const { value } = event.currentTarget;

    setText(value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (text.length === 0 || text.trim() === '') {
      resetState();
      return;
    }

    addToDo(text.trim());
    resetState();
  }

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <input
            className={styles.input}
            type="text"
            value={text}
            placeholder="Don't forget to..."
            onChange={handleInputChange}
          />

          <button className={styles.addButton} type="sumbit">
            Add To-Do
          </button>
        </div>
      </form>
    </div>
  );
}

export default ToDoForm;
