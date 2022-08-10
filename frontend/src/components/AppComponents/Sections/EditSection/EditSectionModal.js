// External modules
import React, { useState } from 'react';

// Internal modules
import { Modal } from '../../../../context/Modal';
import EditSectionForm from './EditSectionForm';

function EditSectionModal({ section }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="section-single-actions" onClick={() => setShowModal(true)} >
        <i className="fa-solid fa-pen"></i>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditSectionForm setShowModal={setShowModal} section={section} />
        </Modal>
      )}
    </>
  );
}

export default EditSectionModal;