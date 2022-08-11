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
            <div className="item-single-text">
              <p className="item-single-title">
                {item.title}
              </p>
              {item.details && (
                <p className="item-single-details">
                  {item.details}
                </p>
              )}
            </div>
          </div>
        )
      }}
    </Draggable>
  )
}

export default ItemSingle;