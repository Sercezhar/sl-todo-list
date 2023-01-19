import { RxChevronLeft } from 'react-icons/rx';
import classNames from 'classnames/bind';
import styles from './SortFeature.module.css';
import useClickOutside from '../../hooks/useClickOutside';

let cx = classNames.bind(styles);

const sortOptions = [
  { label: 'Older ones first', value: 0 },
  { label: 'Newer ones first', value: 1 },
];

function SortFeature({ sortOption, setSortOption }) {
  const { ref, isOpen, setIsOpen } = useClickOutside(false);

  let listClasses = cx({
    list: true,
    show: isOpen,
  });
  let iconClasses = cx({
    arrowIcon: true,
    rotate: listClasses.includes('show'),
  });

  function setCurrentSorting(value) {
    setSortOption(value);
    setIsOpen(false);
  }

  function handleOnKeyPress(event, value) {
    if (event.key === 'Enter') {
      setSortOption(value);
      setIsOpen(false);
    }

    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  }

  return (
    <div ref={ref} className={styles.wrapper}>
      <button
        className={styles.button}
        type="button"
        onClick={() => setIsOpen(prevState => !prevState)}
      >
        {sortOptions[sortOption].label}
        <RxChevronLeft size={16} className={iconClasses} />
      </button>

      <ul className={listClasses}>
        {sortOptions.map(({ label, value }) => (
          <li
            className={styles.item}
            key={value}
            tabIndex={0}
            onClick={() => setCurrentSorting(value)}
            onKeyDown={e => handleOnKeyPress(e, value)}
          >
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SortFeature;
