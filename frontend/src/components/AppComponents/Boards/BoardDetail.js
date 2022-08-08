// External modules
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

// Internal modules
import { getSectionsByBoard } from '../../../store/section';
import SectionSingle from '../Sections/SectionSingle';
import NotFoundApp from '../NotFoundApp';
import './Boards.css';


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
    <div id='board-content-container' className={sizingClass}>
      <div className='boards-main'>
        <h1 className='board-title'>{board.title}</h1>
          <div className='sections-holder'>
            {board.orderIds.split(',').slice(1).map((sectionId, index) => {
              if (sections[sectionId]) {
                return (
                  <SectionSingle
                    key={`section-${sectionId}`}
                    section={sections[sectionId]}
                    index={index}
                    showMenu={showMenu}
                    setShowMenu={setShowMenu}
                    showEditor={showEditor}
                    setShowEditor={setShowEditor}
                  />
                )
              }
              return null;
            })}
          </div>
      </div>
    </div>
  )
}

export default BoardDetail;