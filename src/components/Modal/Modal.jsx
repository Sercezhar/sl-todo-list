import classNames from 'classnames/bind';
import { forwardRef, useImperativeHandle, useReducer, useState } from 'react';
import { GoX } from 'react-icons/go';
import styles from './Modal.module.css';

let cx = classNames.bind(styles);

function Modal({ onConfirm }, ref) {
  const [isVisible, setIsVisible] = useState(false);
  const [modalConfig, setModalConfig] = useReducer(
    (state, updates) => ({ ...state, ...updates }),
    { message: '', action: '' }
  );

  let modalClasses = cx({
    backdrop: true,
    visible: isVisible,
  });
  let cancelButtonClasses = cx('button', 'buttonCancel');
  let confirmButtonClasses = cx('button', 'buttonConfirm');

  useImperativeHandle(ref, () => ({
    showModal(message, action) {
      setModalConfig({ message, action });
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    },
  }));

  function handleOnCancel() {
    setIsVisible(false);
    document.body.style.overflow = 'auto';
  }

  function handleOnConfirm() {
    onConfirm(modalConfig.action);
    setIsVisible(false);
    document.body.style.overflow = 'auto';
  }

  return (
    <div className={modalClasses}>
      <div className={styles.modal}>
        <button className={styles.buttonClose} onClick={() => handleOnCancel()}>
          <GoX size={20} />
        </button>

        <h3 className={styles.title}>Are you sure?</h3>

        <p className={styles.message}>{modalConfig.message}</p>

        <div className={styles.buttonsGroup}>
          <button
            className={cancelButtonClasses}
            onClick={() => handleOnCancel()}
          >
            Cancel
          </button>

          <button
            className={confirmButtonClasses}
            onClick={() => handleOnConfirm()}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default forwardRef(Modal);
