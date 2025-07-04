"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import InfoModal from "./info";
import GlobalApi from "@/lib/GlobalApi";
import Cookies from "js-cookie";
import { useTranslations } from "next-intl";

export default function DeleteConfirmation({
  isOpen,
  onClose,
  onDelete,
  selectedEmployee,
  Role,
}) {
  console.log("rr", Role);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setloading] = useState(false);
  console.log("selectedEmployee", selectedEmployee);

  const handleDelete = async () => {
    try {
      setloading(true);
      const token = Cookies.get("token");
      const response = await GlobalApi.deleteEmployee(
        token,
        selectedEmployee?.id,
        Role
      );

      console.log("rr for my adiin", response);

      if (Role === "admin") {
        console.log("i am here");

        if (response?.status === 200) {
          setloading(false);
          handleCloseModal();
          onClose();
          onDelete();
        } else {
          handleCloseModal();
          onClose();
        }
      } else {
        if (response?.data?.success === true) {
          setloading(false);
          handleCloseModal();
          onClose();
          onDelete();
        } else {
          handleCloseModal();
          onClose();
        }
      }
    } catch (error) {
      console.log("error while deleting Employee", error);

      setloading(false);
      handleCloseModal();
      onClose();
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const t = useTranslations("Users");
  return (
    <>
      {isOpen && (
        <div
          className={`fixed inset-0 cls bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={onClose} // Clicking on the overlay will close the popup
        >
          <div
            className="bg-white rounded-lg max-w-md"
            onClick={(e) => e.stopPropagation()} // Prevents overlay click from closing the popup
          >
            <Card className="shadow-none border-none">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-center shadow-none">
                  {Role === "admin" ? t("delete-user") : t("delete-emp")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-p font-medium text-center">
                  {t("confirm-delete")}
                </p>
              </CardContent>
              <CardFooter className="flex justify-center gap-4 mt-4">
                <button
                  variant="outline"
                  onClick={onClose}
                  className="btn-border btn-txt-color w-80 text-white font-semibold border rounded-lg mt-4 mx-auto p-2 no-hover"
                >
                  {t("cancel")}
                </button>
                <button
                  onClick={handleDelete} // Call handleDelete to perform the deletion
                  className="button-background text-white w-80 font-semibold border rounded-lg mt-4 mx-auto p-2 no-hover"
                >
                  {loading ? t("almost-there") : t("delete-member")}
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
