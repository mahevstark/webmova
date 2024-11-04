'use client';
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
import Paymentsent from '../pop-ups/completed';
import { Button } from "@/components/ui/button";

const details = {
  senderName: "John Doe",
  receiverName: "Jane Smith",
  receiverAccountType: "Savings",
  amountSent: 500,
  serviceFee: 15,
  title:"Request Send for $5k"
};

export default function Pin({ value, style ,request}) {
  const [showExpertise, setShowExpertise] = useState(false);
  const toggleExpertise = () => setShowExpertise(!showExpertise);


  // Array of refs for each input field
  const inputRefs = Array.from({ length: 6 }, () => useRef(null));

  // Function to handle focus shifting
  const handleInputChange = (e, index) => {
    const { value } = e.target;
    
    // Move to the next input if value is entered
    if (value && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }
    // Move to the previous input on backspace if value is empty
    else if (!value && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  return (
    <AlertDialog>
      <Paymentsent isOpen={showExpertise} closeModal={toggleExpertise} details={details} request={request} />

      <AlertDialogTrigger asChild>
        <Button variant="outline" className={style}>{value}</Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="w-auto">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center font-semibold">Pin Required</AlertDialogTitle>
          <AlertDialogDescription style={{ width: '257px' }} className="text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </AlertDialogDescription>

          <div className="flex gap-3" style={{ marginTop: '25px' }}>
            {inputRefs.map((ref, index) => (
              <span key={index}>
                <input
                  ref={ref}
                  type="text"
                  className="opt focus:outline-none"
                  maxLength={1}
                  onChange={(e) => handleInputChange(e, index)}
                />
              </span>
            ))}
          </div>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogAction
            onClick={toggleExpertise}
            className="button-background text-white font-semibold border rounded-lg w-40 mt-4 mx-auto no-hover"
            style={{ width: '130px' }}
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
