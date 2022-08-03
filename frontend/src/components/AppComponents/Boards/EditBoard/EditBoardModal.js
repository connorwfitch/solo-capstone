// External modules
import React, { useState } from 'react';

// Internal modules
import { Modal } from '../../../../context/Modal';
import EditBoardForm from './EditBoardForm';

function EditBoardModal({ board }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="sidebar-details" onClick={() => setShowModal(true)} >
        <i className="fa-solid fa-pen"></i>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditBoardForm setShowModal={setShowModal} board={board} />
        </Modal>
      )}
    </>
  );
}

export default EditBoardModal;