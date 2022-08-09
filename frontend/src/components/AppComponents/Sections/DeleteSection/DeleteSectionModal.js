// External modules
import React, { useState } from 'react';

// Internal modules
import { Modal } from '../../../../context/Modal';
import DeleteSectionForm from './DeleteSectionForm';

function DeleteSectionModal({ section }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="section-single-actions" onClick={() => setShowModal(true)} >
        <i className="fa-solid fa-trash"></i>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteSectionForm setShowModal={setShowModal} section={section} />
        </Modal>
      )}
    </>
  );
}

export default DeleteSectionModal;