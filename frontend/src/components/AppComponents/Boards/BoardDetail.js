// External modules
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';

// Internal modules
import { getSectionsByBoard, editSection } from '../../../store/section';
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

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // check if dropped illegally
    if (!destination) {
      return;
    }

    // check for moved within same section
    if (destination.droppableId === source.droppableId) {
      return moveWithinSection(destination, source, draggableId);
    } else {
      return moveAcrossSections(destination, source, draggableId);
    }
  }

  const moveWithinSection = (destination, source, draggableId) => {
    // check if dropped in place
    if (destination.index === source.index) return;

    const section = sections[source.droppableId];
    const newOrderIds = section.orderIds.split(',');
    newOrderIds.splice(source.index, 1);
    newOrderIds.splice(destination.index, 0, draggableId.split('-')[1]);
    section.orderIds = newOrderIds.join(',');

    return dispatch(editSection({
      sectionId: section.id,
      title: section.title,
      orderIds: section.orderIds,
      boardId: section.boardId
    }));
  }

  const moveAcrossSections = (destination, source, draggableId) => {
    const startSection = sections[source.droppableId];
    const endSection = sections[destination.droppableId];
    const item = startSection.items[draggableId];


    const newStartIds = startSection.orderIds.split(',');
    newStartIds.splice(source.index, 1);
    startSection.orderIds = newStartIds.join(',');

    const newEndIds = endSection.orderIds.split(',');
    newEndIds.splice(destination.index, 0, draggableId.split('-')[1]);
    endSection.orderIds = newEndIds.join(',');

    // return dispatch()
  }

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
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className='sections-holder'>
              {board.orderIds.split(',').map((sectionId, index) => {
                if (sections[`section-${sectionId}`]) {
                  return (
                    <SectionSingle
                      key={`section-${sectionId}`}
                      section={sections[`section-${sectionId}`]}
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
          </DragDropContext>
      </div>
    </div>
  )
}

export default BoardDetail;