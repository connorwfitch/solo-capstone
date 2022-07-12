// External modules
import { useDispatch } from "react-redux";
import moment from "moment";

// Internal modules
import { deleteTask, editTask } from "../../../../store/task";
import dateUtil from "../../../Misc/DateUtil";
import EditTaskInline from "../EditTask";

function TaskSingle({ task, showMenu, setShowMenu, showEditor, setShowEditor, hereCondition }) {
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
        <button className="task-single-actions" onClick={() => setShowEditor(task.id)}>
          <i className="fa-solid fa-pen"></i>
        </button>
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

  let completedClass = '';
  if (task.completed) completedClass = 'completed';

  let dateMessage = '';
  if (task.dueAt) dateMessage = dateUtil(task.dueAt.toString());

  let overdueStyle = '';
  if (task.dueAt && task.dueAt < moment().format('YYYY-MM-DD 00:00')) {
    overdueStyle = 'overdue'
  }

  if (showEditor === task.id) {
    return (
      <EditTaskInline 
        task={task}
        hereCondition={hereCondition}
        setShowEditor={setShowEditor}
      />
    )
  } else {
    return (
      <div className='task-single'>
        <button
          className="btn-check"
          onClick={handleComplete}
        >
          <i className={`fa-regular fa-circle-check ${completedClass}`}></i>
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
          {task.dueAt && (
            <p className={`task-single-sub ${overdueStyle}`}>
              {dateMessage}
            </p>
          )}
        </div>
        {buttons}
      </div>
    )
  }
}

export default TaskSingle;