// External modules
import { useDispatch } from "react-redux";

// Internal modules
import { editTask } from "../../../../store/task";

function TaskSingle({ task }) {
  const dispatch = useDispatch();

  const handleComplete = (e) => {
    e.preventDefault();
    if (task.completed) {
      e.target.classList.remove('completed')
    } else {
      e.target.classList.add('completed')
    }
    return dispatch(editTask({ 
        taskId: task.id,
        title: task.title,
        details: task.details,
        dueAt: task.dueAt,
        completed: !task.completed,
        listId: task.listId
      }, false)
    )
  }

  let extraClass = '';
  if (task.completed) extraClass = 'completed';

  let dateMessage = '';
  if (task.dueAt) dateMessage = task.dueAt.toString();

  return (
    <div className='task-single'>
      <button
        className="btn-check"
        onClick={handleComplete}
      >
        <i className={`fa-regular fa-circle-check ${extraClass}`}></i>
      </button>
      <div className="task-single-details">
        <p className="task-title">
          {task.title}
        </p>
        {task.details && (
          <p className="task-single-sub">
            {task.details}
          </p>
        )}
        { task.dueAt && (
          <p className="task-single-sub">
            {dateMessage}
          </p>
        )}
      </div>
    </div>
  )
}

export default TaskSingle;