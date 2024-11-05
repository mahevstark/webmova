"use client";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Paymentsent from '../pop-ups/completed';

const details = {
    senderName: "John Doe",
    receiverName: "Jane Smith",
    receiverAccountType: "Savings",
    billid:12,
    date:"13 March 2024",
    time:"05:28 PM",
    amountSent: 500,
    serviceFee: 15,
   
};

const AddBalance = ({ isOpen, onRequestClose, onAddBalance, appElement }) => {
  const [amount, setAmount] = useState("");
  const [showExpertise, setShowExpertise] = useState(false);

  useEffect(() => {
    if (appElement) {
      Modal.setAppElement(appElement);
    }
  }, [appElement]);

  // Handle toggling of Paymentsent modal
  const toggleExpertise = () => {
    setShowExpertise(!showExpertise);
  };

  // Handle adding balance and opening Paymentsent modal
  const handleAddBalance = () => {
    const numAmount = parseFloat(amount);
    if (amount && !isNaN(numAmount)) {
      onAddBalance(numAmount);
      setAmount("");
      onRequestClose();  // Close AddBalance modal
      toggleExpertise();  // Open Paymentsent modal
    } else {
      alert("Please enter a valid amount");
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        ariaHideApp={false}
        contentLabel="Add Balance"
        className="fixed inset-0 flex items-center justify-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-12 sm:w-64">
          <h2 className="text-xl font-semibold text-center mb-4">
            Add Balance
          </h2>
          <p className="custom-p-color mb-6" style={{ width: '340px' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <span className="block mx-auto" style={{ width: '100%', paddingLeft: '32px' }}>
            <input
              style={{ background: "#EBEBF0" }}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter Amount"
              className="w-full pb-12 custom-p-color mx-auto c-input text-center pt-4 focus:outline-none mb-6 border rounded-lg bg-gray-100"
            />
          </span>
          <div className="flex gap-4">
            <button
              onClick={onRequestClose}
              className="flex-1 px-4 py-2 border btn-border rounded text-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={handleAddBalance}
              className="flex-1 px-4 py-2 btn-backg text-white rounded-md"
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>

      {/* Paymentsent Modal */}
      <Paymentsent
        isOpen={showExpertise}
        closeModal={toggleExpertise}
        details={details}
        request={"balance"}
      />
    </>
  );
};

export default AddBalance;
