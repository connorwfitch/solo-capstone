// External modules
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Internal modules
import { getAllTasks } from '../../../store/task';
import TaskSingle from '../Tasks/TaskSingle';


function ListAll() {
  const user = useSelector(state => state.session.user);
  const tasks = useSelector(state => state.tasks);
  // const lists = useSelector(state => state.lists);

  const userId = user.id;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTasks(userId));
  }, [dispatch, userId])

  return tasks && user && (
    <div id='content-container'>
      <div className='tasks-main'>
        <h1>All tasks</h1>
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

export default ListAll;