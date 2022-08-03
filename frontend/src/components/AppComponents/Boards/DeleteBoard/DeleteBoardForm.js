// External modules
import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

// Internal modules
import { deleteBoard } from "../../../../store/board";

function DeleteBoardForm({ setShowModal, board }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDelete = (e) => {
    e.preventDefault();
    return dispatch(deleteBoard(board.id)).then(history.push('/app'));
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

export default DeleteBoardForm;