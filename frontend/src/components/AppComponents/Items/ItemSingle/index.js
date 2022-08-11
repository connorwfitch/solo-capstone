// External modules
import { useDispatch } from "react-redux";
import { Draggable } from "react-beautiful-dnd";

// Internal modules
import { deleteItem } from "../../../../store/section";


function ItemSingle({ item, index, showMenu, setShowMenu }) {
  const dispatch = useDispatch();
  
  const handleDelete = (e) => {
    e.preventDefault();
    return dispatch(deleteItem(item.id))
  }
  
  let buttons;
  if ('item-' + item.id === showMenu) {
    buttons = (
      <div className="item-single-menu">
        <button className="item-single-actions" onClick={handleDelete}>
          <i className="fa-solid fa-trash"></i>
        </button>
        {/* <EditItemModal item={item} /> */}
        <button className="item-single-actions" onClick={() => setShowMenu('')}>
          <i className="fa-solid fa-ellipsis"></i>
        </button>
      </div>
    )
  } else {
    buttons = (
      <button className="item-single-actions" onClick={() => setShowMenu('item-' + item.id)}>
        <i className="fa-solid fa-ellipsis"></i>
      </button>
    )
  }
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
            {buttons}
          </div>
        )
      }}
    </Draggable>
  )
}

export default ItemSingle;