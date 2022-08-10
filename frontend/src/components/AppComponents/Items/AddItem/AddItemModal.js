// External modules
import React, { useState } from 'react';

// Internal modules
import { Modal } from '../../../../context/Modal';
import AddItemForm from './AddItemForm';

function AddItemModal({ sectionId }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='add-item-btn' onClick={() => setShowModal(true)}>
        <i className="fa-solid fa-plus"></i>
        <p>Add item</p>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddItemForm setShowModal={setShowModal} sectionId={sectionId} />
        </Modal>
      )}
    </>
  );
}

export default AddItemModal;