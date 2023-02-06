import { RiFilter2Fill } from 'react-icons/ri';
import Dropdown from '../../Dropdown';

const filterOptions = [
  { label: 'Show all', value: 0 },
  { label: 'Show only completed', value: 1 },
  { label: 'Show only non-completed', value: 2 },
];

function OptionsFilter({ filterOption, setFilterOption }) {
  const icon = <RiFilter2Fill size={20} color="var(--accent-color)" />;

  return (
    <div>
      <Dropdown
        optionsArray={filterOptions}
        radioGroupName="Filter"
        icon={icon}
        currentOption={filterOption}
        setCurrentOption={setFilterOption}
      />
    </div>
  );
}

export default OptionsFilter;
