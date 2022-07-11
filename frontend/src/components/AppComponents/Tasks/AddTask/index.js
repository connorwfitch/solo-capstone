// External modules
import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

// Internal modules
import ListSelector from '../../../Misc/ListSelector';
import DateSelectorModal from '../../../Misc/DateSelector/DateSelectorModal';

function AddTaskInline({ defaultList }) {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  
  const [showAddForm, setShowAddForm] = useState(false);
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
          className='task-inline-title'
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder='Title'
        />
        <textarea
          className='task-inline-details'
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder='Details'
          rows="3"
        />
        <label className='task-inline-list'>
          <ListSelector 
            setListId={setListId} 
            defaultVal={defaultList}
          />
        </label>
        <DateSelectorModal dueAt={dueAt} setDueAt={setDueAt}/>
        <div>
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
        </div>
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