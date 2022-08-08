// External modules
import { useDispatch } from "react-redux";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import ItemSingle from "../../Items/ItemSingle";

// Internal modules

function SectionSingle({ section, index }) {
  return (
    <div className="section-single">
      <p className="section-title">
        {section.title + section.id}
      </p>
      <Droppable droppableId={'section-' + section.id}>
        {(provided) => (
          <div 
            className="items-holder"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {section.orderIds.split(',').map((itemId, index) => {
              if (section.items[itemId]) {
                return (
                  <ItemSingle 
                    key={`item-${itemId}`}
                    item={section.items[itemId]}
                    index={index}
                  />
                )
              }
              return null;
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>    
    </div>
  )
}

export default SectionSingle;