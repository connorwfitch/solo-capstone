// External modules
import { useDispatch } from "react-redux";
import { Draggable } from "react-beautiful-dnd";

// Internal modules

function ItemSingle({ item, index }) {
  return (
    <Draggable
      draggableId={'item' + item.id}
      index={index}
    >
      {(provided) => {
        return (
          <div className="item-single"
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