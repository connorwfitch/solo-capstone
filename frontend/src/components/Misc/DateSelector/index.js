// External modules
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

// Internal modules
import './DateSelector.css';

function DateSelector({ dueAt, setDueAt }) {
  return (
    <Calendar 
      onChange={setDueAt} 
      value={dueAt} 
      minDate={new Date()}
      minDetail='year'
      formatShortWeekday={(locale, date) => date.toString().slice(0,1)}
    />
  )
}

export default DateSelector;