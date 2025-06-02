"use client";
import { useRef, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Paymentsent from "../pop-ups/completed";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import GlobalApi from "@/lib/GlobalApi";
import Cookies from "js-cookie";

export default function Pin({ value, style, request, selectedUser, amount }) {
  const [showExpertise, setShowExpertise] = useState(false);
  const [pin, setPin] = useState(Array(6).fill(""));
  const [paymentData, setPaymentdata] = useState({});

  const toggleExpertise = () => {
    setShowExpertise(!showExpertise);
  };
  const sendPayment = async () => {
    try {
      const data = JSON.parse(localStorage.getItem("userData"));

      const token = Cookies.get("token");

      const formData = {
        fromWalletId: data?.wallet?.id,
        toWalletId: selectedUser.wallet.id,
        amount: amount,
        pin: pin.join(""),
        userId: data?.id,
      };
      console.log("formData", formData);

      const response = await GlobalApi.sendMoney(formData, token);
      console.log("rr", response);

      if (response?.success === true) {
        setShowExpertise(!showExpertise);
        setPaymentdata(response?.data);
      } else {
        toast(response?.message || "Error while sending money");
      }
    } catch (error) {
      console.log("error while Sending money", error);
      toast("Network Error while sending money");
    }
  };
  // Array of refs for each input field
  const inputRefs = Array.from({ length: 6 }, () => useRef(null));

  // Function to handle focus shifting
  const handleInputChange = (e, index) => {
    const { value } = e.target;
    if (/^\d$/.test(value) || value === "") {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);

      // Move to next input
      if (value && index < inputRefs.length - 1) {
        inputRefs[index + 1].current.focus();
      }

      // Move to previous input on backspace
      if (!value && index > 0) {
        inputRefs[index - 1].current.focus();
      }
    }
  };

  return (
    <AlertDialog>
      <Paymentsent
        isOpen={showExpertise}
        closeModal={toggleExpertise}
        request={request}
        paymentData={paymentData}
      />

      <AlertDialogTrigger asChild>
        <Button variant="outline" className={style}>
          {value}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="w-auto">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center font-semibold">
            Pin Required
          </AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground text-center">
            Enter your PIN to continue.
          </AlertDialogDescription>

          <div className="flex gap-3" style={{ marginTop: "25px" }}>
            {inputRefs.map((ref, index) => (
              <span key={index}>
                <input
                  ref={ref}
                  type="text"
                  className="opt focus:outline-none text-black"
                  maxLength={1}
                  onChange={(e) => handleInputChange(e, index)}
                />
              </span>
            ))}
          </div>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogAction
            onClick={sendPayment}
            className="button-background text-white font-semibold border rounded-lg w-40 mt-4 mx-auto no-hover"
            style={{ width: "130px" }}
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
