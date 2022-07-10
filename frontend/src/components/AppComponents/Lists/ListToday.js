// External modules
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Internal modules
import { getTodayTasks } from '../../../store/task';
import TaskSingle from '../Tasks/TaskSingle';


function ListToday({ showSidebar }) {
  const user = useSelector(state => state.session.user);
  const tasks = useSelector(state => state.tasks);
  // const lists = useSelector(state => state.lists);

  const userId = user.id;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodayTasks(userId));
  }, [dispatch, userId])

  let sizingClass = '';
  if (showSidebar) sizingClass = 'hide';

  return tasks && user && (
    <div id='content-container' className={sizingClass}>
      <div className='tasks-main'>
        <h1>Today</h1>
        <div>
          {Object.values(tasks).map((task) => {
            return (
              <TaskSingle
                key={`task-${task.id}`}
                task={task}
              />
            )
          })}
        </div>
      </div>
    </div>
  )

}

export default ListToday;