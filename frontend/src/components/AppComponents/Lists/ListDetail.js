// External modules
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

// Internal modules
import { getTasksByList } from '../../../store/task';
import NotFoundApp from '../NotFoundApp';
import '../Tasks/Tasks.css';
import TaskSingle from '../Tasks/TaskSingle';


function ListDetail({ showSidebar }) {
  // const user = useSelector(state => state.session.user);
  const tasks = useSelector(state => state.tasks);
  const lists = useSelector(state => state.lists);

  const { listId } = useParams();
  const list = lists[listId];

  const dispatch = useDispatch();

  useEffect(() => {
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

export default ListDetail;