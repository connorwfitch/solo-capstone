// External modules
import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

// Internal modules

function AddTaskInline() {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [dueAt, setDueAt] = useState("");
  const [listId, setListId] = useState();
  const [errors, setErrors] = useState([]);

  if (showAddForm) {
    return (
      <form className='task-inline'>
        {errors.length > 0 && <ul className="errors">
          {errors.map((error, i) => (
            <li key={i}>{error}</li>
          ))}
        </ul>}
        <button 
          className='btn btn-white'
          onClick={(e) => {
            e.preventDefault();
            setShowAddForm(false)
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