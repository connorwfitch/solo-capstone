// External modules
import React, { useState } from 'react';

// Internal modules
import { Modal } from '../../../../context/Modal';
import AddBoardForm from './AddBoardForm';

function AddBoardModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='sidebar-btn' onClick={() => setShowModal(true)}>
        <i className="fa-solid fa-plus"></i>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddBoardForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default AddBoardModal;