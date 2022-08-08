// External modules
import { useDispatch } from "react-redux";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

// Internal modules

function SectionSingle({ section, index }) {
  return (
    <Draggable draggableId={"section"+section.id} index={index}>
      {(provided) => {
        <div
          className="section-single"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          innerRef={provided.innerRef}
        >
          <p className="section-title">
            {section.title + section.id}
          </p>
          <Droppable droppableId={section.id}>
            {(provided) => (
              <div 
                className="items-holder"
                innerRef={provided.innerRef}
                {...provided.droppableProps}
              >
                {}
                {provided.placeholder}
              </div>
            )}
          </Droppable>    
        </div>
      }}
    </Draggable>
  )
}

export default SectionSingle;