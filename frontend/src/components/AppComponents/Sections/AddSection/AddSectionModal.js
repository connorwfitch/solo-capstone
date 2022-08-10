// External modules
import React, { useState } from 'react';

// Internal modules
import { Modal } from '../../../../context/Modal';
import AddSectionForm from './AddSectionForm';

function AddSectionModal({ boardId }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='add-section-btn' onClick={() => setShowModal(true)}>
        <i className="fa-solid fa-plus"></i>
        Add section
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddSectionForm setShowModal={setShowModal} boardId={boardId} />
        </Modal>
      )}
    </>
  );
}

export default AddSectionModal;