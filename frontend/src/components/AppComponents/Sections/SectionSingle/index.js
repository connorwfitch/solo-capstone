// External modules
// import { useDispatch } from "react-redux";
import { Droppable } from "react-beautiful-dnd";
import ItemSingle from "../../Items/ItemSingle";

// Internal modules

function SectionSingle({ section, index }) {
  return (
    <div className="section-single">
      <p className="section-title">
        {section.title}
      </p>
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