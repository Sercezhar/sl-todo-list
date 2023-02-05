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

  let radioGroupClasses = cx({
    radioGroup: true,
    show: isOpen,
  });
  let iconClasses = cx({
    arrowIcon: true,
    rotate: radioGroupClasses.includes('show'),
  });

  function setCurrentSorting(value) {
    setSortOption(value);
    setIsOpen(false);
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

      <div className={radioGroupClasses}>
        {sortOptions.map(({ label, value }) => (
          <label className={styles.radioLabel} key={value}>
            <input
              className={styles.radioInput}
              type="radio"
              name="sort"
              value={value}
              defaultChecked={sortOption === value}
              onChange={() => setCurrentSorting(value)}
            />

            {label}
          </label>
        ))}
      </div>
    </div>
  );
}

export default OptionsSort;
