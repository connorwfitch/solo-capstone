// External modules
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

// Internal modules
import './DateSelector.css';

function DateSelector({ setShowModal, dueAt, setDueAt }) {

  return (
    <div className='calendar-modal'>    
      <Calendar 
        onChange={setDueAt} 
        value={dueAt} 
        minDate={new Date()}
        minDetail='year'
        formatShortWeekday={(locale, date) => date.toString().slice(0,1)}
      />
      <button className='btn-large btn-red'
        style={{ width: '100%', margin: '8px 0px' }}
        onClick={(e) => {
          e.preventDefault();
          setShowModal(false);
        }}
      >
        Done
      </button>
      <button 
        className='btn-large btn-white'
        style={{width: '100%'}}
        onClick={(e) => {
          e.preventDefault();
          setDueAt(null);
          setShowModal(false);
        }}
      >
        Cancel
      </button>
    </div>
  )
}

export default DateSelector;