// External modules
import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

// Internal modules
import ListSelector from '../../../Misc/ListSelector';
import DateSelector from '../../../Misc/DateSelector';

function AddTaskInline({ defaultList }) {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [dueAt, setDueAt] = useState(null);
  const [listId, setListId] = useState(null);
  const [errors, setErrors] = useState([]);

  if (showAddForm) {
    return (
      <form className='task-inline'>
        {errors.length > 0 && <ul className="errors">
          {errors.map((error, i) => (
            <li key={i}>{error}</li>
          ))}
        </ul>}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder='Task title'
        />
        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder='Task details'
        />
        <ListSelector setListId={setListId} defaultVal={defaultList}/>
        <button
          type='button'
          onClick={() => setShowCalendar(!showCalendar)}
        >
          <i className="fa-regular fa-calendar"></i>
          {dueAt ? dueAt.toDateString() : 'Due date'}
        </button>
        {showCalendar &&
        (<DateSelector dueAt={dueAt} setDueAt={setDueAt} />) }
        <button 
          className='btn btn-white'
          onClick={(e) => {
            e.preventDefault();
            setShowAddForm(false);
            setTitle("");
            setDetails("");
            setDueAt(null);
            setListId(null);
          }}
          type='button'
        >
          Cancel
        </button>
      </form>
    );
  } else {
    return (
      <button 
        className='task-add-btn' 
        onClick={() => setShowAddForm(true)}
      >
        <i className="fa-solid fa-plus"></i>
        Add task
      </button>
    );
  }
}

export default AddTaskInline;