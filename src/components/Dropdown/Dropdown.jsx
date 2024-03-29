import classNames from 'classnames/bind';
import { RxChevronLeft } from 'react-icons/rx';
import { useMediaQuery } from 'react-responsive';
import useClickOutside from '../../hooks/useClickOutside';
import styles from './Dropdown.module.css';

let cx = classNames.bind(styles);

function Dropdown({
  optionsArray,
  radioGroupName,
  icon,
  currentOption,
  setCurrentOption,
  setCurrentPage = () => {
    return;
  },
}) {
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
    setCurrentOption(value);
    setIsOpen(false);
    setCurrentPage(1);
  }

  return (
    <div ref={ref} className={styles.wrapper}>
      <button
        className={styles.button}
        type="button"
        onClick={() => setIsOpen(prevState => !prevState)}
      >
        {isTablet ? radioGroupName : icon}
        {isTablet ? <RxChevronLeft size={16} className={iconClasses} /> : null}
      </button>

      <div className={radioGroupClasses}>
        {optionsArray.map(({ label, value, disabled }) => (
          <label
            className={styles.radioLabel}
            key={value}
            style={{
              color: disabled ? '#ccc' : '#000',
              pointerEvents: disabled ? 'none' : 'all',
            }}
          >
            <input
              className={styles.radioInput}
              type="radio"
              name={radioGroupName}
              value={value}
              disabled={disabled}
              checked={currentOption === value}
              onChange={() => setCurrentSorting(value)}
            />

            {label}
          </label>
        ))}
      </div>
    </div>
  );
}

export default Dropdown;
