// External modules
import { useDispatch } from "react-redux";

// Internal modules
import { editTask } from "../../../../store/task";

function TaskSingle({ task }) {
  const dispatch = useDispatch();

  const handleComplete = (e) => {
    e.preventDefault();
    if (task.completed) {
      e.target.classList.remove('complete')
    } else {
      e.target.classList.add('complete')
    }
    return dispatch(editTask({ 
        taskId: task.id,
        title: task.title,
        details: task.details,
        dueAt: task.dueAt,
        completed: !task.completed,
        listId: task.listId
      }, true)
    )
  }

  return (
    <div className='task-single'>
      <button 
        className="btn-check"
        onClick={handleComplete}
      >
        <i className="fa-regular fa-circle-check"></i>
      </button>
      {task.title} {task.completed && 'Done!'}
    </div>
  )
}

export default TaskSingle;