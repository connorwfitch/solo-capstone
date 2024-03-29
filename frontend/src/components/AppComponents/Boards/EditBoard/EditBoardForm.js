// External modules
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

// Internal modules
import { editBoard } from "../../../../store/board";
import ColorSelector from "../../../Misc/ColorSelector";

function EditBoardForm({ setShowModal, board }) {
  const dispatch = useDispatch();

  const [title, setTitle] = useState(board.title);
  const [color, setColor] = useState(board.color);
  const [errors, setErrors] = useState([]);


  const handleEdit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(editBoard({ boardId: board.id, title, color, orderIds: board.orderIds }))
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      )
      .then(
        (out) => {
          if (out === 'Success') setShowModal(false)
        }
      );
  };

  useEffect(() => {
    const newErrors = [];
    if (!title.length) newErrors.push('Must include a title.')
    if (title.length > 50) newErrors.push('Title may be at most 50 characters long.')
    if (title === 'Inbox') newErrors.push('May not name board \'Inbox\'')
    setErrors(newErrors);
  }, [title]);


  return (
    <form className='modal-form'>
      <h2>
        Edit board
      </h2>
      {errors.length > 0 && <ul className="errors">
        {errors.map((error, i) => (
          <li key={i}>{error}</li>
        ))}
      </ul>}
      <label>
        Title
        <input
          type="text"
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Title (required)'
          required
        />
      </label>
      <label>
        Color
        <ColorSelector
          defaultVal={color}
          setColor={setColor}
        />
      </label>
      <button
        className="btn-large btn-red"
        type="submit"
        onClick={handleEdit}
        disabled={errors.length}
      >
        Submit
      </button>
      <button
        className="btn-large btn-white"
        type='button'
        onClick={(e) => {
          e.preventDefault();
          setShowModal(false);
        }}
      >
        Cancel
      </button>
    </form>
  );
};

export default EditBoardForm;