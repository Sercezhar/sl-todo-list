import styles from './Options.module.css';
import OptionsClear from './OptionsClear';
import OptionsFilter from './OptionsFilter';
import OptionsSort from './OptionsSort';

function Options({
  sortOption,
  setSortOption,
  filterOption,
  setFilterOption,
  showModal,
}) {
  return (
    <div className={styles.options}>
      <div className={styles.dropdownGroup}>
        <OptionsSort sortOption={sortOption} setSortOption={setSortOption} />

        <OptionsFilter
          filterOption={filterOption}
          setFilterOption={setFilterOption}
        />
      </div>

      <OptionsClear showModal={showModal} />
    </div>
  );
}

export default Options;
