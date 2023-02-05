import { AiOutlineClear } from 'react-icons/ai';
import styles from './OptionsClear.module.css';

function OptionsClear({ showModal }) {
  return (
    <div>
      <button
        className={styles.buttonClear}
        type="button"
        onClick={() => showModal('Clear the list?', 'clear')}
      >
        Clear the list
        <AiOutlineClear size={20} />
      </button>
    </div>
  );
}

export default OptionsClear;
