import { RiFilter2Fill } from 'react-icons/ri';
import Dropdown from '../../Dropdown';

function OptionsFilter({
  filterOption,
  setFilterOption,
  todos,
  setCurrentPage,
}) {
  const icon = <RiFilter2Fill size={20} color="var(--accent-color)" />;

  const includesDone = todos.some(todo => todo.done);
  const includesUndone = todos.some(todo => !todo.done);

  const filterOptions = [
    { label: 'Show all', value: 0 },
    { label: 'Show only completed', value: 1, disabled: !includesDone },
    { label: 'Show only non-completed', value: 2, disabled: !includesUndone },
  ];

  return (
    <div>
      <Dropdown
        optionsArray={filterOptions}
        radioGroupName="Filter"
        icon={icon}
        currentOption={filterOption}
        setCurrentOption={setFilterOption}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default OptionsFilter;
