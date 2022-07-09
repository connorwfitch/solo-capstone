// External modules
import React, { useState } from 'react';

// Internal modules
import { Modal } from '../../../../context/Modal';
import DeleteListForm from './DeleteListForm';

function DeleteListModal({ list }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="sidebar-details" onClick={() => setShowModal(true)} >
        <i className="fa-solid fa-trash"></i>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteListForm setShowModal={setShowModal} list={list} />
        </Modal>
      )}
    </>
  );
}

export default DeleteListModal;