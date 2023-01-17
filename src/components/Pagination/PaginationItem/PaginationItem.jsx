import classNames from 'classnames/bind';
import styles from './PaginationItem.module.css';

let cx = classNames.bind(styles);

function PaginationItem({ page, currentPage, onPageChange, isDisabled }) {
  let itemClasses = cx({
    pageItem: true,
    active: page === currentPage,
  });

  return (
    <li className={itemClasses} onClick={() => onPageChange(page)}>
      <button
        className={styles.pageButton}
        tabIndex={page === currentPage ? -1 : 0}
        disabled={isDisabled ? true : false}
      >
        {page}
      </button>
    </li>
  );
}

export default PaginationItem;
