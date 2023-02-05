import classNames from 'classnames/bind';
import { BiSortAlt2 } from 'react-icons/bi';
import { RxChevronLeft } from 'react-icons/rx';
import { useMediaQuery } from 'react-responsive';
import useClickOutside from '../../../hooks/useClickOutside';
import styles from './OptionsSort.module.css';

let cx = classNames.bind(styles);

const sortOptions = [
  { label: 'Older ones first', value: 0 },
  { label: 'Newer ones first', value: 1 },
];

function OptionsSort({ sortOption, setSortOption }) {
  const { ref, isOpen, setIsOpen } = useClickOutside(false);

  const isTablet = useMediaQuery({ query: '(min-width: 768px)' });

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
        {isTablet ? (
          sortOptions[sortOption].label
        ) : (
          <BiSortAlt2 size={20} color="var(--accent-color)" />
        )}
        {isTablet ? <RxChevronLeft size={16} className={iconClasses} /> : null}
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

export default OptionsSort;
