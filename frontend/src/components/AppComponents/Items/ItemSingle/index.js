// External modules
// import { useDispatch } from "react-redux";
import { Draggable } from "react-beautiful-dnd";

// Internal modules

function ItemSingle({ item, index }) {
  return (
    <Draggable
      draggableId={'item-' + item.id}
      index={index}
    >
      {(provided, snapshot) => {
        let className = "item-single";
        if (snapshot.isDragging) className += " dragging";
        return (
          <div className={className}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <p>{item.title}</p>
          </div>
        )
      }}
    </Draggable>
  )
}

export default ItemSingle;