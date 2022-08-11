// External modules
// import { useDispatch } from "react-redux";
import { Draggable, Droppable } from "react-beautiful-dnd";

// Internal modules
import ItemSingle from "../../Items/ItemSingle";
import DeleteSectionModal from "../DeleteSection/DeleteSectionModal";
import EditSectionModal from "../EditSection/EditSectionModal";
import AddItemModal from "../../Items/AddItem/AddItemModal";

function SectionSingle({ section, index, showMenu, setShowMenu }) {

  let buttons;
  if ('section-' + section.id === showMenu) {
    buttons = (
      <div className="section-single-menu">
        <DeleteSectionModal section={section}/>
        <EditSectionModal section={section}/>
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
    <Draggable 
      draggableId={'section-' + section.id}
      index={index}
    >
      {(provided) => (
        <div 
          className="section-single"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div 
            className="section-header"
            {...provided.dragHandleProps}
          >
            <p className="section-title">
              {section.title}
            </p>
            {buttons}
          </div>
          <AddItemModal sectionId={section.id} />
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
                          showMenu={showMenu}
                          setShowMenu={setShowMenu}
                        />
                      )
                    }
                    return null;
                  })}
                  {provided.placeholder}
                </div>
              )
            }}
          </Droppable>
        </div>
      )}
    </Draggable>
  )
}

export default SectionSingle;