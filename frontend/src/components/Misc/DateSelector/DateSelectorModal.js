// External modules
import React, { useState } from 'react';

// Internal modules
import { Modal } from '../../../context/Modal';
import DateSelector from '.';
import dateUtil from '../DateUtil';


function DateSelectorModal({ dueAt, setDueAt }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button 
        className="date-selector-btn" 
        type='button'
        onClick={(e) => {
          e.preventDefault();
          setShowModal(true);
        }}
      >
        <i className="fa-regular fa-calendar"></i>
        {dueAt ? dueAt.toString() : 'Due date'}
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DateSelector 
            setShowModal={setShowModal}
            dueAt={dueAt} 
            setDueAt={setDueAt}
          />
        </Modal>
      )}
    </>
  );
}

export default DateSelectorModal;