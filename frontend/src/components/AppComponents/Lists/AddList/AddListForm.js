// External modules
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Internal modules
import { createList } from "../../../../store/list";
import ColorSelector from "../../../Misc/ColorSelector";

function AddListForm({ setShowModal }) {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [color, setColor] = useState("#E44332");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(createList({ title, color, userId: user.id }))
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
    if (title.length > 50) newErrors.push('Title may be at most 50 characters long.')
    if (title === 'Inbox') newErrors.push('May not name list \'Inbox\'')
    setErrors(newErrors);
  }, [title]);
  
  return (
    <form className='modal-form' onSubmit={handleSubmit}>
      <h2>
        Add list
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
        type="submit" 
        className="btn-large btn-red"
        disabled={errors.length}
      >
        Add
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