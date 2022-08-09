// External modules
import { useDispatch } from "react-redux";
import { Droppable } from "react-beautiful-dnd";

// Internal modules
import { deleteSection } from "../../../../store/section";
import ItemSingle from "../../Items/ItemSingle";

function SectionSingle({ section, index, showMenu, setShowMenu, showEditor, setShowEditor }) {
  const dispatch = useDispatch();

  const handleDelete = (e) => {
    e.preventDefault();
    return dispatch(deleteSection(section.id))
  }

  let buttons;
  if ('section-' + section.id === showMenu) {
    buttons = (
      <div className="section-single-menu">
        <button className="section-single-actions" onClick={handleDelete}>
          <i className="fa-solid fa-trash"></i>
        </button>
        <button className="section-single-actions" onClick={() => setShowEditor('section-' + section.id)}>
          <i className="fa-solid fa-pen"></i>
        </button>
        <button className="section-single-actions" onClick={() => setShowMenu('')}>
          <i className="fa-solid fa-ellipsis"></i>
        </button>
      </div>
    )
  } else {
    buttons = (
      <button className="section-single-actions" onClick={() => setShowMenu('section-' + section.id)}>
        <i className="fa-solid fa-ellipsis"></i>
      </button>
    )
  }

  return (
    <div className="section-single">
      <div className="section-header">
        <p className="section-title">
          {section.title}
        </p>
        {buttons}
      </div>
      <Droppable droppableId={'section-' + section.id}>
        {(provided, snapshot) => {
          let className = "items-holder";
          if (snapshot.isDraggingOver) className += " dragging-over";
          return (
            <div 
              className={className}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {section.orderIds.split(',').map((itemId, index) => {
                if (section.items[`item-${itemId}`]) {
                  return (
                    <ItemSingle 
                      key={`item-${itemId}`}
                      item={section.items[`item-${itemId}`]}
                      index={index}
                    />
                  )
                }
                return null;
              })}
              {provided.placeholder}
            </div>
        )}}
      </Droppable>    
    </div>
  )
}

export default SectionSingle;