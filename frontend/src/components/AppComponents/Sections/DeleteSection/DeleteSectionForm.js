// External modules
import React from "react";
import { useDispatch } from "react-redux";

// Internal modules
import { deleteSection } from "../../../../store/section";

function DeleteSectionForm({ setShowModal, section }) {
  const dispatch = useDispatch();

  const handleDelete = (e) => {
    e.preventDefault();
    return dispatch(deleteSection(section.id))
  }

  return (
    <form className='modal-form'>
      <h2>
        Confirm delete
      </h2>
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
}

export default DeleteSectionForm;