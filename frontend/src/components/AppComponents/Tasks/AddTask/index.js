// External modules
import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

// Internal modules
import ListSelector from '../../../Misc/ListSelector';
import DateSelectorModal from '../../../Misc/DateSelector/DateSelectorModal';
import { createTask } from '../../../../store/task';

function AddTaskInline({ defaultList, hereCondition }) {
  const user = useSelector(state => state.session.user);
  const lists = useSelector(state => state.lists);
  const dispatch = useDispatch();

  let defaultListId = defaultList;
  if (lists && defaultList === 'Inbox') {
    defaultListId = Object.values(lists)
      .filter((list) => list.title === 'Inbox')[0]?.id;
  }

  
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [dueAt, setDueAt] = useState(null);
  const [listId, setListId] = useState(defaultListId);
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(createTask(
        { 
          title, details, dueAt, listId, userId: user.id 
        },
        here
      ))
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      )
  };

  let here;
  if (hereCondition === 'always') {
    here = true;
  }

  if (showAddForm) {
    return (
      <form className='task-inline' onSubmit={handleSubmit}>
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
            defaultVal={defaultListId}
          />
        </label>
        <DateSelectorModal dueAt={dueAt} setDueAt={setDueAt}/>
        <div className='task-inline-btn-holder'>
          <button
            className='btn btn-white'
            onClick={(e) => {
              e.preventDefault();
              setShowAddForm(false);
              setTitle("");
              setDetails("");
              setDueAt(null);
              setListId(defaultListId);
            }}
            type='button'
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-red"
            disabled={errors.length}
          >
            Add
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