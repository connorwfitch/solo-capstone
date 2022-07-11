// External modules
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

// Internal modules
import { getTasksByList } from '../../../store/task';
import NotFoundApp from '../NotFoundApp';
import '../Tasks/Tasks.css';
import TaskSingle from '../Tasks/TaskSingle';
import AddTaskInline from '../Tasks/AddTask';


function ListDetail({ showSidebar }) {
  // const user = useSelector(state => state.session.user);
  const tasks = useSelector(state => state.tasks);
  const lists = useSelector(state => state.lists);

  const { listId } = useParams();
  const list = lists[listId];

  const [showMenu, setShowMenu] = useState('');
  const [showEditor, setShowEditor] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    setShowEditor('');
    dispatch(getTasksByList(listId));
  }, [dispatch, listId])

  if (!Object.keys(lists).includes(listId)) {
    return (
      <NotFoundApp />
    )
  }

  let sizingClass = '';
  if (showSidebar) sizingClass = 'hide';

  return tasks && list && (
    <div id='content-container' className={sizingClass}>
      <div className='tasks-main'>
        <h1>{list.title}</h1>
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
                hereCondition={'list'}
              />
            )
          })}
          <AddTaskInline
            defaultList={list.id}
            hereCondition={'list'}
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

export default ListDetail;