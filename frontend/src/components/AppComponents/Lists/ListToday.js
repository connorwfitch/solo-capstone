// External modules
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Internal modules
import { getTodayTasks } from '../../../store/task';


function ListToday() {
  const user = useSelector(state => state.session.user);
  const tasks = useSelector(state => state.tasks);
  // const lists = useSelector(state => state.lists);

  const userId = user.id;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodayTasks(userId));
  }, [dispatch, userId])

  return tasks && user && (
    <>
      <h1>Today</h1>
      <div>
        {Object.values(tasks).map((task) => {
          return (
            <div key={`task-${task.id}`}>
              {task.title}
            </div>
          )
        })}
      </div>
    </>
  )

}

export default ListToday;