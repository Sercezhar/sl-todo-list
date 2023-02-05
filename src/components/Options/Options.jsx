import styles from './Options.module.css';
import OptionsClear from './OptionsClear';
import OptionsSort from './OptionsSort';

function Options({ sortOption, setSortOption, showModal }) {
  return (
    <div className={styles.options}>
      <OptionsSort sortOption={sortOption} setSortOption={setSortOption} />

      <OptionsClear showModal={showModal} />
    </div>
  );
}

export default Options;
