"use client";
import Layout from "../../../components/layout/layout";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BillPaymentPopup from "../../../pop-ups/bill-payment-details";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const paymentDetails = {
  senderName: "Miran Butt",
  receiverName: "Hanif Ali",
  receiverAccountType: "Mowa",
  amountToSend: 439,
  serviceFee: 2,
};
export default function billpayment() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);
  const [formData, setFormData] = useState({
    amount: "",
    accountNumber: "",
    bankName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handlePay = () => {
    setIsPopupOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };
  var page = "Dashboard";

  return (
    <Layout page={page}>
      <div className="px-11">
        <BillPaymentPopup
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
          onPay={handlePay}
          details={paymentDetails}
        />

        <div className="flex gap-2 items-center mb-4 ">
          {" "}
          <Link href="/">
            {" "}
            <ArrowLeft />
          </Link>
          <h1 className="text-lg md:text-2xl font-semibold">Bill Payment</h1>
        </div>
        <p className="text-gray-600 mb-6 text-sm">
          Bill Payment lets you easily pay your bills anytime, anywhere. Whether
          it’s electricity, water, internet, or credit cards, just select your
          bill, enter the amount, and pay securely with a few taps.
        </p>
        <div>
          <form
            onSubmit={handleSubmit}
            className="space-y-6 w-full max-w-xl mx-auto border shadow-md px-12 py-5 rounded-md"
          >
            <div>
              <h2 className="text-lg font-semibold mb-5">Enter Bill Details</h2>
            </div>
            <div>
              <label
                htmlFor="accountNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Bill Number
              </label>
              <Input
                type="text"
                placeholder="Enter Account Number"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-0 focus:border-0 mt-2"
              />
            </div>
            <p className="text-sm w-72 text-gray-600 pb-8">
              Please enter your bill details carefully to ensure a smooth and
              accurate payment process.
            </p>
            <Button
              type="submit"
              onClick={handleOpenPopup}
              className="button-background hover:bg- text-white font-semibold border rounded-lg w-full "
            >
              NEXT
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
