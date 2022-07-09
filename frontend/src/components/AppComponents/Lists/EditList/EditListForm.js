// External modules
import React, { useState } from "react";
import { useDispatch } from "react-redux";

// Internal modules
import { editList } from "../../../../store/list";
import ColorSelector from "../../../Misc/ColorSelector";

function AddListForm({ setShowModal, list }) {
  const dispatch = useDispatch();

  const [title, setTitle] = useState(list.title);
  const [color, setColor] = useState(list.color);
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(editList({ listId: list.id, title, color }))
      .then(setShowModal(false))
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
  };

  return (
    <form className='modal-form' >
      <h2>
        Edit list
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
        type="button"
        className="btn-large btn-red"
        onClick={(e) => handleSubmit(e)}
      >
          Edit
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

export default AddListForm;