// External modules
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

// Internal modules
import { createSection } from "../../../../store/section";

function AddSectionForm({ setShowModal, boardId }) {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(createSection({ title, boardId }))
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
    setErrors(newErrors);
  }, [title]);

  return (
    <form className='modal-form' onSubmit={handleSubmit}>
      <h2>
        Add section
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

export default AddSectionForm;