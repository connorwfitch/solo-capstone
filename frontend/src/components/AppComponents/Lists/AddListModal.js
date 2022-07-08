// External modules
import React, { useState } from 'react';

// Internal modules
import { Modal } from '../../../context/Modal';
import AddListForm from './AddListForm';

function AddListModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='' onClick={() => setShowModal(true)}>
        <i className="fa-solid fa-plus"></i>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddListForm setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default AddListModal;