// External modules
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

// Internal modules
import { deleteItem, editItem } from "../../../../store/section";

function EditBoardForm({ setShowModal, item }) {
  const dispatch = useDispatch();

  const [title, setTitle] = useState(item.title);
  const [details, setDetails] = useState(item.details ? item.details : '');
  const [errors, setErrors] = useState([]);


  const handleDelete = (e) => {
    e.preventDefault();
    return dispatch(deleteItem(item.id))
  }

  const handleEdit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(editItem({ title, details, itemId: item.id }))
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
    if (details.length > 500) newErrors.push('Details may be at most 500 characters long.')
    setErrors(newErrors);
  }, [title, details]);


  return (
    <form className='modal-form'>
      <h2>
        Edit item
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
        Details
        <textarea
          className='item-add-details'
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder='Details'
          rows="3"
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
        className="btn-large btn-red"
        type="submit"
        onClick={handleDelete}
      >
        Delete
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