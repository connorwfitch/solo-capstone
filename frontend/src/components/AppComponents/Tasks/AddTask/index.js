// External modules
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

// Internal modules
import ListSelector from '../../../Misc/ListSelector';
import DateSelectorModal from '../../../Misc/DateSelector/DateSelectorModal';
import { createTask } from '../../../../store/task';
import { getLists } from '../../../../store/list';

function AddTaskInline({ defaultList, hereCondition, showEditor, setShowEditor }) {
  const user = useSelector(state => state.session.user);
  const lists = useSelector(state => state.lists);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLists(user.id));
  }, [dispatch, user.id])
  
  let defaultListId = defaultList;
  if (defaultList === 'Inbox') {
    defaultListId = Object.values(lists)
      .filter((list) => list.title === 'Inbox')[0]?.id;
  }

  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [dueAt, setDueAt] = useState(null);
  const [listId, setListId] = useState(defaultListId);
  const [errors, setErrors] = useState([]);
  const [here, setHere] = useState(hereCondition === 'always');

  useEffect(() => {
    if (defaultList === 'Inbox') {
      setListId(Object.values(lists)
        .filter((list) => list.title === 'Inbox')[0]?.id)
    } else {
      setListId(defaultList);
    }
  }, [defaultList, lists])

  useEffect(() => {
    if (hereCondition === 'today') {
      setHere(dueAt && dueAt <= new Date()); 
    }
  }, [dueAt, hereCondition])

  useEffect(() => {
    if (hereCondition === 'list') {
      setHere(listId === defaultList)
    }
  }, [listId, hereCondition, defaultList])

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
      ).then(
        (out) => {
          if (out === 'Success') resetForm();
        }
      )
  };

  const resetForm = () => {
    setShowEditor('');
    setTitle("");
    setDetails("");
    setDueAt(null);
    setListId(defaultListId);
  }

  useEffect(() => {
    const newErrors = [];
    if (title.length > 128) newErrors.push('Title may be at most 128 characters long.')
    if (details.length > 1000) newErrors.push('Details may be at most 1000 characters long.')
    setErrors(newErrors);
  }, [title, details]);

  if (showEditor==='new') {
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
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder='Title (required)'
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
            defaultVal={listId}
          />
        </label>
        <DateSelectorModal dueAt={dueAt} setDueAt={setDueAt}/>
        <div className='task-inline-btn-holder'>
          <button
            className='btn btn-white'
            onClick={(e) => {
              e.preventDefault();
              resetForm();
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
        onClick={() => setShowEditor('new')}
      >
        <i className="fa-solid fa-plus"></i>
        Add task
      </button>
    );
  }
}

export default AddTaskInline;