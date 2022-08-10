// External modules
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

// Internal modules
import { editSection } from "../../../../store/section";

function EditBoardForm({ setShowModal, section }) {
  const dispatch = useDispatch();

  const [title, setTitle] = useState(section.title);
  const [errors, setErrors] = useState([]);


  const handleEdit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(editSection({ sectionId: section.id, title, orderIds: section.orderIds }))
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
    setErrors(newErrors);
  }, [title]);


  return (
    <form className='modal-form'>
      <h2>
        Edit section
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