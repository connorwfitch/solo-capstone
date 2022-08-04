// External modules
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';

// Internal modules
import { getSectionsByBoard } from '../../../store/section';
import NotFoundApp from '../NotFoundApp';


function BoardDetail({ showSidebar }) {
  const sections = useSelector(state => state.sections);
  const boards = useSelector(state => state.boards);

  const { boardId } = useParams();
  const board = boards[boardId];

  const [showMenu, setShowMenu] = useState('');
  const [showEditor, setShowEditor] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    setShowEditor('');
    dispatch(getSectionsByBoard(boardId));
  }, [dispatch, boardId])

  if (!Object.keys(boards).includes(boardId)) {
    return (
      <NotFoundApp />
    )
  }

  let sizingClass = '';
  if (showSidebar) sizingClass = 'hide';

  return sections && board && (
    <div id='content-container' className={sizingClass}>
      <div className='boards-main'>
        <h1 className='board-title'>{board.title}</h1>
      </div>
    </div>
  )
}

export default BoardDetail;