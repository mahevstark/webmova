"use client";

import { useState ,useEffect} from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import InfoModal from "./info";

export default function DeleteConfirmation({
  isOpen,
  onClose,
  onDelete,
  setIsOpen,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    // Perform the delete action
    onDelete(); 
    handleOpenModal(); // Open InfoModal after deletion

    // Automatically close the InfoModal after 3 seconds
    setTimeout(() => {
      handleCloseModal(); 
      onClose(); // Close DeleteConfirmation after InfoModal closes
    }, 1000);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div
          className={`fixed inset-0 cls bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
          onClick={onClose} // Clicking on the overlay will close the popup
        >
          <div
            className="bg-white rounded-lg max-w-md"
            onClick={(e) => e.stopPropagation()} // Prevents overlay click from closing the popup
          >
            <Card className="shadow-none border-none">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-center shadow-none">
                  Delete Employee
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-p font-medium">
                  Are you sure that you want to delete your member? If you
                  delete, then Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit.
                </p>
              </CardContent>
              <CardFooter className="flex justify-center gap-4 mt-4">
                <button
                  variant="outline"
                  onClick={onClose}
                  className="btn-border btn-txt-color w-80 text-white font-semibold border rounded-lg mt-4 mx-auto p-2 no-hover"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete} // Call handleDelete to perform the deletion
                  className="button-background text-white w-80 font-semibold border rounded-lg mt-4 mx-auto p-2 no-hover"
                >
                  Delete Member
                </button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
      <InfoModal
        open={isModalOpen} // Controls visibility based on isModalOpen state
        onClose={handleCloseModal} // Close modal when InfoModal triggers onClose
        title={"Employee Deleted"}
      />
    </>
  );
}
