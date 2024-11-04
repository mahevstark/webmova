"use client";
import React, { useState } from "react";
import Modal from "react-modal";

export default function SuccessModal({ modalIsOpen, closeModal }) {
  const [isOpen,setIsOpen]=useState(false);

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={setIsOpen(false)}
      >
     
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal>
    </div>
  );
}
