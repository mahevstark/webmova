"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import InfoModal from "./info";
import Callicon from '../assets/call-icon.svg'


export default function addemployee({
  isOpen,
  onClose,
  onDelete,
  setIsOpen,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    
    onDelete(); 
    handleOpenModal(); 

   
    setTimeout(() => {
      handleCloseModal(); 
      onClose(); 
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
          onClick={onClose} 
        >
          <div
            className="bg-white rounded-lg " style={{width:'387px'}}
            onClick={(e) => e.stopPropagation()} 
          >
            <Card className="shadow-none border-none">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-center shadow-none">
                Add Employee
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-p font-medium">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                </p>
                <div className="mt-4">
              <label htmlFor="phone" className="sr-only">Phone Number</label>
              <span className="flex items-center gap-2 border border-color-input rounded-md px-3 py-2 md:px-4 md:py-2 w-full">
                <Callicon />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="w-full focus:outline-none focus:ring-0 border-0 text-gray-400"
                  placeholder="Enter Your Number"
                />
              </span>
            </div>
              </CardContent>
              <CardFooter className="flex justify-center gap-4 px-12">
                <button
                  variant="outline"
                  onClick={onClose}
                  className="btn-border btn-txt-color w-80 text-white font-semibold border rounded-lg mt-4 mx-auto p-2 no-hover hover:bg-inherit"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete} // Call handleDelete to perform the deletion
                  className="button-background text-white w-80 font-semibold border rounded-lg mt-4 mx-auto p-2 no-hover" 
                >
                 Invite
                </button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
      <InfoModal
        open={isModalOpen} // Controls visibility based on isModalOpen state
        onClose={handleCloseModal} // Close modal when InfoModal triggers onClose
        title={"Invitation Sent"}
      />
    </>
  );
}
