// External modules
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

// Internal modules
import { getTasksByList } from '../../../store/task';


function ListDetail() {
  // const user = useSelector(state => state.session.user);
  const tasks = useSelector(state => state.tasks);
  const lists = useSelector(state => state.lists);

  const { listId } = useParams();
  const list = lists[listId];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasksByList(listId));
  }, [dispatch, listId])

  return tasks && list && (
    <>
      <h1>{list.title}</h1>
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

export default ListDetail;