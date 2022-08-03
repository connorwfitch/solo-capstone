// External modules
import React, { useState } from 'react';

// Internal modules
import { Modal } from '../../../../context/Modal';
import DeleteBoardForm from './DeleteBoardForm';

function DeleteBoardModal({ board }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="sidebar-details" onClick={() => setShowModal(true)} >
        <i className="fa-solid fa-trash"></i>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteBoardForm setShowModal={setShowModal} board={board} />
        </Modal>
      )}
    </>
  );
}

export default DeleteBoardModal;