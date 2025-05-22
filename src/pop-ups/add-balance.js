"use client";
import React, { useState, useEffect, use } from "react";
import Modal from "react-modal";
import Paymentsent from "../pop-ups/completed";
import GlobalApi from "@/lib/GlobalApi";
import Cookies from "js-cookie";
import { toast } from "sonner";

const details = {
  senderName: "John Doe",
  receiverName: "Jane Smith",
  receiverAccountType: "Savings",
  billid: 12,
  date: "13 March 2024",
  time: "05:28 PM",
  amountSent: 500,
  serviceFee: 15,
};

const AddBalance = ({
  isOpen,
  onRequestClose,
  onAddBalance,
  appElement,
  employee,
}) => {
  const [amount, setAmount] = useState("");
  const [showExpertise, setShowExpertise] = useState(false);
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [pin, setPin] = useState(["", "", "", "", "", ""]);
  const [pinError, setPinError] = useState("");
  const [loading, setloading] = useState(false);

  useEffect(() => {
    if (appElement) {
      Modal.setAppElement(appElement);
    }
  }, [appElement]);

  // Handle toggling of Paymentsent modal
  const toggleExpertise = () => {
    setShowExpertise(!showExpertise);
  };

  // Handle first step - validate amount and show PIN modal
  const handleConfirmAmount = () => {
    const numAmount = parseFloat(amount);
    if (amount && !isNaN(numAmount) && numAmount > 0) {
      // Open PIN verification modal
      onRequestClose();
      setIsPinModalOpen(true);
    } else {
      toast("Enter a Valid Amount ");
    }
  };

  // Handle PIN input change
  const handlePinChange = (index, value) => {
    // Only allow numbers
    if (value === "" || /^[0-9]$/.test(value)) {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);

      // Auto-focus next input field
      if (value !== "" && index < 5) {
        document.getElementById(`pin-input-${index + 1}`).focus();
      }
    }
  };

  // Process the actual balance addition after PIN verification
  const handleAddBalance = async () => {
    // Check if PIN is complete
    if (pin.join("").length !== 6) {
      setPinError("Please enter a complete 4-digit PIN");
      return;
    }
    setloading(true);

    try {
      const login_data = JSON.parse(localStorage.getItem("userData"));
      const token = Cookies.get("token");

      const formData = {
        fromWalletId: login_data.wallet.id,
        walletId: employee.wallet.id,
        toWalletId: employee.wallet.id,
        amount: parseInt(amount),
        pin: pin.join(""),
        userId: login_data?.id,
      };

      const response = await GlobalApi.addBalance(formData, token);

      if (response?.success === true) {
        // Close PIN modal
        setIsPinModalOpen(false);

        // Reset states
        setAmount("");
        setPin(["", "", "", "", "", ""]);
        setPinError("");
        handleClosePinModal();
        // Close main modal
        onRequestClose();
        toast("Balance added Successfully");
        setloading(false);

        // Notify parent component
        onAddBalance(parseInt(amount));
      } else {
        toast(response?.message || "Error while adding balance");

        setloading(false);

        setPinError(
          response?.message ||
            "Transaction failed. Please check your PIN and try again."
        );
        setAmount("");
        setPin(["", "", "", "", "", ""]);
        setPinError("");

        handleClosePinModal();

        onRequestClose();
      }
    } catch (error) {
      console.log("error while adding balance", error);

      setAmount("");
      setPin(["", "", "", "", "", ""]);
      setPinError("");
      handleClosePinModal();

      // Close main modal
      onRequestClose();
      toast("Network Error");
      setloading(false);
    }
  };

  // Close PIN modal
  const handleClosePinModal = () => {
    setIsPinModalOpen(false);
  };

  return (
    <>
      {/* Main Amount Entry Modal */}
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        ariaHideApp={false}
        contentLabel="Add Balance"
        className="fixed inset-0 flex items-center justify-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-[100]"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-12 sm:w-64">
          <h2 className="text-xl font-semibold text-center mb-4">
            Add Balance
          </h2>
          <p className="custom-p-color mb-6" style={{ width: "340px" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <span
            className="block mx-auto"
            style={{ width: "100%", paddingLeft: "32px" }}
          >
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
              onClick={handleConfirmAmount}
              className="flex-1 px-4 py-2 btn-backg text-white rounded-md"
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>

      {/* PIN Verification Modal */}
      <Modal
        isOpen={isPinModalOpen}
        onRequestClose={handleClosePinModal}
        ariaHideApp={false}
        contentLabel="Verify PIN"
        className="fixed inset-0 flex items-center justify-center z"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z "
      >
        <div className="bg-white p-6 rounded-lg shadow-lg ">
          <h2 className="text-xl font-semibold text-center mb-4">
            Security Verification
          </h2>
          <p className="text-center mb-6">
            Please enter your 4-digit PIN to complete this transaction
          </p>

          <div className="flex justify-center gap-3 mb-4">
            {pin.map((digit, index) => (
              <input
                key={index}
                id={`pin-input-${index}`}
                type="password"
                value={digit}
                onChange={(e) => handlePinChange(index, e.target.value)}
                maxLength={1}
                className=" border rounded-md text-center w-9 h-9"
              />
            ))}
          </div>

          {pinError && (
            <p className="text-red-500 text-center mb-4">{pinError}</p>
          )}

          <div className="flex gap-4 mt-4">
            <button
              onClick={handleClosePinModal}
              className="flex-1 px-2 py-2 border btn-border rounded text-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={handleAddBalance}
              className="flex-1 px-2 py-2 btn-backg text-white rounded-md"
            >
              {loading ? "Almost there..." : "Add Balance"}
            </button>
          </div>
        </div>
      </Modal>

      {/* Payment Success Modal */}
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
// "use client";
// import React, { useState, useEffect } from "react";
// import Modal from "react-modal";
// import Paymentsent from "../pop-ups/completed";
// import GlobalApi from "@/lib/GlobalApi";
// import { toast } from "sonner";

// const details = {
//   senderName: "John Doe",
//   receiverName: "Jane Smith",
//   receiverAccountType: "Savings",
//   billid: 12,
//   date: "13 March 2024",
//   time: "05:28 PM",
//   amountSent: 500,
//   serviceFee: 15,
// };

// const AddBalance = ({
//   isOpen,
//   onRequestClose,
//   onAddBalance,
//   appElement,
//   employee,
// }) => {
//   const [amount, setAmount] = useState("");
//   const [showExpertise, setShowExpertise] = useState(false);

//   useEffect(() => {
//     if (appElement) {
//       Modal.setAppElement(appElement);
//     }
//   }, [appElement]);

//   // Handle toggling of Paymentsent modal
//   const toggleExpertise = () => {
//     setShowExpertise(!showExpertise);
//   };

//   // Handle adding balance and opening Paymentsent modal
//   const handleAddBalance = () => {
//     const numAmount = parseFloat(amount);
//     if (amount && !isNaN(numAmount)) {
//       onAddBalance(numAmount);
//       addbalance();
//     } else {
//       alert("Please enter a valid amount");
//     }
//   };

//   // console.log("employee", employee);

//   const addbalance = async () => {
//     try {
//       const login_data = JSON.parse(localStorage.getItem("userData"));

//       console.log("login data", employee);

//       const formData = {
//         fromWalletId: login_data.wallet.id,
//         walletId: employee.wallet.id,
//         toWalletId: employee.wallet.id,
//         amount: parseInt(amount),
//         pin: pin.join(""),
//         userId: login_data?.id,
//       };

//       const response = await GlobalApi.addBalance(formData, token);
//       console.log("balnce user", response);

//       if (response?.success === true) {
//         setAmount("");
//         onRequestClose();
//         // toggleExpertise();
//         toast("Balance Added Successfully");
//       } else {
//         setAmount("");
//         onRequestClose();
//         toast(response?.message || "Error while adding balance");

//         toggleExpertise();
//       }
//     } catch (error) {
//       console.log("error while adding balance", error);
//       setAmount("");
//       onRequestClose();
//       toggleExpertise();
//       toast("Network Error");
//     }
//   };

//   return (
//     <>
//       <Modal
//         isOpen={isOpen}
//         onRequestClose={onRequestClose}
//         ariaHideApp={false}
//         contentLabel="Add Balance"
//         className="fixed inset-0 flex items-center justify-center"
//         overlayClassName="fixed inset-0 bg-black bg-opacity-50"
//       >
//         <div className="bg-white p-6 rounded-lg shadow-lg w-12 sm:w-64">
//           <h2 className="text-xl font-semibold text-center mb-4">
//             Add Balance
//           </h2>
//           <p className="custom-p-color mb-6" style={{ width: "340px" }}>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//           </p>
//           <span
//             className="block mx-auto"
//             style={{ width: "100%", paddingLeft: "32px" }}
//           >
//             <input
//               style={{ background: "#EBEBF0" }}
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//               placeholder="Enter Amount"
//               className="w-full pb-12 custom-p-color mx-auto c-input text-center pt-4 focus:outline-none mb-6 border rounded-lg bg-gray-100"
//             />
//           </span>
//           <div className="flex gap-4">
//             <button
//               onClick={onRequestClose}
//               className="flex-1 px-4 py-2 border btn-border rounded text-gray-700"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleAddBalance}
//               className="flex-1 px-4 py-2 btn-backg text-white rounded-md"
//             >
//               Confirm
//             </button>
//           </div>
//         </div>
//       </Modal>

//       {/* Paymentsent Modal */}
//       <Paymentsent
//         isOpen={showExpertise}
//         closeModal={toggleExpertise}
//         details={details}
//         request={"balance"}
//       />
//     </>
//   );
// };

// export default AddBalance;
