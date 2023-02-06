import Dropdown from '../../Dropdown';
import { BiSortAlt2 } from 'react-icons/bi';

const sortOptions = [
  { label: 'Older ones first', value: 0 },
  { label: 'Newer ones first', value: 1 },
];

function OptionsSort({ sortOption, setSortOption }) {
  const icon = <BiSortAlt2 size={20} color="var(--accent-color)" />;

  return (
    <div>
      <Dropdown
        optionsArray={sortOptions}
        radioGroupName="Sort"
        icon={icon}
        currentOption={sortOption}
        setCurrentOption={setSortOption}
      />
    </div>
  );
}

export default OptionsSort;
