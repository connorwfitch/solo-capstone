// External modules
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Internal modules
import { getAllTasks } from '../../../store/task';
import TaskSingle from '../Tasks/TaskSingle';
import AddTaskInline from '../Tasks/AddTask';


function ListAll({ showSidebar }) {
  const user = useSelector(state => state.session.user);
  const tasks = useSelector(state => state.tasks);
  const lists = useSelector(state => state.lists);

  const [showMenu, setShowMenu] = useState('');
  const [showEditor, setShowEditor] = useState('');

  const userId = user.id;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTasks(userId));
  }, [dispatch, userId, lists])

  let sizingClass = '';
  if (showSidebar) sizingClass = 'hide';

  return tasks && user && (
    <div id='content-container' className={sizingClass}>
      <div className='tasks-main'>
        <h1>All tasks</h1>
        <div className='tasks-holder'>
          {Object.values(tasks).map((task) => {
            return (
              <TaskSingle
                key={`task-${task.id}`}
                task={task}
                showMenu={showMenu}
                setShowMenu={setShowMenu}
                showEditor={showEditor}
                setShowEditor={setShowEditor}
                hereCondition={'always'}
              />
            )
          })}
          <AddTaskInline 
            defaultList={'Inbox'} 
            hereCondition={'always'}
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

export default ListAll;