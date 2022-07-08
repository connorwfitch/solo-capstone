// External modules
import Select from 'react-select';

function ColorSelector({ defaultVal, setColor }) {
  const options = [
    { value: '#E44332', label: 'Red', color: '#E44332' },
    { value: '#467BB0', label: 'Blue', color: '#467BB0' },
    { value: '#EAC435', label: 'Yellow', color: '#EAC435' },
    { value: '#2FB86F', label: 'Green', color: '#2FB86F' },
    { value: '#7B52A9', label: 'Purple', color: '#7B52A9' },
  ]

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

  const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
    input: (styles) => ({ ...styles, ...dot() }),
    placeholder: (styles) => ({ ...styles, ...dot('#ccc') }),
    singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
  };

  return (
    <Select
      options={options}
      defaultValue={options.filter(ele => ele.value === defaultVal )[0]}
      styles={colourStyles}
      onChange={(e) => setColor(e.value)}
    />
  )
};

export default ColorSelector;