// External modules
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

// Internal modules
import './DateSelector.css';

function DateSelector({ dueAt, setDueAt }) {
  return (
    <div className='calendar-modal'>    
      <Calendar 
        onChange={setDueAt} 
        value={dueAt} 
        minDate={new Date()}
        minDetail='year'
        formatShortWeekday={(locale, date) => date.toString().slice(0,1)}
      />
    </div>
  )
}

export default DateSelector;