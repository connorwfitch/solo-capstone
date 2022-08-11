// External modules
import React, { useState } from 'react';

// Internal modules
import { Modal } from '../../../../context/Modal';
import EditItemForm from './EditItemForm';

function EditItemModal({ item }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="item-single-actions" onClick={() => setShowModal(true)} >
        <i className="fa-solid fa-ellipsis"></i>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditItemForm setShowModal={setShowModal} item={item} />
        </Modal>
      )}
    </>
  );
}

export default EditItemModal;