"use client";

import * as React from "react";
import { Button } from "../components/ui/button";
import Paymentsent from "../pop-ups/completed";
import { useState } from "react";

const details = {
  senderName: "John Doe",
  receiverName: "Jane Smith",
  receiverAccountType: "Savings",
  amountSent: 500,
  serviceFee: 15,
  title: "Request Send for $5k",
};
export default function PaymentRequestPopup({
  isOpen,
  onClose,

  onDecline,
  data = {
    senderName: "Miran Butt",
    receiverName: "Hanif Ali",
    receiverAccountType: "Mowa",
    amount: 439,
    serviceFee: 2,
  },
}) {
  if (!isOpen) return null;

  const [showExpertise, setShowExpertise] = useState(false);
  const toggleExpertise = () => {
    setShowExpertise(true); // Show the Paymentsent popup
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <Paymentsent
        isOpen={showExpertise}
        closeModal={toggleExpertise}
        details={details}
      />

      <div
        className="fixed inset-0  bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-lg p-6 custom-w shadow-lg mx-4 ">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-center text-black">
            Payment Request Details
          </h2>

          <p className="custom-p-color">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed gravida
            mi id purus
          </p>

          <div className="space-y-4 py-2 " style={{ marginTop: "40px" }}>
            <div className="flex justify-between items-center">
              <span className="text-black">Sender Name</span>
              <span className="text-black">Miran Butt</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-black">Receiver Name</span>
              <span className="font-medium">Hanif Ali</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-black">Receiver Account Type</span>
              <span className="font-medium">Mowa</span>
            </div>

            <div className="h-px bg-gray-200 my-2" />

            <div className="flex justify-between items-center">
              <span className="text-black">Amount to send</span>
              <span className="font-medium">${data.amount}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-black">Service Fee</span>
              <span className="font-medium">${data.serviceFee}</span>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              variant="outline"
              className="button-border  btn-txt-color w-full text-white font-semibold border rounded-lg mt-4 mx-auto p-2 no-hover"
              onClick={onDecline}
            >
              DECLINE
            </Button>
            <Button
              className="button-background text-white w-full font-semibold border rounded-lg mt-4 mx-auto p-2 no-hover"
              onClick={toggleExpertise}
            >
              APPROVE
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
