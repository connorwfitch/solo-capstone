// External modules
import Select from 'react-select';
import { useSelector } from 'react-redux';

function ListSelector({ defaultVal, setListId}) {
  const lists = useSelector(state => state.lists);

  const options = Object.values(lists).map((list) => {
    const out = {
      value: list.id,
      label: list.title,
      color: list.color
    }
    return out;
  });

  let finalDefaultVal = defaultVal;
  if (defaultVal === 'Inbox') {
    finalDefaultVal = Object.values(lists)
      .filter((list) => list.title === 'Inbox')[0].id;
  }

  const dot = (color = 'transparent') => ({
    alignItems: 'center',
    display: 'flex',

    ':before': {
      backgroundColor: color,
      borderRadius: 10,
      content: '" "',
      display: 'block',
      marginRight: 8,
      height: 10,
      width: 10,
    },
  });

  const colorStyles = {
    control: (styles) => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
    input: (styles) => ({ ...styles, ...dot() }),
    placeholder: (styles) => ({ ...styles, ...dot('#ccc') }),
    singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
  };

  return (
    <Select
      options={options}
      defaultValue={options.filter(ele => ele.value === finalDefaultVal)[0]}
      styles={colorStyles}
      onChange={(e) => setListId(e.value)}
    />
  )
}

export default ListSelector;