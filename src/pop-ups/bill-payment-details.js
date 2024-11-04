"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Billpaid from "./bill-paid-details";

const bill = {
  senderName: "ubaid",
  receiverName: "ubaid",
  billid: 123,
  receiverAccountType: "MTN",
  date: "12 march 2023",
  time: "05:25 PM",
  amountSent: 500,
  serviceFee: 0,
};

export default function Bilpayments({ details, isOpen, onClose, onPay }) {
  const [showBillpaid, setShowBillpaid] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowBillpaid(false); // Reset `showBillpaid` when the main modal opens
    }
  }, [isOpen]);

  const handleClose = () => {
    setShowBillpaid(false);
    onClose(); // Close the parent modal
  };

  const handlePay = () => {
    if (onPay) onPay(); // Optional: trigger the parent onPay function if necessary
    setShowBillpaid(true); // Show the Billpaid dialog
  };

  if (!isOpen && !showBillpaid) return null;

  return (
    <>
      {showBillpaid ? (
        <Billpaid
          isOpen={showBillpaid}
          closeModal={() => setShowBillpaid(false)}
          bill={bill}
        />
      ) : (
        <div
          className="fixed inset-0 cls bg-black bg-opacity-50 flex items-center justify-center p-4 transition-opacity duration-300"
        >
          <Card className="w-full max-w-sm mx-auto bg-white">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-xl font-semibold">Bill Payment Details</CardTitle>
              <p className="text-sm text-gray-600 text-left">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed gravida mi id purus
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-black font-normal">Sender Name</span>
                  <span className="text-black font-normal">{details.senderName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-black font-normal">Receiver Name</span>
                  <span className="text-black font-normal">{details.receiverName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-black font-normal">Receiver Account Type</span>
                  <span className="text-black font-normal">{details.receiverAccountType}</span>
                </div>
                <div>
                  <p className="line-color">
                    ---------------------------------------------------
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-black font-normal">Amount to send</span>
                  <span className="text-black font-normal">${details.amountToSend}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-black font-normal">Service Fee</span>
                  <span className="text-black font-normal">${details.serviceFee}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="grid grid-cols-2 gap-4">
              <button
                onClick={handleClose}
                className="button-border btn-txt-color w-full text-white font-semibold border rounded-lg mt-4 mx-auto p-2 no-hover"
              >
                CANCEL
              </button>
              <button
                onClick={handlePay}
                className="button-background text-white font-semibold border rounded-lg w-full mt-4 mx-auto no-hover p-2"
              >
                PAY
              </button>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
}
