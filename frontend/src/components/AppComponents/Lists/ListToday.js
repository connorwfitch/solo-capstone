// External modules
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Internal modules
import { getTodayTasks } from '../../../store/task';
import TaskSingle from '../Tasks/TaskSingle';
import AddTaskInline from '../Tasks/AddTask';


function ListToday({ showSidebar }) {
  const user = useSelector(state => state.session.user);
  const tasks = useSelector(state => state.tasks);
  // const lists = useSelector(state => state.lists);

  const [showMenu, setShowMenu] = useState('');
  const [showEditor, setShowEditor] = useState('');

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
        <div className='tasks-holder'>
          {Object.values(tasks).map((task) => {
            return (
              <TaskSingle
                key={`task-${task.id}`}
                task={task}
              />
            )
          })}
          <AddTaskInline
            defaultList={'Inbox'}
            hereCondition={'today'}
            showEditor={showEditor}
            setShowEditor={setShowEditor}
          />
        </div>
        {Object.values(tasks).length === 0 && !showEditor && (
          <>
            <img src='/images/farmer.png' className='tasks-empty-img' alt='farmer' />
          </>
        )}
      </div>
    </div>
  )

}

export default ListToday;