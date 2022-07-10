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
      </div>
    </div>
  )
}

export default TaskSingle;