// External modules
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

// Internal modules
import ListSelector from '../../../Misc/ListSelector';
import DateSelectorModal from '../../../Misc/DateSelector/DateSelectorModal';
import { editTask } from '../../../../store/task';
import { getLists } from '../../../../store/list';

function EditTaskInline({ task, hereCondition, setShowEditor }) {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLists(user.id));
  }, [dispatch, user.id])

  const [title, setTitle] = useState(task.title);
  const [details, setDetails] = useState(task.details ? task.details : '');
  const [dueAt, setDueAt] = useState(task.dueAt ? new Date(task.dueAt) : null);
  const [listId, setListId] = useState(task.listId);
  const [errors, setErrors] = useState([]);
  const [here, setHere] = useState(true);


  useEffect(() => {
    if (hereCondition === 'today') {
      setHere(dueAt && dueAt <= new Date());
    }
  }, [dueAt, hereCondition])

  useEffect(() => {
    if (hereCondition === 'list') {
      setHere(listId === task.listId)
    }
  }, [listId, hereCondition, task])

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(editTask(
      {
        taskId: task.id, title, details, dueAt, listId, userId: user.id
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
          if (out === 'Success') {
            setShowEditor('');
          }
        }
      )
  };

  useEffect(() => {
    const newErrors = [];
    if (!title.length) newErrors.push('Must include a title.')
    if (title.length > 128) newErrors.push('Title may be at most 128 characters long.')
    if (details.length > 1000) newErrors.push('Details may be at most 1000 characters long.')
    setErrors(newErrors);
  }, [title, details]);

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
      <DateSelectorModal dueAt={dueAt} setDueAt={setDueAt} />
      <div className='task-inline-btn-holder'>
        <button
          className='btn btn-white'
          onClick={(e) => {
            e.preventDefault();
            setShowEditor('');
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
          Submit
        </button>
      </div>
    </form>
  );
}

export default EditTaskInline;