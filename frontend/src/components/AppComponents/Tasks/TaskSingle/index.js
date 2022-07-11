// External modules
import { useDispatch } from "react-redux";

// Internal modules
import { deleteTask, editTask } from "../../../../store/task";
import dateUtil from "../../../Misc/DateUtil";

function TaskSingle({ task, showMenu, setShowMenu }) {
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

  const handleDelete = (e) => {
    e.preventDefault();
    return dispatch(deleteTask(task.id))
  }

  let buttons;
  if (task.id === showMenu) {
    buttons = (
      <div className="task-single-menu">
        <button className="task-single-actions" onClick={handleDelete}>
          <i className="fa-solid fa-trash"></i>
        </button>
        {/* edit button */}
        <button className="task-single-actions" onClick={() => setShowMenu('')}>
          <i className="fa-solid fa-ellipsis"></i>
        </button>
      </div>
    )
  } else {
    buttons = (
      <button className="task-single-actions" onClick={() => setShowMenu(task.id)}>
        <i className="fa-solid fa-ellipsis"></i>
      </button>
    )
  }

  let extraClass = '';
  if (task.completed) extraClass = 'completed';

  let dateMessage = '';
  if (task.dueAt) dateMessage = dateUtil(task.dueAt.toString());

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
      {buttons}
    </div>
  )
}

export default TaskSingle;