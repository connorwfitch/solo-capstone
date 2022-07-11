// External modules
import React, { useState } from 'react';

// Internal modules
import { Modal } from '../../../../context/Modal';
import EditListForm from './EditListForm';

function EditListModal({ list }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="sidebar-details" onClick={() => setShowModal(true)} >
        <i className="fa-solid fa-pen"></i>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditListForm setShowModal={setShowModal} list={list} />
        </Modal>
      )}
    </>
  );
}

export default EditListModal;