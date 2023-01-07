import styles from './Notification.module.css';

function Notification({ message = 'There is nothing to see here' }) {
  return (
    <div className={styles.message}>
      <h2>{message}</h2>
    </div>
  );
}

export default Notification;
